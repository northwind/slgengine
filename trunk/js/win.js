/**
 * @author Norris
 */

var Win = Component.extend({
	cls		: "_win",
	
	init: function( config ){
		this._super( config );
		
		var _self = this;
		this.content = $("<div>").appendTo( this.el );
		this.cansel	 = $("<button>").addClass("_cansel").text("取消").wrap("<div></div>")
								.click( function(){
									_self.hide();
								} )
								.appendTo( this.el )
								;
		
		return this;	
  	},
	
	showAt	: function( x, y ){
		
		
		this._super( x, y );
		
		
		return this;
	}
	
});

var ActionMenu = Win.extend({
	
	init: function( config ){
		this._super( config );
		
		this.ul = $("<ul>").appendTo( this.content );
		
		this.btnAttack = this.createAction( "进攻", "images/system/1-1.png", this.onAttack );
		this.btnAttack = this.createAction( "策略", "images/system/76-1.png", this.onMagic );
		this.btnAttack = this.createAction( "道具", "images/system/82-1.png", this.onProp );
		this.btnAttack = this.createAction( "待命", "images/system/98-1.png", this.onStandBy );
		
		
		
		return this;	
  	},
	
	createAction	: function( text, img, onclick ){
		var li = $("<li>").appendTo( this.ul ), _self = this;;
		var btn = $("<button>").text( text ).css( "background-image", "url(" + img + ")" ) .click( function( e ){
			onclick.call( _self, e, text );
		} ).appendTo( li );
		
		return btn;
	},
	
	onAttack	: function(){
		alert(1);
	},
	
	onMagic	: function(){},
	onProp	: function(){},
	onStandBy	: function(){}
	
});