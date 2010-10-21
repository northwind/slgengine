/**
 * 队伍AI
 * 负责协调调度各个角色执行顺序
 */
var AIUnit  = Observable.extend({
	unit	: null,
	enemy	: null,
	
	init	: function(){
		this._super( arguments[0] );
		this.addEvents( "end" );
		
		return this;
	},
	
	start	: function( unit ){
		this.unit  = unit;
/*
		this.unit.on( "standby", function(){
			this.fireEvent( "end", this.unit, this );
		}, this,  { one : true } );

*/		
		this.unit.auto = true;
		
		this.enemy = this.scanEnemy();
		this.fight( this.enemy );
	},
	
	end	: function(){
		this.unit.on( "standby", function(){
			var unit = this.unit;
			delete this.unit;
			delete this.enemy;
			this.fireEvent( "end", unit, this );
		}, this,  { one : true } );
		
		this.unit.finish();
	},
	
	fight	: function( neighbor ){
		if ( this.canAttack( neighbor ) ){
			this.attack( neighbor );
		}else{
			this.closeTo( neighbor );
		}
	},
	
	attack	: function( enemy ){
		var near = this.nearCell( enemy );
		this.unit.go( near, function(){
			this.unit.on( "attack", this.end, this, { one : true } );
			this.unit.attack( enemy );			
		}, this );
	},
	
	closeTo	: function( enemy ){
		var cell = this.nearCell( enemy );
		if ( cell ){
			this.unit.on( "move", function(){
				this.end();
			}, this, { one:true } );
			this.unit.go( cell );
		}else{
			//没有可移动的
			this.end();
		}
	},
	
	canAttack	: function( enemy ){
		var cell = this.nearCell( enemy );
		if (!cell) 
			return false;
		else {
			if ( enemy.cell.distance(cell) == 1) {
				//走到最近了
				return true;
			}
			else {
				return this.isInRange(  enemy.cell );
			}
		}
	},
	
	//找到离敌人最近可移动到的单元格
	nearCell	: function( enemy ){
		var walkCells = PANEL.unitsLayer.getWalkCells( this.unit.cell, this.unit.step ),
			   min = 10000, near = null, origin = enemy.cell;
		for( var index in walkCells ){
			var cell = walkCells[ index ], d = origin.distance( cell ), 
					unit = PANEL.unitsLayer.getUnit( cell.index );
			//排除已站人的单元格		
			if ( (!unit || ( unit && unit.overlay ) ) && d < min ){
				min = d;
				near = cell;
				//已走到最近则跳出循环
				if ( min == 1 )
					break;
			}
		}
		
		return near;
	},
	
	isInRange	: function( cell ){
		var attackCells = PANEL.unitsLayer.getAttackCells( this.unit.cell, this.unit.range, this.unit.rangeType );
		return attackCells.hasOwnProperty( cell.index );
	},
	
	stop	: function(){},
	
	//找到离自己最近的敌人
	scanEnemy	: function(){
		var units = PANEL.unitsLayer.units, min = 10000, neighbor = null, origin = this.unit.cell,
				faction = this.unit.faction;
				
		for( var key in units ){
			var unit = units[ key ];
			if ( unit.isEnemy( faction ) ){
				var d = origin.distance( unit.cell );
				if ( d < min  ){
					min = d;
					neighbor = unit;
				}				
			}
		}
		
		return neighbor;
	}
		
}); 

