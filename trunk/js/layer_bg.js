/**
 * @author Norris
 */

var BackgroundLayer = Layer.extend({
	
	init	: function(){
		this.cells = [];
		this._super.apply( this, arguments );
		
		//TODO 延迟生成
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
	
	//生成所有的CELL
	_initCells	: function(){
		var tr, td;
		for (var i=0; i< CELL_XNUM ; i++){
			tr = $("<tr/>");
			for (var j=0; j< CELL_YNUM ; j++){
				td = $("<td/>").appendTo( tr );
				this.cells.push( new Cell( { gx:i, gy:j, el:td, absolute : false } ) );
			}
			this.grid.append( tr );	
		}
	}
}); 