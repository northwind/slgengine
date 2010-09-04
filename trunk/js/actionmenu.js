/*
	角色移动后弹出的菜单项
*/
var ActionMenu = Win.extend({
	unit	: null,
	
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
			//if (  e.which == 1 )
				onclick.call( _self, e, text );
		} ).appendTo( li );
		
		return btn;
	},
	
	onAttack	: function( e ){
		alert( "attck : " +  e.which );
	},
	
	onMagic	: function( e ){
		alert( "magic : " +  e.which );
	},
	onProp	: function(e){
		alert( "prop : " +  e.which );
	},
	onStandBy	: function( e ){
		alert( "stand : " +  e.which );
	},
	
	//覆盖父类 增加角色回退功能
	onCansel	: function( e ){
		this._super( e );
		PANEL.unitsLayer.unClick();
	}
	
});