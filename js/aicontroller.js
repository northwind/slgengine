/**
 * AI控制器
 * 负责开启与关闭AI
 * 主动轮询是否正在执行脚本，如果是则暂停
 */
var AIController = Observable.extend({
	teamAI	: null,
	running	: false,
	suspend	: false,	//暂停
	active	: true,
	
	init: function(){
		this._super(arguments[0]);
		
		return this;
	},
	
	start	: function(){
		if ( !this.active )
			return;
			
		PANEL.on( "teamStart", this.onTeamStart, this )
					 .on( "teamEnd", this.onTeamEnd, this )
					 .on( "runScript", this.pause, this )
					 .on( "stopScript", this.goon, this );
	},
	
	getAITeam	: function(){
		if ( !this.teamAI ){
			this.teamAI = new AITeam();
		} 
		return this.teamAI;
	},
	
	onTeamStart	: function( team ){
		if ( !this.running && !team.equal( FACTION ,TEAM) ){
			log( "ai start : team = " + team.name + " suspend = " + this.suspend );
			this.running = true;
			this.team = team;
			this.getAITeam().bind( team );
			
			if ( !this.suspend )
				this.getAITeam().start( team );
		} 
	},
	
	onTeamEnd	: function( team ){
		if ( this.running && this.team.equal( team.faction ,team.team ) ){
			log( "ai end : team = " + team.name );
			this.running = false;
			this.getAITeam().stop( team );
			delete this.team;
		} 
	},
	
	pause	: function(){
		this.suspend = true;
		if (this.running) {
			log( "ai pause" );
			this.getAITeam().pause();
		}
	},
	
	goon	: function(){
		this.suspend = false;
		if (this.running) {
			log( "ai goon" );
			this.getAITeam().goon();
		}
	}	
	
}); 

AIController = new AIController();
