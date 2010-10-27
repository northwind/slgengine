/**
 * 角色的UI控制，每个动画执行完毕后均支持回调
 * 
 * 动画配置
 * direct : 执行动画后角色面对方向
 * params : 回调函数中接受的参数
 * inter  :  没一副图片相隔的帧数
 * count : 执行过的帧数
 * loop	  : 循环播放
 * index  : 图片索引 
 */
var UnitUI = Observable.extend({
	unit	: null, 	//unit主体
	foot	: 1,
	img		: null,
	direct  : "down",
	oriDirect : "down",
	w	: CELL_WIDTH,
	h  : CELL_HEIGHT,
	step : 0, //步伐计数器
	
	init	: function( config ){
		this._super( config );
		
		this.imgStack = [];
		this.tipStack = [];
		
		//初始化方向
		this.oriDirect = this.direct = this.unit.direct || "down";
		
		//this.addEvents( );
		
		//获取相同角色的img集合
		var unit = this.unit;
		this.imgs = ImgMgr.get( unit.symbol );
		
		return this;
	},
	
	_changeFoot	: function(){
		this.foot = this.foot == 2 ? 1 : 2;
		return this.foot;
	},
	
	draw	:  function( timestamp ){
		var unit = this.unit, cell = unit.cell;
		var w, h;
		 
		//有待执行的动画
		if( this.imgStack.length > 0 ){
			var a = this.imgStack[0];

			if ( a.inter == 1 || a.count++ == a.inter ) {
				a.count = 0;
				//如果已经没有图像可画
				if ( a.index >= a.items.length ) {
					//更改角色所处方向
					if ( a.direct )
						this.direct = a.direct;
						
					if (a.fn) 
						a.fn.apply(a.scope || this, a.params || [] );
					
					if ( !a.loop )
						//从队列中抛弃当前动画
						this.imgStack.shift();
					else
						a.index = 0;	
				}
				else {
					var index = a.index++, item = a.items[ index ];
					
					if ( !item ){
						//空图像
						this.img = null;
					}else  if ( item.constructor == Object ) {
						//修正坐标信息
						if ( item.dx )  this.dx = item.dx;
						if ( item.dy )  this.dy = item.dy;
						if ( item.w != undefined )  this.w = item.w;
						if ( item.h != undefined )  this.h = item.h;
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
			if( this.step++ >= SPEED ){
				this.step = 0;
				this._changeFoot();
			}
			
			if ( !PANEL.isScripting() ) {
				if (unit.standby) {
						//待机
						this.img = this.imgs.gray(this.direct, this.imgs[this.direct][0]);
				} else
				if (!unit.moving && unit.debility) {
					//虚弱时
					this.img = this.imgs.fall[this.foot - 1];
				}
				else {
						this.img = this.imgs[this.direct][this.foot];
					}
			}else{
				//执行脚本时，锁定图像
				if (!unit.moving && unit.debility) {
					//虚弱时
					this.img = this.imgs.fall[ 0 ];
				}
				else {
					this.img = this.imgs[this.direct][ 0 ];
				}				
			}
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
	
	drawBuff	: function(){
		var unit = this.unit, buffs = this.unit.buff, cell = this.unit.cell, w = 12, h = 12, count = 0;
		if ( unit.moving || unit.attacking )
			return;
		
		if ( this.unit.newBuff ){
			delete this.unit.newBuff;
		}
		for( var key in buffs ){
			var buff = buffs[ key ];
			try {
				ctx.drawImage( buff.img, cell.dx + count * w, Math.max( 0, cell.dy - 8 ), w, h );
			} 
			catch (e) {}			
			//右移
			count++;
			//最多画4个
			if ( count >= 4 )
				break;
		}
	},
	
	drawTip	:  function( timestamp ){
		var unit =this.unit, cell = unit.cell,
			dx = cell.dx, dy = cell.dy;
			
		//当角色位于两边时调证坐标系
		ctx.save();
/*
		if ( dx == 0 ){
			//ctx.translate( 0, 0 )
		}else if ( cell.x == CELL_XNUM-1 ){
			//ctx.translate( 0, 0 )
		}
*/
		
		//绘制血条
		if ( unit.hpLine || PANEL.unitsLayer.hpLineForce ) {
			var y = dy - 9;
			y = y < 0 ? 0 : y;
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
		ctx.restore();		
				
		//有待执行的动画
		if( this.tipStack.length > 0 ){
			var a = this.tipStack[0];
			
			//if ( a.count++ >= a.inter ) {
				//a.count = 0;
				
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
			//}
			
			ctx.save();
			if ( a.font )
				ctx.font =  a.font;
			if ( a.color )	
				ctx.fillStyle = a.color;
			if ( a.text )
				ctx.fillText( a.text, a.from[ 0 ], a.from[ 1 ] );
	
			ctx.restore();			
		}
	},	
	
	pushImg : function(){
		for (var i=0; i<arguments.length; i++) {
			var a = arguments[ i ];
			a.index = a.index || 0;
			a.count = a.count || 0;
			
			this.imgStack.push( a );
		}
	},

	pushTip : function(){
		for (var i=0; i<arguments.length; i++) {
			var a = arguments[ i ];
			var cell = this.unit.cell, dx = cell.dx, dy = cell.dy;
			
			a.count = a.count || 0;
			a.inter = a.inter || TIPSPEED;
			a.color	= a.color || "rgba(255,255,0,1)";
			a.font = a.font || "15px";
			a.from = a.from || [ dx + CELL_WIDTH / 3, dy + CELL_HEIGHT / 2 ];
			a.increment = a.increment  || [ 0, -1 ];
			a.frame = a.frame || 15;
					
			this.tipStack.push( a );
		}
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
				
				var arr = this._fillMoveSteps( from, direct, 4 );	
				
				var obj = {
					inter	: 1,
					items	: arr,
					fn 		: function( cell ){
						this.fireEvent( "walk", this, this.cell, cell );
						this.cell = cell;
						//移动到最后一个位置时触发move事件
						if ( cell == way[ way.length-1 ] )
							this.fireEvent( "move", this );
					}, 
					params	: [ to ],
					direct  : direct,
					scope	: this.unit
				}
				
				this.pushImg( obj );
				from = to;
			}
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
	
	//分为两个阶段 1聚起武器 2攻击
	attack	: function( cell, bursting, hit, fn , scope ){
		//判断方向
		var direct = cell ? this.unit.cell.directT( cell ) : this.direct;	
		var actions = this.imgs["a" + direct], first  = actions[ 0 ];
		//如果致命一击 则高亮第一个动作
		if ( bursting ){
			first = this.imgs.highlight( "a" + direct, actions[ 0 ], HighLightDeep );
		}
		
		var obj1 = {
			inter	: ASPEED,
			//延长攻击第一帧显示时间
			items	: [ first, first, actions[1] ],
			fn 		: fn, 
			scope	: scope,
			direct	: direct
		}
		var obj2 = {
			inter	: ASPEED,
			items	: [ actions[2], actions[3],  actions[3] ],
			direct	: direct
		}	
		this.pushImg( obj1 );
		this.pushImg( obj2 );
	},

	dead	: function( fn , scope ){
		var fall = this.imgs.fall[0];
					
		var obj = {
			inter	: 2,
			//延长攻击第一帧显示时间
			items	: [ fall, null, fall, null, fall, null ],
			fn 		: fn, 
			scope	: scope
		}
		
		this.pushImg( obj );
	},
	
	standby	: function( fn , scope ){
		var obj = {
			inter	: 10,
			items	: [ this.imgs.gray( this.direct, this.imgs[ this.direct ][0] ) ],
			fn 		: fn, 
			scope	: scope
		}
		
		this.pushImg( obj );	
	},

	speak	: function( fn , scope ){
		var i=0, items = [], deeps = [ 20,30,40,50,60,70,80,90,100,100,90,80,70,60,50,40,30 ];
		var status = this.unit.debility ? "fall" : this.direct;
		for (var i=0; i<deeps.length; i++) {
			items.push( this.imgs.highlight( status + deeps[i], this.imgs[ status ][0], deeps[i] ) )
		}
		var obj = {
			inter	: 1,
			loop	: true,
			items	: items,
			fn 		: fn, 
			scope	: scope
		}
		
		this.pushImg( obj );	
	},
	stopAnimation	: function(){
		this.imgStack.shift();
	},
	
	fall		: function( fn, scope ){
		var obj = {
			inter	: SPEED,
			items	: [ this.imgs.fall[1], this.imgs.fall[0], this.imgs.fall[1], this.imgs.fall[0],  this.imgs.fall[1], this.imgs.fall[0] ],
			fn 		: fn, 
			scope	: scope
		}
		
		this.pushImg( obj );	
	},
	
	turnLeft	: function( fn, scope ){
		var obj = {
			inter	: SPEED * 2,
			items	: [ this.imgs.left[0] ],
			fn 		: fn, 
			direct	: "left",
			scope	: scope
		};
		
		this.pushImg( obj );				
	},		
	
	turnRight	: function( fn, scope ){
		var obj = {
			inter	: SPEED * 2,
			items	: [ this.imgs.right[0] ],
			fn 		: fn, 
			direct	: "right",
			scope	: scope
		};
		
		this.pushImg( obj );				
	},
	
	turnUp	: function( fn, scope ){
		var obj = {
			inter	: SPEED * 2,
			items	: [ this.imgs.up[0] ],
			fn 		: fn, 
			direct	: "up",
			scope	: scope
		};
		
		this.pushImg( obj );			
	},	
	
	turnDown	: function( fn, scope ){
		var obj = {
			inter	: SPEED * 2,
			items	: [ this.imgs.down[0] ],
			fn 		: fn, 
			direct	: "down",
			scope	: scope
		};
		
		this.pushImg( obj );				
	},		
	_fillDisappear : function( n ){
		var ret = [];
		for (var i=0; i<=n; i++) {
			ret.push( {
				img	: this.imgs.down[0],
				h		: i * this.imgs.down[0].height / n
			}  )
		}
		return ret.reverse();
	},			
	disappear	: function( fn, scope ){
		var obj = {
			inter	: 1,
			items	: this._fillDisappear( 14 ),
			fn 		: fn, 
			scope	: scope
		};
		
		this.pushImg( obj );				
	},
	appear		: function( fn, scope ){
		var obj = {
			inter	: 2,
			items	: [ this.imgs[this.direct][0], this.imgs[this.direct][0] ],
			fn 		: fn, 
			scope	: scope
		};
		
		this.pushImg( obj );		
	},
				
	invincible	: function( fn , scope ){
		this.pushTip( {
			text	: "无效",	fn : fn, scope : scope
		} );	
	},
	
	addTip 	: function( config ){
		this.pushTip( config );
	},	
	
	miss	: function( fn , scope ){
		this.pushTip( {
			text	: "我闪",	fn : fn, scope : scope, color : "rgba(255,255,255,1)"
		} );	
	},	
	
	attacked	: function( v, fn , scope ){
		var obj = {
			inter	: SPEED,
			items	: [ this.imgs.attacked[0] ]
		}
		this.pushImg( obj );		
		
		this.pushTip( {
			text	: "-"+v,	fn : fn, scope : scope, color : "rgb(255,0,0)"
		} );	
	},
	
	upgrade		: function( fn , scope ){
		this.pushTip( {
			text	: "升级啦",	fn : fn, scope : scope, color : "rgb(255,255,255)"
		} );			
	},
	
	//在magic层播放动画
	gainStuff	: function( stuff, fn, scope ){
		var imgs = [], from = this.unit.cell.dy + 16;
		for (var i=0; i< 8; i++) {
			imgs.push({
				dx	: this.unit.cell.dx,
				dy	: from -= 2,
				img : stuff.img
			})
		}
		
		var a = new Animation({
			inter : 1,
			imgs  : imgs,
			fn	: fn,
			scope : scope			
		});
		
		PANEL.playAnimation( a );
		
		return this;
	}	
}); 