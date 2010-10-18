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
		
		this.preAttack =  function(){
			this.layer.lock();
			this.unit.on( "standby", this.disappear, this, { one : true } );
		};
		//角色攻击前触发事件
		this.unit.on( "preAttack", this.preAttack, this ,{ one : true });
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
		if (!this.pocket) {
			this.pocket = new Pocket({
				ct	: this.ct
			});
			this.pocket.on( "over", this.disappear, this );
		}
		var x = this.el.position().left;
		var y = this.el.position().top;
		
		this.pocket.bind( this.unit ).showAt( x - 240 , y ).show();
		this.layer.reg( this.pocket );
	},
	
	onStandBy	: function(){
		this.disappear();
				
		this.unit.finish();
		delete this.unit;
	},
	
	disappear	: function(){
		//取消角色攻击前触发事件
		this.unit.un( "preAttack", this.preAttack, this );
		this.hide();
		this.layer.unreg( this );
		this.layer.unlock();		
	},
	
	//覆盖父类 增加角色回退功能
	onCansel	: function( e ){
		//取消角色攻击前触发事件
		this.unit.un( "preAttack", this.preAttack, this );
		this._super(e);
		this.unit.unClick();
		this.layer.unreg( this );
		delete this.unit;
	},
	
	bind	: function( unit ){
		this.unit = unit;
		return this;
	}
	
});