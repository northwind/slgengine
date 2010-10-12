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
	strength: 3,	//力量
	agility : 3,	//敏捷
	intelligence : 3,	//智力
	
	miss		: 5,  //百分数 躲闪的概率
	burst		: 100,	//百分数 暴击的概率
	enlarge	: 1.5,  //暴击时系数
	invincible	: false, //无敌
	debility : false,	//濒临死亡
	dead		: false,
	deadlast	: 0,
		
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
	attackP		: 0, //攻击时的图像索引
	missing		: false, //闪避中
	misslast	: 0, //闪避持续显示帧数
	invinciblelast	: 0, //无效持续显示帧数
	beattacked		: 0, //被击中
	HPdelast	: 0, //扣血持续显示帧数
	HPdecrease  : 0, //扣血
	
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
/*
		this.changeStatus( timestamp );
		this.ui.draw( this );
		
		if (this.dead && this.deadlast <= 0) {
			this.fireEvent( "dead", this );
		}
		//闪避
		if ( this.missing && this.misslast++ == 20 ){
			this.missing = false;
			this.misslast = 0;
			//this.fireEvent( "defend", this, 0 );
		}
		//无敌
		if (this.invinciblelast > 0) {
			this.invinciblelast--;
			//if ( this.invinciblelast == 0 )
				//this.fireEvent( "defend", this, 0 );
		}
		//扣血
		if ( this.HPdelast > 0 && this.HPdelast++ == 20 ){
			this.HPdelast = 0;
			this.HPdecrease = 0;
			
			//this.fireEvent( "defend", this, 0 );
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
*/		
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
			if (diff > SPEED ) {
				this.deadlast--;
				this.stampStep = timestamp;
			}
			if (this.deadlast % 2 == 0) {
				img = 0;
			}
			else {
				img = this.ui.fall[0];
			}
			this.stampStatus = timestamp;
		}
		else 
			//攻击
			if (this.attacking) {

			}
			else {
				if (this.beattacked > 0 && diff > ASPEED) {
					this.beattacked--;
					
					img = this.ui.attacked[0];
				}
				else 
					if (this.standby) {
						//待机
						img = this.ui.gray(this.direct);
					}
						else 
							if (this.way.length > 0 && diff > STEP) {
								//更改角色移动时的图片
								this.stampStep = timestamp;
								//this.stampStatus = timestamp; 	//角色发生转向后不再需要更新状态
								
								var cell = this.way.pop();
								this.direct = this.cell.directT(cell);
								//触发walk事件
								this.fireEvent("walk", this, this.cell, cell);
								
								this.cell = cell;
								
								img = this.ui[this.direct][this.p];
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
			this.ui.invincible( fn, scope );
		}else
		//判断闪避
		if ( (1 + Math.random() * 99) <= this.miss ){
			this.missing = true; 
			//this.fireEvent( "defend", this, 0 );
		}else
		//判断抵抗
		{
			//伤害值
			var decrease = this._genDamageValue(  v );
			
			this.onDecrease( decrease );
			this.beattacked = 5;
			
			//this.fireEvent( "defend", this, decrease );
		}
		//TODO 优化逻辑
/*
		_self = this;
		setTimeout( function(){
			_self.fireEvent( "defend", _self );
		} , 1500);
*/
	},
	
	_calcHpPercent	: function(){
		this.hpPercent = Math.min(100, this.hp * 100 / this.hpMax);
		if (this.hpPercent < 20) {
			//濒临死亡
			this.debility = true;
		}
	},
	
	//扣血
	onDecrease	: function( d ){
		if (!isNaN(d) && d >= 0) {
			d = parseInt(d);
			this.HPdecrease = d;
			this.HPdelast = 1;
			
			this.hp = Math.max(0, this.hp - d );
			this._calcHpPercent();
			
			this.fireEvent( "change", this );
			
			//死亡
			if (this.hp == 0) {
				this.fireEvent( "preDead", this );
				this.onDead();
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
	
	onDead		: function(){
		this.dead = true;
		this.deadlast = 8;
		//this.fireEvent( "dead", this );
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
		return Math.max( 0, v - this.defnum );
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


