/**
 * 静物层 不可移动的单位，同时可位于角色底部播放动画
 */
var StaticLayer = Layer.extend({
	
	init	: function(){
		this._super( arguments[0] );
		
		this.items = new Manager();
		
		PANEL.on("paint", this.onPaint, this );
		
		return this;
	},
	
	onPaint					: function(){
		this.items.each( function( i, n ){
			n.play();		
		} );
	},
	
	_gerateKey	: function( a, b, c){
		return a + b + c;
	},
	
	add		: function( name, dx, dy ){
		var a = Animation.get( name, { dx : dx, dy : dy } );
		
		this.items.reg( this._gerateKey(name + dy + dy) , a );
	},
	
	remove	: function( name, dx, dy ){
		this.items.unreg( this._gerateKey(name + dy + dy) );
	}
				
}); 