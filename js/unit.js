/**
 * @author Norris
 */
var Unit = Observable.extend({
	//id			: 1,
	name	: "步兵",
	symbol	: "footman",	//区别角色UI样式
	moveable: true,    		//是否可以移动
	lock	: true,		//锁定角色 不能移动
	type	:-1,			//类型
	tipable :false,			//是否有提示框
	active  : true,			//是否有效
	overlay	: false,			//是否可以叠加
	gx		: -1,			//所处行
	gy		: -1,			//所处列
	step		: 5,          //行动力
	range	: 1, 			//攻击长度
	rangeType : 1,      //攻击类型
	
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
	strength: 3,	//力量
	agility : 3,	//敏捷
	intelligence : 3,	//智力
	
	miss		: 5,  //百分数 躲闪的概率
	burst		: 40,	//百分数 暴击的概率
	enlarge	: 1.5,  //暴击时系数
	invincible	: false, //无敌
	debility : false,	//濒临死亡
	dead		: false,
	moving : false,
		
	regainHP	: 0,  //回血数量
	regainMP	: 0,  //回魔数量
	
	qHead		: null,	//头部装备
	qClothes	: null, //衣服
	qWeapon		: null, //武器
	qFoot		: null, //脚
	qAccessory	: null,	//左侧饰品	
	qAccessory2	: null, //右侧饰品
	
	cell		: null,   //当前所在的位置
	oriCell : null,   //移动前所在的位置
	
	major	: false,		//是否显示简要信息
	hpLine : false,    //是否显示血条
	hpLineForce : false, //是否一定显示
	
	attackFreqMax	: 1, 		//一回合可攻击总数		
	attackFreq		: 0,		//本回合攻击几次了
	preAttack	: false,	//是否准备攻击
	attacking		: false, //是否正在攻击
	missing		: false, //闪避中
	
	faction		: 0, //阵营  不同阵营既是敌人，可攻击  -1即是中立 任何人都不能攻击
	team	: 1,		//所处队伍 同一阵营下同一队伍为我军，不同队伍为友军
	
	standby	: false,	//待机
	
	//buff	: {},	//增益buff
	 //debuff: {},   //损益buff
	
	ui		: null,
	loaded	: false,
	
	init	: function( config ){
		this.moves	= {};
		this.attacks= {};
		this.way = [];
		
		this.buff = {};
		this.debuff = {};
		
		this._super( config );
		//如果没有id则自动生成一个
		if ( this.id == undefined ){
			this.id = getTime();
		}
		
		this._calcHpPercent();
		
		this.cell = this.oriCell = PANEL.getCell( this.gx, this.gy );
		
		//增加角色事件
		this.addEvents( "click", "unclick", "change", "dead", "preDead","attack", "preAttack","move", "walk", "speak","defend","show","standby", "load", "upgrade" );
		
		this.setUI();
		//死亡时锁定角色
		this.on( "dead", function(){ this.lock = true; }, this );
		
		return this;
	},
		
	setUI	: function(){
		//UI加载完成后触发load事件
		this.ui = new UnitUI( { 
			unit : this,
			listeners	: {
				load	: {
					fn	: function(){
						this.loaded = true;
						this.fireEvent( "load", this );
					},
					scope : this 
				}
			} 
		} );
		
		return this;
	},
	
	//绘制图像
	//继承者需要覆盖次方法
	draw	: function( timestamp ){
		if ( !this.loaded )
			return;
		
		this.ui.draw( timestamp );	
	},
	//绘制提示信息
	drawTip	: function( timestamp ){
		this.ui.drawTip( timestamp );			
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
		
		//死亡
		if (this.dead) {

		}
		else 
			//攻击
			if (this.attacking) {

			}
			else {
					if (this.standby) {
						//待机
						img = this.ui.gray(this.direct);
					}
			}			
		
		this.pencil = img == undefined ? this.ui[ this.direct ][ this.p ] : img;
	},
	
	canMove	: function( cell ){
		return !this.moving && !this.lock && this.moves && this.moves[ cell.index ];
	},
	
	canAttack	: function( cell ){
		return this.attacks && this.attacks[ cell.index ];
	},
	
	moveTo		: function( cell ){
		if (!this.moving) {
			this.moving = true;
			this.lock = true;
			
			this.oriCell = this.cell;
			//寻路
			var way = [];
			while (cell.parent && cell != this.cell) {
				way.push(cell);
				cell = cell.parent;
			}
			this.way = way;
			
			this.ui.moveTo( this.way );
		}
		return this;
	},
	
	//回到行动前的状态
	homing		: function(){
		this.moving = false;
		this.preAttack = false;
		this.lock = false;
		this.way = [];
		//触发walk事件
		if (this.cell != this.oriCell) {
			this.fireEvent("walk", this, this.cell, this.oriCell);
			this.cell = this.oriCell;
		}
		this.ui.homing();
		
		return this;
	},
	
	attack			: function( unit ){
		//取消显示攻击范围	
		this.preAttack = false;
		
		//预备攻击返回false则取消执行
		if (this.fireEvent("preAttack", this) !== false) {
			this.attacking = true;
			//判断暴击
			var bursting = false;
			if ( (1 + Math.random() * 99) <= this.burst ){
				bursting = true;
			}	
			var hit = this._genHitValue( bursting );
					
			this.ui.attack( unit.cell, bursting, hit, function(){
				log( this.name + "attack over" );
				this.fireEvent("attack", this);
				this.attacking = false;
				
				//通知被攻击者
				unit.attacked( this, hit, function( defender ){
					
					//绑定防御事件 被攻击的unit受到伤害后反馈
					this.attackFreq++;
					if ( this.attackFreq >= this.attackFreqMax || defender.dead ){
						//获得经验值
						if( defender.dead ){
							this.addExp( 50 );
						}
						
						//结束本回合
						this.finish();
					}else{
						//继续攻击同一目标
						this.attack( unit );
					}
				}, this );
				
			}, this);
		}
		
		return this;
	},
	
	//被攻击
	attacked		: function( unit, v, fn, scope ){
		//判断是否可攻击
		if ( this.invincible ){
			this.ui.invincible( function(){
				if( fn )
					fn.call( scope || this, this, false );
					
			}, this );
		}else
		//判断闪避
		if ( (1 + Math.random() * 99) <= this.miss ){
			this.ui.miss( function(){
				if( fn )
					fn.call( scope || this, this, false );
					
			}, this );
		}else
		//判断抵抗
		{
			//伤害值
			var decrease = this._genDamageValue(  v );
			decrease = 100;
			this.ui.attacked( decrease, function(){
				this.onDecrease( decrease, unit, fn, scope );
			}, this );
		}
	},
	
	_calcHpPercent	: function(){
		this.hpPercent = Math.min(100, this.hp * 100 / this.hpMax);
		if (this.hpPercent < 20) {
			//濒临死亡
			this.debility = true;
		}
	},
	
	//扣血
	onDecrease	: function( d, unit, fn, scope ){
		if ( !isNaN(d) ) {
			
			this.hp = Math.max(0, this.hp - d );
			this._calcHpPercent();
			
			this.fireEvent( "change", this );
			
			//如果死亡，则播放动画后再执行回调函数
			if (this.hp == 0) {
				if (this.fireEvent("preDead", this) === false) {
					//如果不让死
				}else{
					log( this.name + " dead" );
					this.ui.dead( function(){
						//先反馈攻击者，再触发dead事件
						if ( fn )
							fn.call( scope || this, this, true, d, unit );
							
						this.onDead( unit );
					}, this );
				}
			}else{
				//回调扣血数值
				if( fn )
					fn.call( scope || this, this, true, d, unit );
			}
		}	
	},
	
	//加血
	onIncrease	: function( d ){
		if (!isNaN(d) && d >= 0) {
			this.HPincrease = parseInt(d);
			
			this.hp += this.HPincrease;
			this.hpPercent = Math.min(100, this.hp * 100 / this.hpMax);
			
			this.fireEvent( "change", this );
			
			//解除濒临死亡
			if (this.hpPercent >= 20) {
				this.debility = false;
			}
		}
	},	
	
	onDead		: function( unit ){
		this.dead = true;
		this.fireEvent( "dead", this, unit );
	},
	
	//计算攻击值 攻击上限与攻击下限间随机取值 最小为0
	//暴击时乘以enlarge倍 返回整数值
	_genHitValue	: function( bursting ){
		var v = Math.max( 0, this.atknumMin + Math.random() * ( this.atknumMax - this.atknumMin ) );
		if ( bursting )
			v = v * this.enlarge;
		
		return Math.round( v );	
	},
	
	//计算伤害值
	_genDamageValue	: function( v ){
		return Math.max( 0, Math.round(v) - this.defnum );
	},
		
	showAttack	: function(){
		//获得可攻击的格子
		obj = this.layer.getAttackCells( this.cell, this.range, this.rangeType, this.team );
		PANEL.cellLayer.paintCells( this.layer.attaColor, obj );
		this.attacks = obj;
		this.preAttack = true;
	},
	
	hideAttack	: function(){
		this.preAttack = false;
		delete this.attacks;
		PANEL.unitsLayer._removeCells();
	},
	
	unClick	: function(){
		if (!this.standby && this.lock) {
			this.homing();
		}
		this.fireEvent( "unclick", this );
	},
	
	//操作结束
	finish	: function(){
		this.standby = true;
		this.lock = true;
		this.oriCell = this.cell;
		this.attackFreq = 0; 
		this.fireEvent( "standby", this );
	},
	
	//取消锁定与待机状态
	unLock	: function(){
		this.lock = false;
		this.standby = false;
	},
	
	click		: function( e ){
		this.fireEvent( 'click', this );
	},
	//同一阵营 不同队伍
	isFriend	: function( faction, team ){
		return faction == this.faction && team != this.team;
	},
	//同一阵营 同一队伍	
	isSibling	: function( faction, team ){
		return faction == this.faction && team == this.team;
	},
	//不同阵营
	isEnemy	: function( faction, team ){
		return faction != this.faction;
	},
	//同一阵营
	isBrother	: function( faction, team ){
		return faction == this.faction;
	},
	
	nextExp		: function(){
		return Unit.calcExp( this.level );
	},
	
	addExp		: function( n ){
		this.exp += n;
		if ( this.exp >= this.nextExp() ){
			this.exp = this.exp - this.nextExp();
			this.level++;
			
			this.fireEvent( "upgrade", this );
		}
		this.fireEvent( "change", this );
	}			
}); 
//计算升级所需经验
//每升一级需额外50点 起始值100
Unit.calcExp = function( level ){
	return (level -1) * 50 + 100;
}


