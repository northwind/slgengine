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
		if ( !this.runing && (team.faction != FACTION || team.team != TEAM) ){
			this.runing = true;
			this.getAITeam().start( team );
		} 
	},
	
	onTeamEnd	: function( team ){
		if ( this.runing && (team.faction != FACTION || team.team != TEAM) ){
			this.runing = false;
			this.getAITeam().stop( team );
		} 
	}	
	
}); 

AIController = new AIController();
