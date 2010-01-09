/**
 * @author Norris
 */

var Cell = Component.extend({
	gx	: -1, 	//在第几行
	gy	: -1,	//在第几列
	
	cls : "_cell",
	w	: CELL_WIDTH,
	y	: CELL_HEIGHT,
	
	init	: function( config ){
		this._super( config );
		
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
	showBox		: function(){
		this.el.addClass( this.boxClass );
		return this;		
	},
	hideBox		: function(){
		this.el.removeClass( this.boxClass );
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