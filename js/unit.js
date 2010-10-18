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
	speaking	: false,
		
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
	newBuff	: null,
	//magics	: {}, //会的魔法
	
	ui		: null,
	loaded	: false,
	
	init	: function( config ){
		this.moves	= {};
		this.attacks= {};
		this.way = [];
		this.magicNames = [];
		this.magics = {};
		this.buff = {};
		
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
		
		//TODO 优化执行顺序
		PANEL.process.on("end", function(){
			for (var i=0; i<this.magicNames.length; i++) {
				this.learnMagic( this.magicNames[i] );
			}			
		}, this);
				
		this.on( "move", function(){ this.moving = false; }, this );
		this.on( "speak", function(){ this.speaking = false; }, this );
		
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
		//转向操作都交由UI处理
		var _self = this;
		$( [ "turnLeft", "turnRight", "turnUp", "turnDown" ] ).each( function( i, n){
			_self[ n ] = function(){
				_self.ui[ n ].apply( _self.ui, arguments );
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
	drawBuff	: function( timestamp ){
		this.ui.drawBuff( timestamp );			
	},	
	//绘制提示信息
	drawTip	: function( timestamp ){
		this.ui.drawTip( timestamp );			
	},
	
	addTip	: function( config, fn, scope ){
		config.fn = fn;
		config.scope = scope;
		this.ui.addTip( config );
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
		delete this.attacks;
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
				unit.attacked( this, hit, function( defender, miss, v ){
					
					//绑定防御事件 被攻击的unit受到伤害后反馈
					this.attackFreq++;
					if ( this.attackFreq >= this.attackFreqMax || defender.dead ){
						//TODO 逻辑有问题
						var n = hit;
						this.addExp( n, function(){
							log( this.name + " addExp end" );
							//结束本回合
							this.finish();
						}, this );
						
					}else{
						//继续攻击同一目标
						this.attack( unit );
					}
				}, this );
				
			}, this);
		}
		
		return this;
	},
	
	attackCell		: function( cell, fn, scope ){
		this.attacking = true;
		this.ui.attack( cell, false, 0, function(){
			log( this.name + "attack over" );
			this.fireEvent("attack", this);
			this.attacking = false;
		}, this);		
	},
	
	//产生伤害
	hurt			: function( unit, v ){
		unit.onDecrease( v, this, function( defender, hit, num ){
			var n = hit == true ? num : 0;
			this.addExp( n, function(){
				//结束本回合
				this.finish();
			}, this );			
		}, this );
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
						this.dead = true;
						
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
		//死亡时锁定角色
		this.lock = true;
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
	
	onDecreaseMP	: function( n ){
		this.mp = Math.max( 0, this.mp-n );
		this.fireEvent( "change", this );
	},
	onIncreaseMP	: function( n ){
		this.mp = Math.min( this.mpMax , this.mp+n );
		this.fireEvent( "change", this );
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
		
		this.ui.standby( function(){
			this.fireEvent( "standby", this );
		}, this );
	},
	
	//取消锁定与待机状态
	unLock	: function(){
		this.lock = false;
	},
	//取消待机状态
	restore		: function(){
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
	
	addExp		: function( n, fn, scope ){
		this.exp += n;
		if ( this.exp >= this.nextExp() ){
			this.onUpgrade( fn, scope );
		}else{
			this.fireEvent( "change", this );
			if ( fn )
				fn.call( scope ||  this, this );			
		}
	},
	
	onUpgrade	: function( fn, scope ){
		this.exp = this.exp - this.nextExp();
		this.level++;
		var getpoint = 5;
		
		this.addStrength( 2 );
		this.addAgility( 2 );
		this.addIntelligence( 1 );
		
		//升级后再调用change事件
		this.ui.upgrade( function(){
			
			this.fireEvent( "upgrade", this );
			//继续升级
			if ( this.exp >= this.nextExp() )
				this.onUpgrade( fn, scope );
			else{
				if ( fn )
					fn.call( scope ||  this, this );
			} 	
		}, this );		
	},
	
	//力量
	addStrength	: function( n ){
		this.strength += n;
		this.hpMax += n * STRENGTHHP;
		this._calcHpPercent();
		this.fireEvent( "change", this );	
	},
	
	//敏捷
	addAgility	: function( n ){
		this.agility += n;
		this.defnum += n * AGILITYDEF;
		this.fireEvent( "change", this );	
	},
	
	//智力	
	addIntelligence	: function( n ){
		this.intelligence  += n;
		this.mpMax += n * INTELLIGENCEMP;
		this.fireEvent( "change", this );	
	},
	
	//一次只能说一句话
	speak	: function( text, fn, scope ){
		this.speaking = true;
		if ( fn )
			this.on( "speak", fn, scope );
		PANEL.speak( this, text, fn, scope );
	},
	
	disappear	: function( fn, scope ){
		this.ui.disappear( function(){
			this.onDead();
			if ( fn )
				fn.call( scope|| this );
		}, this );
	},
	
	addBuff	: function( name ){
		var config = $.extend( BUFFS[ name ],  { id : name } );
		this.newBuff = new Stuff( config );
		this.buff[ name ] = this.newBuff;
		
		return this;
	},
	
	delBuff	: function( name ){
		this.buff[ name ] = null;
		delete this.buff[ name ];
		
		return this;	
	},
	
	learnMagic	: function( name ){
		this.magics[ name ] = MagicMgr.get( name );
	},
	hasMagic	: function(){
		var count = 0;
		for( var key in this.magics){
			count++;
			break;
		}
		return count > 0; 
	}
}); 
//计算升级所需经验
//每升一级需额外50点 起始值100
Unit.calcExp = function( level ){
	return (level -1) * 50 + 100;
}


