/**
 * 角色形象展示
 */
var Figure  = Observable.extend({
	imgMove	: "",		//移动
	imgAtk	: "",		//攻击
	imgSpc	: "",		//特殊
	imgFace	: "",		//头像
	events		: "load",
	
	init	: function( config ){
		this.grays = {};
		this.highlights = {};
		
		if( UNDERCOVER ){
			$.extend( config, {
				imgMove	: "images/move/0.png",
				//imgAtk	: "images/atk/0.png",
				imgSpc	: "images/spc/0.png",
				imgFace	: "images/face/0.png"
			} )
		}		
		this._super( config );
		
		this._getImageData();
		
		//用主动循环检测替代被动接收
		//canvas.toDataURL或drawImage是异步的
		var _self = this, attrs = ["down","up","left","right","fall"];
		this.timer = setInterval( function(){
			var done = true;
			for (var i=0; i<attrs.length; i++) {
				var a = _self[attrs[i]];
				if ( a ) {
					for (var j = 0; j < a.length; j++) {
						var img = a[j];
						if ( !(img && img.width != 0) ) {
							done = false;
							return;
						}
					}
				}else
					done = false;
			}
			if ( done ){
				clearInterval( _self.timer );
				_self.fireEvent( "load", _self );
			}
		}, 10 );
		
		return this;
	},
	
	/**
	 * 将整张图片切割为很多小图片 并缓存起来
	*/
	_getImageData	: function(){
		var _self = this, 
				loaded = 0;
		
		//4张图片全部加载完之后
		function done( src ){
			//log( _self.name + " : " + src + " done");
			//if (loaded++ >= 3) {
				//_self.fireEvent( "load", _self );
			//}
		}
		
		//移动		
		var fn	= function(){
			//每个方位对应一个数组　第一位为静态站立时的图像，后两位为行动时的动画
			_self.down = [
							PS.putImgToCanvas( this, 0, CELL_HEIGHT*6, CELL_WIDTH, CELL_HEIGHT ),
							PS.putImgToCanvas( this, 0, CELL_HEIGHT*0, CELL_WIDTH, CELL_HEIGHT ),
							PS.putImgToCanvas( this, 0, CELL_HEIGHT*1, CELL_WIDTH, CELL_HEIGHT ) ];

			_self.up = [ 	PS.putImgToCanvas( this, 0, CELL_HEIGHT*7, CELL_WIDTH, CELL_HEIGHT ), 
							PS.putImgToCanvas( this, 0, CELL_HEIGHT*2, CELL_WIDTH, CELL_HEIGHT ),
							PS.putImgToCanvas( this, 0, CELL_HEIGHT *3, CELL_WIDTH, CELL_HEIGHT ) ];
							
			_self.left = [	PS.putImgToCanvas( this, 0, CELL_HEIGHT*8, CELL_WIDTH, CELL_HEIGHT ),  
							PS.putImgToCanvas( this, 0, CELL_HEIGHT*4, CELL_WIDTH, CELL_HEIGHT ),
							PS.putImgToCanvas( this, 0, CELL_HEIGHT *5, CELL_WIDTH, CELL_HEIGHT ) ];
							
			_self.fall = [	PS.putImgToCanvas( this, 0, CELL_HEIGHT*9, CELL_WIDTH, CELL_HEIGHT ),
							PS.putImgToCanvas( this, 0, CELL_HEIGHT *10, CELL_WIDTH, CELL_HEIGHT ) ];			

			_self.right = [ PS.putImgToCanvasTurn( this,  0, CELL_HEIGHT*8, CELL_WIDTH, CELL_HEIGHT ),  
							PS.putImgToCanvasTurn( this,  0, CELL_HEIGHT*4, CELL_WIDTH, CELL_HEIGHT ),
							PS.putImgToCanvasTurn( this,  0, CELL_HEIGHT*5, CELL_WIDTH, CELL_HEIGHT ) ];
		}
		_loadImg( _self.imgMove, fn );	
		
		//攻击
		var fn2	= function(){
			var w = 64, h = 64, h2 = 48;
			//每个方位对应一个数组　第一位为静态站立时的图像，后两位为行动时的动画
			_self.adown = [
							PS.putImgToCanvas( this, 0, 8 + h * 0, w, h2 ),
							PS.putImgToCanvas( this, 0, 8 + h      , w, h2 ) ,
							PS.putImgToCanvas( this, 0, 8 + h * 2, w, h2 ) ,
							PS.putImgToCanvas( this, 0, 8 + h * 3, w, h2 ) ];
							
			_self.aup =[PS.putImgToCanvas( this, 0, 8 + h * 4, w, h2 ),
							PS.putImgToCanvas( this, 0, 8 + h   *   5   , w, h2 ) ,
							PS.putImgToCanvas( this, 0, 8 + h     * 6, w, h2 ) ,
							PS.putImgToCanvas( this, 0, 8 + h     * 7, w, h2 ) ];
							
			_self.aleft =[PS.putImgToCanvas( this, 0, 8 + h * 8, w, h2 ),
							PS.putImgToCanvas( this, 0, 8 + h    *  9  , w, h2 ) ,
							PS.putImgToCanvas( this, 0, 8 + h * 10, w, h2 ) ,
							PS.putImgToCanvas( this, 0, 8 + h * 11, w, h2 ) ];

			_self.aright =[	PS.putImgToCanvasTurn( this,  0, 8 + h*8,  w, h2 ),
							PS.putImgToCanvasTurn( this,  0, 8 + h*9,  w, h2 ) ,
							PS.putImgToCanvasTurn( this,  0, 8 + h*10, w, h2 ) ,
							PS.putImgToCanvasTurn( this,  0, 8 + h*11, w, h2 ) ];	
			
			//done( _self.imgAtk );
		}
		_loadImg( _self.imgAtk, fn2 );	
		
		//防御 被击中  致命一击
		var fn3	= function(){
			_self.ddown = [	PS.putImgToCanvas( this, 0, CELL_HEIGHT * 0, CELL_WIDTH, CELL_HEIGHT ) ];
							
			_self.dup = [ PS.putImgToCanvas( this, 0, CELL_HEIGHT*1, CELL_WIDTH, CELL_HEIGHT ) ];
							
			_self.dleft = [PS.putImgToCanvas( this, 0, CELL_HEIGHT*2, CELL_WIDTH, CELL_HEIGHT )];
							
			_self.attacked = [PS.putImgToCanvas( this, 0, CELL_HEIGHT*3, CELL_WIDTH, CELL_HEIGHT )];
			
			_self.burst = [PS.putImgToCanvas( this, 0, CELL_HEIGHT*4, CELL_WIDTH, CELL_HEIGHT )];
			
			_self.dright = [PS.putImgToCanvasTurn(  this,  0, CELL_HEIGHT*2, CELL_WIDTH, CELL_HEIGHT ) ];
			
		}
		_loadImg( _self.imgSpc, fn3 );		
		
		//头像	
		var fn4	= function(){
			
			_self.face = [	this ];
																				
			done( _self.imgFace );
		}
		_loadImg( _self.imgFace, fn4 );				
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