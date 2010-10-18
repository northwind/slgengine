/**
 * @author Norris
 * 只继承 Observable
 */
var Layer = Observable.extend({
	hidden : false,
	
	init: function( config ){
		this.items = new Manager();
		
    	this._super( config );
		//加载完毕后执行init事件
		this.addEvents( "init" );
		
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
		
	},		
	
	destroy	: function(){
		//销毁这层上的所有单元
		this.items.each( function(){
			if ( this.destroy )
				this.destroy();
		} );
	
		this._super();
	}
});
