/**
 * @author Norris
 */
var Manager = Observable.extend({
	len	: 0,
	
	init	: function(){
		this.hash = {};
		
		return this;
	},
	
	//key, value
	reg		: function( key, value ){
		if ( key != undefined && value != undefined  ) {
			if ( !this.has( key ) )
				this.len++;
				
			this.hash[key] = value;
		}
		return this;
	},
	
	unreg	: function( key ){
		if( this.has( key ) != undefined )
			this.len--;
		
		delete this.hash[ key ];	
		
		return this;
	},
	
	get		: function( key ){
		return this.hash[ key ];
	},
	
	has		: function( key ){
		return this.hash[ key ] != undefined;
	},
	
	len		: function(){
		return this.len;
	},
	
	each	: function( fn, scope ){
		for( var key in this.hash ){
			var item = this.hash[ key ];
			fn.call( scope || item, key, item );
		}
	},
	
	destroy	: function(){
		for (var i=0; i<this.items.length; i++) {
			if ( this.items[i].destroy )
				this.items[i].destroy();
		};		
	}	
});
