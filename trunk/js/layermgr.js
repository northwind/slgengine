/**
 * @author Norris
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
									w	: w,
									h  : h									
						} );
		
		this._super( l );
		return l;
	}
	
});
//µ¥ÀýÄ£Ê½
LayerMgr = new LayerMgr();
