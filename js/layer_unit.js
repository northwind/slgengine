/**
 * @author Norris
 */

//判断是否为空
 function _isEmpty( obj ){
	for( var i in obj )
		return false;
	return true;	
}

var UnitLayer = Layer.extend({
	clicked : null,	//已点击
	overed	 : null,  //滑过的
	moveColor	: "rgba(39,167,216,0.6)", 
	attaColor		: "rgba(255,0,0,0.5)", 

	hpLineForce : false,	//是否强制显示血条
	
	init	: function(){
		this._super( arguments[0] );
		this.hide();
		this.units = {};

		//定时更新
		PANEL.on("update", this.update, this );
		//点击画布
		PANEL.on("click", this.onClick, this);
		PANEL.on("contextmenu", this.onContextmenu, this);
		PANEL.on("mousemove", this.onMousemove, this);
		PANEL.on("keydown", this.onKeydown, this);
		PANEL.on("keyup", this.onKeyup, this);
				
		return this;
	},
	
	setData : function( data, fn, scope ){
		this.data = data;
		var count = 1, sum = data.length, _self = this;
		var callback = function(){
			//console.debug( "callback" );
			if ( count++ >= sum ){
				_self.clear();
				_self.show();
				
				if ( fn )
					fn.call( scope || _self );
			}
		};
		for (var i = 0; i < this.data.length; i++) {
			var item = this.data[i];
			this.units[ PANEL.getIndex( item.gx, item.gy) ] = this._initUnit(item, callback);
		}			
		return this;
	},
	
	update	: function( timestamp ){
		var ctx = this.ctx;
		
		if (this.units) {
			//TODO 优化为只需要重新的地方才清除
			ctx.clearRect( 0,0, this.w, this.h );
			
			for( var key in this.units ){
				var unit = this.units[ key ];
				
				unit.draw( timestamp );
			}
		}		
	},
	
	onKeydown	: function( e ){
		//按ALT时
		//alert( e.which )
		if ( e.which == 18 )
			this.hpLineForce = true;		
	},	
	
	onKeyup	: function( e ){
		//按ALT时
		//alert( e.which )
		if ( e.which == 18 )
			this.hpLineForce = false;		
	},		
	
	onMousemove	: function( e ){
		var  cell = PANEL.getCell( e );
		var unit = this.units[ cell.index ];
		//已经存在则隐藏
		if (this.overed && unit != this.overed) {
			this.overed.hideMajor();
			delete this.overed;
		}
		if ( unit && this.overed != unit ){
			this.overed = unit.showMajor();
		}
	},
	
	onClick	: function( e ){
			var  cell = PANEL.getCell( e );
							
			//����Ѿ�ѡ��ĳ����Ԫ
			if (this.clicked) {
				//如果可以攻击
				if (this.clicked.canAttack(cell)) {
					this.clicked.attack(cell, function(){
						
					}, this);
					this._removeCells();
					
					delete this.clicked;
				}
				else 
					//如果可以移动
					if (this.clicked.canMove(cell)) {
						this.clicked.moveTo(cell, function(){
							PANEL.popMenu(this.clicked, cell.dx - CELL_WIDTH * 2, cell.dy - CELL_HEIGHT);
						}, this);
						this._removeCells();
					//重新设置unit的index
					
					//delete this.units[  ]
					}
			}
			else {
				var unit = this.units[cell.index];
				if (unit && unit != this.clicked) {
					//获得可移动格子
					var obj = this.getWalkCells(cell, unit.step);
					PANEL.cellLayer.paintCells(this.moveColor, obj);
					unit.moves = obj;
					//获得可攻击的格子
					//obj = this.getAttackCells( cell, unit.range, unit.rangeType, unit.team );
					//PANEL.cellLayer.strokeCells( this.attaColor, obj );
					//unit.attacks = obj;
					
					this.clicked = unit;
				}
			}
	},
	
	_removeCells			: function(){
		PANEL.cellLayer.paintCells( this.moveColor, {} );
		PANEL.cellLayer.paintCells( this.attaColor, {} );
		PANEL.cellLayer.strokeCells( this.attaColor, {} );
		//delete this.clicked;
	},
	
	//使已选角色回到移动之前并删除已选角色
	unClick	: function(){
		if ( this.clicked )
			this.clicked.homing();
			
		delete this.clicked;
		return this;
	},

	getAttackCells	: function( cell,	range, type,team ){
		var all = {}, index = cell.index, x = cell.x, y = cell.y;
		
		switch( type ) {
			case 1:	//全方位攻击
				var tmp, i, j;
				for ( i= x-range ; i<=x + range; i++) {
					for ( j= y-range ; j<=y + range; j++) {
							var node = PANEL.getCell( i, j);
							all[ node.index ] = node;
					}
				}			
				break;
			case 2:	//十字型
				var open = {}, node;
				open[ index ] = cell;
				
				function prepare( x, y ){
					var tmp = PANEL.getCell( x, y ), i = tmp.index;
					if ( !open[ i ] && !all[ i ] )
						open[ i ] = tmp;
				}
				
				while( range-- > 0 ){			
					for( var key in open){
						all[ key ] = node =  open[ key ];
						
						prepare( node.x, node.y -1 );
						prepare( node.x, node.y+1 );
						prepare( node.x-1, node.y );
						prepare( node.x+1, node.y );
						
						delete open[ key ];
					}
				}
				break;
		}
		
		//把自身刨出去
		delete all[ index ];
		//不能攻击队友, 友军, 无敌, 障碍物等
		//TODO 真正攻击时才去判断
/*
		for( var key in all ){
			var unit = this.units[ index ];
			if ( MAP[y][x] == 0 && unit && ( !unit || (unit.canAttack && unit.team != team) )  ){
				
			}else
				delete all[ key ];
		}
*/
		return all;		
	},
	
	getWalkCells : function( cell, step ){
		if ( step <= 0 )
				return {}[ cell.index ]  = cell ;
		
		var open = {}, closed = {}, units = this.units;
		//删除原指针
		delete cell.parent;
		open[ cell.index ] = cell;
		
		function prepare( x,y,parent ){
			var key = PANEL.getIndex( x, y ), unit = units[ key ], child =  PANEL.getCell( x, y );
			//判断是否可以行走/是否已经计算过/如果有单位在单元格上判断是否可以叠加
			if ( child && !open[key] && !closed[key] && MAP[y] && MAP[y][x] ==0 && (unit ? unit.overlay : true  ) ) {
				child.parent = parent;
				open[key] = child;
			}	
		}
			
		while( !_isEmpty( open ) && step-- >0 ){
			for (var key in open ) {
				node = open[ key ];
				//添加到已处理过的closed表
				closed[ key ] = node;
				
				//添加子节点
				//up
				prepare( node.x, node.y-1, node );	
				//down
				prepare( node.x, node.y +1 , node );
				//left
				prepare( node.x -1, node.y, node );
				//right
				prepare( node.x +1, node.y, node );
				
				//并从OPEN表中删除
				delete open[ key ];
			}
		}
		
		return closed;
	},
			
	onContextmenu	: function( e ){
			this._removeCells();
	},	
	
	showAt				: function( unit, x, y ){
		unit.gx = x;
		unit.gy = y;
		
		if ( unit.constructor != Unit )
			unit = this._initUnit( unit );
		else
			unit.ctx =  this.ctx;
		
		this.units[ PANEL.getIndex( x, y ) ] = unit; 
		
		return this;
	},
	
	delUnit		: function( id ){
		if ( this.units ){
			for( var key in this.units ){
				if (this.units[key].id == id) {
					delete this.units[key];
					break;
				}
			}
		}
		return this;		
	},
	
	_initUnit	: function( config, callback ){
		config.ctx = this.ctx;
		config.layer = this;
		
		return new Unit(config, callback );
	}
}); 