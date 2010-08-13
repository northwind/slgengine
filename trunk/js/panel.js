/**
 * @author Norris
 */
/*
	w h : 视窗的宽和高
*/
var Panel = Component.extend({
	w		: WINDOW_WIDTH,
	h		: WINDOW_HEIGHT,
	cls   : "_panel",
	
	scrollLeft : 0,
	scrollTop : 0,
	
	init		: function( config ){
		PANEL = this;
		this.ct = $( config.ct || document.body );
		this._super( config );
		
		this.canvas = $("<canvas>").appendTo( this.el );
		this.cxt= this.canvas[0].getContext("2d");
		
		
		this.el[0].ondragstart = function(){
			alert("start")
		}
		this.canvas[0].ondragstart = function(){
			alert("start")
		}
		
/*
		this.canvas.bind("dragstart", function( e ){
			alert("start")
		});
		this.canvas.bind("dragend", function( e ){
			alert("end")
		});
		
		this.canvas.bind("mousewheel", function( e ){
			alert("mousewheel")
		});
*/
		
		
		this._createCellLayer();
		
		return this;		
	},
	
	//创建单元格LAYER
	_createCellLayer	: function(){
		if ( this.cellLayer )
			this.cellLayer.remove();
		
		this.cellLayer = LayerMgr.reg( 100, CELL_XNUM*CELL_WIDTH, CELL_YNUM*CELL_HEIGHT, CellLayer );

	},
	
	//重载setBgImage 创建LAYER
	setBgImage		: function( url, width, height ){
		if ( !this.bgLayer )
			this.bgLayer = LayerMgr.reg( 1, width, height );
		
		this.bgLayer.setBgImage( img );
		
		var img = new Image(), cxt = this.cxt, canvas = this.canvas[0];
		img.onload = function(){
			canvas.width = width;
			canvas.height = height;
			cxt.drawImage(img,0,0);
		}
		img.src = url;
		
		return this;
	},
	
	setUnits		: function( data ){
		if ( !this.unitsLayer )
			this.unitsLayer = LayerMgr.reg( 200, CELL_XNUM*CELL_WIDTH, CELL_YNUM*CELL_HEIGHT, UnitLayer );
				
		this.unitsLayer.setData( data ).paint().play();
		
		return this;
	},	
	
	//每局开始时调用此函数
	_paint	: function(){
		
		return this;
	},
	
	//根据鼠标位置得到相应的坐标
	// 参数可以为 event/ Index / x, y鼠标位置
	getPoints	: function( x, y ){
		if ( y === undefined ){
			if ( typeof x == "number" )
				return{
					left 	:  x % CELL_XNUM,
					top	:  parseInt( x / CELL_XNUM ),
					index: x
				};
			//传入的是 event	
			y = x.pageY;
			x = x.pageX;
		}
		
		var o =  {
			left    : parseInt( (x-this.x + this.scrollLeft ) / CELL_WIDTH ),
			top	 : parseInt( (y-this.y + this.scrollTop ) / CELL_HEIGHT)
		};
		o.index = this.getIndex( o.left, o.top );
		return o;
	},
	//得到索引值
	getIndex : function( left, top ){
		return left < 0 || top <0 || left > CELL_XNUM || top > CELL_YNUM ? -1 : top * CELL_XNUM + left;
	},
	
	getCell	: function( index, top ){
		if ( typeof top == "number" )
			index = this.getIndex( index, top );
		else	
			//如果是 event
			if ( typeof index != "number" )
				index = this.getPoints( index ).index;
		
		return this.cellLayer.getCell( index );
	},
	
	getActiveCells : function( cell, step ){
		return this.cellLayer.getActiveCells( cell, step );
	},
	
	getAttackCells : function( unit ){
		return this.cellLayer.getAttackCells( 	
								unit.cell, 			
								unit.range ,     
								unit.rangeType
							);
	},
	
	//实际内容的宽和高
	//内容可能会比视窗大，需要考虑滚屏的情况
	activeWidth : 0,
	activeHeight : 0
	
});

