/**
 * @author Norris
 */
//载入image
function	_loadImg( src, fn ){
	var img = new Image();
	img.onload = fn;
	img.src = src;
}

var UnitUI = Observable.extend({
	unit	: null, 	//unit主体
	imgMove	: "",		//移动
	imgAtk	: "",		//攻击
	imgSpc	: "",		//特殊
	imgFace	: "",		//头像
	
	init	: function( config, callback ){
		//复制除function以外的属性
		for( var key in config)
			if ( !$.isFunction( config[key] ) )
				this[ key ] = config[ key ];
		
		this._super();
		
		this._getImageData();
		
		return this;
	},
	
	_getImageData	: function( callback ){
		var _self = this, 
				loaded = 0,
				ctx = this.ctx;
		
		//4张图片全部加载完之后
		function done(){
			if (loaded++ >= 3) {
				_self.loaded = true;
				callback();
			}
		}
		
		//移动		
		var fn	= function(){
			ctx.drawImage( this, 0, 0  );
			var img = ctx.getImageData( 0,0,  this.width, this.height);
			
			//生成上下左右ImageData 
			//每个方位对应一个数组　第一位为静态站立时的图像，后两位为行动时的动画
			_self.down = [
							PS.createImageData( ctx, img, CELL_HEIGHT*6, CELL_WIDTH, CELL_HEIGHT ),  
							PS.createImageData( ctx, img, CELL_HEIGHT * 0, CELL_WIDTH, CELL_HEIGHT ),
							PS.createImageData( ctx, img, CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT ) ];
							
			_self.up = [ PS.createImageData( ctx, img, CELL_HEIGHT*7, CELL_WIDTH, CELL_HEIGHT ), 
							PS.createImageData( ctx, img, CELL_HEIGHT*2, CELL_WIDTH, CELL_HEIGHT ),
							PS.createImageData( ctx, img, CELL_HEIGHT *3, CELL_WIDTH, CELL_HEIGHT ) ];
							
			_self.left = [PS.createImageData( ctx, img, CELL_HEIGHT*8, CELL_WIDTH, CELL_HEIGHT ),  
							PS.createImageData( ctx, img, CELL_HEIGHT*4, CELL_WIDTH, CELL_HEIGHT ),
							PS.createImageData( ctx, img, CELL_HEIGHT *5, CELL_WIDTH, CELL_HEIGHT ) ];
							
			_self.right = [PS.createImageDataTurn( ctx, img, CELL_HEIGHT*8, CELL_WIDTH, CELL_HEIGHT ),  
							PS.createImageDataTurn( ctx, img, CELL_HEIGHT*4, CELL_WIDTH, CELL_HEIGHT ),
							PS.createImageDataTurn( ctx, img, CELL_HEIGHT *5, CELL_WIDTH, CELL_HEIGHT ) ];

			_self.fall = [	PS.createImageData( ctx, img, CELL_HEIGHT*9, CELL_WIDTH, CELL_HEIGHT ),
							PS.createImageData( ctx, img, CELL_HEIGHT *10, CELL_WIDTH, CELL_HEIGHT ) ];			
																				
			done();
		}
		_loadImg( this.imgMove, fn );	
		
		//攻击
		var fn2	= function(){
			ctx.drawImage( this, 0, 0  );
			var img = ctx.getImageData( 0,0,  this.width, this.height);
			
			//生成上下左右ImageData 
			//每个方位对应一个数组　第一位为静态站立时的图像，后两位为行动时的动画
			_self.down = [
							PS.createImageData( ctx, img, CELL_HEIGHT*6, CELL_WIDTH, CELL_HEIGHT ),  
							PS.createImageData( ctx, img, CELL_HEIGHT * 0, CELL_WIDTH, CELL_HEIGHT ),
							PS.createImageData( ctx, img, CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT ) ];
							
			_self.up = [ PS.createImageData( ctx, img, CELL_HEIGHT*7, CELL_WIDTH, CELL_HEIGHT ), 
							PS.createImageData( ctx, img, CELL_HEIGHT*2, CELL_WIDTH, CELL_HEIGHT ),
							PS.createImageData( ctx, img, CELL_HEIGHT *3, CELL_WIDTH, CELL_HEIGHT ) ];
							
			_self.left = [PS.createImageData( ctx, img, CELL_HEIGHT*8, CELL_WIDTH, CELL_HEIGHT ),  
							PS.createImageData( ctx, img, CELL_HEIGHT*4, CELL_WIDTH, CELL_HEIGHT ),
							PS.createImageData( ctx, img, CELL_HEIGHT *5, CELL_WIDTH, CELL_HEIGHT ) ];
							
			_self.right = [PS.createImageDataTurn( ctx, img, CELL_HEIGHT*8, CELL_WIDTH, CELL_HEIGHT ),  
							PS.createImageDataTurn( ctx, img, CELL_HEIGHT*4, CELL_WIDTH, CELL_HEIGHT ),
							PS.createImageDataTurn( ctx, img, CELL_HEIGHT *5, CELL_WIDTH, CELL_HEIGHT ) ];

			_self.fall = [	PS.createImageData( ctx, img, CELL_HEIGHT*9, CELL_WIDTH, CELL_HEIGHT ),
							PS.createImageData( ctx, img, CELL_HEIGHT *10, CELL_WIDTH, CELL_HEIGHT ) ];			
																				
			done();
		}		
		_loadImg( this.imgMove, fn2 );	
	}
	
}); 