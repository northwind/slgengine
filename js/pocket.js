/**
 * @author Norris
 * 物品库存
 */

var Pocket = Manager.extend({
	ui		: null,
	
	init	: function(){
		this.items = {};

		this._super( arguments[0] );
		
		this.ui = new PocketUI();
		
		return this;
	},
	
	initStuff	: function( stuff ){
		
		for (var i=0; i<stuff.length; i++) {
	
		};
		
	},
	
	setData	: function( datas ){
		
	}	
			
}); 


