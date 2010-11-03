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
	scripting : 0, //是否正在执行脚本
	
	scrollLeft : 0,	//窗口左移的像素
	scrollTop : 0,  //窗口上移的像素
	
	cellLayer	: null,    //zIndex : 100
	unitsLayer : null, //zIndex : 200
	staticLayer : null,   //zIndex : 300
	winLayer : null,   //zIndex : 400
	
	dps		 :  24, //帧数
	
	lineTimer: 0,
	
	init		: function( config ){
		PANEL = this;
		
		this.el = $( "#panel" );
		this.ct = $("#wrap").width( MAX_W );
		
		this.addEvents( "paint", "battleWin", "battleFail", "click","runScript","stopScript","globalClick","mouseleave","mousemove","contextmenu","keydown","keyup" );
		this.addEvents( { name : "paint", type : 3 } );
		
		this._super( config );
		
		LayerMgr.setWrap( this.el );
		
		//初始化画布 开始隐藏
		canvas = $("#canvas").hide()[0];
		canvas.width = MAX_W;
		canvas.height = 3000; // MAX_H;
		if ( canvas.getContext )
			ctx = canvas.getContext("2d");
		
		//mask layer
		this.masklayer = $("#masklayer").addClass("_masklayer");
		this.display = $("._display");
		
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
		
		//依旧窗口大小更改战场场景大小
		$( window ).resize( function(){
			_self.onResize();
		} ).resize();
		
		//触发器
		var mem = 0, inter = 1000 / this.dps;
		this.timer = setInterval( function(){
			if (!_self.suspend) { //停止更新
				//TODO 优化为只需要重新的地方才清除
				ctx.clearRect( 0,0, MAX_W, MAX_H );
		
				_self.fireEvent("paint");
			}
		} , inter );
		
		//创建的顺序既是绘画时的先后顺序
		this._createCellLayer();
		this._createStaticLayer();
		this._createUnitLayer();
		this._createWinLayer();
		this._createMagicLayer();
		
		this.on( "keydown", this.onKeydown, this );			
		this.on( "globalClick", this.onGlobalClick, this );
		
		this.start();
			 		
		return this;		
	},
	
	onResize	: function( e ){
		WINDOW_HEIGHT = Math.max( $(window).height() - 160 - 23, 250 );
		WINDOW_WIDTH = Math.min( $(window).width(), 960 );
		
		this.ct.width( WINDOW_WIDTH );
		this.el.css( { width	: WINDOW_WIDTH, height	: WINDOW_HEIGHT	} );
		this.masklayer.css( { width	: WINDOW_WIDTH, height	: WINDOW_HEIGHT	} );
		this.display.width( WINDOW_WIDTH );
	},

	onKeydown	: function( e ){
		log( "keydown : " + e.which );
		if ( this.speaking && ( e.which == 32 || e.which == 27 || e.which == 13 ) ){
			e.preventDefault();
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
	},	
	_createStaticLayer	: function(){
		if ( this.staticLayer )
			this.staticLayer.remove();
		
		this.staticLayer = LayerMgr.reg( 300, MAX_W, MAX_H, StaticLayer );
		//更改地图属性
		this.staticLayer.on( "add", function( x, y, a ){
			//TODO 根据动画属性判断是否增加
			MAP[ y ][ x ]++;
		}, this ).on( "remove", function( x,y,a ){
			MAP[ y ][ x ] = Math.max( 0, --MAP[ y ][ x ] );
		}, this );
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
		ScriptMgr.load();
		AIController.start();
		
		canvas.height = MAX_H;
		$( canvas ).show();

		//显示控制面板
		this.display.css( "visibility", "visible" );
		this.setBgImage( BGIMAGE );
		this.board = $( "._board" );
		//开始绘制战场
		this.suspend = false;		
		//报幕
		//this._showTopLine( CHAPTER, function(){
			log("start" );
			this.unitsLayer.start();
		//}, this );
	},
	
	//战场中间显示提示信息
	_showTopLine		: function( str, fn, scope ){
		this.mask();
		
		if ( this.lineTimer )
			clearTimeout( this.lineTimer );
		
		$("#maskUp").html( str ).css({
				height  : 100,
				width	: MAX_W,
				background : "",
				//top		: (WINDOW_HEIGHT -200)/2
				top		: 25
		}).show();
		
		var _self = this;
		this.lineTimer =setTimeout( function(){
			_self._hideTopLine( fn , scope );
			_self.lineTimer=0;
		}, 1500 );			
	},
	//显示胜利/失败条件
	showGoal		: function( fn, scope ){
		this.showWhole( GOAL, fn, scope ); 
	},
	checkGoal		: function(fn, scope){
		VictoryN++;
		if ( VictoryN >= VICTORYN ){
			this.victory();
		}else
			if ( fn )
				fn.call( scope || this );
	},
	checkFail		: function(fn, scope){
		FailedN++;
		if ( FailedN >= FAILEDN ){
			this.failed();
		}else
			if ( fn )
				fn.call( scope || this );
	},
	//TODO 胜利画面
	victory			: function(){
		this.showWhole( "胜利！", function(){
			this.fireEvent( "battleWin" );
			window.location.reload();
		}, this );
	},
	failed			: function(){
		this.showWhole( "失败！", function(){
			this.fireEvent( "battleFail" );
			window.location.reload();
		}, this );
	},
			
	//整个战场显示提示信息
	showWhole		: function( text, fn, scope ){
		this._showTopLine(  "" , fn, scope );
		$("#maskUp").html( text ).css({
			background : "",
			width	: MAX_W,
			height  : WINDOW_HEIGHT,
			top		:  23
		});
	},	
	_hideTopLine		: function( fn, scope ){
		var _self = this;
		$("#maskUp").fadeOut( 300, function(){
			_self.unmask();
			if ( fn )
				fn.call( scope || _self )			
		} );
	},
	//  options : [ { v : 返回值, t : 显示文字 }, { ... }, ... ] 
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
	
	moveToCell	: function( cell, fn, scope ){
		var cx = WINDOW_WIDTH /2, cy = WINDOW_HEIGHT /2,
			dx = Math.max(cell.dx - cx, 0), dy = Math.max( cell.dy - cy, 0 );
		
		this.moveWinTo( dx, dy, fn, scope );
	},
	
	//设置背景图片
	setBgImage	: function( url ){
		if ( !UNDERCOVER )
			canvas.style.background = "url('" + url + "') no-repeat";
			
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
		$("#roleexpline").width( 236 * Math.min( 1, unit.exp / unit.nextExp() ) );
		
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
		
		this.hideUnitAttr();	
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
	
	getCell	: function( x, y ){
		if ( typeof x == "number" )
			return CellMgr.get( x, y );
			
		var p = getPoints( x, y );
		return CellMgr.get( p.x, p.y );
	},
	
	getUnitByIndex			: function( index ){
		return this.unitsLayer.getUnitByIndex( index );
	},
	
	getUnitById	: function( id ){
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
	
	//script 采取计数器方式 当减到0时触发停止执行
	runScript		: function(){
		this.scripting++;
		this.fireEvent( "runScript", this );
	},
	stopScript	: function(){
		this.scripting--;
		if ( !this.isScripting() )
			this.fireEvent( "stopScript", this );
	},
	isScripting	: function(){
		return this.scripting > 0;
	},
	addStatic	: function(){
		this.staticLayer.add.apply( this.staticLayer, arguments );
		return this;
	},
	//延迟多少毫秒
	sleep		: function( ms, fn, scope ){
		setTimeout( function(){
			if ( fn )
				fn.call( scope || this, this );
		}, ms );
	},	
		
	playAnimation	: function( a, dx, dy, fn, scope ){
		if ( typeof a == "string" ){
			a = Animation.get( a, { dx : dx, dy : dy, fn : fn, scope : scope } );
		}
		
		this.magicLayer.add( a );
	},
	lightenCell	: function( cell, fn, scope ){
		if ( !( cell instanceof Cell ) ){
			cell = CellMgr.get( cell.x, cell.y );
		}
		this.moveToCell( cell );
		this.cellLayer.paintCells( ATTACKCOLOR, cell );
		
		//2s后回调
		var _self = this;
		setTimeout( function(){
			_self.cellLayer.paintCells( ATTACKCOLOR, {} );
			if ( fn )
				fn.call( scope || this );
		}, 2000 );
	},
	lightenUnit	: function( unit, fn, scope ){
		if ( !( unit instanceof Unit ) ){
			unit = this.getUnitById( unit );
		}
		this.moveToCell( unit.cell );
		this.cellLayer.paintCells( ATTACKCOLOR, unit.cell );
		unit.major = true;		//显示主要信息
		
		//2s后回调
		var _self = this;
		setTimeout( function(){
			unit.major = false;
			_self.cellLayer.paintCells( ATTACKCOLOR, {} );
			if ( fn )
				fn.call( scope || this );
		}, 2000 );
	},		
	gainStuffOnCell	: function( x, y, stuff, num, fn, scope ){
		log( "panel gainStuffOnCell : x = " + x + " y = " + y + " stuff = " + stuff );
		var cell = this.getCell( x, y ), unit;
		if ( cell && (unit = this.getUnitByIndex( cell.index )) ){
			unit.gainStuff( stuff, num, fn, scope ) 
		}else if ( fn )
			fn.call( scope || this );
	}
});

