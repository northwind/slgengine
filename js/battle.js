/**
 * 战场类
 */
var Battle = Observable.extend({
	
	cellLayer	: null,    //zIndex : 100
	unitsLayer : null, //zIndex : 200
	staticLayer : null,   //zIndex : 300
	winLayer : null,   //zIndex : 400
	
	init		: function( config ){
		this._super( config );
		
		//创建的顺序既是绘画时的先后顺序
		this._createCellLayer();
		this._createStaticLayer();
		this._createUnitLayer();
		this._createWinLayer();
		this._createMagicLayer();
		
		this.on( "keydown", this.onKeydown, this );			
		this.on( "globalClick", this.onGlobalClick, this );
		
		return this;		
	},
	
	load		: function(){
		
	},
	
	hung		: function(){
		
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
		if ( UNDERCOVER )
			this.unitsLayer.start();
		else	
			this._showTopLine( CHAPTER, function(){
				this.unitsLayer.start();
			}, this );
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
		this.showWhole( "胜利！", function(){
			window.location.reload();
		}, this );
	},
	failed			: function(){
		this.showWhole( "失败！", function(){
			window.location.reload();
		}, this );
	},
	
	moveToCell	: function( cell, fn, scope ){
		var cx = WINDOW_WIDTH /2, cy = WINDOW_HEIGHT /2,
			dx = Math.max(cell.dx - cx, 0), dy = Math.max( cell.dy - cy, 0 );
		
		this.moveWinTo( dx, dy, fn, scope );
	},
	//判断单元格是否在窗口内
	isInside		: function( cell ){
		var dx = cell.dx, dy = cell.dy;
		
		if ( dx < (this.scrollLeft - CELL_WIDTH ) || dx > this.scrollLeft + WINDOW_WIDTH - CELL_WIDTH )
			return false;
		if ( dy < (this.scrollTop - CELL_HEIGHT  ) || dy > this.scrollTop + WINDOW_HEIGHT - CELL_HEIGHT )
			return false;
		
		return true;
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
	}
});

