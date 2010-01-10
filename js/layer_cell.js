/**
 * @author Norris
 */

var CellLayer = Layer.extend({
	
	init	: function(){
		this.cells = [];
		this._super.apply( this, arguments );
		
		//TODO �ӳ�����
		this._paintGrid();
		
		return this;
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
					.height(CELL_YNUM * CELL_HEIGHT);
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
	}
}); 