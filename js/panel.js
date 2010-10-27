/**
 * 战场控制
 * 外部调用统计的入口
 */
var Panel = Component.extend({
	w		: WINDOW_WIDTH,
	h		: WINDOW_HEIGHT,
	cls   : "_panel",
	suspend	: true,  //停止更新
	drawable: true,   //可以绘画
	scripting : false, //是否正在执行脚本
	ctCls	: "_wrap",
	
	scrollLeft : 0,	//窗口左移的像素
	scrollTop : 0,  //窗口上移的像素
	
	cellLayer	: null,    //zIndex : 100
	unitsLayer : null, //zIndex : 200
	staticLayer : null,   //zIndex : 300
	winLayer : null,   //zIndex : 400
	
	dps		 :  24, //帧数
	
	lineTimer: 0,
		
	init		: function( config ){
		config = config || {};
		PANEL = this;
		
		this.el = $( "#panel" );
		this.ct = $("#wrap").addClass( this.ctCls ).width( MAX_W );
		
		this._super( config );
		
		this.addEvents("click", "runScript", "stopScript", "globalClick","mouseleave","mousemove","contextmenu","keydown","keyup", "paint", "load", "start", "roundStart", "roundEnd", "teamStart", "teamEnd", "teamOver" );
		
		LayerMgr.setWrap( this.el );
		
		//初始化画布 开始隐藏
		canvas = $("#canvas").hide()[0];
		canvas.width = MAX_W;
		canvas.height = 3000; // MAX_H;
		if ( canvas.getContext )
			ctx = canvas.getContext("2d");
		
		//mask layer
		this.masklayer = $("#_masklayer").addClass("_masklayer")
									.css( {
										width	: $(document).width(),
										height	: $(document).height()
									} );
		//初始化进度条
		this.process = new Process();
		//进度条加载完之后触发panel的load事件
		this.process.on("end", this.start, this).start();
		
		//绑定事件
		var x, y, drag = false, el=this.el, _self = this;
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
			//向下滚动
			if ( y  == -1 ){
				_self.moveWinBy( 0, CELL_HEIGHT );
			}else{
				_self.moveWinBy( 0, -CELL_HEIGHT );
			}
			
			e.preventDefault();
			return false;
		} )
		.bind("contextmenu",function( e ){
				e.preventDefault();
				e.stopPropagation();
				_self.fireEvent("contextmenu", e);			
		}).mouseleave( function(e){
			_self.fireEvent("mouseleave", e);		
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
		} ).click(function( e ){
			_self.fireEvent( "globalClick", e );	
		});
		
		//触发器
		var mem = 0, inter = 1000 / this.dps;
		this.timer = setInterval( function(){
			if (!_self.suspend) { //停止更新
				//TODO 优化为只需要重新的地方才清除
				ctx.clearRect( 0,0, MAX_W, MAX_H );
		
				_self.fireEvent("paint");
			}
		} , inter );
		
		this.on( "keydown", this.onKeydown, this );			
		this.on( "globalClick", this.onGlobalClick, this );
			 		
		return this;		
	},

	onKeydown	: function( e ){
		log( "keydown : " + e.which );
		if ( this.speaking && ( e.which == 32 || e.which == 27 || e.which == 13 ) ){
			this.stopSpeak();
		}
	},	
	
	onGlobalClick		: function( e ){
		if ( this.speaking ){
			this.stopSpeak();
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
		
		//PANEL具有unitsLayer的事件
		var _self = this;
		$( [ "roundStart", "roundEnd", "teamStart", "teamEnd", "teamOver" ] ).each( function( i, n ){
			_self.unitsLayer.on( n, function(){
				var a = Array.prototype.slice.call( arguments, 0 );
				a.unshift( n );
				_self.fireEvent.apply( _self, a );
			}, _self );
		} );
		
		this.unitsLayer.setTeams( TEAMS ).setUnits( UNITS );
	},	
	_createStaticLayer	: function(){
		if ( this.staticLayer )
			this.staticLayer.remove();
		
		this.staticLayer = LayerMgr.reg( 300, MAX_W, MAX_H, StaticLayer );
	},	
	_createWinLayer	: function(){
		if ( this.winLayer )
			this.winLayer.remove();
		
		this.winLayer = LayerMgr.reg( 400, MAX_W, MAX_H, WinLayer );
	},
	_createMagicLayer	: function(){
		if ( this.magicLayer )
			this.magicLayer.remove();
		
		this.magicLayer = LayerMgr.reg( 500, MAX_W, MAX_H, MagicLayer );
	},		
		
	start				: function(){
		Pocket.start();
		Toolbar.start();
		EventMgr.load();
		AIController.start();
		
		canvas.height = MAX_H;
		$( canvas ).show();

		//创建的顺序既是绘画时的先后顺序
		this._createCellLayer();
		this._createStaticLayer();
		this._createUnitLayer();
		this._createWinLayer();
		this._createMagicLayer();
		
		//显示控制面板
		this.display = $("._display").width( MAX_W ).css( "visibility", "visible" );
		this.setBgImage( BGIMAGE );
		this.board = $( "._board" );
		this.suspend = false;		
		this.fireEvent( "load", this );		
		//报幕
		//this._showTopLine( CHAPTER, function(){
			this.fireEvent("paint", this );
			
			log("start" );
			this.fireEvent( {
				name	:  "start",
				fn		:  function(){
					this.unitsLayer.start();
				},
				scope	: this
			}, this );
				
			
		//}, this );
	},
	
	//战场中间显示提示信息
	_showTopLine		: function( str, fn, scope ){
		this.mask();
		
		if ( this.lineTimer )
			clearTimeout( this.lineTimer );
		
		$("#maskUp").html( str ).css({
				height  : 200,
				width	: MAX_W,
				top		: (WINDOW_HEIGHT -200)/2
		}).show();
		
		var _self = this;
		this.lineTimer =setTimeout( function(){
			_self._hideTopLine( fn , scope );
			_self.lineTimer=0;
		}, 1500 );			
	},
	//整个战场显示提示信息
	showGoal		: function( fn, scope ){
			this._showTopLine(  "" , fn, scope );
			$("#maskUp").html( GOAL ).css({
				width	: MAX_W,
				height  : WINDOW_HEIGHT,
				top		:  23,
				lineHeight : "100px"
			});
	},
	_hideTopLine		: function( fn, scope ){
		var _self = this;
		$("#maskUp").fadeOut( 800, function(){
			_self.unmask();
			if ( fn )
				fn.call( scope || _self )			
		} );
	},
	choose			: function( title, options, fn, scope ){
		this._choose( null, title, options, fn, scope );
	},	
	//显示选择框
	_choose		: function( src, title, options, fn, scope ){
		this.mask();
		
		var ct = $("._options").clone(), _self = this, clicked = false;
		if ( src )
			ct.find(".face").show().find("img").attr("src", src );
		else
			ct.find(".face").hide();
				
		ct.find("h6").html( title );
		
		var sel = ct.find("ul");
		for (var i=0; i<options.length; i++) {
			$("<li>").attr( "value", options[i].v ).html( i + ". " + options[i].t ).appendTo( sel );
		}
		sel.children("li").click( function(){
			if ( clicked )
				return;
			clicked = true;	
			var v =  $(this).attr("value");
			_self._hideTopLine( function(){
				$("#maskUp")[0].style.background = "";
				if ( fn )
					fn.call( scope || this, v );				
			} );
		} ).hover( function(){
			$(this).toggleClass("active");
		} );
		
		$("#maskUp").empty().append( ct.show() ).css({
				height  : 200,
				width	: MAX_W,
				background : "none",
				top		: (WINDOW_HEIGHT -200)/2
		}).show();
	},					
	showGrid			: function(){
		this.cellLayer.showGrid();
		return this;
	},

	hideGrid			: function(){
		this.cellLayer.hideGrid();
		return this;
	},
	
	//移动屏幕300ms后回调	
	moveWinTo			: function(x, y, fn, scope ){
		if (x != undefined) 
			this.el[0].scrollLeft = (this.scrollLeft = x);
		
		if (y != undefined) 
			this.el[0].scrollTop = (this.scrollTop = y);
		
		if ( fn )
			setTimeout( bind( fn, scope || PANEL ), 300 );
			
		return this;			
	},
	
	moveWinBy		: function( x, y, fn, scope ){
		x = x || 0;
		y = y || 0;
		
		x = this.el[0].scrollLeft + x;
		y = this.el[0].scrollTop + y;
		
		this.moveWinTo( x, y, fn, scope );
		
		return this;
	},
	
	moveToCell	: function( cell ){
		var cx = WINDOW_WIDTH /2, cy = WINDOW_HEIGHT /2,
			dx = Math.max(cell.dx - cx, 0), dy = Math.max( cell.dy - cy, 0 );
		
		this.moveWinTo( dx, dy );
	},
	
	//设置背景图片
	setBgImage	: function( url ){
		if ( !UNDERCOVER )
			canvas.style.background = "url('" + url + "') no-repeat";
			
		return this;
	},
	
	setSmallMap	: function( src ){
		if ( src && !UNDERCOVER )
			$("#smallmap").attr( "src", src);
		
		return this;
	},
	
	showUnitAttr		: function( unit ){
		if ( UNDERCOVER )
			return;
			
		$("._board ._face img").attr( "src", unit.face );
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
	speak			: function( unit, text ){
		if (this.speaking)
			this.clearSpeak();
			
		this.speaking = true;
		this.speakUnit = unit;
			
		$("#face").attr( "src", unit.face );
		$("._speak h2").text( unit.name );
		$("._speech").show();
		
		//动画显示
		var i = 0 , board = $("._speak p"), _self = this, l = text.length;
		this.speakText = text;
		this.speakTimer = setInterval( function(){
			i = i + 3;
			if ( i >= l ){
				_self.stopSpeakAnimate();
			}else{
				board.html( text.slice( 0, i ) );	
			}
		}, 150 );
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
		this.speaking = false;
		//this.stopSpeakAnimate();
		
		$("#face").removeAttr( "src" );
		$("._speak p").html("");
		$("._speech").hide();
				
		if (this.speakUnit) {
			this.speakUnit.stopSpeak();
			delete this.speakUnit;
		}
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
		var unit = this.getUnit( id );
		if (unit) {
			this.unitsLayer.delUnit( unit.cell.index );
		}
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
		this.fireEvent( "runScript", this );
	},
	stopScript	: function(){
		this.scripting = false;
		this.fireEvent( "stopScript", this );
	},
	isScripting	: function(){
		return this.scripting;
	},
	addStatic	: function(){
		this.staticLayer.add.apply( this.staticLayer, arguments );
		return this;
	},
	playAnimation	: function( a ){
		this.magicLayer.add( a );
	},
	lightenCell	: function( cell, fn, scope ){
		this.cellLayer.paintCells( ATTACKCOLOR, cell );
		
		//2s后回调
		var _self = this;
		setTimeout( function(){
			_self.cellLayer.paintCells( ATTACKCOLOR, {} );
			if ( fn )
				fn.call( scope || this );
		}, 2000 );
	}
});

