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
	
	//����ͼ��
	//�̳�����Ҫ���Ǵη���
	//TODO �ŵ�params�У���Ϊ����ȫ�ֱ���
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