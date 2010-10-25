/**
 * 层管理器
 * 采用canvas后基本不需要管理层
 */
var LayerMgr = Manager.extend({
	
	init	: function( panel ){
		return this._super();
	},
	
	setWrap	: function( wrap ){
		this.wrap = wrap;
	},
	
	reg		: function( level, w, h, layerDiff ){
		var obj = layerDiff || Layer, 
			l = new obj( { level : level, 
									ct : this.wrap,
									ctx: PANEL.ctx								
						} );
		
		this._super( level, l );
		return l;
	}
	
});
//单例
LayerMgr = new LayerMgr();
