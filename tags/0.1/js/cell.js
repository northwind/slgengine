/**
 * @author Norris
 */

var Cell = Component.extend({
	gx	: -1, 	//在第几行
	gy	: -1,	//在第几列
	index : -1,
	unit	: null,
	
	cls : "_cell",
	w	: CELL_WIDTH,
	h	: CELL_HEIGHT,
	
	init	: function( config ){
		this._super( config );
		this.index = PANEL.getIndex( this.gx, this.gy );
		this.addEvents("click","unclick","over","leave");
		
		return this;
	},
	
	lightClass  : "_cellLight",
	highlight	: function(){
		this.el.addClass( this.lightClass );
		return this;
	},
	
	recover		: function(){
		this.el.removeClass( this.lightClass );
		return this;		
	},
	
	boxClass  : "_cellBox",
	select		: function(){
		this.el.width( CELL_WIDTH - 4 );
		this.el.addClass( this.boxClass );
		return this;		
	},
	unselect		: function(){
		this.el.removeClass( this.boxClass );
		this.el.width( CELL_WIDTH - 2* this.el.css("border-left-width") );
		return this;
	},
	
	clickClass  : "_cellClick",
	click		: function(){
		//this.el.addClass( this.clickClass );
		this.fireEvent("click", this);
		return this;		
	},
	unclick		: function(){
		//this.el.removeClass( this.clickClass );
		this.fireEvent("unclick", this);
		return this;
	},
		
	attackClass : "_cellAttack",
	showAttack		: function(){
		this.el.width( CELL_WIDTH - 4 );
		this.el.addClass( this.attackClass );
		return this;		
	},
	hideAttack		: function(){
		this.el.removeClass( this.attackClass );
		this.el.width( CELL_WIDTH - 2* this.el.css("border-left-width") );
		return this;
	},	
	
	getUp	: function(){
		return PANEL.getCell( this.gy -1, this.gx );
	},
	
	getDown	: function(){
		return PANEL.getCell( this.gy +1, this.gx );
	},
	
	getLeft	: function(){
		return PANEL.getCell( this.gy , this.gx -1 );
	},
	
	getRight	: function(){
		return PANEL.getCell( this.gy , this.gx +1 );
	},
	
	getUpLeft	: function(){
		return PANEL.getCell( this.gy -1, this.gx -1 );
	},
	
	getUpRight	: function(){
		return PANEL.getCell( this.gy -1, this.gx + 1 );
	},
	
	getDownLeft	: function(){
		return PANEL.getCell( this.gy +1, this.gx -1 );
	},
	
	getDownRight	: function(){
		return PANEL.getCell( this.gy +1, this.gx + 1 );
	},					
	
	/*	判断传入的CELL在自己的哪个方向
	 * 			4		3		2
	 * 			1		0		-1
	 * 			-2		-3		-4
	*/	
	direct	: function( to ){
		return (to.gy - this.gy) * 3 + to.gx - this.gx;
	}
}); 