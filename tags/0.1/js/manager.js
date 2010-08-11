/**
 * @author Norris
 */

var Manager = Class.extend({
	
	init	: function(){
		this.items = [];
		return this;
	},
	
	indexOf	: function( o ){
		return $.inArray( o, this.items );
	},
	
	reg		: function( o ){
		if ( this.indexOf( o ) == -1 )
			this.items.push( o );
		
		return this;
	},
	
	unreg	: function( o ){
		var i = this.indexOf( o );
		if ( i > -1 )
			this.items.splice( i, 1 );
		
		return this;
	},
	
	len		: function(){
		return this.items.length;
	},
	
	destroy	: function(){
		for (var i=0; i<this.items.length; i++) {
			if ( this.items[i].destroy )
				this.items[i].destroy();
		};		
	}	
});
