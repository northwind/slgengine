/**
 * @author Norris
 */

	//载入image
function	_loadImg( src, fn ){
	var img = new Image();
	img.onload = fn;
	img.src = src;
}

var Unit = Observable.extend({
	loaded	: false,
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
	
	face		: null, //头像
	level		: 1,	//级别
	exp			: 0,    //经验
	role		: 0, 	//职业
	
	hpMax		: -1,	//血量
	hp			: -1,	//血量
	mpMax		: -1,	//魔法
	mp			: -1,	//魔法
	atknumMax	: -1,	//攻击力上限
	atknumMin	: -1,   //攻击力下限
	defnum	: -1,	//防御力
	strength: -1,	//力量
	agility : -1,	//敏捷
	intelligence : -1,	//智力
	
	miss		: 0,  //百分数 躲闪的概率
	burst		: 0,	//百分数 暴击的概率
	
	regainHP	: 0,  //回血数量
	regainMP	: 0,  //回魔数量
	
	qHead		: null,	//头部装备
	qClothes	: null, //衣服
	qWeapon		: null, //武器
	qFoot		: null, //脚
	qAccessory	: null,	//左侧饰品	
	qAccessory2	: null, //右侧饰品
	
	p			: 1,
	team	: 1,		//所处队伍
	cell		: null,   //当前所在的位置
	oriCell : null,   //移动前所在的位置
	
	//buff	: {},	//增益buff
	 //debuff: {},   //损益buff
	
	ui		: null,
	
	w		: CELL_WIDTH,
	h		: CELL_HEIGHT,
	
	init	: function( config, callback ){
		this.moves	= {};
		this.attacks= {};
		this.pos = [0,  CELL_HEIGHT ];
		this.way = [];
		
		this.buff = {};
		this.debuff = {};
		
		this._super( config );
		
		this.cell = this.oriCell = PANEL.getCell( this.gx, this.gy );
		
		//获取ImageData
		this._getImageData( callback );
		
		return this;
	},
	
	_getImageData	: function( callback ){
		var _self = this, 
				loaded = 0,
				ctx = this.ctx;
		
		function done(){
			if (loaded++ >= 0) {
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
		_loadImg( this.urlImg, fn );	
	},
	
	//绘制图像
	//继承者需要覆盖次方法
	//TODO 放到params中，做为可配全局变量
	draw	: function( timestamp ){
		if ( !this.loaded )
			return false;
		
		this.changeStatus( timestamp );
		
		var ctx = this.ctx;
		var y = this.pos[ this.p ],
			 dx = this.cell.dx, dy = this.cell.dy;
		//TODO 图像反转
		ctx.save();
		
		//this.up = PS.gray( ctx, this.up );
		
			ctx.putImageData( this.right[0], dx,dy, 0, 0, CELL_WIDTH, CELL_HEIGHT );
/*
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
*/
		
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