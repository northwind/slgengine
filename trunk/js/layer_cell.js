/**
 * @author Norris
 */

var CellLayer = Layer.extend({
	selected	: null,
	clicked		: null,
	
	init	: function(){
		this.cells = [];
		this._super( arguments[0] );
		
		//TODO �ӳ�����
		this._paintGrid();
		
		//��껬��ʱѡ�е�Ԫ��
		PANEL.on("mousemove", this.onMousemove, this );
		PANEL.on("click", this.onMouseclick, this );
				
		return this;
	},
	
	onMousemove	: function( e ){
			var cell =  this.cells[ PANEL.getPoints( e ).index ];
			if ( cell != this.selected ){
				if ( this.selected )
					this.selected.unselect();
				if ( cell )
					cell.select();
				this.selected = cell;		
			}
	},
	
	onMouseclick	: function( e ){
			var cell =  this.cells[ PANEL.getPoints( e ).index ];
			if ( cell != this.clicked ){
				if ( this.clicked )
					this.clicked.unclick();
				if ( cell )
					cell.click();
				this.clicked = cell;		
			}
	},
		
	showGridCls	: "_cellgridshow",
	showGrid	: function(){
		this.grid.addClass( this.showGridCls );
		return this;
	},
	hideGrid	: function(){
		this.grid.removeClass( this.showGridCls );
		return this;		
	},
	
	_paintGrid	: function(){
		this.grid = $("<table cellpadding='0' cellspacing='0'/>").addClass("_cellgrid")
					.width( CELL_XNUM * CELL_WIDTH )
					.height( CELL_YNUM * CELL_HEIGHT);
		this._initCells();
		this.grid.appendTo( this.el );
	},
	
	//�������е�CELL
	_initCells	: function(){
		var tr, td;
		for (var i=0; i< CELL_YNUM; i++){
			tr = $("<tr/>");
			for (var j=0; j< CELL_XNUM  ; j++){
				td = $("<td/>").appendTo( tr );
				this.cells.push( new Cell( { gx:j, gy:i, el:td, absolute : false } ) );
			}
			this.grid.append( tr );	
		}
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
		open[ cell.index ] = cell;
		
		function prepare( x,y,parent ){
			var key = PANEL.getIndex( x, y ), child =  PANEL.getCell( key );
			//�ж��Ƿ��������/�Ƿ��Ѿ������/����е�λ�ڵ�Ԫ�����ж��Ƿ���Ե���
			if ( child && !open[key] && !closed[key] && MAP[y][x] ==0 && (child.unit ? child.unit.overlay : true  ) ) {
				//child.showAttack();
				open[key] = child;
			}	
		}
			
		while( !this._isEmpty( open ) && step-- >0 ){
			for (var key in open ) {
				node = open[ key ];
				//��ӵ��Ѵ������closed��
				closed[ key ] = node;
				
				//����ӽڵ�
				//up
				prepare( node.gx, node.gy-1, node );	
				//down
				prepare( node.gx, node.gy +1 , node );
				//left
				prepare( node.gx -1, node.gy, node );
				//right
				prepare( node.gx +1, node.gy, node );
				
				//����OPEN����ɾ��
				delete open[ key ];
			}
		}
				
		return closed;
	},
	
	getAttackCells	: function( cell,	range, type ){
		var all = {};
		
		switch( type ) {
			case 1:	//ȫ��λ����
				var tmp, i, j;
				for ( i= cell.gx-range ; i<=cell.gx + range; i++) {
					for ( j= cell.gy-range ; j<=cell.gy + range; j++) {
							tmp = PANEL.getCell( i, j );
							all[ tmp.index ] = tmp;
					}
				}			
				break;
			case 2:	//ʮ����
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
		
		//�������ٳ�ȥ
		delete all[ cell.index ];
		return all;
	}
		
}); 