/**
 * @author Norris
 */

var UIMgr = function( config ){
	$.extend( this, config );
	return this;	
}

UIMgr.prototype = {
	items	: {},
	
	get		: function( key, config, callback ){
		var item = this.items[key];
		if ( item ) {
			if ( callback )
				callback( item );
			return item;
		}
		else {
			var ui = this.create(config, callback);
			this.items[key] = ui;
			return ui;
		}
	},
	
	set		: function( key, ui){
		this.items[ key ] = ui;
		return this;
	},
	
	create	: function( config, callback ){
		return new UnitUI( config, callback );
	} 
	
};


UIMgr = new UIMgr();
