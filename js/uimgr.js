/**
 * @author Norris
 */

var UIMgr = function( config ){
	$.extend( this, config );
	return this;	
}

UIMgr.prototype = {
	items	: {},
	
	get		: function( key, config ){
		if ( this.items[ key ] )
			return this.items[ key ];
		else{
			var ui = this.create( config );
			this.items[ key ] = ui;
			return ui;
		}
	},
	
	set		: function( key, ui){
		this.items[ key ] = ui;
		return this;
	},
	
	create	: function( config ){
		return new UnitUI( config );
	} 
	
};


UIMgr = new UIMgr();
