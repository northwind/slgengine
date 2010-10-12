/**
 * @author Norris
 * 动画配置
 * direct : 执行动画后角色面对方向
 * params : 回调函数中接受的参数
 * inter  : 每帧相隔时间
 */
var UnitUI = Observable.extend({
	unit	: null, 	//unit主体
	loaded	: false,
	foot	: 1,
	stamp	: 0, //时间戳
	tipstamp : 0,
	img		: null,
	direct  : "down",
	oriDirect : "down",
	
	init	: function( config ){
		this._super( config );
		
		this.imgStack = [];
		this.tipStack = [];
		
		this.addEvents( "load" );
		
		//获取相同角色的img集合
		var unit = this.unit;
		this.imgs = ImgMgr.get( unit.symbol, {
			unit	: unit,
			listeners : {
				load	: {
					fn	: function(){
						this.loaded = true;
						this.fireEvent( "load", unit );
					},
					scope : this
				}
			}
		});
		
		return this;
	},
	
	_changeFoot	: function(){
		this.foot = this.foot == 2 ? 1 : 2;
		return this.foot;
	},
	
	draw	:  function( timestamp ){
		var diff = timestamp - this.stamp;
		var unit = this.unit, cell = unit.cell;
		//var dx = cell.dx, dy = cell.dy, img;
		 
		//有待执行的动画
		if( this.imgStack.length > 0 ){
			var a = this.imgStack[0];
			
			if (diff > a.inter) {
				this.stamp = timestamp;
				
				//如果已经没有图像可画
				if (a.items.length == 0) {
					//更改角色所处方向
					if ( a.direct )
						this.direct = a.direct;
						
					if (a.fn) 
						a.fn.apply(a.scope || this, a.params || [] );
					
					//从队列中抛弃当前动画
					this.imgStack.shift();
				}
				else {
					var item = a.items.shift();
					
					if ( !item ){
						//空图像
						this.img = null;
					}else  if ( item.constructor == Object ) {
						//修正坐标信息
						this.dx = item.dx;
						this.dy = item.dy;
						this.img = item.img;
					}
					else {
						//只传了图像
						this.dx = cell.dx;
						this.dy = cell.dy;
						this.img = item;
					}
				}
			}
		}else{
			this.dx = cell.dx;
			this.dy = cell.dy;
			
			//长时间执行的状态
			//切换步伐
			if( diff > SPEED ){
				this.stamp = timestamp;
				this._changeFoot();
			}
						
			if (!unit.moving && unit.debility) {
				//虚弱时
				this.img = this.imgs.fall[ this.foot - 1 ];
			} else{
				this.img = this.imgs[ this.direct ][ this.foot ];
			} 
			//this.img = this.img || this.imgs[ unit.direct ][ this.foot ];
		}
			
		//绘制图像
		if ( this.img )
			try {
				ctx.drawImage( this.img, this.dx, this.dy );
			} catch (e) {}
	},
	
	drawTip	:  function( timestamp ){
		//有待执行的动画
		if( this.tipStack.length > 0 ){
			var diff = timestamp - this.tipstamp,
				  unit =this.unit, cell = unit.cell,
				  a = this.tipStack[0];
			
			if (diff > a.inter) {
				this.tipstamp = timestamp;
				
				//绘完所有帧
				if ( a.frame == 0 ) {
					if (a.fn) 
						a.fn.apply(a.scope || this, a.params || [] );
					
					//从队列中抛弃当前动画
					this.tipStack.shift();
				}
				else {
					a.frame--;
					//更改位置
					a.from[ 0 ] += a.increment[ 0 ];
					a.from[ 1 ] += a.increment[ 1 ];
				}
			}
			
			ctx.save();
			if ( a.font )
				ctx.font =  a.font;
			if ( a.color )	
				ctx.fillStyle = a.color;
			if ( a.text )
				ctx.fillText( a.text, a.from[ 0 ], a.from[ 1 ] );
	
			ctx.restore();			
		}
		
		/*
		//当角色位于两边时调证坐标系
		if ( dx == 0 ){
			ctx.translate( 10, 0 )
		}else if ( cell.x == CELL_XNUM-1 ){
			ctx.translate( -10, 0 )
		}
			
		//绘制血条
		if ( unit.hpLine || PANEL.unitsLayer.hpLineForce ) {
		
			var y = dy - 9;
			y = y < 0 ? 1 : y;
			//血条黑色背景
			ctx.fillStyle = "rgb(0,0,0)";
			ctx.fillRect(dx, y, CELL_WIDTH, HPHEIGHT);
			//血条
			var colors = HPCLR[Math.min(4, parseInt(unit.hpPercent / 20) )];
			var lingrad = ctx.createLinearGradient(dx, y + 1, dx, y + HPHEIGHT - 1);
			lingrad.addColorStop(0, colors[0]);
			lingrad.addColorStop(0.5, colors[1]);
			lingrad.addColorStop(1, colors[0]);
			
			ctx.fillStyle = lingrad;
			ctx.fillRect(dx, y + 1, CELL_WIDTH * unit.hpPercent / 100, HPHEIGHT - 2);
		}
		//绘制主要信息
		if ( unit.major ){	
			//主要信息
			//边框 
			var off = 5, h = 30;
			if ( dy - 9 < 0 )
				y += h + CELL_HEIGHT + 5;			
			ctx.lineJoin = "round";
			ctx.miterLimit = 15;
			ctx.lineWidth = 2;
			//不同队伍显示不同颜色的边框
			var bcolor = 0;
			if ( unit.isFriend( FACTION, TEAM ) )
				bcolor = 1;
			else if ( unit.isEnemy( FACTION, TEAM ) )
				bcolor = 2;	
			ctx.strokeStyle = MAJORBORDER[ bcolor ];
			
			ctx.strokeRect(  dx - off,  y - 30 - 3, CELL_WIDTH + off * 2 ,  h  );
			ctx.fillStyle = MAJORBG;
			ctx.fillRect(  dx - off,  y - 30 - off + 2, CELL_WIDTH + off * 2 ,  h - 2  );
			
			//名称
			ctx.lineWidth = 1;
			ctx.font = "10px 宋体";
			ctx.strokeStyle = "#e5e6e9";
			ctx.strokeText( unit.name,  dx,  y - 20 );
			
			//级别
			ctx.strokeText( "级别　" + unit.level,  dx,  y - 8 );   			
		}
		*/
	},	
	
	moveTo	: function( way ){
		if (way.length == 0) {
			//原地
			this.unit.fireEvent( "move", this.unit );
		}
		else {
			this.oriDirect = this.direct;
			
			var i = 0, from = this.unit.cell, steps = [];
			way.reverse();
			//循环添加
			while( i < way.length ){
				var to = way[ i++ ];
				var direct = from.directT( to );
				
				var arr = this._fillMoveSteps( from, direct, 3 );	
				
				var obj = {
					inter	: SPEED / 6,
					//inter	: SPEED * 2,
					items	: arr,
					fn 		: function( cell ){
						this.fireEvent( "walk", this, this.cell, cell );
						this.cell = cell;
						log( "this.cell = " + this.cell.x + " cell.x = " + cell.x );
					}, 
					params	: [ to ],
					direct  : direct,
					scope	: this.unit
				};
				
				steps.push( obj );
				from = to;
			}
			
			this.imgStack = this.imgStack.concat( steps );
		}
	},
	
	//从一个单元格移动到另一个单元格时 需要移动的步数
	_fillMoveSteps	: function( from, direct, count ){
		var actions = this.imgs[ direct];
		var dx = from.dx, dy = from.dy, ret = [];
		
		for (var i=1; i<= count; i++) {
			//动态生成移动位置
			switch( direct ) {
				case "down": //下
					dx1 = dx; dy1 = dy + i * CELL_HEIGHT/count;
					break;
				case "up"://上
					dx1 = dx; dy1 = dy - i * CELL_HEIGHT/count;
					break;
				case "left"://左
					dx1 = dx - i * CELL_WIDTH /count ; dy1 = dy;
					break;
				case "right"://右
					dx1 = dx + i * CELL_WIDTH /count ; dy1 = dy;
					break;
			}
					
			ret.push( {
				img	: actions[ this._changeFoot() ],
				dx  : dx1, dy : dy1 
			} );
		}
		
		return ret;			
	},
	
	homing	: function(){
		this.direct = this.oriDirect;
	},
	
	attack	: function( cell, bursting, hit, fn , scope ){
		//判断方向
		var direct = this.unit.cell.directT( cell );	
		var actions = this.imgs["a" + direct], first  = actions[ 0 ];
		//如果致命一击 则高亮第一个动作
		if ( bursting ){
			first = this.imgs.highlight( "a" + direct, actions[ 0 ], HighLightDeep );
		}
		
		var obj = {
			inter	: ASPEED,
			//延长攻击第一帧显示时间
			items	: [ first, first, first, first, actions[1], actions[2], actions[3] ],
			fn 		: fn, 
			scope	: scope,
			direct	: direct
		};
		
		this.imgStack.push( obj );
	},

	dead	: function( fn , scope ){
		var fall = this.imgs.fall[0];
					
		var obj = {
			inter	: SPEED,
			//延长攻击第一帧显示时间
			items	: [ fall, null, fall, null, fall, null ],
			fn 		: fn, 
			scope	: scope
		};
		
		this.imgStack.push( obj );
	},
			
	invincible	: function( fn , scope ){
		
		this.tipStack.push( this._defaultTip( fn, scope, "无效" ) );
	},
	
	_defaultTip	: function( fn, scope, text, color, font ){
		var cell = this.unit.cell, dx = cell.dx, dy = cell.dy;
		var obj = {
			inter	: TIPSPEED,
			color	: color || "rgba(255,255,0,1)",
			font	: font || "15px",
			text	: text,
			from: [ dx + CELL_WIDTH / 3, dy + CELL_HEIGHT / 2 ],
			increment    : [ 0, -1 ],
			frame	: 15,
			fn 		: fn, 
			params: [ this.unit ],
			scope	: scope
		};
		return obj;		
	},			
	
	miss	: function( fn , scope ){
		
		this.tipStack.push( this._defaultTip( fn , scope, "我闪", "rgba(255,255,255,1)" ) );
	},	
	
	attacked	: function( v, fn , scope ){
		
		this.tipStack.push( this._defaultTip( fn , scope, "-"+v,  "rgb(255,0,0)" ) );
	}		
}); 