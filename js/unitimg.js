/**
 * @author Norris
 */
var UnitImg = Observable.extend({
	imgMove	: "",		//移动
	imgAtk	: "",		//攻击
	imgSpc	: "",		//特殊
	imgFace	: "",		//头像
	loaded  : false,
	
	init	: function( config ){
		this.grays = {};
		this.highlights = {};
		
		this._super( config );
		
		this.addEvents( "load" );
		
		this._getImageData();
		
		return this;
	},
	
	/*
	 * 将整张图片切割为很多小图片 并缓存起来
	*/
	_getImageData	: function(){
		var _self = this, 
				loaded = 0,
				unit = this.unit;
		
		//4张图片全部加载完之后
		function done( src ){
			console.debug( _self.unit.name + " : " + src + " done");
			if (loaded++ >= 3) {
				_self.loaded = true;
				_self.fireEvent( "load" );
			}
		}
		
		//移动		
		var fn	= function(){
			
			ctx.clearRect( 0,0, this.width, this.height );
			ctx.drawImage( this, 0, 0  );
			
			//生成上下左右ImageData 
			//每个方位对应一个数组　第一位为静态站立时的图像，后两位为行动时的动画
			_self.down = [
							PS.getCanImage( ctx, 0, CELL_HEIGHT*6, CELL_WIDTH, CELL_HEIGHT ),
							PS.getCanImage( ctx, 0, CELL_HEIGHT*0, CELL_WIDTH, CELL_HEIGHT ),
							PS.getCanImage( ctx, 0, CELL_HEIGHT*1, CELL_WIDTH, CELL_HEIGHT ) ];

			_self.up = [ PS.getCanImage( ctx, 0, CELL_HEIGHT*7, CELL_WIDTH, CELL_HEIGHT ), 
							PS.getCanImage( ctx, 0, CELL_HEIGHT*2, CELL_WIDTH, CELL_HEIGHT ),
							PS.getCanImage( ctx, 0, CELL_HEIGHT *3, CELL_WIDTH, CELL_HEIGHT ) ];
							
			_self.left = [PS.getCanImage( ctx, 0, CELL_HEIGHT*8, CELL_WIDTH, CELL_HEIGHT ),  
							PS.getCanImage( ctx, 0, CELL_HEIGHT*4, CELL_WIDTH, CELL_HEIGHT ),
							PS.getCanImage( ctx, 0, CELL_HEIGHT *5, CELL_WIDTH, CELL_HEIGHT ) ];
							
			_self.fall = [	PS.getCanImage( ctx, 0, CELL_HEIGHT*9, CELL_WIDTH, CELL_HEIGHT ),
							PS.getCanImage( ctx, 0, CELL_HEIGHT *10, CELL_WIDTH, CELL_HEIGHT ) ];			

			//wait for left image
			var timer = setInterval( function(){
				var img = _self.left[ 0 ];
				if ( img && img.width ){
					clearInterval( timer );
					_self.right = [ PS.getCanImageTurn( _self.left[0] ),  
							PS.getCanImageTurn( _self.left[1] ),
							PS.getCanImageTurn( _self.left[2] ) ];
				}
			} ,10);
/*
			_self.right = [PS.getCanImageTurn( _self.left[0] ),  
							PS.getCanImageTurn( _self.left[1] ),
							PS.getCanImageTurn( _self.left[2] ) ];
*/
												
			done( unit.imgMove );
		}
		_loadImg( unit.imgMove, fn );	
		
		//攻击
		var fn2	= function(){
			
			ctx.clearRect( 0,0, this.width, this.height );
			ctx.drawImage( this, 0, 0  );
			
			//生成上下左右ImageData 
			//每个方位对应一个数组　第一位为静态站立时的图像，后两位为行动时的动画
			_self.adown = [
							PS.getCanImage( ctx, 0, CELL_HEIGHT * 0, CELL_WIDTH, CELL_HEIGHT ),
							PS.getCanImage( ctx, 0, CELL_HEIGHT      , CELL_WIDTH, CELL_HEIGHT ) ,
							PS.getCanImage( ctx, 0, CELL_HEIGHT * 2, CELL_WIDTH, CELL_HEIGHT ) ,
							PS.getCanImage( ctx, 0, CELL_HEIGHT * 3, CELL_WIDTH, CELL_HEIGHT ) ];
							
			_self.aup =[PS.getCanImage( ctx, 0, CELL_HEIGHT * 4, CELL_WIDTH, CELL_HEIGHT ),
							PS.getCanImage( ctx, 0, CELL_HEIGHT   *   5   , CELL_WIDTH, CELL_HEIGHT ) ,
							PS.getCanImage( ctx, 0, CELL_HEIGHT     * 6, CELL_WIDTH, CELL_HEIGHT ) ,
							PS.getCanImage( ctx, 0, CELL_HEIGHT     * 7, CELL_WIDTH, CELL_HEIGHT ) ];
							
			_self.aleft =[PS.getCanImage( ctx, 0, CELL_HEIGHT * 8, CELL_WIDTH, CELL_HEIGHT ),
							PS.getCanImage( ctx, 0, CELL_HEIGHT    *  9  , CELL_WIDTH, CELL_HEIGHT ) ,
							PS.getCanImage( ctx, 0, CELL_HEIGHT * 10, CELL_WIDTH, CELL_HEIGHT ) ,
							PS.getCanImage( ctx, 0, CELL_HEIGHT * 11, CELL_WIDTH, CELL_HEIGHT ) ];

			//wait for left image
			var timer = setInterval( function(){
				var img = _self.aleft[ 0 ];
				if ( img && img.width ){
					clearInterval( timer );
					_self.aright = [ PS.getCanImageTurn( _self.aleft[0] ),
							PS.getCanImageTurn( _self.aleft[1] ) ,
							PS.getCanImageTurn( _self.aleft[2] ) ,
							PS.getCanImageTurn( _self.aleft[3] ) ];
				}
			} ,10);							
/*
			_self.aright =[PS.getCanImageTurn( _self.aleft[0] ),
							PS.getCanImageTurn( _self.aleft[1] ) ,
							PS.getCanImageTurn( _self.aleft[2] ) ,
							PS.getCanImageTurn( _self.aleft[3] ) ];	
*/
			
			done( unit.imgAtk );
		}
		_loadImg( unit.imgAtk, fn2 );	
		
		//防御 被击中  致命一击
		var fn3	= function(){
			ctx.clearRect( 0,0, this.width, this.height );
			ctx.drawImage( this, 0, 0  );
			
			//生成上下左右ImageData 
			_self.ddown = [	PS.getCanImage( ctx, 0, CELL_HEIGHT * 0, CELL_WIDTH, CELL_HEIGHT ) ];
							
			_self.dup = [ PS.getCanImage( ctx, 0, CELL_HEIGHT*1, CELL_WIDTH, CELL_HEIGHT ) ];
							
			_self.dleft = [PS.getCanImage( ctx, 0, CELL_HEIGHT*2, CELL_WIDTH, CELL_HEIGHT )];
							
			_self.attacked = [PS.getCanImage( ctx, 0, CELL_HEIGHT*3, CELL_WIDTH, CELL_HEIGHT )];
			
			_self.burst = [PS.getCanImage( ctx, 0, CELL_HEIGHT*4, CELL_WIDTH, CELL_HEIGHT )];
			
			//wait for dleft image
			var timer = setInterval( function(){
				var img = _self.dleft[ 0 ];
				if ( img && img.width ){
					clearInterval( timer );
					_self.dright = [PS.getCanImageTurn(  img ) ];
				}
			} ,10);
			//_self.dright = [PS.getCanImageTurn(  _self.dleft[0] ) ];
			
			done( unit.imgSpc );
		}
		_loadImg( unit.imgSpc, fn3 );		
		
		//头像	
		var fn4	= function(){
			
			_self.face = [	this ];
																				
			done( unit.imgFace );
		}
		_loadImg( unit.imgFace, fn4 );				
	},
	
	gray	: function( key, img ){
		//缓存灰化图像
		if ( !this.grays[ key ] ){
			this.grays[ key ] = PS.grayImg( img );
		}
		
		return this.grays[ key ];	
	},
	
	//高亮攻击图像
	highlight	: function( key, img, deep ){
		//缓存高亮图像
		if ( !this.highlights[ key ] ){
			this.highlights[ key ] = PS.highlightImg( img, deep );
		}
		
		return this.highlights[ key ];	
	}	
	
}); 