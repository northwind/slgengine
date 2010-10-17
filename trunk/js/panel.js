/**
 * @author Norris
 */
var Panel = Component.extend({
	w		: WINDOW_WIDTH,
	h		: WINDOW_HEIGHT,
	cls   : "_panel",
	suspend	: false,  //停止更新
	drawable: true,   //可以绘画
	scripting : false, //是否正在执行脚本
	ctCls	: "_wrap",
	
	scrollLeft : 0,
	scrollTop : 0,
	
	cellLayer	: null,    //zIndex : 100
	unitsLayer : null, //zIndex : 200
	winLayer : null,   //zIndex : 300
	
	dps		 : 16, //帧数
	sequence : 20, //多久更新一次
	
	wincount : 0,  //弹出菜单数量
	lineTimer: 0,
		
	init		: function( config ){
		config = config || {};
		PANEL = this;
		
		this.el = $( "#panel" );
		this.ct = $("#wrap").addClass( this.ctCls ).width( MAX_W );
		
		this._super( config );
		
		this.addEvents("click","mousemove","contextmenu","keydown","keyup", "update", "paint", "load", "background", "start" );
		
		LayerMgr.setWrap( this.el );
		
		//初始化画布 开始隐藏
		canvas = $("#canvas").hide()[0];
		canvas.width = MAX_W;
		canvas.height = MAX_H;
		if ( canvas.getContext )
			ctx = canvas.getContext("2d");
		
		//mask layer
		this.masklayer = $("#_masklayer").addClass("_masklayer")
									.css( {
										width	: $(document).width(),
										height	: $(document).height()
									} );
		//初始化进度条
		this.process = new Process(  { ct: this.el } );
		//进度条加载完之后触发panel的load事件
		this.process.on("end", function(){
			$( canvas ).show();
			this.fireEvent( "load" );
			//开始
			this.start();
		}, this).start();
		
		//创建的顺序既是绘画时的先后顺序
		this._createCellLayer();
		this._createWinLayer();
		this._createUnitLayer();
		
		//绑定事件
		var x, y, drag = false, el=this.el, _self = this;
		//this.el.mousedown( function( e ){
		this.el.mousedown( function( e ){
			if (e.which == 1) {
				x = e.pageX;
				y = e.pageY;
				//this.style.cursor = "pointer";
				drag = true;
				
				if ( this.setCapture )
					this.setCapture();
			}		
		} )
		.mousemove( function( e ){
			if ( drag && e.which == 1 ) {
				if (x != e.pageX) 
					el.scrollLeft = (this.scrollLeft -= e.pageX - x);
				
				if (y != e.pageY) 
					el.scrollTop = (this.scrollTop -= e.pageY - y);
				
				x = e.pageX;
				y = e.pageY;
			}
			
			_self.fireEvent( "mousemove", e, _self );			
		} )
		.click( function( e ){
			_self.fireEvent( "click", e );	
		} )
		.mousewheel( function( e, delta, x, y){
			//console.debug( delta + " x = " + x + " y = " + y );
			//向下滚动
			if ( y  == -1 ){
				_self.moveBy( 0, CELL_HEIGHT );
			}else{
				_self.moveBy( 0, -CELL_HEIGHT );
			}
			
			e.preventDefault();
			return false;
		} )
		.bind("contextmenu",function( e ){
				e.preventDefault();
				e.stopPropagation();
				_self.fireEvent("contextmenu", e);			
		}).mouseleave( function(e){
			_self.cellLayer.unactiveCell();
		} );	
		
		$(document).mouseup( function( e ){
			if (e.which == 1) {
				drag = false;
				//拖拽兼容IE
				if (this.releaseCapture) 
					this.releaseCapture();
			}
		} ).keydown( function( e ){
			_self.fireEvent( "keydown", e );	
		} ).keyup( function( e ){
			_self.fireEvent( "keyup", e );	
		} );
		
		//触发器
		var mem = 0, inter = 1000 / this.dps;
		this.timer = setInterval( function(){
			if (!_self.suspend) { //停止更新
				var d = (new Date()).getTime();
				_self.fireEvent("update", d );
				
				//在超过1000 / this.dps时间段之后绘画
				if (_self.drawable && d - mem > inter ) {
					mem = d;
					
					//TODO 优化为只需要重新的地方才清除
					ctx.clearRect( 0,0, MAX_W, MAX_H );
			
					_self.fireEvent("paint", d);
				}
			}
		} , this.sequence);
		
		this._loadBuffsImg();
		
		//加载背景
		this.on("background", function(){
			this.process.add( 20, "背景图片加载完毕..." );
		}, this);
		
		this.on( "keydown", this.onKeydown, this );			
		this.on( "load", this.onLoad, this );	
		this.on( "click", this.onClick, this );
			 		
		return this;		
	},

	onKeydown	: function( e ){
		log( "keydown : " + e.which );
		if ( this.speaking && ( e.which == 32 || e.which == 27 || e.which == 13 ) ){
			this.stopSpeak();
		}
	},	
	
	onClick		: function( e ){
		if ( this.speaking ){
			this.stopSpeak();
		}
	},
	
	//加载完之后
	onLoad		: function(){
		//显示控制面板
		this.display = $("._display").width( MAX_W ).css( "visibility", "visible" );
		
		this.board = $( "._board" );
	},
	//加载状态图像
	_loadBuffsImg	: function(){
		var count = 0, i = 0, _self = this;
		for( var name in BUFFS ){
			count++;
		}
		for( var name in BUFFS ){
			(function(){
				var buff = BUFFS[ name ];
				_loadImg( buff.src, function(){
					buff.img = this;
					i++;
					//全部加载完
					if ( i >= count ){
						_self.process.add( 10, "状态图片加载完毕..." );
					}
				} );
			})();
		}		
	},
		
	_createCellLayer	: function(){
		if ( this.cellLayer )
			this.cellLayer.remove();
		
		this.cellLayer = LayerMgr.reg( 100, MAX_W, MAX_H, CellLayer );
	},
	_createUnitLayer	: function(){
		if ( this.unitsLayer )
			this.unitsLayer.remove();
		
		this.unitsLayer = LayerMgr.reg( 200, MAX_W, MAX_H, UnitLayer );
		
		this.unitsLayer.on( "loading", function( unit, sum, count ){
			this.process.add( 70 / sum, "加载" + (unit.name || unit.symbol) + "完备..." );
		}, this );
	},	
	_createWinLayer	: function(){
		if ( this.winLayer )
			this.winLayer.remove();
		
		this.winLayer = LayerMgr.reg( 300, MAX_W, MAX_H, WinLayer );
		
		this.winLayer.on( "pop", function(){ this.wincount++; }, this )
							  .on( "cansel", function(){ this.wincount--; }, this );
	},
	
	start				: function(){
		//报幕
		this._showTopLine( CHAPTER, function(){
			log("start" );
			this.unitsLayer.on( "roundStart", function(){
				this.fireEvent( "start", this );				
			}, this ,{ one : true }).start();
		}, this );
	},
	
	//战场中间显示提示信息
	_showTopLine		: function( str, fn, scope ){
		if ( this.lineTimer )
			clearTimeout( this.lineTimer );
		
		this.mask();
		$("#maskUp").html( str ).width( MAX_W ).css( "top", (WINDOW_HEIGHT -200)/2 ).show();
		
		var _self = this;
		this.lineTimer =setTimeout( function(){
			_self._hideTopLine( fn , scope );
			_self.lineTimer=0;
		//}, 1500 );			
		}, 1 );
	},

	_hideTopLine		: function( fn, scope ){
		var _self = this;
		$("#maskUp").fadeOut( 800, function(){
			_self.unmask();
			if ( fn )
				fn.call( scope || _self )			
		} );
	},
				
	showGrid			: function(){
		this.cellLayer.showGrid();
		return this;
	},

	hideGrid			: function(){
		this.cellLayer.hideGrid();
		return this;
	},
		
	moveTo			: function(x, y){
		if (x != undefined) 
			this.el[0].scrollLeft = (this.scrollLeft = x);
		
		if (y != undefined) 
			this.el[0].scrollTop = (this.scrollTop = y);
			
		return this;			
	},
	
	moveBy		: function( x, y ){
		x = x || 0;
		y = y || 0;
		
		x = this.el[0].scrollLeft + x;
		y = this.el[0].scrollTop + y;
		
		this.moveTo( x, y );
		
		return this;
	},
	
	//设置背景图片
	setBgImage	: function( url ){
		var _self = this;
		_loadImg( url, function(){
			if ( !UNDERCOVER )
				canvas.style.background = "url('" + url + "') no-repeat";
				
			_self.fireEvent( "background" );
		} );
		
		return this;
	},
	
	setSmallMap	: function( src ){
		if ( src && !UNDERCOVER )
			$("#smallmap").attr( "src", src);
		
		return this;
	},
	
	showUnitAttr		: function( unit ){
		
		$("._face").empty().append( unit.ui.imgs.face[ 0 ] );
		$("#hp").text( unit.hp + "/" + unit.hpMax );
		$("#mp").text( unit.mp + "/" + unit.mpMax );
		
		$("#rolename").text( unit.name );
		$("#rolelevel").text( unit.level );
		$("#roleexp").attr( "title", unit.exp + "/" + unit.nextExp() );
		$("#roleexpline").width( 236 * unit.exp / unit.nextExp() );
		
		$("#roleatknum").text( unit.atknumMin + " - " + unit.atknumMax );
		$("#rolestrength").text( unit.strength );
		$("#roleagility").text( unit.agility );
		$("#roleintelligence").text( unit.intelligence );
		$("#roledefnum").text( unit.defnum );
		//添加状态
		var statusDom = $("._status");
		for( var name in unit.buff ){
			var buff = unit.buff[ name ];
			var img = $("<img>").attr({
				src : buff.src, width : 16, height : 16
			});
			$("<a>").attr( "title", buff.desc || "" ).append( img )
				.appendTo( statusDom );
		}
		
		this.board.show();
		return this;
	},
	
	hideUnitAttr	: function(){
		this.board.hide();
	},
	
	speaking		: false,	
	speakTimer		: 0,	
	speakText		: "",
	speakUnit		: null,
	speak			: function( unit, text, fn, scope ){
		if (this.speaking)
			this.clearSpeak();
			
		this.speaking = true;
		this.speakUnit = unit;
			
		$("#face").attr( "src", unit.imgFace );
		$("._speak h2").text( unit.name );
		$("._speech").show();
		
		//动画显示
		var i = 0 , board = $("._speak p"), _self = this;
		this.speakText = text;
		this.speakTimer = setInterval( function(){
			if ( i++ >= text.length ){
				_self.stopSpeakAnimate();
			}else{
				board.html( text.slice( 0, i ) );	
			}
		}, 100 );
	},
	stopSpeak		: function(){
		if ( this.speakTimer ){
			this.stopSpeakAnimate();
		} else {
			this.clearSpeak();
		}
	},
	stopSpeakAnimate : function(){
		clearInterval(this.speakTimer);
		this.speakTimer = 0;
		$("._speak p").html( this.speakText );
	},
	//取消显示并回调函数
	clearSpeak		: function(){
		this.stopSpeakAnimate();
		
		if (this.speakUnit) {
			this.speakUnit.fireEvent("speak", this.speakUnit);
			delete this.speakUnit;
		}
		$("._speech").hide();
		this.speaking = false;
	},
	
	setUnits		: function( data ){
		this.unitsLayer.setUnits( data );
		return this;
	},	
	
	setTeams		: function( data ){
		this.unitsLayer.setTeams( data );
		return this;		
	},
	
	getCell	: function( x, y ){
		if ( typeof x == "number" )
			return CellMgr.get( x, y );
			
		var p = getPoints( x, y );
		return CellMgr.get( p.x, p.y );
	},
	
	getAttackCells : function( unit ){
		return this.cellLayer.getAttackCells( 	
								unit.cell, 			
								unit.range ,     
								unit.rangeType
							);
	},
	
	showUnit			: function( unit, x, y ){
		x = parseInt( x == undefined ? unit.gx : x );
		y = parseInt( y == undefined ? unit.gy : y );
		this.unitsLayer.showAt( unit,x,y );
		
		return this;
	},
	
	delUnit			: function( id ){
		this.unitsLayer.delUnit( id );
		
		return this;		
	},
	
	getUnit			: function( id ){
		return this.unitsLayer.getUnitById( id );
	},
	
	popActionMenu		: function( unit, x, y ){
		this.winLayer.popActionMenu( unit, x, y );
		return this;
	},
	
	mask		: function (){
		this.masklayer.show();
		return this;			  
	},

	unmask 		: function (){
		this.masklayer.hide();
		return this;	
	},
	
	runScript		: function(){
		this.scripting = true;
	},
	stopScript	: function(){
		this.scripting = false;
	},
	isScripting	: function(){
		return this.scripting;
	}
});

