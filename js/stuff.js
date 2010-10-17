/**
 * 物品类
 * 每个物品都有 apply 方法，使用后调用该方法
 */

var Stuff = Observable.extend({
	id		: "", 
	img		: "", //图片
	desc	: "", //描述
	active  : false, //是否生效
	consumable : false, //是否可消耗
	effect	: 1, //对谁起作用 1 我军 2友军 4敌军 可以任意组合相加 
	count	: 1, //数量
	range	: 1, 			//攻击长度
	rangeType : 1,      //攻击类型	
	nounit	: false,	//是否需要选择角色
	
	init	: function(){
		this._super( arguments[0] );
		
		this.addEvents( "apply", "empty", "over" );
		
		return this;
	},
	
	//units : unit数组
	apply	: function( units ){
		if ( units && units.constructor == Array ){
			for (var i = 0; i < units.length; i++) {
				this.onApply( units[i] );	
			}			
		}else{
			this.onApply( units );
		}	
	},
	
	onApply	: function( unit ){
		this.hideAttack();
		//先执行动画
		unit.addTip( this.animation || {}, function(){
			//消耗型
			if( this.consumable ){
				this.count--;
			}
							
			this.fireEvent( "apply", unit, this.unit, this );
			
			//用光的时候
			if( this.count <= 0 ){
				this.fireEvent( "empty", this );
			}
			
			this.fireEvent( "over", this );
							
		}, this );
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