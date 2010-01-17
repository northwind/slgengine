/**
 * @author Norris
 */

var Unit = Component.extend({
	
	moveable:false,    		//是否可以移动
	type	:-1,			//类型
	tipable :false,			//是否有提示框
	active  : true,			//是否有效
	overlay	: false,			//是否可以叠加
	cell	: null,			//关联的CELL
	gx		: -1,			//所处行
	gy		: -1,			//所处列
	step		: 5,          //行动力
	range	: 1, 			//攻击长度
	rangeType : 1,      //攻击类型
	
	ui		: null,
	
	w		: CELL_WIDTH,
	h		: CELL_HEIGHT,
	
	init	: function( config ){
		this.walks	= {};
		this.attacks= {};
		
		this._super( config );
		this.setCell( PANEL.getCell(  this.gx, this.gy  ) );
		
		return this;
	},
	
	setCell		: function( cell ){
		this.cell = cell;
		return cell.unit  = this;
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
	},
	
	unclick	: function(){
		$.each( this.walks || {} , function(){
			this.recover();
		} );
		delete this.walks;
		
		$.each( this.attacks || {} , function(){
			this.hideAttack();
		} );			
		delete this.attacks;
		
		return this;
	},
	
	click		: function(){
		this.getWalks();
		$.each( this.walks || {} , function(){
			this.highlight();
		} );
		
		this.getAttacks();
		$.each( this.attacks || {} , function(){
			this.showAttack();
		} );		
		
		return this;		
	},
	
	getWalks	: function(){
		this.walks = PANEL.getActiveCells( this.cell, this.step );
	},
	
	getAttacks	: function(){
		this.attacks = PANEL.getAttackCells( this );	
	}
	
}); 