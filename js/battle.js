/**
 * 战场类
 */
var Battle = Observable.extend({
	w			:0,
	h			:0,
	
	cellLayer	: null,    //zIndex : 100
	unitsLayer : null, //zIndex : 200
	staticLayer : null,   //zIndex : 300
	winLayer : null,   //zIndex : 400
	toolbar	: null,
	
	map		: null,
	actions	: null,
	name	: "", 
	teams	: null,
	goal	: "",
	
	init		: function( config ){
		this._super( config );
		
		this.map = MAP;
		this.actions = ACTIONGROUPS;
		
		//创建的顺序既是绘画时的先后顺序
		this.cellLayer = new CellLayer( { playground : this } );
		this.unitsLayer = new UnitLayer( { playground : this } );
		this.unitsLayer.on( "battleOver", this.onBattleOver, this );
		
		this.staticLayer = new StaticLayer( { playground : this } );
		this.staticLayer.on( "add", function( x, y, a ){
			//TODO 根据动画属性判断是否增加 
			MAP[ y ][ x ]++;
		}, this ).on( "remove", function( x,y,a ){
			MAP[ y ][ x ] = Math.max( 0, --MAP[ y ][ x ] );
		}, this );
		
		this.winLayer = new WinLayer( { playground : this } );
		this.magicLayer = new MagicLayer( { playground : this } );
		
		PANEL.on( "keydown", this.onKeydown, this );			
		PANEL.on( "globalClick", this.onGlobalClick, this );
		
		this.toolbar = new Toolbar( { playground : this } );
		this.ai = new AIController( { playground : this } );
	
		canvas.width	= MAX_W;
		canvas.height	= MAX_H;
		
		PANEL.consoleHeight = 160 + 23;
		PANEL.onResize();
		
		PANEL.setBgImage( this.bg || BGIMAGE );
		this.board = $( "._board" );
		this.display = $("._display");
		
		return this;		
	},
	
	start				: function(){
		Pocket.start();
		this.toolbar.start();
		this.attachEvents();
		this.ai.start();
		
		//显示控制面板
		this.display.css( "visibility", "visible" );
		
		//开始绘制战场
		PANEL._showTopLine( this.name, function(){
			this.unitsLayer.start();
		}, this );
	},
	
	attachEvents	: function(){
		for (var i=0; i<this.actions.length; i++) {
			var g = this.actions[i];
			
			if ( g.event && g.event.active === true ){
				var e, econfig = $.extend( {
					actions	: g.actions,
					playground : this
				} ,g.event );
				
				if ( econfig.type == 1 )
					e = new UnitEvent( econfig );
				else if ( econfig.type == 2 )
					e= new SysEvent( econfig );
				else if ( econfig.type == 3 )
					e= new BattleEvent( econfig );	
				else if ( econfig.type == 4 )
					e= new GroundEvent( econfig );		
				else
					e = new Event( econfig );
				
				e.hung();						
			}
		}		
	},
	
	showGoal		: function(){
		this.unitsLayer.showGoal.apply( this.unitsLayer, arguments );
	},	
	checkGoal		: function(){
		this.unitsLayer.checkGoal.apply( this.unitsLayer, arguments );
	},
	checkFail		: function(){
		this.unitsLayer.checkFail.apply( this.unitsLayer, arguments );
	},	
	//战场结束后
	onBattleOver	: function( win ){
		if ( win )
			this.victory();
		else
			this.failed();		
	},
	
	victory			: function(){
		PANEL.showWhole( "胜利！", function(){
			window.location.reload();
		}, this );
	},
	failed			: function(){
		PANEL.showWhole( "失败！", function(){
			window.location.reload();
		}, this );
	},
	
	moveToCell	: function( cell, fn, scope ){
		var cx = WINDOW_WIDTH /2, cy = WINDOW_HEIGHT /2,
			dx = Math.max(cell.dx - cx, 0), dy = Math.max( cell.dy - cy, 0 );
		
		PANEL.moveWinTo( dx, dy, fn, scope );
	},
	//判断单元格是否在窗口内
	isInside		: function( cell ){
		var dx = cell.dx, dy = cell.dy;
		
		return PANEL.isInside( dx + CELL_WIDTH, dy + CELL_WIDTH );
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
		
		if ( !UNDERCOVER )	
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
	},
	
	destroy	: function(){
		this.cellLayer.destroy();
		this.unitsLayer.destroy();
		this.staticLayer.destroy();
		this.winLayer.destroy();
		this.magicLayer.destroy();
		
		PANEL.un( "keydown", this.onKeydown, this );			
		PANEL.un( "globalClick", this.onGlobalClick, this );		
		
		this._super();
		
		this.cellLayer = null;
		this.unitsLayer = null;
		this.staticLayer = null;
		this.winLayer = null;
		this.magicLayer = null;
	}
});

