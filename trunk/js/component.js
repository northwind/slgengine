/**
 * @author Norris
 */

var Component = Observable.extend({
	hidden	: false,
	absolute: true,
	
	init: function( config ){
		this._super( config );
		
		this.addEvents( "hide", "show" );
		
    	if ( !this.el )
			this.el = $("<div/>");
		else
			this.el = $( this.el );	
		
		if ( this.w )
			this.width( this.w );
		
		if ( this.h )
			this.height( this.h );
			
		if ( this.cls )
			this.el.addClass( this.cls );	

		return this;	
  	},
	
	showAt	: function( x,y ){
		if ( x.constructor == Array )
			return arguments.callee( x[0], x[1] );
		else if ( typeof x == "object" )
			return arguments.callee( x.left, x.top );	
		else if ( typeof x == "number" && typeof y == "number" )
			this.el.css({
				left	: x,
				top		: y
			});		
			
		return this;	
	},
	
	width	: function( w ){
		return this.el.width( w );
	},
	
	setBgImage : function( img ){
		this.el.css("background-image", "url(" + img + ")")
			.addClass("unselect");
		return this;
	},
	
	setBgColor : function( clr ){
		this.el.css("backgroundColor", clr);
		return this;
	},	
	
	height	: function( h ){
		return this.el.height( h );
	},	
	
	pri		: function( level ){
		if (typeof level == "number") {
			this.el.css("zIndex", this._pri = level);
			return this;
		}
		else
			return this.el.css("zIndex");
	},
	
	show	: function(){
		if (this.hidden) {
			this.hidden = false;
		
			this.el.show.apply( this.el, arguments );
			this.fireEvent( "show", this );
		}
		return this;
	},	
	
	hide	: function(){
		if ( !this.hidden) {
			this.hidden = true;
		
			this.el.hide.apply( this.el, arguments );
			this.fireEvent( "hide", this );
		}
		return this;
	},		
	
	destroy	: function(){
		if ( this.el )
			this.el.remove();
	}
});