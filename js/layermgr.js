/**
 * @author Norris
 */
var LayerMgr = Manager.extend({
	
	//��ʼ��ʱ��¼panel
	init	: function( panel ){
		return this._super();
	},
	
	setPanel	: function( panel ){
		this.panel = panel;
		return this;
	},
	
	reg		: function( level, w, h, layerDiff ){
		var obj = layerDiff || Layer, 
			l = new obj( { level : level, ct : this.panel.el } );
			
		l.width( w );
		l.height( h );
		
		this._super( l );
		
		return l;
	}
	
});
//����ģʽ
LayerMgr = new LayerMgr();
