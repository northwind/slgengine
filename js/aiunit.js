/**
 * 队伍AI
 * 负责协调调度各个角色执行顺序
 */
var AIUnit  = Observable.extend({
	unit	: null,
	enemy	: null,
	running	: false,
	suspend : false,
	
	init	: function(){
		this.addEvents( "end" );
		this._super( arguments[0] );
		
		return this;
	},
	
	start	: function( unit ){
		log( "aiunit start : " + unit.name );
		this.unit  = unit;
		
		this.unit.on( "standby", function( unit ){
			delete this.enemy;
			delete this.unit;			
			this.fireEvent( "end", unit, this );
		}, this,  { one : true } );
		
		this.running = true;
		this.unit.auto = true;
		this.unit.followMe();

		this.enemy = this.scanEnemy();
		
		//有敌人并且未锁定时 发动攻击		
		if ( this.enemy && !this.unit.lock ) {
			this.fight(this.enemy);
		}else{
			this.end();
		}
	},
	
	end	: function(){
		this.running = false;
		this.unit.finish();
	},
	
	fight	: function( enemy ){
		var attackPoints = this.canAttack( enemy );
		if ( attackPoints ){
			this.attack( enemy, attackPoints );
		}else{
			this.closeTo( enemy );
		}
	},
	//移动后并攻击敌人
	attack	: function( enemy, points ){
		//获得移动距离最小的点
		var minD = 10000, cell = this.unit.cell, min;
		for( var index in points ){
			var d = cell.distance( points[index] );
			if ( minD > d ){
				minD = d;
				min = points[index];
			}
		}
		
		//没有移动 直接攻击
		if (min == cell) {
			this.sword(enemy);
		}
		else {
			//显示移动的单元格
			this.unit.showMoves();
			setTimeout(bind(function(){
				this.unit.clearMoves();
				
				this.unit.on("move", function(){
					this.sword(enemy);
				}, this, { 	one: true });
				this.unit.moveTo( min );
				
			}, this), 500);
		}
	},
	
	sword	: function( enemy ){
		//显示攻击的单元格
		this.unit.showAttack();
		setTimeout(bind(function(){
			this.unit.clearAttack();
			
			this.unit.on("attack", this.end, this, { one: true })
					 .attack(enemy);
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
	
	//判断是否可攻击
	//有返回可供攻击的单元格
	//没有返回false
	canAttack	: function( enemy ){
		var walks = this.unit.getMoves(), has = false, include = {},  eIndex = enemy.cell.index,
			range= this.unit.range, rangeType= this.unit.rangeType;
		//遍历所有移动单元格	
		for ( var index in walks ){
			//该单元格可以攻击到 则添加
			if ( PANEL.unitsLayer.getAttackCells(walks[index], range, rangeType)[ eIndex ] ) {
				has = true;
				include[index] = walks[index];
			}
		}
		
		return has ? include : false;
	},
	
	//找到可移动到的 离敌人最近的单元格
	nearCell	: function( enemy ){
		var walkCells = this.unit.getMoves(),
			   min = 10000, near = null, origin = enemy.cell;
		for( var index in walkCells ){
			var cell = walkCells[ index ], d = origin.distance( cell ), 
					unit = PANEL.unitsLayer.getUnitByIndex( cell.index );
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
	},
	
	pause	: function(){
		if ( this.running ) {
			this.suspend = true;
		}
	},
	
	goon	: function(){
		if ( this.running ) {
			this.suspend = false;
		}
	}
		
}); 

