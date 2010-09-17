/**
 * @author Norris
 */
var Unit = Observable.extend({
	name	: "步兵",
	symbol	: "footman",	//区别角色UI样式
	moveable: true,    		//是否可以移动
	type	:-1,			//类型
	tipable :false,			//是否有提示框
	active  : true,			//是否有效
	overlay	: false,			//是否可以叠加
	gx		: -1,			//所处行
	gy		: -1,			//所处列
	step		: 5,          //行动力
	range	: 1, 			//攻击长度
	rangeType : 1,      //攻击类型
	
	stampAtk	: 0,
	stampStatus	: 0,
	stampStep		: 0,
	moving : false,
	
	face		: null, //头像
	level		: 1,	//级别
	exp			: 0,    //经验
	role		: 0, 	//职业
	
	hpMax		: 100,	//血量
	hp			: 100,	//血量
	hpPercent   :   100, 	//血量百分比
	mpMax		: 100,	//魔法
	mp			: 100,	//魔法
	atknumMax	: 12,	//攻击力上限
	atknumMin	: 10,   //攻击力下限
	defnum	: 3,	//防御力
	strength: 0,	//力量
	agility : 0,	//敏捷
	intelligence : 0,	//智力
	
	miss		: 0,  //百分数 躲闪的概率
	burst		: 0,	//百分数 暴击的概率
	invincible	: false, //无敌
	debility : false,	//濒临死亡
	dead		: false,
		
	regainHP	: 0,  //回血数量
	regainMP	: 0,  //回魔数量
	
	qHead		: null,	//头部装备
	qClothes	: null, //衣服
	qWeapon		: null, //武器
	qFoot		: null, //脚
	qAccessory	: null,	//左侧饰品	
	qAccessory2	: null, //右侧饰品
	
	p			: 1,
	cell		: null,   //当前所在的位置
	oriCell : null,   //移动前所在的位置
	ortDirect : "down", //移动前方向
	
	major	: false,		//是否显示简要信息
	hpLine : false,    //是否显示血条
	hpLineForce : false, //是否一定显示
	
	attackFreqMax	: 1, 		//一回合可攻击总数		
	attackFreq		: 0,		//本回合攻击几次了
	preAttack	: false,	//是否准备攻击
	attacking		: false, //是否正在攻击
	attackP		: 0, //攻击时的图像索引
	missing		: false, //闪避中
	misslast	: 0, //闪避持续显示帧数
	HPdelast	: 0, //扣血持续显示帧数
	HPdecrease  : 0, //扣血
	
	faction		: 0, //阵营  不同阵营既是敌人，可攻击  -1即是中立 任何人都不能攻击
	team	: 1,		//所处队伍 同一阵营下同一队伍为我军，不同队伍为友军
	
	standby	: false,	//待机
	
	//buff	: {},	//增益buff
	 //debuff: {},   //损益buff
	
	ui		: null,
	
	w		: CELL_WIDTH,
	h		: CELL_HEIGHT,
	
	pencil	: null, //当前要画的图片
	
	init	: function( config ){
		this.moves	= {};
		this.attacks= {};
		this.way = [];
		
		this.buff = {};
		this.debuff = {};
		
		this._super( config );
		
		//增加事件
		this.addEvents( "dead" );
		
		this.cell = this.oriCell = PANEL.getCell( this.gx, this.gy );
		this.direct = this.ortDirect = "down";
		//增加角色事件
		this.addEvents( "dead","attack","move", "walk", "speak","defend","show","standby", "load" );
		
		this.setUI();
		
		return this;
	},
		
	setUI	: function(){
		var _self = this;
		this.ui = UIMgr.get( this.symbol, this, function(){
			_self.fireEvent( "load", _self );
		} );
		
		return this;
	},
	
	//绘制图像
	//继承者需要覆盖次方法
	draw	: function( timestamp ){
		if ( !this.ui.loaded )
			return;
			
		this.changeStatus( timestamp );
		this.ui.draw( this );
		
		//闪避
		if ( this.missing && this.misslast++ == 20 ){
			this.missing = false;
			this.misslast = 0;
		}
		//扣血
		if ( this.HPdelast > 0 && this.HPdelast++ == 20 ){
			this.HPdelast = 0;
			this.HPdecrease = 0;
		}		
		//攻击
		if ( this.attacking && this.attackP == this.ui[ "a" + this.direct ].length  ){
			this.attacking = false;
			this.attackP = 0;
			
			this.fireEvent( "attack", this, this._genHitValue() );
		}  
		//移动过后回调	
		if ( this.moving && this.way == 0){
			this.moving = false;
			
			if (this.fn) {
				this.fn.call( this.scope || this, this );
				delete this.fn;
				delete this.scope;
			}
			
			this.fireEvent( "move", this );
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
		var img;
		
		//攻击
		if (this.attacking) {
			var actions = this.ui["a" + this.direct];
			if (timestamp - this.stampAtk > ASPEED) {
				this.stampAtk = timestamp;
				
				img = actions[this.attackP++];
			}else{
				img = actions[this.attackP];
			}
		}
		else 
			if (this.standby) {
				//待机
				img = this.ui.gray( this.direct );
			}
			else 
				if (this.debility) {
					//虚弱时
					img = this.ui.fall[this.p];
				}
				else 
					if (this.way.length > 0 && diff > STEP) {
						//更改角色移动时的图片
						this.stampStep = timestamp;
						//this.stampStatus = timestamp; 	//角色发生转向后不再需要更新状态
						
						var cell = this.way.pop();
						this.direct = this.cell.directT(cell);
						//触发walk事件
						this.fireEvent( "walk", this, this.cell, cell );
						
						this.cell = cell;
						
						img = this.ui[this.direct][this.p];
					} 
		//切换步伐
		if( timestamp - this.stampStatus > SPEED ){
			this.stampStatus = timestamp;
			this.p = this.p == 2 ? 1 : 2;
		}
		
		this.pencil = img || this.ui[ this.direct ][ this.p ];
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
		this.preAttack = false;
		this.way = [];
		
		return this;
	},
	
	attack			: function( unit ){
		var cell = unit.cell;

		//绑定防御事件 被攻击的unit受到伤害后反馈
		unit.on( "defend", function( defender ){
			this.attackFreq++;
			if ( this.attackFreq == this.attackFreqMax || defender.dead ){
				//结束本回合
				this.finish();
			}else{
				//继续攻击同一目标
				this.attack( unit );
			}
		}, this );
		this.on("attack", unit.attacked, unit );
		
		this.preAttack = false;
		this.attacking = true;
		
		//判断方向
		this.direct = this.cell.directT( cell );
		
		return this;
	},
	
	//被攻击
	attacked		: function( unit, v ){
		//判断是否可攻击
		if ( this.invincible ){
			this.fireEvent( "defend", this, 0 );
		}else
		//判断闪避
		if ( (1 + Math.random() * 99) <= this.miss ){
			this.missing = true; 
			this.fireEvent( "defend", this, 0 );
		}else
		//判断抵抗
		{
			//伤害值
			var decrease = Math.max( 0, v - this.defnum );
			
			this.onDecrease( decrease );
			
			this.fireEvent( "defend", this, decrease );
		}
	},
	
	//扣血
	onDecrease	: function( d ){
		if (!isNaN(d) && d >= 0) {
			this.HPdecrease = parseInt(d);
			this.HPdelast = 1;
			
			this.hp = Math.max(0, this.hp - d);
			this.hpPercent = Math.min(100, this.hp * 100 / this.hpMax);
			
			//死亡
			if (this.hp == 0) {
				this.onDead();
			}
			else 
				if (this.hpPercent < 20) {
					//濒临死亡
					this.debility = true;
				}
		}	
	},
	
	//加血
	onIncrease	: function( d ){
		if (!isNaN(d) && d >= 0) {
			this.HPincrease = parseInt(d);
			
			this.hp += d;
			this.hpPercent = Math.min(100, this.hp * 100 / this.hpMax);
			
			//解除濒临死亡
			if (this.hpPercent >= 20) {
				this.debility = false;
			}
		}
	},	
	
	onDead		: function(){
		this.dead = true;
		this.fireEvent( "dead", this );
	},
	
	//计算攻击值 攻击上限与攻击下限间随机取值 最小为0
	_genHitValue	: function(){
		return Math.max( 0, this.atknumMin + Math.random() * ( this.atknumMax - this.atknumMin ) );
	},
	
	showAttack	: function(){
		//获得可攻击的格子
		obj = this.layer.getAttackCells( this.cell, this.range, this.rangeType, this.team );
		PANEL.cellLayer.paintCells( this.layer.attaColor, obj );
		this.attacks = obj;
		this.preAttack = true;
	},
	
	finish	: function(){
		this.standby = true;
		this.moveable = false;
		this.oriCell = this.cell;
		this.fireEvent( "standby", this );
	}
		
}); 