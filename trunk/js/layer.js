/**
 * 战场采用分层展示，该类是其他层的基类
 */
var Layer = Observable.extend({
	hidden : false,
	
	init: function( config ){
		this.items = new Manager();
		
    	this._super( config );
		
		return this;
  	},
		
	show	: function(){
		if (this.hidden) {
			this.hidden = false;
			this.items.each( function(){
				if ( this.show )
					this.show();
			} );
		}
		return this;
	},	
	
	hide	: function(){
		if ( !this.hidden ) {
			this.hidden = true;
			this.items.each( function(){
				if ( this.hide )
					this.hide();
			} );
		}
		return this;
	},
	
	//interface
	clear	: function(){
		
	}
});
