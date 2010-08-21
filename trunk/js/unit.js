/**
 * @author Norris
 */

var Unit = Observable.extend({
	name	: "footman",
	moveable:false,    		//是否可以移动
	type	:-1,			//类型
	tipable :false,			//是否有提示框
	active  : true,			//是否有效
	overlay	: false,			//是否可以叠加
	gx		: -1,			//所处行
	gy		: -1,			//所处列
	step		: 5,          //行动力
	range	: 1, 			//攻击长度
	rangeType : 1,      //攻击类型
	
	timestamp	: 0,
	inter		: 300,
	p			: 1,
	team	: 1,		//所处队伍
	
	ui		: null,
	
	w		: CELL_WIDTH,
	h		: CELL_HEIGHT,
	
	init	: function( config ){
		this.moves	= {};
		this.attacks= {};
		this.pos = [0,  CELL_HEIGHT ];
		
		this._super( config );
		
		return this;
	},
	
	//绘制图像
	//继承者需要覆盖次方法
	//TODO 放到params中，做为可配全局变量
	draw	: function( timestamp ){
		var ctx = this.ctx;
		
		var diff = timestamp - this.timestamp;
		if (diff > this.inter) {
			this.p = this.p == 1 ? 0 : 1;
			this.timestamp = timestamp;
		}
		
		var y = this.pos[ this.p ];
		
		ctx.save();
		if (this.img) {
			ctx.drawImage( this.img, 0, y, CELL_WIDTH, CELL_HEIGHT ,
										this.gx * CELL_WIDTH, this.gy * CELL_HEIGHT,  CELL_WIDTH, CELL_HEIGHT);
		}else if ( this.urlImg ){
				this.img = new Image();
				var _self = this;
				this.img.onload = function(){
					ctx.drawImage( this, 0, y,  CELL_WIDTH, CELL_HEIGHT,
												_self.gx * CELL_WIDTH, _self.gy * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT );
				};
				this.img.src = this.urlImg;
		}	
		ctx.restore();
		
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
	
	canMove	: function( index ){
		return this.moves && this.moves[ index ];
	},
	
	canAttack	: function( index ){
		return this.attacks && this.attacks[ index ];
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