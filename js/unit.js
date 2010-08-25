/**
 * @author Norris
 */

var Unit = Observable.extend({
	name	: "footman",
	moveable:false,    		//是否可以移动
	type	:-1,			//类型
	tipable :false,			//是否有提示框
	active  : true,			//是否有效
	overlay	: false,			//是否可以叠加
	gx		: -1,			//所处行
	gy		: -1,			//所处列
	step		: 5,          //行动力
	range	: 1, 			//攻击长度
	rangeType : 1,      //攻击类型
	
	stampStatus	: 0,
	stampStep		: 0,
	moving : false,
	
	p			: 1,
	team	: 1,		//所处队伍
	cell		: null,   //当前所在的位置
	oriCell : null,   //移动前所在的位置
	
	ui		: null,
	
	w		: CELL_WIDTH,
	h		: CELL_HEIGHT,
	
	init	: function( config ){
		this.moves	= {};
		this.attacks= {};
		this.pos = [0,  CELL_HEIGHT ];
		this.way = [];
		
		this._super( config );
		
		this.cell = this.oriCell = PANEL.getCell( this.gx, this.gy );
		
		return this;
	},
	
	//绘制图像
	//继承者需要覆盖次方法
	//TODO 放到params中，做为可配全局变量
	draw	: function( timestamp ){
		this.changeStatus( timestamp );
		
		var ctx = this.ctx;
		var y = this.pos[ this.p ],
			 dx = this.cell.dx, dy = this.cell.dy;
		//TODO 图像反转
		ctx.save();
		if (this.img) {
			ctx.drawImage( this.img, 0, y, CELL_WIDTH, CELL_HEIGHT ,
										dx, dy,  CELL_WIDTH, CELL_HEIGHT);
		}else if ( this.urlImg ){
				var img = new Image();
				var _self = this;
				img.onload = function(){
					_self.img = img;
					ctx.drawImage( this, 0, y,  CELL_WIDTH, CELL_HEIGHT,
												dx, dy,  CELL_WIDTH, CELL_HEIGHT );
				};
				img.src = this.urlImg;
		}	
		ctx.restore();
		
		//移动过后回调
		if ( this.moving && this.way == 0){
			this.moving = false;
			
			if (this.fn) {
				this.fn.call( this.scope || this, this );
				delete this.fn;
				delete this.scope;
			}
		} 
		
		return;	
	},
	
	changeStatus	: function( timestamp ){
		var diff = timestamp - this.stampStep;
		if ( this.way.length > 0 && diff > STEP) {
			this.stampStep = timestamp;
			this.stampStatus = timestamp; 	//角色发生转向后不再需要更新状态
			
			var cell = this.way.pop(),
				  direct = this.cell.direct( cell );
			switch( direct ) {
				case 3: //下
					this.pos = [ CELL_HEIGHT * 0, CELL_HEIGHT * 1 ];
					break;	
				case -3://上
					this.pos = [ CELL_HEIGHT * 2, CELL_HEIGHT * 3 ];
					break;
				case -1://左
					this.pos = [ CELL_HEIGHT * 4, CELL_HEIGHT * 5 ];
					break;
				case 1://右
					this.pos = [ CELL_HEIGHT * 4, CELL_HEIGHT * 5 ];
					break;
			}

			this.p = 0;
			this.cell = cell;
		}
		
		if( timestamp - this.stampStatus > SPEED ){
			this.stampStatus = timestamp;
			this.p = this.p == 1 ? 0 : 1;
		}
		
	},
	
	canMove	: function( cell ){
		return this.moves && this.moves[ cell.index ];
	},
	
	canAttack	: function( cell ){
		return this.attacks && this.attacks[ cell.index ];
	},
	
	moveTo		: function( cell, fn, scope ){
		if (!this.moving) {
			//寻路
			var way = [];
			while (cell.parent && cell != this.cell) {
				way.push(cell);
				cell = cell.parent;
			}
			this.way = way;
			this.fn = fn;
			this.scope = scope;
			this.moving = true;
		//way.push( this.cell );
		//way.reverse();
		
		}
		return this;
	},
	
	attack			: function( cell ){
		
	}	
}); 