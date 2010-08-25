/**
 * @author Norris
 */

var Win = Component.extend({
	cls		: "_win",
	
	init: function( config ){
		this._super( config );
		
		var _self = this;
		this.content = $("<div>").appendTo( this.el );
		this.cansel	 = $("<button>").text("取消").wrap("<div></div>")
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
		
		
		
		return this;	
  	}
	
});