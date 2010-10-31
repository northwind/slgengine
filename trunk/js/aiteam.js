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
		log( "aiunit : end : " + unit.name );
		delete this.units[ unit.id ];
		delete this.unit;
		this.analyze();
	},
	
	//分析执行顺序
	analyze	: function(){
		if (!this.suspend) {
			for (var key in this.units) {
				var unit = this.units[key];
				this.unit = unit;
				this.mode.start(this.unit);
				return;
			}
			log( "aiteam : no next unit " );
		}
	},
	
	stop	: function(){
		this.running = false;
		delete this.team;
		//delete this.units;	//不删除units aiunit.end事件 迟到反馈
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
		var units = this.team.members();
		this.units = {};
		for( var key in units )
			this.units[ key ] = units[ key ];  
	},
	
	bind	: function( team ){
		this.team = team;
	}	
}); 

