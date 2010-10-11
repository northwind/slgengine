/**
 * @author Norris
 */
var UnitUI = Observable.extend({
	unit	: null, 	//unit主体
	loaded	: false,
	p			: 1,
	stamp	: 0, //时间戳
	img		: null,
	
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
					if (a.fn) 
						a.fn.apply(a.scope || this, a.params || [] );
					
					//从队列中抛弃当前动画
					this.imgStack.pop();
				}
				else {
					var item = a.items.pop();
					
					//修正坐标信息
					if (typeof item == "object") {
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
				this.p = this.p == 2 ? 1 : 2;
			}
						
			if (!unit.moving && unit.debility) {
				//虚弱时
				this.img = this.imgs.fall[ this.p - 1 ];
			} else{
				this.img = this.imgs[ unit.direct ][ this.p ];
			} 
			//this.img = this.img || this.imgs[ unit.direct ][ this.p ];
		}
			
		//绘制图像
		if ( this.img )
			try {
				ctx.drawImage( this.img, this.dx, this.dy );
			} catch (e) {}
	},
	
	drawTip	:  function( unit ){
		return ;
		
		var cell = unit.cell;
		var img = unit.pencil,
			 dx = cell.dx, dy = cell.dy;
			
		ctx.save();
		
		//闪避
		if ( unit.missing ){
			ctx.font = "15px";
			ctx.fillStyle = "rgba(255,255,255,1)";
			ctx.fillText( "我闪", dx + CELL_WIDTH / 3, dy + CELL_HEIGHT / 2 - unit.misslast );
		}
		//无效
		if ( unit.invinciblelast > 0 ){
			ctx.font = "15px";
			ctx.fillStyle = "rgba(255,255,0,1)";
			ctx.fillText( "无效", dx + CELL_WIDTH / 3, dy + CELL_HEIGHT / 3 + unit.invinciblelast );			
		}
			
		//扣血
		if ( unit.HPdecrease ){
			ctx.font = "15px";
			ctx.fillStyle = "rgb(255,0,0)";
			ctx.fillText( "-" + unit.HPdecrease, dx + CELL_WIDTH / 3, dy + CELL_HEIGHT / 2 - unit.HPdelast );
		}		
		
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
		
		ctx.restore();
	},	
	
	moveTo	: function( way ){
		if (way.length == 0) {
			//原地
			this.unit.fireEvent( "move", this.unit );
		}
		else {
			var i = 0, from = this.unit.cell, steps = [];
			var p = 1;
			//循环添加
			while( i < way.length ){
				var to = way[ i++ ];
				var direct = from.directT( to );
				
				var actions = this.imgs[ direct];
				var dx = from.dx, dy = from.dy;
				
				//动态生成移动位置
				switch( direct ) {
					case "down": //下
						dx1 = dx; dy1 = dy + CELL_HEIGHT/2;
						dx2 = dx; dy2 = dy + CELL_HEIGHT;
						break;
					case "up"://上
						dx1 = dx; dy1 = dy - CELL_HEIGHT/2;
						dx2 = dx; dy2 = dy - CELL_HEIGHT;
						break;
					case "left"://左
						dx1 = dx - CELL_WIDTH /2 ; dy1 = dy;
						dx2 = dx - CELL_WIDTH    ; dy2 = dy;
						break;
					case "right"://右
						dx1 = dx - CELL_WIDTH /2 ; dy1 = dy;
						dx2 = dx - CELL_WIDTH    ; dy2 = dy;
						break;
				}				
				
				var obj = {
					inter	: SPEED * 5,
					items	: [ {
						img	: actions[ 1 ],
						dx  : dx1, dy : dy1 
					},{
						img	: actions[ 2 ],
						dx  : dx2, dy : dy2
					}],
					fn 		: function( cell ){
						this.fireEvent( "walk", this, this.cell, cell );
						this.cell = cell;
						log( "this.cell = " + this.cell.x + " cell.x = " + cell.x );
					}, 
					params	: [ to ],
					scope	: this.unit
				};
				
				steps.push( obj );
				from = to;
			}
			
			this.imgStack = this.imgStack.concat( steps );
		}
	},
	
	attack	: function( direct, fn , scope ){
		
		var actions = this.imgs["a" + direct];
		var obj = {
			inter	: SPEED,
			//延长攻击第一帧显示时间
			items	: [ actions[0], actions[0], actions[0] ].contact( actions ),
			fn 		: fn, 
			scope	: scope
		};
		
		this.imgStack.push( obj );
		
/*
				var diff = timestamp - this.stampAtk;
				//致命一击时 高亮第一个攻击图像
				if (this.burstlast > 1) {
					if (diff > ASPEED) {
						this.stampAtk = timestamp;
						this.burstlast--;
					}
					this.attackP = 1;
					
					img = this.ui.highlight(this.direct);
				}
				else {
					if (diff > ASPEED) {
						this.stampAtk = timestamp;
						
						img = actions[this.attackP++];
					}
					else {
						img = actions[this.attackP];
					}
				}
*/
		
		
		
		
		return this;
	}	
	
}); 