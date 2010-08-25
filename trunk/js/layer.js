/**
 * @author Norris
 */

var Layer = Component.extend({
	
	init: function( config ){
		this.objects = [];
		
		this.el = this.el || 
						$("<canvas>").attr( { width: config.wCanvas, height : config.hCanvas } ) ;
		
    	this._super( config );
		this.pri( config.level );
		
		if ( this.el[0].getContext )
			this.ctx= this.el[0].getContext("2d");
		
		//canvas的宽高必须通过属性设置
		//设置后copy值
		this.w = config.wCanvas;
		this.h = config.hCanvas;
		
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
