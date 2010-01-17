/**
 * @author Norris
 */

var Unit = Component.extend({
	
	moveable:false,    		//�Ƿ�����ƶ�
	type	:-1,			//����
	tipable :false,			//�Ƿ�����ʾ��
	active  : true,			//�Ƿ���Ч
	overlay	: false,			//�Ƿ���Ե���
	cell	: null,			//������CELL
	gx		: -1,			//������
	gy		: -1,			//������
	step		: 5,          //�ж���
	range	: 1, 			//��������
	rangeType : 1,      //��������
	
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
	
	//����ͼ��
	//�̳�����Ҫ���Ǵη���
	//TODO �ŵ�params�У���Ϊ����ȫ�ֱ���
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