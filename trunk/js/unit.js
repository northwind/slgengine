/**
 * @author Norris
 */

var Unit = Component.extend({
	
	moveable:false,    		//是否可以移动
	type	:-1,			//类型
	tipable :false,			//是否有提示框
	active  : true,			//是否有效
	overlay	: true,			//是否可以叠加
	cell	: null,			//关联的CELL
	gx		: -1,			//所处行
	gy		: -1,			//所处列
	
	ui		: null,
	
	w		: CELL_WIDTH,
	h		: CELL_HEIGHT,
	
	init	: function( config ){
		this._super( config );

	},
	
	setCell		: function( cell ){
		
	},
	
	//绘制图像
	//继承者需要覆盖次方法
	//TODO 放到params中，做为可配全局变量
	draw	: function(){
		
		var o = {};
		switch( this.type ) {
			case 100:
				o.img = "images/caocao.png";
				o.frames = 4;
				break;
			case 101:
				o.img = "images/footman.png";
				this.overlay = false;
				break;
		}
		
		if (o.img) {
			this.position( this.gx * CELL_WIDTH, this.gy * CELL_HEIGHT );
			
			this.setAnimation( o );
		}	
		return this;	
	}
	
}); 