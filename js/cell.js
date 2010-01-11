/**
 * @author Norris
 */

var Cell = Component.extend({
	gx	: -1, 	//在第几行
	gy	: -1,	//在第几列
	
	cls : "_cell",
	w	: CELL_WIDTH,
	h	: CELL_HEIGHT,
	
	init	: function( config ){
		this._super( config );
		
		this.addEvents("click","unclick","over","leave");
		
		return this;
	},
	
	lightClass  : "_cellLight",
	highlight	: function(){
		this.el.addClass( this.lightClass );
		return this;
	},
	
	disable		: function(){
		this.el.removeClass( this.lightClass );
		return this;		
	},
	
	boxClass  : "_cellBox",
	select		: function(){
		this.el.addClass( this.boxClass );
		return this;		
	},
	unselect		: function(){
		this.el.removeClass( this.boxClass );
		return this;
	},
	
	clickClass  : "_cellClick",
	click		: function(){
		this.el.addClass( this.clickClass );
		this.fireEvent("click", this);
		return this;		
	},
	unclick		: function(){
		this.el.removeClass( this.clickClass );
		this.fireEvent("unclick", this);
		return this;
	},
		
	attackClass : "_cellAttack",
	showAttack		: function(){
		this.el.addClass( this.attackClass );
		return this;		
	},
	hideAttack		: function(){
		this.el.removeClass( this.attackClass );
		return this;
	},	
}); 