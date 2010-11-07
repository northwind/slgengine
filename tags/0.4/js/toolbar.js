/**
 * 工具条
 * 每个按钮拥有一个对应的事件，点击后触发
 */
var Toolbar  = Observable.extend({
	active	: false,
	
	init	: function(){
		this.addEvents( "endTeam","saveGame","loadGame","condition","restart", "mute" );
		this._super( arguments[0] );
		
		return this;
	},
	
	start	: function( unit ){
		PANEL.unitsLayer.on( "teamStart", this.onTeamStart, this )
						.on( "teamEnd", this.onTeamEnd, this );
		
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
			PANEL.unitsLayer.finishTeam( FACTION, TEAM );
		}, this );	
		
		this.on("condition", function(){
			PANEL.showGoal();
		});
		
		this.el.find( "#mute" ).unbind("click").toggle( function(){
			SoundMgr.turnOff();
			$(this).html( "开启音效" );
		}, function(){
			SoundMgr.turnOn();
			$(this).html( "关闭音效" );
		} );	
		
		this.on("script", function(){
			alert( "制作中，敬请期待" );
		});		
	},

	onTeamStart	: function( team ){
		if ( team == MYTEAM ){
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
