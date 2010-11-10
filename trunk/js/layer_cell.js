/**
 * 单元格层
 * 负责显示单元格的着色
 */
var CellLayer = Layer.extend({
	selected	: null,
	clicked		: null,
	lines			: false, //画格子
	
	init	: function(){
		this.cells = {};
		this.borders = {};
		this._super( arguments[0] );
		
		PANEL.on("mousemove", this.activeCell, this )
			 .on("paint", this.onPaint, this )
			 .on("mouseleave", this.unactiveCell, this );
		
		return this;
	},
	
	showGrid	: function(){
		this.lines = true;
		return this;
	},
	
	hideGrid	: function(){
		this.lines = false;
		return this;		
	},
	
	x	: -1,
	y	: -1,	
	
	//获得当前鼠标经过的CELL
	activeCell	: function(x, y){
		var o = getPoints( x, y );
		
		this.x = o.x;
		this.y = o.y;
		
		return this;
	},
	
	//不再显示鼠标滑过时的效果
	unactiveCell	: function(){
		this.x = this.y = -1;
		return this;
	},
	
	onPaint					: function(){
		//画格子
		if ( (this.lines || DEBUG) && this.x > -1 && this.y > -1 ){
			ctx.save();
			
			ctx.fillStyle  = "rgba(255,255,255, 1)";
			ctx.font = "14px";

			ctx.translate( Math.max(0,PANEL.scrollLeft), Math.max(0,PANEL.scrollTop) );
			ctx.fillText( "(" + this.x + "," + this.y + ")" , 5, 15 );
			ctx.restore();				
		}
		//绘制cell
		for( var color in  this.cells ){
			ctx.save();
			
			ctx.fillStyle = color;
			var obj = this.cells[ color ];
			for( var key in obj ){
				var cell = obj[ key ];
				ctx.fillRect( cell.dx , cell.dy, CELL_WIDTH, CELL_HEIGHT );
			}
			ctx.restore();			
		}
		//只绘制cell边框
		for( var color in  this.borders ){
			ctx.save();
			ctx.strokeStyle = color;
			var w = 4, half = w/ 2;
			ctx.lineWidth = w;  
			//确保画到正确位置
			ctx.translate( half, half  );
			//纠正方块宽高
			var width = CELL_WIDTH - w -1 , 
					height = CELL_HEIGHT - w - 1;
/*
			ctx.shadowOffsetX = 2;  
			ctx.shadowOffsetY = 2;  
			ctx.shadowColor = "rgba(0, 0, 0, 0.5)";  	
*/
						
			var obj = this.borders[ color ];
			for( var key in obj ){
				var cell = obj[ key ];
				ctx.strokeRect( cell.dx + 1 , cell.dy + 1, width , height );
			}
			ctx.restore();			
		}		
		//鼠标滑过
		if ( this.x >= 0 && this.y >= 0 ){
			ctx.save();
			var w = 2, half = w/ 2;
			ctx.lineWidth = w;
/*
			ctx.shadowOffsetX = 1;  
			ctx.shadowOffsetY = 1;  
			ctx.shadowColor = "rgba(0, 0, 0, 0.5)";  
*/
					
			ctx.strokeStyle = CELLCOLOR[0];
			ctx.strokeRect( this.x * CELL_WIDTH + half , this.y * CELL_HEIGHT + half, CELL_WIDTH - w, CELL_HEIGHT -w );
			
			ctx.restore();
		}
	},
	
	strokeCells			: function( color, cell ){
		if ( this.borders[ color ] == undefined )
			  this.borders[ color ] = {};
		
		//if ( cell.constructor == Cell )
		if ( cell.direct )
			this.borders[ color ][ cell.index ] = cell;
		else
			this.borders[ color ] = cell;
			
		return this;		
	},
	
	paintCells				: function( color, cell ){
		if ( this.cells[ color ] == undefined )
			  this.cells[ color ] = {};
		
		//if ( cell.constructor == Cell )
		if ( cell.direct )
			this.cells[ color ][ cell.index ] = cell;
		else
			this.cells[ color ] = cell;
			
		return this;		
	},	
	
	clear			: function( color ){
		if ( color )
			delete this.cells[ color ];
		else
			this.cells = {};
			
		return this;	
	},
	
	destroy			: function(){
		PANEL.un("mousemove", this.activeCell, this )
			 .un("paint", this.onPaint, this )
			 .un("mouseleave", this.unactiveCell, this );
		
		this._super();	 
	}
			
}); 