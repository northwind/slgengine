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
		
		this.addEvents( "init", "pop", "cansel" );
		//PANEL.on("mousemove", this.activeCell, this );
		
		return this;
	},
	
	popMenu			: function( unit, x, y ){
		if ( !this.menuAction ){
			this.menuAction = new ActionMenu({
				ct	: this.el
			}) ;
			
			this.menuAction.on( "cansel", function(){
				this.fireEvent( "cansel", arguments[0] );
			}, this );
		}
		this.menuAction.bind( unit ).showAt( x, y ).show();
		
		this.fireEvent( "pop", this.menuAction );
		
		return this;
	},
	
	clear			: function( color ){
			
		return this;	
	}
			
}); 