/**
 * @author Norris
 */
var Unit = Observable.extend({
	name	: "步兵",
	symbol	: "footman",	//区别角色UI样式
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
	hpPercent   :   100, 	//血量百分比
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
	ortDirect : "down", //移动前方向
	
	major	: false,		//是否显示简要信息
	hpLine : false,    //是否显示血条
	hpLineForce : false, //是否一定显示
	
	//buff	: {},	//增益buff
	 //debuff: {},   //损益buff
	
	ui		: null,
	
	w		: CELL_WIDTH,
	h		: CELL_HEIGHT,
	
	
	init	: function( config, callback ){
		this.moves	= {};
		this.attacks= {};
		this.way = [];
		
		this.buff = {};
		this.debuff = {};
		
		this._super( config );
		
		this.cell = this.oriCell = PANEL.getCell( this.gx, this.gy );
		this.direct = this.ortDirect = "down";
		
		this.callback = callback || function(){};
		this.setUI( callback );
		
		return this;
	},
	
		
	setUI	: function( callback ){
		this.ui = UIMgr.get( this.symbol, this, callback );
		
		return this;
	},
	
	//绘制图像
	//继承者需要覆盖次方法
	draw	: function( timestamp ){
		this.changeStatus( timestamp );
		this.ui.draw( this );
		
		//移动过后回调
		if ( this.moving && this.way == 0){
			//this.moving = false;
			
			if (this.fn) {
				this.fn.call( this.scope || this, this );
				delete this.fn;
				delete this.scope;
			}
		}		
	},
	
	showMajor	: function(){
		this.major = true;
		this.hpLine = true;
		return this;
	},
	
	hideMajor	: function(){
		this.major = false;
		this.hpLine = false;
		return this;
	},	
	
	changeStatus	: function( timestamp ){
		var diff = timestamp - this.stampStep;
		//更改角色移动时的图片
		if ( this.way.length > 0 && diff > STEP) {
			this.stampStep = timestamp;
			this.stampStatus = timestamp; 	//角色发生转向后不再需要更新状态
			
			var cell = this.way.pop(),
				  direct = this.cell.direct( cell );
			switch( direct ) {
				case 3: //下
					this.direct = "down";
					break;	
				case -3://上
					this.direct = "up";
					break;
				case -1://左
					this.direct = "left";
					break;
				case 1://右
					this.direct = "right";
					break;
			}

			//this.p = 0;
			this.cell = cell;
		}
		
		if( timestamp - this.stampStatus > SPEED ){
			this.stampStatus = timestamp;
			this.p = this.p == 2 ? 1 : 2;
		}
		
	},
	
	canMove	: function( cell ){
		return !this.moving && this.moves && this.moves[ cell.index ];
	},
	
	canAttack	: function( cell ){
		return this.attacks && this.attacks[ cell.index ];
	},
	
	moveTo		: function( cell, fn, scope ){
		if (!this.moving) {
			this.moving = true;
			
			this.oriCell = this.cell;
			this.oriDirect = this.direct;
			//寻路
			var way = [];
			while (cell.parent && cell != this.cell) {
				way.push(cell);
				cell = cell.parent;
			}
			this.way = way;
			this.fn = fn;
			this.scope = scope;
			//way.push( this.cell );
			//way.reverse();
		
		}
		return this;
	},
	
	homing		: function(){
		this.cell = this.oriCell;
		this.direct = this.oriDirect;
		this.moving = false;
		this.way = [];
		
		return this;
	},
	
	attack			: function( cell ){
		
	}	
}); 