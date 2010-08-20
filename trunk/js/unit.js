/**
 * @author Norris
 */

var Unit = Component.extend({
	name	: "footman",
	moveable:false,    		//是否可以移动
	type	:-1,			//类型
	tipable :false,			//是否有提示框
	active  : true,			//是否有效
	overlay	: false,			//是否可以叠加
	//cell	: null,			//关联的CELL
	gx		: -1,			//所处行
	gy		: -1,			//所处列
	step		: 5,          //行动力
	range	: 1, 			//攻击长度
	rangeType : 1,      //攻击类型
	
	ui		: null,
	
	w		: CELL_WIDTH,
	h		: CELL_HEIGHT,
	
	init	: function( config ){
		this.moves	= {};
		this.attacks= {};
		
		this._super( config );
	//	this.setCell( PANEL.getCell(  this.gx, this.gy  ) );
		
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
			//寻路
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
					//回调
					_self.setCell(cell);
					if (fn) 
						fn.call(scope || _self, _self);
				}
			})();
		}
		
		return this;
	},
	
	//迭代
	standCell	: null,	
	_move	: function( fn, scope ){
		//if(  )
	},
	
	attack			: function( cell ){
		
	}	
}); 