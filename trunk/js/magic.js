/**
 * 魔法类
 * 每个物品都有 apply 方法，使用后调用该方法
 */
var Magic = Observable.extend({
	id		: "", 
	name	: "",
	img		: "", //图片
	desc	: "", //描述
	active  : false, //是否生效
	effect	: 1, //对谁起作用 1 我军 2友军 4敌军 可以任意组合相加 
	range	: 1, 			//攻击长度
	rangeType : 1,      //攻击类型	
	nounit	: false,	//是否需要选择角色
	needMP	: 0, 
	animation : null,
	
	init	: function(){
		this._super( arguments[0] );
		
		this.animation = Animation.get( this.animation );
		
		this.addEvents( "apply", "over" );
		
		return this;
	},
	
	//units : unit数组
	apply	: function( cell, units ){
		this.hideAttack();
		
		//播放动画
		this.animation.position( cell.dx, cell.dy )
			.callback( function(){
				
				if ( units && units.constructor == Array ){
					for (var i = 0; i < units.length; i++) {
						this.onApply( units[i] );	
					}			
				}else{
					this.onApply( units );
				}			
				//TODO 每个unit执行动画后触发over
				this.fireEvent( "over", this, this.unit );
				this.unit.finish();	
			}, this );
			
		PANEL.playAnimation( this.animation );
		//减去MP
		this.unit.onDecreaseMP( this.needMP );
	},
	
	onApply	: function( unit ){
		this.fireEvent( "apply", unit, this.unit, this );
	},
	
	use		: function( unit ){
		this.bind( unit);
		this.showAttack();
	},
	
	showAttack	: function(){
		var unit= this.unit;
		var cell = unit.cell;
		//获得可攻击的格子
		obj = PANEL.unitsLayer.getAttackCells( unit.cell, this.range, this.rangeType );
		//添加自身
		obj[ cell.index ] = cell;
		
		PANEL.unitsLayer.showAttackCells( obj );
		this.attacks = obj;
		this.preAttack = true;
	},
	
	hideAttack	: function(){
		this.preAttack = false;
		delete this.attacks;
		PANEL.unitsLayer.showAttackCells( {} );
	},
	
	canAttack	: function( cell, unit ){
		var flag = false;
		
		if( ( this.nounit || !this.nounit && unit) && this.attacks && this.attacks[ cell.index ] ){
			//我军
			if ( this.effect & 1 ){
				flag = unit.isSibling( this.unit.faction, this.unit.team );
			}
			//友军
			if ( !flag && this.effect & 2 ){
				flag = unit.isFriend( this.unit.faction, this.unit.team );
			}
			//敌军
			if ( !flag && this.effect & 4 ){
				flag = unit.isEnemy( this.unit.faction, this.unit.team );
			}
		}
		return flag;
	},
		
	bind	: function( unit ){
		this.unit = unit;
		return this;
	}				
			
}); 

var MagicMgr = Manager.extend({
	get		: function( name ){
		var m = this._super( name );
		if (!m) {
			var config = $.extend( MAGICS[name], { id : name });
	
			m = new Magic( config );
			this.reg(name, m);
		}
		return m;	
	}
});
//单例
MagicMgr = new MagicMgr();