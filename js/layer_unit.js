/**
 * @author Norris
 */

var UnitLayer = Layer.extend({
	clicked : null,
	
	init	: function(){
		this._super( arguments[0] );
		this.units = [];
		return this;
	},
	
	setData : function( data ){
		this.data = data;
		return this;
	},
	
	play		: function(){
		for( var key in this.units )
			this.units[ key ].play();

		return this;
	},
	
	stop		: function(){
		for( var key in this.units )
			this.units[ key ].stop();
						
		return this;
	},
	
	paint	: function(){
		if (this.data) {
			for (var i = 0; i < this.data.length; i++) {
				var item = this.data[i];
				this.units[ PANEL.getIndex( item.gx, item.gx) ] = this._initUnit(item);
			}	
		}
		
		PANEL.on("click", this.onClick, this); 
		PANEL.on("contextmenu", this.onContextmenu, this); 
		
		return this;
	},
	
	onClick	: function( e, cell, p ){
			var tmp = this.units[ p.index ];
			if ( tmp && tmp != this.clicked ){
				if ( this.clicked ){
					this.clicked.unclick();
				}
				
				this.clicked = tmp.click();
			}		
	},
	onContextmenu	: function( e ){
			if ( this.clicked )
				this.clicked.unclick();	
			
			delete this.clicked;	
	},	
	
	_initUnit	: function( config ){
		config.ct = this.el;
		//»æÍ¼		
		return (new Unit(config )).draw();
	}
}); 