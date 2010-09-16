/**
 * @author Norris
 */
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
		
		this._getImageData( callback );
		
		return this;
	},
	
	/*
	 * 将整张图片切割为很多小图片 并缓存起来
	*/
	_getImageData	: function( callback ){
		var _self = this, 
				loaded = 0,
				unit = this.unit;
		
		//4张图片全部加载完之后
		function done( src ){
			console.debug( _self.unit.name + " : " + src + " done");
			if (loaded++ >= 3) {
				_self.loaded = true;
				callback( _self );
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
							
/*
			_self.right = [PS.getCanImageTurn( _self.left[0] ),  
							PS.getCanImageTurn( _self.left[1] ),
							PS.getCanImageTurn( _self.left[2] ) ];
*/

			_self.fall = [	PS.getCanImage( ctx, 0, CELL_HEIGHT*9, CELL_WIDTH, CELL_HEIGHT ),
							PS.getCanImage( ctx, 0, CELL_HEIGHT *10, CELL_WIDTH, CELL_HEIGHT ) ];			
									
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
							
			_self.hit = [PS.getCanImage( ctx, 0, CELL_HEIGHT*3, CELL_WIDTH, CELL_HEIGHT )];
			
			_self.burst = [PS.getCanImage( ctx, 0, CELL_HEIGHT*4, CELL_WIDTH, CELL_HEIGHT )];
			
			//waitTurn( _self.dleft, _self.dright, callback );
			_self.dright = [PS.getCanImageTurn(  _self.dleft[0] ) ];
			
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
	
	draw	:  function( unit ){
		if ( !this.loaded )
			return false;
		
		var cell = unit.cell;
		var img =this[ unit.direct ][ unit.p ],
			 dx = cell.dx, dy = cell.dy;
		
		ctx.save();
		
		//绘制图像
		//ctx.putImageData( img, dx,dy, 0, 0, CELL_WIDTH, CELL_HEIGHT );
		try {
			ctx.drawImage( img, dx,dy );
		} catch (e) {}
		
		//绘制血条等主要信息
		if ( unit.hpLine || PANEL.unitsLayer.hpLineForce ) {
		
			var y = dy - 9;
			y = y < 0 ? 1 : y;
			//血条黑色背景
			ctx.fillRect(dx, y, CELL_WIDTH, HPHEIGHT);
			//血条
			var colors = HPCLR[Math.min(4, parseInt(unit.hpPercent / 20))];
			var lingrad = ctx.createLinearGradient(dx, y + 1, dx, y + HPHEIGHT - 1);
			lingrad.addColorStop(0, colors[0]);
			lingrad.addColorStop(0.5, colors[1]);
			lingrad.addColorStop(1, colors[0]);
			
			ctx.fillStyle = lingrad;
			ctx.fillRect(dx, y + 1, CELL_WIDTH * unit.hpPercent / 100, HPHEIGHT - 2);
		}
		//绘制血条等主要信息
		if ( unit.major ){	
			//主要信息
			//边框 
			//TODO 根据队伍区分边框颜色
			var off = 5, h = 30;
			if ( dy - 9 < 0 )
				y += h + CELL_HEIGHT + 5;			
			ctx.lineJoin = "round";
			ctx.miterLimit = 15;
			ctx.lineWidth = 2;
			ctx.strokeStyle = MAJOR[ 0 ];
			ctx.strokeRect(  dx - off,  y - 30 - 3, CELL_WIDTH + off * 2 ,  h  );
			ctx.fillStyle = MAJOR[1];
			ctx.fillRect(  dx - off,  y - 30 - off + 2, CELL_WIDTH + off * 2 ,  h - 2  );
			
			//名称
			ctx.lineWidth = 1;
			ctx.font = "10px 宋体";
			ctx.strokeStyle = "#e5e6e9";
			ctx.strokeText( unit.name,  dx,  y - 20 );
			
			//级别
			ctx.strokeText( "级别　" + unit.level,  dx,  y - 8 );   			
		}
		
		ctx.restore();
	},
	
	attack	: function( cell, fn, scope ){
		//判断方向
		
		this.fn = fn;
		this.scope = scope;
		
		return this;
	}
	
}); 