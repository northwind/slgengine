/**
 * 魔法层
 * items 存放需要播放的动画
 * 支持同时播放多个动画
 */
var MagicLayer = Layer.extend({
	
	init	: function(){
		this._super( arguments[0] );
		this.items = [];
		
		PANEL.on("paint", this.onPaint, this );
		
		return this;
	},
	
	onPaint					: function(){
		if ( this.items.length > 0 ){
			var item = this.items[0];
			item.play();
		}
	},
	
	add		: function( a ){
		//执行结束后自动丢弃
		a.on( "end", function(){
			
			this.items.shift();
			
		}, this, { one : true } );
		
		this.items.push( a );
	},
	
	destroy			: function(){
		PANEL.un("paint", this.onPaint, this )
		this.items.length = 0;
		
		this._super();	 
	}					
}); 