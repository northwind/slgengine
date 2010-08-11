/**
 * @author Norris
 */

var Unit = Component.extend({
	name	: "footman",
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
		this.moves	= {};
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
		$.each( this.moves || {} , function(){
			this.recover();
		} );
		delete this.moves;
		
		$.each( this.attacks || {} , function(){
			this.hideAttack();
		} );			
		delete this.attacks;
		
		return this;
	},
	
	click		: function(){
		this.getWalks();
		$.each( this.moves || {} , function(){
			this.highlight();
		} );
		
		this.getAttacks();
		$.each( this.attacks || {} , function(){
			this.showAttack();
		} );		
		
		return this;		
	},
	
	getWalks	: function(){
		this.moves = PANEL.getActiveCells( this.cell, this.step );
	},
	
	getAttacks	: function(){
		this.attacks = PANEL.getAttackCells( this );	
	},
	
	canMove	: function( cell ){
		return this.moves && this.moves[ cell.index ];
	},
	
	canAttack	: function( cell ){
		return this.attacks && this.attacks[ cell.index ];
	},
	
	moveTo		: function( cell, fn, scope ){
		if( this.canMove( cell ) ){
			//Ѱ·
			var way = [];
			while( cell.parent && cell != this.cell ){
				way.push( cell );
				cell = cell.parent;
			}
			//way.push( this.cell );
			//way.reverse();
			
			var from = this.cell, _self=this, name = _self.name, urlImg;
			(function(){
				var to = way.pop();
				if (to) {
					switch ( to.direct( from ) ) {
						case 3:
							urlImg = "images/" + name +  "_up.png";
							break;
						case -3:
							urlImg = "images/" + name +  "_down.png";
							break;
						case 1:
							urlImg = "images/" + name +  "_left.png";
							break;
						case -1:
							urlImg = "images/" + name +  "_right.png";
							break;														
					}
					_self.setAnimation({
						img: urlImg
					}).play();
												
					_self.el.animate({
						top:  to.gy * CELL_HEIGHT,
						left:  to.gx * CELL_WIDTH
					}, arguments.callee);
												
					from = to;
				}
				else {
					//�ص�
					_self.setCell(cell);
					if (fn) 
						fn.call(scope || _self, _self);
				}
			})();
		}
		
		return this;
	},
	
	//����
	standCell	: null,	
	_move	: function( fn, scope ){
		//if(  )
	},
	
	attack			: function( cell ){
		
	}	
}); 