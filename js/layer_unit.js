/**
 * @author Norris
 */

var UnitLayer = Layer.extend({
	clicked : null,
	moveColor	: "rgba(39,167,216,0.7)", 
	attaColor		: "rgba(255,0,0,0.7)", 
	
	init	: function(){
		this._super( arguments[0] );
		this.units = {};

		//定时更新
		PANEL.on("update", this.update, this );
		
		//点击画布
		PANEL.on("click", this.onClick, this);
		
		PANEL.on("contextmenu", this.onContextmenu, this);
				
		return this;
	},
	
	setData : function( data ){
		this.data = data;
		for (var i = 0; i < this.data.length; i++) {
			var item = this.data[i];
			this.units[ PANEL.getIndex( item.gx, item.gy) ] = this._initUnit(item);
		}			
		return this;
	},
	
	play		: function(){
		for( var key in this.units )
			this.units[ key ].play();

		return this;
	},
	
	stop		: function(){
		for( var key in this.units )
			this.units[ key ].stop();
						
		return this;
	},
	
	update	: function( timestamp ){
		var ctx = this.ctx;
		
		if (this.units) {
			ctx.clearRect( 0,0, this.w, this.h );
			
			for( var key in this.units ){
				var unit = this.units[ key ];
				
				unit.draw( timestamp );
			}
		}		
	},
	
	onClick	: function( e ){
			var p = PANEL.getPoints( e ),
					index = PANEL.getIndex( p.x, p.y );
							
			//����Ѿ�ѡ��ĳ����Ԫ
			if( this.clicked ){
				//��������߷�Χ��
				if ( this.clicked.canMove( index ) ){
					this.clicked.moveTo( p.x, p.y )
				}
				
				//����
				else if ( this.clicked.canAttack( index ) ){
					this.clicked.attack( p.x, p.y )
				}				
			}
			
			var unit = this.units[ index ];
			if ( unit && unit != this.clicked ){
				//获得可移动格子
				var  obj = this.getActiveCells( p.x, p.y, unit.step );
				PANEL.cellLayer.paintCells( this.moveColor, obj );
				unit.moves = obj;
				//获得可攻击的格子
				obj = this.getAttackCells( p.x, p.y, unit.range, unit.rangeType, unit.team );
				PANEL.cellLayer.paintCells( this.attaColor, obj );
				unit.attacks = obj;
				
				this.clicked = unit;
			}		
	},

	getAttackCells	: function( x, y,	range, type,team ){
		var all = {}, index = PANEL.getIndex( x, y );
		
		switch( type ) {
			case 1:	//全方位攻击
				var tmp, i, j;
				for ( i= x-range ; i<=x + range; i++) {
					for ( j= y-range ; j<=y + range; j++) {
							all[ PANEL.getIndex( i, j ) ] = [i,j];
					}
				}			
				break;
			case 2:	//十字型
				var open = {}, tmp;
				open[ index ] = [x,y];
				
				function prepare( x, y ){
					var i = PANEL.getIndex( x, y );
					if ( !open[ i ] && !all[ i ] )
						open[ i ] = [x,y];
				}
				
				while( range-- > 0 ){			
					for( var key in open){
						all[ key ] = tmp =  open[ key ];
						
						prepare( tmp[0], tmp[1] -1 );
						prepare( tmp[0], tmp[1]+1 );
						prepare( tmp[0]-1, tmp[1] );
						prepare( tmp[0]+1, tmp[1] );
						
						delete open[ key ];
					}
				}
				break;
		}
		
		//把自身刨出去
		delete all[ index ];
		for( var key in all ){
			var unit = this.units[ key ], p = all[ key ];
			if ( !(unit ? unit.team != team : true && MAP[p[1]][p[0]] == 0) )
				delete all[ key ];
		}
		return all;		
	},
	
	getActiveCells : function( x, y, step ){
		if ( step <= 0 )
			return {}[ PANEL.getIndex( x, y ) ] = [ x,y ];
		
		var open = {}, closed = {}, units = this.units;
		//删除原指针
		open[  PANEL.getIndex(x,y)  ] = [x,y];
		
		function prepare( x,y,node ){
			var key = PANEL.getIndex( x, y ), unit = units[ key ];
			//判断是否可以行走/是否已经计算过/如果有单位在单元格上判断是否可以叠加
			if ( !open[key] && !closed[key] && MAP[y][x] ==0 && (unit ? unit.overlay : true  ) ) {
				open[key] = [x,y];
			}	
		}
			
		while( !this._isEmpty( open ) && step-- >0 ){
			for (var key in open ) {
				node = open[ key ];
				//添加到已处理过的closed表
				closed[ key ] = node;
				
				//添加子节点
				//up
				prepare( node[0], node[1]-1, node );	
				//down
				prepare( node[0], node[1] +1 , node );
				//left
				prepare( node[0] -1, node[1], node );
				//right
				prepare( node[0] +1, node[1], node );
				
				//并从OPEN表中删除
				delete open[ key ];
			}
		}
		
		return closed;
	},

	_isEmpty : function( obj ){
		for( var i in obj )
			return false;
		return true;	
	},
			
	onContextmenu	: function( e ){
			delete this.clicked;	
			PANEL.cellLayer.clear();
	},	
	
	showAt				: function( unit, x, y ){
		if ( unit.constructor != Unit )
			unit = this._initUnit( unit );
		else
			unit.ctx =  this.ctx;
		
		unit.gx = x;
		unit.gy = y;
		
		this.units[ PANEL.getIndex( x, y ) ] = unit; 
		
		return this;
	},
	
	_initUnit	: function( config ){
		config.ctx = this.ctx;
		
		return (new Unit(config )).draw();
	}
}); 