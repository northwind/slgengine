/**
 * @author Norris
 */

var Pocket = Manager.extend({
	consumable : false, //是否可消耗
	effect	: 1, //对谁起作用 1 我军 2友军 4敌军 可以任意组合相加 
	
	
	init	: function(){
		this._super( arguments[0] );
		
		return this;
	},
	
	
	onUse	: function( unit ){
		
	}		
			
}); 