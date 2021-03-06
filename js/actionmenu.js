/**
 * 角色移动后弹出的菜单项
*/
var ActionMenu = Win.extend({
	unit	: null,
	
	init: function( config ){
		this._super( config );
		
		this.ul = $("<ul>").appendTo( this.content );
		
		this.btnAttack = this.createAction( "进攻", "images/system/1-1.png", this.onAttack );
		this.btnMagic = this.createAction( "策略", "images/system/76-1.png", this.onMagic );
		this.btnProp = this.createAction( "道具", "images/system/82-1.png", this.onProp );
		this.btnStandby = this.createAction( "待命", "images/system/98-1.png", this.onStandBy );
		
		this.on( "show", this.onShow, this );
		
		return this;	
  	},
	
	createAction	: function( text, img, onclick ){
		var li = $("<li>").appendTo( this.ul ), _self = this;;
		var btn = $("<button>").text( text ).css( "background-image", "url(" + PATH + img + ")" ) .click( function( e ){
			//if (  e.which == 1 )
				if ( ($(this).attr( "disabled" )+"") != "true" )
					onclick.call( _self, e, text );
					
		} ).appendTo( li );
		
		return btn;
	},
	
	onShow		: function(){
		this._super();
		if ( !this.unit.hasMagic() ){
			this.btnMagic.attr( "disabled", "true" );
		}else{
			this.btnMagic.removeAttr( "disabled" );
		}
	},
	
	onKeydown	: function( e ){
		//空格时
		if (e.which == 32 ) {
			e.preventDefault();
			this.onStandBy();
		}		
	},
	
	onAttack	: function( e ){
		this.layer.concealWin();
		this.hide();
		this.unit.showAttack();
	},
	
	onMagic	: function( e ){
		if (!this.magicBox ) {
			this.magicBox = new MagicBox({
				ct	: this.ct
			});
			this.magicBox.on( "over", this.onStandBy, this );
		}
		var x = this.el.position().left;
		var y = this.el.position().top;
		
		this.magicBox.bind( this.unit ).showAt( x - 240 , y ).show();
		this.layer.reg( this.magicBox );
	},
	
	onProp	: function(e){
		if (!this.pocketWin) {
			this.pocketWin = new PocketWin({
				ct	: this.ct
			});
			this.pocketWin.on( "over", this.onStandBy, this );
		}
		var x = this.el.position().left;
		var y = this.el.position().top;
		
		this.pocketWin.bind( this.unit ).showAt( x - 240 , y ).show();
		this.layer.reg( this.pocketWin );
	},
	
	onStandBy	: function(){
		this.hide();
		this.unit.finish();
	},
	
	disappear	: function(){
		this.hide();
		this.layer.unreg( this );
		this.layer.unlock();		
	},
	
	//覆盖父类 增加角色回退功能
	cansel	: function( e ){
		if (this.unit) {
			this.unit.un("standby", this.cansel);
			this.unit.unClick();
			delete this.unit;
		}
		this._super(e);
		this.layer.unreg( this );
	},
	
	bind	: function( unit ){
		this.unit = unit;
		this.unit.un("standby", this.cansel);
		this.unit.on( "standby", this.cansel, this, { one : true } );
		return this;
	}
	
});