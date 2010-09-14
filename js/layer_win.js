/**
 * @author Norris
 * 继承Component
 */

var WinLayer = Component.extend({
	cls	: "_winLayer",
	
	init	: function( config ){
		$.extend( config, {
			el	: $("<div>"),
			w	: MAX_W,
			h	: MAX_H
		} );
		
		this._super( config );
		
		this.pri( config.level );
		
		this.addEvents( "init" );
		//PANEL.on("mousemove", this.activeCell, this );
		
		return this;
	},
	
	popMenu			: function( unit, x, y ){
		if ( !this.menuAction ){
			this.menuAction = new ActionMenu({
				ct	: this.el,
				unit	: unit
			});
		}
		this.menuAction.showAt( x, y ).show();
		
		return this;
	},
	
	clear			: function( color ){
			
		return this;	
	}
			
}); 