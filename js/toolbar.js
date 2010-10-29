/**
 * 工具条
 * 每个按钮拥有一个对应的事件，点击后触发
 */
var Toolbar  = Observable.extend({
	active	: false,
	
	init	: function(){
		this.addEvents( "endTeam","saveGame","loadGame","condition","restart" );
		this._super( arguments[0] );
		
		return this;
	},
	
	start	: function( unit ){
		PANEL.on( "teamStart", this.onTeamStart, this );
		PANEL.on( "teamEnd", this.onTeamEnd, this );
		
		this.el = $("#toolbar").show();
		this.unactiveButtons();
		
		var _self = this;
		this.el.find("button").click( function(){
			_self.fireEvent( $(this).attr("param") );
		} );
		
		this.on( "restart", function(){
			window.location.reload();
		} );
		
		this.on( "endTeam", function(){
			PANEL.unitsLayer.endTeamUnits( FACTION, TEAM );
		}, this );	
		
		this.on("condition", function(){
			PANEL.showGoal();
		})	
	},

	onTeamStart	: function( team ){
		if ( team.faction == FACTION && team.team == TEAM ){
			this.active = true;
			this.activeButtons();
		}else{
			this.active = false;
			this.unactiveButtons();
		} 
	},
	
	onTeamEnd	: function(){
		this.active = false;
		this.unactiveButtons();
	},
	
	activeButtons	: function(){
		this.el.find(".active").removeAttr( "disabled" );
	},
	
	unactiveButtons	: function(){
		this.el.find(".active").attr( "disabled", "true" );
	}
				
}); 

var Toolbar = new Toolbar();
