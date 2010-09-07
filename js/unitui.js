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
	loaded : false,		//是否加载完所需图像
	
	init	: function( config, callback ){
		this.unit = config;
		
		this._super();
		
		this._getImageData( function(){
			console.debug( "_getImageData donw" );
		} );
		
		return this;
	},
	
	_getImageData	: function( callback ){
		var _self = this, 
				loaded = 0,
				unit = this.unit,
				ctx = unit.ctx;
		
		//4张图片全部加载完之后
		function done(){
			if (loaded++ >= 3) {
				_self.loaded = true;
				callback();
			}
		}
		
		//移动		
		var fn	= function(){
			ctx.clearRect( 0,0, this.width, this.height );
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
		_loadImg( unit.imgMove, fn );	
		
		//攻击
		var fn2	= function(){
			done();
			return ;
			ctx.clearRect( 0,0, this.width, this.height );
			ctx.drawImage( this, 0, 0  );
			var img = ctx.getImageData( 0,0,  this.width, this.height);
			
			//攻击的图像为
			var h = 64;
			//生成上下左右ImageData 
			//每个方位对应一个数组　第一位为静态站立时的图像，后两位为行动时的动画
			_self.adown = [
							PS.createImageData( ctx, img, h * 0, CELL_WIDTH, CELL_HEIGHT ),
							PS.createImageData( ctx, img, h, CELL_WIDTH, CELL_HEIGHT ) ];
							
			_self.aup = [ PS.createImageData( ctx, img, CELL_HEIGHT*7, CELL_WIDTH, CELL_HEIGHT ), 
							PS.createImageData( ctx, img, CELL_HEIGHT*2, CELL_WIDTH, CELL_HEIGHT ),
							PS.createImageData( ctx, img, CELL_HEIGHT *3, CELL_WIDTH, CELL_HEIGHT ) ];
							
			_self.aleft = [PS.createImageData( ctx, img, CELL_HEIGHT*8, CELL_WIDTH, CELL_HEIGHT ),  
							PS.createImageData( ctx, img, CELL_HEIGHT*4, CELL_WIDTH, CELL_HEIGHT ),
							PS.createImageData( ctx, img, CELL_HEIGHT *5, CELL_WIDTH, CELL_HEIGHT ) ];
							
			_self.aright = [PS.createImageDataTurn( ctx, img, CELL_HEIGHT*8, CELL_WIDTH, CELL_HEIGHT ),  
							PS.createImageDataTurn( ctx, img, CELL_HEIGHT*4, CELL_WIDTH, CELL_HEIGHT ),
							PS.createImageDataTurn( ctx, img, CELL_HEIGHT *5, CELL_WIDTH, CELL_HEIGHT ) ];
																				
			done();
		}
		//TODO 处理64宽高图像		
		_loadImg( unit.imgAtk, fn2 );	
		
		//防御 被击中  致命一击
		var fn3	= function(){
			ctx.clearRect( 0,0, this.width, this.height );
			ctx.drawImage( this, 0, 0  );
			var img = ctx.getImageData( 0,0,  this.width, this.height);
			
			//生成上下左右ImageData 
			_self.ddown = [	PS.createImageData( ctx, img, CELL_HEIGHT * 0, CELL_WIDTH, CELL_HEIGHT ) ];
							
			_self.dup = [ PS.createImageData( ctx, img, CELL_HEIGHT*1, CELL_WIDTH, CELL_HEIGHT ) ];
							
			_self.dleft = [PS.createImageData( ctx, img, CELL_HEIGHT*2, CELL_WIDTH, CELL_HEIGHT )];
							
			_self.dright = [PS.createImageDataTurn( ctx, img, CELL_HEIGHT*2, CELL_WIDTH, CELL_HEIGHT ) ];
			
			_self.hit = [PS.createImageData( ctx, img, CELL_HEIGHT*3, CELL_WIDTH, CELL_HEIGHT )];
			
			_self.burst = [PS.createImageData( ctx, img, CELL_HEIGHT*4, CELL_WIDTH, CELL_HEIGHT )];
																				
			done();
		}
		_loadImg( unit.imgSpc, fn3 );		
		
		//头像	
		var fn4	= function(){
			ctx.clearRect( 0,0, this.width, this.height );
			ctx.drawImage( this, 0, 0  );
			var img = ctx.getImageData( 0,0,  this.width, this.height);
			
			_self.face = [	PS.createImageData( ctx, img, 0,  this.width, this.height ) ];
																				
			done();
		}
		_loadImg( unit.imgFace, fn4 );				
	},
	
	draw	:  function( unit ){
		if ( !this.loaded )
			return false;
		
		var ctx = unit.ctx,  cell = unit.cell;
		var img =this[ unit.direct ][ unit.p ],
			 dx = cell.dx, dy = cell.dy;
		
		ctx.save();
		
		//ctx.globalCompositeOperation = "source-over";
		//ctx.globalCompositeOperation = "xor";
		
		//绘制图像
		ctx.putImageData( img, dx,dy, 0, 0, CELL_WIDTH, CELL_HEIGHT );
		
		//绘制血条等主要信息
		if ( unit.major ){
					
			var y = dy - 14;
			y = y < 0 ?  dy + 14 : y;
			ctx.fillRect( dx, y, CELL_WIDTH, 8 );
			
		}
		
		ctx.restore();
	}
	
}); 