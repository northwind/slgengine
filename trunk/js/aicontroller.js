/**
 * AI控制器
 * 负责开启与关闭AI
 */
var AIController = Observable.extend({
	teamAI	: null,
	runing	: false,
	
	init: function(){
		this._super(arguments[0]);
		
		
		
		return this;
	},
	
	start	: function(){
		PANEL.on( "teamStart", this.onTeamStart, this );
		PANEL.on( "teamEnd", this.onTeamEnd, this );
	},
	
	getAITeam	: function(){
		if ( !this.teamAI ){
			this.teamAI = new AITeam();
		} 
		return this.teamAI;
	},
	
	onTeamStart	: function( team ){
		log( "team start : faction = " + team.faction + " team = " + team.team );
		log( "running = " + this.runing );
		if ( !this.runing && (team.faction != FACTION || team.team != TEAM) ){
			this.runing = true;
			this.team = team;
			this.getAITeam().start( team );
		} 
	},
	
	onTeamEnd	: function( team ){
		if ( this.runing && (team.faction == this.team.faction  && team.team == this.team.team ) ){
			this.runing = false;
			this.getAITeam().stop( team );
			delete this.team;
		} 
	}	
	
}); 

AIController = new AIController();
