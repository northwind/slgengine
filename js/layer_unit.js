/**
 * @author Norris
 */

var UnitLayer = Layer.extend({
	
	init	: function(){
		this._super.apply( this, arguments );
		
		return this;
	},
	
	setData : function( data ){
		this.data = data;
		return this;
	},
	
	paint	: function(){
		if (this.data) {
			for (var i = 0; i < this.data.length; i++) {
				var items = this.data[i];
				for (var j = 0; j < items.length; j++) {
					this._initUnit(i, j, items[j]);
				}
			}
		}
		return this;
	},
	
	_initUnit	: function( x, y, type ){
		//»æÍ¼		
		( new Unit({
			gx	: x,
			gy	: y,
			type: type,
			ct	: this.el
		}) ).draw();
	}
}); 