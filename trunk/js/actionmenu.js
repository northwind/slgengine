/*
	角色移动后弹出的菜单项
*/
var ActionMenu = Win.extend({
	unit	: null,
	beshow : false, 	//鼠标右键是否该重新现实
	lock	: false,   //锁定不可操作
	
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
		this.unit.showAttack();
		this.hide();
		this.beshow = true;
		
		this.preAttack =  function(){
			this.lock = true;
			this.unit.on( "standby", function(){
				//攻击后
				this.lock = false;
				this.beshow = false;
				this.hide();
				delete this.unit;
				
			}, this, { one : true } );
		};
		//角色攻击前触发事件
		this.unit.on( "preAttack", this.preAttack, this ,{ one : true });
	},
	
	onMagic	: function( e ){
		alert( "magic : " +  e.which );
	},
	onProp	: function(e){
		if (!this.pocket) {
			this.pocket = new Pocket({
				ct	: this.ct
			});
			this.pocket.on( "hide", function(){
				this.show();
			}, this );
		}
		var x = this.el.position().left;
		var y = this.el.position().top;
		this.hide();
		
		this.pocket.showAt( x, y ).show();
	},
	
	onStandBy	: function( e ){
		this.unit.finish();
		this.onCansel();
	},
	
	//覆盖父类 增加角色回退功能
	onCansel	: function( e ){
		if (!this.lock) {
			if (this.beshow) {
				this.beshow = false;
				this.unit.hideAttack();
				this.show();
				//取消角色攻击前触发事件
				this.unit.un( "preAttack", this.preAttack, this );
			}
			else {
				this._super(e);
				this.unit.unClick();
				delete this.unit;
			}
		}
	},
	
	bind	: function( unit ){
		this.unit = unit;
		return this;
	}
	
});