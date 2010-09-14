/**
 * @author Norris
 * 只继承 Observable
 */

var Layer = Observable.extend({
	
	init: function( config ){
		this.objects = [];
		
    	this._super( config );
		//加载完毕后执行init事件
		this.addEvents( "init" );
		
		return this;
  	},
		
	show	: function(){
		if (this.hidden) {
			for (var i = 0; i < this.objects.length; i++) {
				if ( this.objects[i].show )
					this.objects[i].show();
			};
		}
		return this;
	},	
	
	hide	: function(){
		if ( !this.hidden ) {
			for (var i = 0; i < this.objects.length; i++) {
				if (this.objects[i].hide)
					this.objects[i].hide();
			};
		}
		return this;
	},
	
	//interface
	clear	: function(){
		
	},		
	
	destroy	: function(){
		//销毁这层上的所有单元
		for (var i=0; i< this.objects.length; i++) {
			if ( this.objects[i].destroy )
				this.objects[i].destroy();
		};
	
		this._super();
	}
});
