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
	last	: 0, 	//持续回合数
	
	init	: function(){
		this.addEvents( "invalid" );
		this.addEvents( { name : "apply", type :2 } );
		
		this._super( arguments[0] );
		
		this.bindEvent( "apply", this.afterApply, this );
		
		return this;
	},
	
	apply	: function( unit ){
		this.onApply( unit );
	},
	
	onApply	: function( unit ){
		//减少持续回合数
		if( this.last == 0 ){
			this.fireEvent( "invalid", this );
			return;
		}
		this.last--;
							
		this.fireEvent( "apply", unit, this );
	},
	
	afterApply	: function(){
		
		this.fireEvent( "over", this );
		
	}
	
}); 