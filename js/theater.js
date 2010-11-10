/**
 * 剧场类
 * 管理场景间的切换
 */
var Theater = Battle.extend({
	
	init		: function( config ){
		this._super( config );
		
		this.map = MAP;
		this.actions = ACTIONGROUPS;
		
		//创建的顺序既是绘画时的先后顺序
		this.cellLayer = new CellLayer( { playground : this } );
		this.unitsLayer = new WalkLayer( { playground : this } );
		this.staticLayer = new StaticLayer( { playground : this } );
		this.staticLayer.on( "add", this.onAddStatic, this );
		this.winLayer = new WinLayer( { playground : this } );
		this.magicLayer = new MagicLayer( { playground : this } );
		
		PANEL.on( "keydown", this.onKeydown, this );			
		PANEL.on( "globalClick", this.onGlobalClick, this );
		
		return this;		
	},
	
	start				: function(){
		this.toolbar.start();
		this.attachEvents();
		
		//显示控制面板
		this.display.css( "visibility", "visible" );
		
		//
		PANEL._showTopLine( this.name, function(){
			this.unitsLayer.start();
		}, this );
	},
	
	loadScene		: function(){
		this.toolbar = new Toolbar( { playground : this } );
	
		canvas.width	= MAX_W;
		canvas.height	= MAX_H;
		
		PANEL.consoleHeight = 160 + 23;
		PANEL.onResize();
		
		PANEL.setBgImage( this.bg || BGIMAGE );
		this.board = $( "._board" );
		this.display = $("._display");		
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
	
	onAddStatic	: function(){},
	
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

