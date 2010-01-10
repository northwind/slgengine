/**
 * @author Norris
 */

var UnitLayer = Layer.extend({
	
	init	: function(){
		this._super.apply( this, arguments );
		this.units = [];
		return this;
	},
	
	setData : function( data ){
		this.data = data;
		return this;
	},
	
	play		: function(){
		$( this.units ).each( function(){
			this.play();
		} );		
		return this;
	},
	
	stop		: function(){
		$( this.units ).each( function(){
			this.stop();
		} );				
		return this;
	},
	
	paint	: function(){
		if (this.data) {
			for (var i = 0; i < this.data.length; i++) {
				var item = this.data[i];
				this.units.push(this._initUnit(item));
			}	
		}
		return this;
	},
	
	_initUnit	: function( config ){
		config.ct = this.el;
		//»æÍ¼		
		return (new Unit(config )).draw();
	}
}); 