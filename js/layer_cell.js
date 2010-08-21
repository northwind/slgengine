/**
 * @author Norris
 */

var CellLayer = Layer.extend({
	selected	: null,
	clicked		: null,
	lines			: false, //画格子
	
	init	: function(){
		this.cells = {};
		this._super( arguments[0] );
		PANEL.on("update", this.update, this );
		PANEL.on("mousemove", this.activeCell, this );
		
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
	
	setBgImage	: function( url ){
		this.el.css( {
			background : "url('" + url + "') no-repeat"
		} );	
		return this;
	},
	
	x	: -1,
	y	: -1,	
	activeCell	: function(x, y){
		var o = PANEL.getPoints( x, y );
		
		this.x = o.x;
		this.y = o.y;
		
		return this;
	},
	
	update					: function(){
		var ctx = this.ctx;
		//清屏
		ctx.clearRect( 0, 0, this.w, this.h );
		//画格子
		if ( this.lines ){
			ctx.save();
			
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
		}
		//绘制cell
		for( var color in  this.cells ){
			ctx.save();
			ctx.fillStyle = color;
			var obj = this.cells[ color ];
			for( var key in obj ){
				var arr = obj[ key ];
				ctx.fillRect( arr[0] * CELL_WIDTH , arr[1] * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT );
			}
			ctx.restore();			
		}
		//鼠标滑过
		if ( this.x >= 0 && this.y >= 0 ){
			ctx.save();
		    ctx.shadowOffsetX = 1;  
		    ctx.shadowOffsetY = 1;  
		    ctx.shadowBlur = 1;  
		    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";  		
			ctx.strokeStyle = "#ffffff";
			ctx.strokeRect( this.x * CELL_WIDTH , this.y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT );
			ctx.restore();
		}
	},
	
	paintCells				: function( color, x, y ){
		if ( this.cells[ color ] == undefined )
			  this.cells[ color ] = {};
		
		if ( typeof x == "object" )
			this.cells[ color ] = x;
		else
			this.cells[ color ][ PANEL.getIndex(x,y) ] = [x,y];
			
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