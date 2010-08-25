/**
 * @author Norris
 */

var WinLayer = Layer.extend({
	cls	: "_winLayer",
	
	init	: function( config ){
		$.extend( config, {
			el	: $("<div>"),
			w	: config.wCanvas,
			h	: config.hCanvas
		} );
		
		this._super( config );
		
		//PANEL.on("mousemove", this.activeCell, this );
		
		return this;
	},
	
	popMenu			: function( unit, x, y ){
		if ( !this.menuAction ){
			this.menuAction = new ActionMenu({
				ct	: this.el
			});
		}
		this.menuAction.showAt( x, y ).show();
		
		return this;
	},
	
	update					: function(){
		var ctx = this.ctx;
		//清屏
		ctx.clearRect( 0, 0, this.w, this.h );
	},
	
	clear			: function( color ){
			
		return this;	
	}
			
}); 