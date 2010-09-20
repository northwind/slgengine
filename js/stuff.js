/**
 * @author Norris
 */

var Stuff = Observable.extend({
	id		: "", 
	img		: "", //图片
	desc	: "", //描述
	active  : false, //是否生效
	expendable : false, //是否可消耗
	effect	: 1, //对谁起作用 1 我军 2友军 4敌军 可以任意组合相加 
	count	: 1, //数量
	
	init	: function(){
		this._super( arguments[0] );
		
		this.addEvents( "use", "empty" );
		
		return this;
	},
	
	//units : unit数组
	apply	: function( units ){
		if ( units.constructor == Array ){
			for (var i = 0; i < units.length; i++) {
				this.onUse( units[i] );	
			}			
		}else{
			this.onUse( units );
		}	
		//消耗型
		if( this.expendable ){
			this.count--;
		}
		
		this.fireEvent( "use", this, units );
		//用光的时候
		if( this.count <= 0 ){
			this.fireEvent( "empty", this );
		}		
	},
	
	onUse	: function( unit ){
		
	}		
			
}); 