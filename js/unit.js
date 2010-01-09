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
	
	//绘制图像
	//继承者需要覆盖次方法
	//TODO 放到params中，做为可配全局变量
	draw	: function(){
		
		switch( this.type ) {
			case 0:
				this.img = "images/grass.png";
				break;
			case 1:
				this.img = "images/tree.png";
				this.overlay = false;
				break;
			case 2:
				this.img = "images/hill.png";
				this.overlay = false;
				break;				
		}
		
		if (this.img) {
			this.position( this.gx * CELL_WIDTH, this.gy * CELL_HEIGHT );
			
			this.setBgImage(this.img);
			
		}	
		return this;	
	}
	
}); 