/**
 * 队伍AI
 * 负责协调调度各个角色执行顺序
 */
var AIUnit  = Observable.extend({
	team	: null,
	units	: null,
	mode	: null, //TODO 每个角色拥有各自的AI逻辑
	
	init	: function(){
		this._super( arguments[0] );
		
		this.units = {};
		this.mode = new AIUnit();
				
		return this;
	},
	
	start	: function( team ){
		this.team = team;
		this.scanUnits();
		this.analyze();
	},
	
	//分析执行顺序
	analyze	: function(){
		for( var key in this.units ){
			var unit = units[ key ];
			this.mode.start( unit );
		}
	},
	
	stop	: function(){},
	
	//扫描自己人
	scanUnits	: function(){
		var units = PANEL.unitsLayer.units;
		for( var key in units ){
			var unit = units[ key ];
			if ( unit.isSibling( this.team.faction, this.team.team ) ){
				this.units[ key ] = unit;
			}
		}
	}
		
}); 

