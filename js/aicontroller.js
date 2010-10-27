/**
 * AI控制器
 * 负责开启与关闭AI
 * 主动轮询是否正在执行脚本，如果是则暂停
 */
var AIController = Observable.extend({
	teamAI	: null,
	running	: false,
	suspend	: false,	//暂停
	
	init: function(){
		this._super(arguments[0]);
		
		return this;
	},
	
	start	: function(){
		PANEL.on( "teamStart", this.onTeamStart, this );
		PANEL.on( "teamEnd", this.onTeamEnd, this );
		PANEL.on( "runScript", this.pause, this );
		PANEL.on( "stopScript", this.goon, this );
	},
	
	getAITeam	: function(){
		if ( !this.teamAI ){
			this.teamAI = new AITeam();
		} 
		return this.teamAI;
	},
	
	onTeamStart	: function( team ){
		if ( !this.running && (team.faction != FACTION || team.team != TEAM) ){
			log( "ai start : faction = " + team.faction + " team = " + team.team + " suspend = " + this.suspend );
			this.running = true;
			this.team = team;
			this.getAITeam().bind( team );
			
			if ( !this.suspend )
				this.getAITeam().start( team );
		} 
	},
	
	onTeamEnd	: function( team ){
		if ( this.running && (team.faction == this.team.faction  && team.team == this.team.team ) ){
			log( "ai end : faction = " + team.faction + " team = " + team.team );
			this.running = false;
			this.getAITeam().stop( team );
			delete this.team;
		} 
	},
	
	pause	: function(){
		log( "ai pause" );
		this.suspend = true;
		if (this.running) {
			this.getAITeam().pause();
		}
	},
	
	goon	: function(){
		log( "ai goon" );
		this.suspend = false;
		if (this.running) {
			this.getAITeam().goon();
		}
	}	
	
}); 

AIController = new AIController();
