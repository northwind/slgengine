/**
 * 窗口层
 * 统一控制窗口，同一时间只有一个窗口可显示
 * 统一处理 ESC/右键 取消当前窗口
 */
var WinLayer = Component.extend({
	cls	: "_winLayer",
	top	: null,  //最顶层窗口
	items : null, //管理弹出菜单
	conceal	: false,	//临时hide
	busy	: false,	//busy时不可执行任何操作
	
	init	: function( config ){
		$.extend( config, {
			el	: $("#winLayer"),
			w	: MAX_W,
			h	: MAX_H
		} );
		
		this._super( config );
		this.items = [];
		
		//点击右键时取消菜单
		PANEL.on("keydown", function( e ){
			if ( this.hasWindow() && !this.busy ) {
				//按ESC时
				if ( e.which == 27 ) {
					e.preventDefault();
					e.stopPropagation();
					
					this.onContextmenu();
				} else
				//管理器主动调用onKeydown
				if ( !this.passby() )
					this.items[ 0 ].onKeydown( e );
			}	
		}, this ).on( "contextmenu", function( e ){
			if ( this.hasWindow() && !this.busy ) {
				e.stopPropagation();
				
				this.onContextmenu();
			}
		}, this );		
		
		return this;
	},
	
	//触发右键/ESC
	onContextmenu		: function(){
		if (this.conceal) {
			this.conceal = false;
			this.items[0].show();
		}
		else 
			this.items[0].cansel();		
	},
	
	popActionMenu		: function( unit, x, y ){
		if ( !this.menuAction ){
			this.menuAction = new ActionMenu({
				ct	: this.el
			}) ;
		}
		this.menuAction.bind( unit ).showAt( x, y ).show();
		this.clear().reg( this.menuAction );
		
		return this;
	},
	
	hasWindow		: function(){
		return this.items.length > 0;
	},
	
	passby		: function(){
		return !this.hasWindow() || (this.hasWindow() && this.conceal );
	},
		
	reg				: function( win ){
		if ( this.items[0] )
			this.items[0].hide();
				
		//添加到第一个
		this.items.unshift(win);
		
		return this;
	},
	
	unreg			: function(){
		this.items.shift();
		if ( this.items.length > 0 ){
			this.items[ 0 ].show();
		}
		
		return this;		
	},
	
	concealWin		: function(){
		this.conceal = true;
	},
	
	clear			: function( color ){
		this.items = [];
		this.conceal = false;
		return this;	
	},
	
	lock			: function(){
		this.busy = true;
	},
	
	unlock			: function(){
		this.busy = false;
	}				
}); 