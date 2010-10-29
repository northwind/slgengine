/**
 * 队伍类
 * 管理整个个队伍中的单位，检测回合结束与是否都阵亡等
 * 触发teamStart,teamEnd,teamOver
 */
var Team = Manager.extend({
	
	init	: function(){
		this.addEvents( "start","end","over" );
		this._super( arguments[0] );
		
		return this;
	},
	
	add		: function(){},
	remove	: function(){},
	
	members	: function(){
		return this.items;
	},
	
	destroy	: function(){
		
	}
	
});
