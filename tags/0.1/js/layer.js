/**
 * @author Norris
 */

var Layer = Component.extend({
	
	init: function( config ){
		this.objects = [];
		
    	this._super( config );
		this.pri( config.level );
		
		return this;
  	},
		
	show	: function(){
		if (this.hidden) {
			for (var i = 0; i < this.objects.length; i++) {
				if ( this.objects[i].show )
					this.objects[i].show();
			};
			this._super();
		}
		return this;
	},	
	
	hide	: function(){
		if ( !this.hidden ) {
			for (var i = 0; i < this.objects.length; i++) {
				if (this.objects[i].hide)
					this.objects[i].hide();
			};
			this._super();
		}
		return this;
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
