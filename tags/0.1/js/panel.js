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
		this.el = $( config.el || document.body );
		
		this.x = this.el.position().left;
		this.y = this.el.position().top;
		
		this._super( config );
		this.addEvents("click","mousemove","contextmenu","keydown");
		
		//拖拽时滚动窗口
		//TODO 支持鼠标中键滚动
		var x, y, drag = false, el=this.el;
		this.el.mousedown( function( e ){
			if (e.which == 1) {
				x = e.pageX;
				y = e.pageY;
				//this.style.cursor = "pointer";
				drag = true;
				//支持IE
				if ( this.setCapture )
					this.setCapture();
			}		
		} );
		
		this.el.mousemove( function( e ){
			if ( drag && e.which == 1 ) {
				if (x != e.pageX) 
					_self.scrollLeft = (this.scrollLeft -= e.pageX - x);
				
				if (y != e.pageY) 
					_self.scrollTop = (this.scrollTop -= e.pageY - y);
				
				x = e.pageX;
				y = e.pageY;
			}			
		} );
		
		//需要监听document
		$(document).mouseup( function( e ){
			if (e.which == 1) {
				drag = false;
				//支持IE
				if (this.releaseCapture) 
					this.releaseCapture();
			}
		} );
		
		LayerMgr.setWrap( this.el );
		this._createCellLayer();
		
		var _self = this;
		this.el.mousemove( function(e){
			_self.fireEvent( "mousemove", e, _self );
		} );
		this.el.click( function(e){
			var p = _self.getPoints( e );
			_self.fireEvent( "click", e, _self.getCell( p.index ), p ,  _self );
		} );		
		this.el.bind("contextmenu",function( e ){
				e.preventDefault();
				e.stopPropagation();
				_self.fireEvent("contextmenu", e);			
		});	
		
		return this;		
	},
	
	//创建单元格LAYER
	_createCellLayer	: function(){
		if ( this.cellLayer )
			this.cellLayer.remove();
		
		this.cellLayer = LayerMgr.reg( 100, CELL_XNUM*CELL_WIDTH, CELL_YNUM*CELL_HEIGHT, CellLayer );

	},
	
	//重载setBgImage 创建LAYER
	setBgImage		: function( img, width, height ){
		if ( !this.bgLayer )
			this.bgLayer = LayerMgr.reg( 1, width, height );
		
		//重新设置宽高	
		if (  this.bgLayer.w != width ) 
			this.bgLayer.width( width );
		if ( this.bgLayer.h != height )	
			this.bgLayer.height( height );
			
		this.bgLayer.setBgImage( img );
		
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

