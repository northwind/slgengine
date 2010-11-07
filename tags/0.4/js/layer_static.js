/**
 * 静物层 不可移动的单位，同时可位于角色底部播放动画
 */
var StaticLayer = Layer.extend({
	
	init	: function(){
		this.addEvents( "add", "remove" );
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
		return "" + a + b + "" + c;
	},
	
	/**
	 * 	[{ name : "name", x : x, y : y  }, {...}, ... ], fn, scope
	 * TODO 改为只接收config
	*/
	add		: function( name, x, y, fn, scope ){
		if ($.isArray(name)) {
			fn = x;
			scope = y;
			for (var i = 0; i < name.length; i++) {
				var config = name[i];
				this.add(config.name, config.x, config.y);
			}
		}
		else {
			var dx = x * CELL_WIDTH, dy = y * CELL_HEIGHT;
			var a = Animation.get(name, { dx: dx, dy: dy });
			
			this.items.reg(this._gerateKey(name, dx, dy), a);
			this.fireEvent("add", x, y, a, this);
		}
		if ( fn )
			setTimeout( bind( fn, scope||this ), 100 );
	},
	
	remove	: function( name, x, y , fn, scope ){
		var dx = x * CELL_WIDTH, dy = y * CELL_HEIGHT, key = this._gerateKey(name , dx , dy),
			a = this.items.get( key ); 
		
		this.items.unreg( key );
		this.fireEvent("remove", x, y, a, this );
		if ( fn )
			fn.call( scope || this, this );		
	}
				
}); 