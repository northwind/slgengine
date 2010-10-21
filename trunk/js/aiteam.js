/**
 * 队伍AI
 * 负责协调调度各个角色执行顺序
 */
var AITeam = Observable.extend({
	team	: null,
	units	: null,
	mode	: null, //TODO 每个角色拥有各自的AI逻辑
	suspend : false,
	
	init	: function(){
		this._super( arguments[0] );
		
		this.units = {};
		this.mode = new AIUnit();
		this.mode.on( "end", this.onModeEnd, this );
		
		return this;
	},
	
	start	: function( team ){
		this.team = team;
		this.scanUnits();
		this.analyze();
	},
	
	onModeEnd	: function( unit ){
		for( var key in this.units ){
			var u = this.units[ key ];
			if ( u.id == unit.id ){
				delete this.units[ key ];
				break;
			}
		}
		this.analyze();
	},
	
	//分析执行顺序
	analyze	: function(){
		for( var key in this.units ){
			var unit = this.units[ key ];
			this.mode.start( unit );
			break;
		}
	},
	
	stop	: function( team ){
		this.units = {};
	},
	
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

