/**
 * 队伍AI
 * 负责协调调度各个角色执行顺序
 */
var AITeam = Observable.extend({
	unit	: null,
	units	: null,
	mode	: null, //TODO 每个角色拥有各自的AI逻辑
	running : false,
	suspend	: false,	//暂停
	
	init	: function(){
		this._super( arguments[0] );
		
		this.units = {};
		this.mode = new AIUnit();
		this.mode.on( "end", this.onModeEnd, this );
		
		return this;
	},
	
	start	: function(){
		log("aiteam start");
		this.running = true;
		this.scanUnits();
		this.analyze();
	},
	
	onModeEnd	: function( unit ){
		log( "aiteam : onModeEnd : " + unit.name );
		delete this.unit;
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
		if (!this.suspend) {
			for (var key in this.units) {
				this.unit = this.units[key];
				this.mode.start(this.unit);
				return;
			}
			log( "aiteam : no next unit " );
		}
	},
	
	stop	: function(){
		this.running = false;
		delete this.team;
	},
	
	pause	: function(){
		this.suspend = true;
		if ( this.running ) {
			if ( this.unit )
				this.mode.pause( this.unit );
		}
	},
	
	goon	: function(){
		this.suspend = false;
		if ( this.running ) {
			
			if ( this.unit )
				this.mode.goon( this.unit );
			else
				this.analyze();	//寻找下一个	
		}else{
			this.start();	//开始运行
		}
	},	
	
	//扫描自己人
	scanUnits	: function(){
		this.units = PANEL.unitsLayer.getTeamMember( this.team.faction, this.team.team );
	},
	
	bind	: function( team ){
		this.team = team;
	}	
}); 

