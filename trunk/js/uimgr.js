/**
 * @author Norris
 */

var ImgMgr = function( config ){
	$.extend( this, config );
	return this;	
}

ImgMgr.prototype = {
	items	: {},
	
	get		: function( key, config ){
		var item = this.items[key], fn = function(){}, scope;
		try {
			var load = config.listeners.load;
			fn = load.fn;
			scope = load.scope;
		} catch (e) {}
		
		if ( item ) {
			if ( item.loaded ){
				//自动触发load事件
				fn.call( scope, item );
			}
			else{
				item.on( "load", fn, scope );
			}
			
			return item;
		}
		else {
			var imgObj = this.create(config);
			this.items[key] = imgObj;
			return imgObj;
		}
	},
	
	set		: function( key, ui){
		this.items[ key ] = ui;
		return this;
	},
	
	create	: function( config ){
		return new UnitImg( config );
	} 
	
};


ImgMgr = new ImgMgr();
