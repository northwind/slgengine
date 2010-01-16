/**
 * @author Norris
 */

var CellLayer = Layer.extend({
	selected	: null,
	clicked		: null,
	
	init	: function(){
		this.cells = [];
		this._super( arguments[0] );
		
		//TODO 延迟生成
		this._paintGrid();
		
		//鼠标滑过时选中单元格
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
	
	//生成所有的CELL
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