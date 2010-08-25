/**
 * @author Norris
 */

var Component = Observable.extend({
	hidden	: false,
	absolute: true,
	
	init: function( config ){
		this._super( config );
		
    	if ( !this.el )
			this.el = $("<div/>");
		else
			this.el = $( this.el );	
		//Ĭ�϶��Ǿ�Զ�λ
/*
		if ( this.absolute )
			this.el.css("position","absolute");
*/
		
		if ( this.w )
			this.width( this.w );
		
		if ( this.h )
			this.height( this.h );
			
		if ( this.cls )
			this.el.addClass( this.cls );	

		if ( this.ct )
			this.el.appendTo( this.ct );
								
		return this;	
  	},
	
	//TODO X Y �ߵ���
	showAt	: function( x,y ){
		if ( x == undefined )
			return this.el.position();
		else if ( x.constructor == Array )
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
			//��������קͼƬ
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
	
	 //���ȼ�
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
		}
		return this;
	},	
	
	hide	: function(){
		if ( !this.hidden) {
			this.hidden = true;
		
			this.el.hide.apply( this.el, arguments );
		}
		return this;
	},		
	
	destroy	: function(){
		if ( this.el )
			this.el.remove();
	}
});