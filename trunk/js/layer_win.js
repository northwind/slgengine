/**
 * @author Norris
 * 继承Component
 */

var WinLayer = Component.extend({
	cls	: "_winLayer",
	top	: null,  //最顶层窗口
	items : null, //弹出菜单
	
	init	: function( config ){
		$.extend( config, {
			el	: $("#winLayer"),
			w	: MAX_W,
			h	: MAX_H
		} );
		
		this._super( config );
		
		this.items = [];
		
		this.addEvents( "init", "pop", "cansel" );
		
		//点击右键时取消菜单
		
		PANEL.on("keydown", function( e ){
			if (this.items.length > 0) {
				//按ESC时
				if (e.which == 27) {
					e.preventDefault();
					this.onContextmenu();
				}
				//空格时
				if (e.which == 32 && this.items[0].onStandBy) {
					e.preventDefault();
					this.items[0].onStandBy();
				}
			}	
		}, this ).on( "contextmenu", function( e ){
			if (this.items.length > 0) {
				this.onContextmenu();
				
				e.stopPropagation();
			}
		}, this ) ;		
		
		//PANEL.on("mousemove", this.activeCell, this );
		
		return this;
	},
	
	onContextmenu		: function(){
		this.items[ 0 ].onCansel();		
	},
	
	popMenu			: function( unit, x, y ){
		if ( !this.menuAction ){
			this.menuAction = new ActionMenu({
				ct	: this.el
			}) ;
			
			this.menuAction.on( "cansel", function(){
				this.fireEvent( "cansel", arguments[0] );
				//丢弃第一个
				this.items.pop();
			}, this );
		}
		this.menuAction.bind( unit ).showAt( x, y ).show();
		//放在第一个
		this.items.unshift( this.menuAction );
		
		this.fireEvent( "pop", this.menuAction );
		
		return this;
	},
	
	clear			: function( color ){
			
		return this;	
	}
			
}); 