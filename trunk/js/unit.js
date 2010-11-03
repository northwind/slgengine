/**
 * 负责处理角色的所有对外接口和内部逻辑处理
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
	auto	: false,	//是否在自动移动
	visiable: true,		//是否可见
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
	atknumMax	: 32,	//攻击力上限
	atknumMin	: 20,   //攻击力下限
	defnum	: 3,	//防御力
	strength: 3,	//力量
	agility : 3,	//敏捷
	intelligence : 3,	//智力
	
	miss		: 5,  //百分数 躲闪的概率
	burst		: 40,	//百分数 暴击的概率
	enlarge	: 1.5,  //暴击时系数
	revenge	: 5, //反击
	invincible	: false, //无敌
	debility : false,	//濒临死亡
	dead		: false,
	moving : false,
	speaking	: false,
		
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
	attacking		: false, //是否正在攻击
	missing		: false, //闪避中
	gainExp	: 0,		//单次攻击累计获得经验数
	
	faction		: 0, //阵营  不同阵营既是敌人，可攻击  -1即是中立 任何人都不能攻击
	team	: 1,		//所处队伍 同一阵营下同一队伍为我军，不同队伍为友军
	
	standby	: false,	//待机
	
	//buffs	: {},	//增益buff
	//magics	: {}, //会的魔法
	
	ui		: null,
	
	init	: function( config ){
		this.moves	= {};
		this.attacks= {};
		this.way = [];
		this.magicNames = [];
		this.magics = {};
		this.buffs = this.buffs || {};
		
		this.addEvents( "click", "start", "unclick","change", "afterAttack", "walk","speak", "appear", "move" );
		this.addEvents( { name : "preDead", type : 2 },	{ name : "preAttack", type : 2 }, { name : "upgrade", type : 2 },
						{ name : "attack", type : 2 }, { name : "defend", type : 2 } , { name : "dead", type : 2 }, 
						{ name : "standby", type : 2 });
		this._super( config );
				
		//如果没有id则自动生成一个
		this.id = this.id || Unit.ID();
		this.hp = Math.min( this.hp || this.hpMax, this.hpMax) ;
		this.mp = Math.min( this.mp || this.mpMax, this.mpMax );
		this._calcHpPercent();
		
		this.setCell();
		this.setUI();
		this.setMagic();
		//this.setTeam();
		
		//绑定事件回调函数
		this.bindEvent( "attack", this.onAttack, this );
		
		return this;
	},
	
	//每回合开始时被调起
	start		: function( fn, scope ){
		this.invokeBuff();
		
		this.fireEvent( "start", this );
		if ( fn )
			fn.call( scope || this, this );
	},
	
	//调用绑定的状态
	invokeBuff	: function( fn, scope ){
		for( var key in  this.buffs ){
			var buff = this.buffs[ key ];
			
			buff.apply( this );
		}
	},
	
	setCell		: function(){
		this.cell = this.oriCell = PANEL.getCell( this.gx, this.gy );
		return this;
	},
	
	setMagic	: function(){
		for (var i=0; i<this.magicNames.length; i++) {
			this.learnMagic( this.magicNames[i] );
		}				
	},
		
	setUI	: function(){
		//UI加载完成后触发load事件
		this.ui = new UnitUI( { 
			unit : this
		} );
		//转向操作都交由UI处理
		var _self = this;
		$( [ "turnLeft", "turnRight", "turnUp", "turnDown", "fall" ] ).each( function( i, n){
			_self[ n ] = function(){
				_self.ui[ n ].apply( _self.ui, arguments );
			} 
		} );
		
		this.face = this.face || this.ui.imgs.imgFace;
			
		return this;
	},
	
	setTeam	: function( team ){
		this.teamObj =  team;
	},
	
	//绘制图像
	//继承者需要覆盖次方法
	draw	: function( ){
		this.ui.draw( );	
	},
	//绘制提示信息
	drawBuff	: function( ){
		this.ui.drawBuff( );			
	},	
	//绘制提示信息
	drawTip	: function( ){
		this.ui.drawTip( );			
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
	getMoves	: function(){
		return this.layer.getWalkCells( this.cell, this.step );
	},
	getAttacks	: function(){
		return this.layer.getAttackCells( this.cell, this.range, this.rangeType, this.team );
	},
	//显示可移动单元格
	showMoves	: function(){
		this.moves = this.getMoves();
		PANEL.cellLayer.paintCells( MOVECOLOR, this.moves );
		return this.moves;
	},
	clearMoves	: function(){
		PANEL.cellLayer.paintCells( MOVECOLOR, {} );
	},
	//获得可攻击的格子
	showAttack	: function(){
		this.attacks = this.getAttacks();
		PANEL.cellLayer.paintCells( ATTACKCOLOR, this.attacks );
		return this.attacks;
	},
	clearAttack	: function(){
		PANEL.cellLayer.paintCells( ATTACKCOLOR, {} );
	},
	//窗口移动到可以显示该角色
	followMe		: function( fn, scope ){
		PANEL.moveToCell( this.cell, fn, scope );
		return this;
	},	
			
	canMove	: function( cell ){
		return !this.moving && !this.lock && this.moves && this.moves[ cell.index ];
	},
	
	canAttack	: function( cell, unit ){
		return this.attacks && this.attacks[ cell.index ] && this.isEnemy( unit );
	},
	
	moveTo		: function( cell ){
		if (!this.moving) {
			//寻路
			var way = [];
			while (cell.parent && cell != this.cell) {
				way.push(cell);
				cell = cell.parent;
			}
			
			this.throughway( way );
		}
		return this;
	},
	
	//直接走到某个单元格
	go	: function( to, fn, scope ){
		if (!this.moving) {
			if ( !(to instanceof Cell) )
				to = CellMgr.get( to.x, to.y );
			
			var way = this.layer.findWay( this, this.cell, to );
			
			if ( fn )
				this.on( "move", fn, scope, { one : true});
			
			this.throughway( way );				
		} else if ( fn )
			fn.call( scope || this, this );
			
		return this;
	},
	
	throughway		: function( way ){
		this.moving = true;
		this.lock = true;
		delete this.moves;
		
		this.oriCell = this.cell;
					
		this.way = way;
		this.ui.moveTo( this.way );
	},
	
	//回到行动前的状态
	homing		: function(){
		this.moving = false;
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
	
	onMove	: function( cell ){
		this.moving = false;
		this.fireEvent( "move", this, this.cell );
	},
	
	attack			: function( unit, fn, scope ){
		if (typeof unit == "string")
			unit = PANEL.getUnitById( unit );
		
		if ( unit ){
			delete this.attacks;
			this.gainExp = 0;
			if ( fn )
				this.on( "afterAttack", fn, scope, { one : true } );
						
			log( this.name + "  preAttack" );
			this.bindEvent( "preAttack", function(){
						this.attacking = true;
						this.fire( unit );
					}, this )
				  .fireEvent("preAttack", this, unit );
		}
			
		return this;
	},
	
	//真正攻击时调用的函数
	fire			: function( unit ){
		//判断暴击
		var bursting = false;
		if ( (1 + Math.random() * 99) <= this.burst ){
			bursting = true;
		}	
		var hit = this._genHitValue( bursting );
					
		this.ui.attack( unit.cell, bursting, hit, function(){
			log( this.name + "attack over : freq : " + this.attackFreq );
			this.attackFreq++;
			//通知被攻击者
			unit.attacked( this, hit, function( defender, self, v ){
				log( "unit attacked callback " + defender.name + " v = " + v);
				//计算一回可攻击的次数，不足继续攻击
				this.gainExp += Unit.getExpByBlood( this, unit, v );
				
				if ( this.attackFreq == this.attackFreqMax || defender.dead ){
					this.fireEvent("attack", this, unit, hit );
				}else{
					//继续攻击同一目标
					this.fire( unit );
				}
			}, this );
			
		}, this);
		
	},
	//本回合是否还可以继续攻击
	hasFreq				: function(){
		return this.attackFreq < this.attackFreqMax;
	},
	
	//攻击完成后
	onAttack				: function( self, unit, hit ){
		log( "unit onAttack : " + this.name );
		this.attackFreq = 0;
		this.attacking = false;
		
		if (this.dead) {
			//被反击死 不能获得经验
			this.fireEvent("afterAttack", this, unit);
		}
		else {
			//增加经验
			this.addExp(this.gainExp, function(){
				this.fireEvent("afterAttack", this, unit);
			//攻击后自动待机
			//this.finish();
			}, this);
		}
	},
	
	//挥击武器 只播放动画
	swing		: function( fn, scope ){
		this.ui.attack( null, false, 0, fn, scope );		
	},
	
	//被攻击
	attacked		: function( unit, v, fn, scope ){
		//判断是否可攻击
		if (this.invincible) {
			this.ui.invincible(function(){
				//this.fireEvent( "defend", this, unit, 0 );
				if ( fn )
					fn.call( scope || this, this, unit, 0 );
			}, this);
		}
		else {
			if (fn) {
				//判断反击 attacking == true时证明是自己发起的反击,则不能再反击
				//并且在自己的攻击范围内  	并且攻击者本回合已经不能再攻击
				if ( !this.attacking && unit && (1 + Math.random() * 99) <= this.revenge && !unit.hasFreq() && this.isInRange( unit ) ) {
					//反击后再回调
					this.on("defend", function(){
						if (!this.dead) { //如果没有死
							var a = Array.prototype.slice.call(arguments, 0);
							this.attack(unit, function(){
								fn.apply(scope || this, a);
							}, this);
						}
						else {
							fn.apply(scope || this, arguments);
						}	
					}, this, { one: true });
					
				}else				
					this.on("defend", fn, scope, { one: true });				
			}
			//判断闪避
			if ((1 + Math.random() * 99) <= this.miss) {
				this.ui.miss(function(){
					this.fireEvent( "defend", this, unit, 0 );
				}, this);
			}
			else //判断抵抗
			//扣血
			{
				//伤害值
				var decrease = this._genDamageValue(v);
				this.getHurt(decrease, unit );
			}
		}
	},
	
	//在自己的攻击范围内
	isInRange	: function( unit ){
		return this.getAttacks().hasOwnProperty( unit.cell.index );
	},
	
	_calcHpPercent	: function(){
		this.hpPercent = Math.min(100, this.hp * 100 / this.hpMax);
		if (this.hpPercent < 20) {
			//濒临死亡
			this.debility = true;
		}
	},
	//使他人受到伤害
	hurt	: function( d, unit, fn, scope ){
		log( "unit hurt : " +  unit.name );
		if ( isNaN( d) )		
			d = 0;
		// ...
	},	
	//受到伤害
	getHurt	: function( d, unit, fn, scope ){
		log( "unit getHurt : " +  this.name );
		if ( isNaN( d) )		
			d = 0;
		if ( fn )
			this.on( "defend", fn, scope, { one : true } );
			
		this.ui.attacked( d, function(){
			this.onDecrease( d, unit );
		}, this );		
	},
	
	//扣血
	onDecrease	: function( d, unit ){
		d = this.hp > d ? d : this.hp;		//计算实际伤血值
		this.hp = Math.max(0, this.hp - d );
		this._calcHpPercent();
		
		this.fireEvent( "change", this );
		
		//如果死亡，则播放动画后再执行回调函数
		if (this.hp == 0) {
			this.bindEvent( "preDead", function(){
						if ( this.hp > 0 ){
							//如果不让死
							this.fireEvent( "defend", this, unit, d );						
						}else{
							this.die( unit, d );
						}				
					}, this )
				   .fireEvent( "preDead", this, unit, d );
		}else{
			this.fireEvent( "defend", this, unit, d );
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
	
	die		: function( unit, d, fn, scope ){
		//省略unit,d
		if ($.isFunction(unit)) {
			fn = unit;		
			scope = d;
		}
		log( this.name + " die" );
		if ( fn )
			this.on( "defend", fn, scope, { one : true } );
					
		this.ui.dead( function(){
			this.dead = true;
			
			this.bindEvent( "defend", this.onDead, this )
				   .fireEvent( "defend", this, unit, d );
		}, this );		
	},
	
	onDead		: function( self, unit, d ){
		//死亡时锁定角色
		this.lock = true;
		
		this.bindEvent( "dead", function(){
					//死了也要触发standby事件
					//this.fireEvent( "standby", this );			
				}, this )
			   .fireEvent( "dead", this, unit, d );
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
		
	hideAttack	: function(){
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
		if (!this.standby) {
			log( "unit finish : " +  this.name );
			this.standby = true;
			this.lock = true;
			this.oriCell = this.cell;
			this.attackFreq = 0;
			this.clearAttack();
			this.clearMoves();
			
			if (this.dead) {
				//如果已经阵亡， 则直接触发standby事件
				log(this.name + " standby");
				this.fireEvent("standby", this);
			}
			else {
				this.layer.bindEvent( "enter", function(){
					this.ui.standby(function(){
						log(this.name + " standby");
						this.fireEvent("standby", this);
					}, this);					
				}, this )
				.fireEvent( "enter", this, this.cell.x, this.cell.y );
			}
		}
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
		if (faction instanceof Unit) {
			faction = faction.faction;
			team = faction.team;
		}
		return faction == this.faction && team != this.team;
	},
	//同一阵营 同一队伍	
	isSibling	: function( faction, team ){
		if (faction instanceof Unit) {
			faction = faction.faction;
			team = faction.team;
		}		
		return faction == this.faction && team == this.team;
	},
	//不同阵营
	isEnemy	: function( faction, team ){
		if ( faction instanceof Unit )
			faction = faction.faction;
			
		return faction != this.faction;
	},
	//同一阵营
	isBrother	: function( faction, team ){
		if ( faction instanceof Unit )
			faction = faction.faction;		
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
			log( this.name + "upgrade"  );
			this.bindEvent( "upgrade", function(){
						var callback = function(){
							//继续升级
							if ( this.exp >= this.nextExp() )
								this.onUpgrade( fn, scope );
							else{
								if ( fn )
									fn.call( scope ||  this, this );
							} 
						};
						if ( this.auto )
							callback.call( this );
						else	
							this.speak(  "我升级了",  callback, this  );  
				   }, this )
				   .fireEvent( "upgrade", this );
				   
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
		this.ui.speak();
		
		if ( fn )
			this.on( "speak", fn, scope, { one : true } );
			
		PANEL.speak( this, text );
		
		return this;
	},
	//停止说话300ms后再触发speak事件
	stopSpeak : function(){
		if ( this.speaking ){
			this.ui.stopAnimation();
			this.speaking = false;	
						
			setTimeout( bind(function(){
				this.fireEvent( "speak", this );
			}, this ), 300 );			
		}
		return this;
	},
	
	disappear	: function( fn, scope ){
		this.ui.disappear( function(){
			this.onDead();
			if ( fn )
				fn.call( scope|| this );
		}, this );
	},
	
	//增加角色状态
	addBuff	: function( name, fn, scope ){
		var config = $.extend( BUFFS[ name ],  { id : name } );
		var buff = new Stuff( config );
		
		//失效后删除buff
		buff.on( "invalid", this.delBuff, this );
		
		this.ui.addBuff( buff, function(){
			this.buffs[ name ] = buff;
			
			if ( fn )
				fn.call( scope || this, this, buff );
			
		}, this );
		
		return this;
	},
	
	delBuff	: function( name ){
		if ( name instanceof Buff )
			name = name.id;
		
		this.buffs[ name ] = null;
		delete this.buffs[ name ];
		
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
	},
	
	//获得物品
	gainStuff	: function( stuff, num, fn, scope ){
		if ( !(stuff instanceof Stuff) )
			stuff = Pocket.get( stuff );
			
		this.ui.gainStuff( stuff, function(){
			stuff.count += num;
			
			if ( fn )
				fn.call( scope || this, this, stuff );
			
		}, this );

		return this;
	},
	
	choose	: function( title, options, fn, scope ){
		PANEL._choose( this.face, title, options, fn, scope );
	},
	
	//后出现在战场上
	//可传x,y 也可省略
	appear		: function( x, y, fn, scope ){
		if ( $.isFunction( x ) ){
			fn = x;
			scope = y;
		}else{
			this.gx = x;
			this.gy = y;
		}

		this.setCell();
		this.visiable = true;
		this.layer.showAt( this );
		
		if ( fn )
			this.on( "appear", fn, scope, { one : true } );
		
		this.ui.appear( function(){
			this.fireEvent( "appear", this );
		}, this );
	}
}); 

$.extend( Unit, {
	//计算升级所需经验
	//每升一级需额外50点 起始值100
	calcExp 				:	function( level ){
		return (level -1) * 50 + 100;
	},
	//通过伤敌血量获得经验值
	//没3级一格档次,共五档
	//120% 110% 100% 70% 50%
	addition				: [ 0.5, 0.7, 1 , 1 ,1.1 ,1.2],
	getExpByBlood	: function( attacker, casualty, v ){
		var diff = Math.ceil( ( casualty.level - attacker.level ) / 3 ) + 2,
				index = Math.max( Math.min( diff, 5 ) , 0 );
		return  parseInt( Unit.addition[ index ] * v );
	},
	//自增长ID
	count :  0,
	ID 						: function(){
		return ++Unit.count;
	}
} );

