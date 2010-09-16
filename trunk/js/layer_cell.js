/**
 * @author Norris
 */

var CellLayer = Layer.extend({
	selected	: null,
	clicked		: null,
	lines			: false, //画格子
	
	init	: function(){
		this.cells = {};
		this.borders = {};
		this._super( arguments[0] );
		PANEL.on("update", this.update, this );
		PANEL.on("mousemove", this.activeCell, this );
		PANEL.on("paint", this.paint, this );
		
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
	
	paint					: function(){
		//console.debug( "cell layer" );
		//画格子
		if ( this.lines ){
			ctx.save();
			
			ctx.fillStyle  = "rgba(255,255,255, 1)";
			ctx.font = "14px";
			//竖线
			for (var i=1; i<CELL_XNUM; i++) {
				ctx.fillText(  i ,  i * CELL_WIDTH + 15, 15 );
			}
			//横线
			for (var i=1; i<CELL_YNUM; i++) {
				ctx.fillText(  i ,  15, i * CELL_HEIGHT + 15 );
			}

			for (var i=0; i<CELL_XNUM; i++) {
				for (var j=0; j<CELL_YNUM; j++) {
					ctx.strokeRect( i *CELL_WIDTH , j* CELL_HEIGHT, CELL_WIDTH , CELL_HEIGHT );
				}
			}
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
	
	update				: function(){
		
	},
	
	
	strokeCells			: function( color, cell ){
		if ( this.borders[ color ] == undefined )
			  this.borders[ color ] = {};
		
		if ( cell.constructor == Cell )
			this.borders[ color ][ cell.index ] = cell;
		else
			this.borders[ color ] = cell;
			
		return this;		
	},
	
	paintCells				: function( color, cell ){
		if ( this.cells[ color ] == undefined )
			  this.cells[ color ] = {};
		
		if ( cell.constructor == Cell )
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
	}
			
}); 