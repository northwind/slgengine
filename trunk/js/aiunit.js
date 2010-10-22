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
		this.unit.showMe();
		this.enemy = this.scanEnemy();
		if (this.enemy) {
			this.fight(this.enemy);
		}else{
			//没有敌人时
			this.end();
		}
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
	//移动后并攻击敌人
	attack	: function( enemy ){
		//在攻击范围内直接攻击
		if (this.isInRange(enemy.cell)) {
			this.sword( enemy );
		}
		else {
			var near = this.nearCell(enemy);
			//显示移动的单元格
			this.unit.showMoves();
			setTimeout(bind(function(){
				this.unit.clearMoves();
				
				this.unit.on( "move", function(){
					this.sword( enemy );
				}, this, { one:true } );
				this.unit.moveTo(near );
				
			}, this), 500);
		}
	},
	
	sword	: function( enemy ){
		//显示攻击的单元格
		this.unit.showAttack();
		setTimeout(bind(function(){
			this.unit.clearAttack();
			
			this.unit.on("attack", this.end, this, {
				one: true
			});
			this.unit.attack(enemy);
		}, this), 500);		
	},
	
	//靠近敌人
	closeTo	: function( enemy ){
		var cell = this.nearCell( enemy );
		if ( cell ){
			//显示移动的单元格
			this.unit.showMoves();
			setTimeout( bind( function(){
				this.unit.clearMoves();
				
				this.unit.on( "move", function(){
					this.end();
				}, this, { one:true } );				
				this.unit.moveTo( cell );
						
			}, this), 500 );
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
		var walkCells = this.unit.getMoves(),
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
		var attackCells = this.unit.getAttacks();
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
