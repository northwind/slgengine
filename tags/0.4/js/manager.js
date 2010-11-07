/**
 * 管理类
 * 负责管理子对象
 */
var Manager = Observable.extend({
	len	: 0,
	
	init	: function(){
		this.addEvents( "add","remove" );
		this._super( arguments[0] );
		
		this.items = {};
		
		return this;
	},
	
	//key, value
	reg		: function( key, value ){
		if ( key != undefined && value != undefined  ) {
			if (!this.has(key)) {
				this.len++;
				this.items[key] = value;
				
				this.fireEvent( "add", key, value, this );
			}else	
				this.items[key] = value;
		}
		return this;
	},
	
	unreg	: function( key ){
		if ( this.has(key) != undefined ) {
			this.len--;
			var value = this.items[ key ];
			delete this.items[ key ];	
			
			this.fireEvent( "remove", key, value, this );
		}
		
		return this;
	},
	
	get		: function( key ){
		return this.items[ key ];
	},
	
	has		: function( key ){
		return this.items[ key ] != undefined;
	},
	
	count	: function(){
		return this.len;
	},
	
	each	: function( fn, scope ){
		for( var key in this.items ){
			var item = this.items[ key ];
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
