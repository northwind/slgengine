/**
 * 状态类
 * 每个物品都有 apply 方法，使用后调用该方法
 */
var Buff = Observable.extend({
	id		: "", 
	img		: "", //图片
	desc	: "", //描述
	active  : false, //是否生效
	unit		: null,
	w	: 0,
	h  : 0,
	
	init	: function(){
		this.addEvents( "load","apply" );
		this._super( arguments[0] );
		
		return this;
	},
	
	apply	: function( units ){
	},
	
	onApply	: function( unit ){
	}	
}); 