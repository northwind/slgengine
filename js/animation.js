/**
 * 动画类
 * inter	: 相隔的帧数
 * imgs		: 图片集合
 * index	: 当前图片的指针
 * fn, scode
 */
var Animation = Observable.extend({
	id		: "", 
	imgs	: [], //图片
	img		: null,
	inter	: 0,
	count	: 0,
	index   : 0,
	playing : false,
	dx		: 0,
	dy		: 0,
	//w		: 0,
	//h  		: 0,
	fn		: null,
	scope   : null,
	
	init	: function(){
		this._super( arguments[0] );
		
		this.addEvents( "end" );
		
		//this.on( "end", this.fn, this.scope, { one : true } );
		
		return this;
	},
	
	onPaint	: function(){
		var item = this.imgs[ this.index ];
		
		if ( item.constructor == Object ) {
			//修正坐标信息
			if ( item.dx )  this.dx = item.dx;
			if ( item.dy )  this.dy = item.dy;
			if ( item.w != undefined )  this.w = item.w;
			if ( item.h != undefined )  this.h = item.h;
			this.img = item.img;
		} else{
			this.img = item;
		}		
		//绘制图像
		if ( this.img ) {
			this.w = this.w == undefined ? this.img.width : this.w;
			this.h = this.h == undefined ? this.img.height : this.h;
			try {
				ctx.drawImage( this.img, 0, 0, this.w, this.h, this.dx, this.dy, this.w, this.h );
			} 
			catch (e) {}
		}		
	},
	
	play	: function(){
		if ( this.inter == 1 || ++this.count == this.inter ){
			this.count = 0;
			this.next();
		}	
					
		this.onPaint();
		
		return this;
	},
	
	next	: function(){
		this.index++;
		//到最后一个位置后从新开始
		if (this.index == this.imgs.length) {
			
			this.fireEvent( "end", this );
			
			if ( this.fn )
				this.fn.call( this.scope || this, this );
				
			this.index = 0;
		}
	},
	
	from	: function( i ){
		this.index = i;
		return this;
	},
	
	stop	: function(){
		return this;
	},
	
	//TODO 根据窗口自动调整播放位置
	position	: function( x, y ){
		this.dx = x;
		this.dy = y;
		
		return this;
	},
	
	callback	: function( fn, scope ){
		this.fn = fn;
		this.scope = scope;
		
		return this;
	}		
}); 

Animation.get = function( name, config ){
	config = $.extend( ANIMATIONS[ name ], { id : name }, config );
	
	return new Animation( config );
}
