/**
 * 魔法层
 */
var MagicLayer = Layer.extend({
	
	init	: function(){
		this._super( arguments[0] );
		this.items = [];
		//PANEL.on("update", this.onUpdate, this );
		PANEL.on("paint", this.onPaint, this );
		
		return this;
	},
	
	onPaint					: function(){
		if ( this.items.length > 0 ){
			var item = this.items[0];
			item.play();
		}
	},
	
	onUpdate				: function(){
	},
	
	add		: function( a ){
		//执行结束后自动丢弃
		a.on( "end", function(){
			
			this.items.shift();
			
		}, this, { one : true } );
		
		this.items.push( a );
	}				
}); 