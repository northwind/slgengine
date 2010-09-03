/**
 * @author Norris
 */

var UIMgr = function( config ){
	$.extend( this, config );
	return this;	
}

UIMgr.prototype = {
	items	: {},
	
	get		: function( key, unit ){
		if ( this.items[ key ] )
			return this.items[ key ];
		else{
			var ui = this.create( unit );
			this.items[ key ] = ui;
			return ui;
		}
	},
	
	set		: function( key, ui){
		this.items[ key ] = ui;
		return this;
	},
	
	create	: function( unit ){
		return new UnitUI( { unit : unit } );
	} 
	
};


UIMgr = new UIMgr();
