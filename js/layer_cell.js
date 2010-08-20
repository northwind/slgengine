/**
 * @author Norris
 */

var CellLayer = Layer.extend({
	selected	: null,
	clicked		: null,
	
	init	: function(){
		this.cells = [];
		this._super( arguments[0] );
		
		return this;
	},
	
	showGridCls	: "_cellgridshow",
	
	showGrid	: function(){
		var ctx = this.ctx;
		ctx.strokeStyle  = "rgba(0,0,0,1)";
		ctx.beginPath();
		
		//竖线
		for (var i=1; i<CELL_XNUM; i++) {
			ctx.moveTo( i * CELL_WIDTH  , 0 ); 
			ctx.lineTo( i * CELL_WIDTH  , MAX_H );
		}
		//横线
		for (var i=1; i<CELL_YNUM; i++) {
			ctx.moveTo( 0, i * CELL_HEIGHT ); 
			ctx.lineTo( MAX_W, i * CELL_HEIGHT);		
		}
					
		ctx.stroke();
		
		return this;
	},
	
	hideGrid	: function(){
		this.ctx.clearRect( 0, 0, this.w, this.h );
		return this;		
	},
	
	setBgImage	: function( url ){
		this.el.css( {
			background : "url('" + url + "') no-repeat"
		} );	
	},
	
	activeCell	: function(x, y){
		var ctx = this.ctx;
		ctx.save();
		ctx.strokeStyle = "#ffffff";
		ctx.strokeRect( x * CELL_WIDTH , y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT );
		ctx.restore();
		
		return this;
	},
	
	getCell	: function( index ){
		return this.cells[ index ];
	},
	
	_isEmpty : function( obj ){
		for( var i in obj )
			return false;
		return true;	
	},
			
	getActiveCells : function( cell, step ){
		if ( step <= 0 )
			return {}[ cell.index ]  = cell ;
		
		var open = {}, closed = {};
		//删除原指针
		delete cell.parent;
		open[ cell.index ] = cell;
		
		function prepare( x,y,parent ){
			var key = PANEL.getIndex( x, y ), child =  PANEL.getCell( key );
			//判断是否可以行走/是否已经计算过/如果有单位在单元格上判断是否可以叠加
			if ( child && !open[key] && !closed[key] && MAP[y][x] ==0 && (child.unit ? child.unit.overlay : true  ) ) {
				child.parent = parent;
				open[key] = child;
			}	
		}
			
		while( !this._isEmpty( open ) && step-- >0 ){
			for (var key in open ) {
				node = open[ key ];
				//添加到已处理过的closed表
				closed[ key ] = node;
				
				//添加子节点
				//up
				prepare( node.gx, node.gy-1, node );	
				//down
				prepare( node.gx, node.gy +1 , node );
				//left
				prepare( node.gx -1, node.gy, node );
				//right
				prepare( node.gx +1, node.gy, node );
				
				//并从OPEN表中删除
				delete open[ key ];
			}
		}
		
		return closed;
	},
	
	getAttackCells	: function( cell,	range, type ){
		var all = {};
		
		switch( type ) {
			case 1:	//全方位攻击
				var tmp, i, j;
				for ( i= cell.gx-range ; i<=cell.gx + range; i++) {
					for ( j= cell.gy-range ; j<=cell.gy + range; j++) {
							tmp = PANEL.getCell( i, j );
							all[ tmp.index ] = tmp;
					}
				}			
				break;
			case 2:	//十字型
				var open = {}, tmp;
				open[ cell.index ] = cell;
				
				function prepare( node ){
					if ( !open[ node.index ] && !all[ node.index ] )
						open[ node.index ] = node;
				}
				
				while( range-- > 0 ){			
					for( var key in open){
						all[ key ] = tmp =  open[ key ];
						
						prepare( tmp.getUp() );
						prepare( tmp.getDown() );
						prepare( tmp.getLeft() );
						prepare( tmp.getRight() );
						
						delete open[ key ];
					}
				}
				break;
		}
		
		//把自身刨出去
		delete all[ cell.index ];
		return all;
	}
		
}); 