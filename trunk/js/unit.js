/**
 * @author Norris
 */

var Unit = Component.extend({
	
	moveable:false,    		//�Ƿ�����ƶ�
	type	:-1,			//����
	tipable :false,			//�Ƿ�����ʾ��
	active  : true,			//�Ƿ���Ч
	overlay	: true,			//�Ƿ���Ե���
	cell	: null,			//������CELL
	gx		: -1,			//������
	gy		: -1,			//������
	
	ui		: null,
	
	w		: CELL_WIDTH,
	h		: CELL_HEIGHT,
	
	init	: function( config ){
		this._super( config );

	},
	
	setCell		: function( cell ){
		
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
	}
	
}); 