/**
 * @author Norris
 */
/*
	w h : �Ӵ��Ŀ�͸ￄ1�7
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
		this.addEvents("click","mousemove","contextmenu","keydown");
		
		this._createCellLayer();
		
		//֧����ק
		var x, y, drag = false, el=this.el, _self = this;
		this.el.mousedown( function( e ){
			if (e.which == 1) {
				x = e.pageX;
				y = e.pageY;
				//this.style.cursor = "pointer";
				drag = true;
				
				if ( this.setCapture )
					this.setCapture();
			}		
		} );
		
		this.el.mousemove( function( e ){
			if ( drag && e.which == 1 ) {
				if (x != e.pageX) 
					el.scrollLeft = (this.scrollLeft -= e.pageX - x);
				
				if (y != e.pageY) 
					el.scrollTop = (this.scrollTop -= e.pageY - y);
				
				x = e.pageX;
				y = e.pageY;
			}
			
			_self.fireEvent( "mousemove", e, _self );			
		} );
		
		//��Ҫ����document
		$(document).mouseup( function( e ){
			if (e.which == 1) {
				drag = false;
				//֧��IE
				if (this.releaseCapture) 
					this.releaseCapture();
			}
		} );
		
		this.on("mousemove", this.activeCell, this );
		
		
		return this;		
	},
	
	//������Ԫ��LAYER
	_createCellLayer	: function(){
		if ( this.cellLayer )
			this.cellLayer.remove();
		
		this.cellLayer = LayerMgr.reg( 100, MAX_W, MAX_H, CellLayer );
	},
	
	activeCell			: function( x, y ){
		var o = this.getPoints( x, y );
		
		//��������
		this.cellLayer.activeCell( o.x, o.y );
		return this;
	},
	
	showGrid			: function(){
		this.cellLayer.showGrid();
		return this;
	},

	hideGrid			: function(){
		this.cellLayer.hideGrid();
		return this;
	},
		
	moveTo			: function(x, y){
		if (x != undefined) 
			this.el[0].scrollLeft = (this.scrollLeft = x);
		
		if (y != undefined) 
			this.el[0].scrollTop = (this.scrollTop = y);
			
		return this;			
	},
	
	//����setBgImage ����LAYER
	setBgImage		: function( url ){
		this.cellLayer.setBgImage(  url );
		return this;
	},
	
	setUnits		: function( data ){
		if ( !this.unitsLayer )
			this.unitsLayer = LayerMgr.reg( 200, MAX_W, MAX_H, UnitLayer );
				
		this.unitsLayer.setData( data ).paint().play();
		
		return this;
	},	
	
	//ÿ�ֿ�ʼʱ���ô˺���
	_paint	: function(){
		
		return this;
	},
	
	//�������λ�õõ���Ӧ������
	// ��������Ϊ event/ Index / x, y���λ��
	getPoints	: function( x, y ){
		if (typeof x == "number") {
			return {
				x: x % CELL_XNUM,
				y: parseInt(y / CELL_YNUM)
			}
		}
		
		if ( x.pageX ){
			//������� event	
			y = x.pageY;
			x = x.pageX;
		}
		
		return  {
			x    : (x + this.scrollLeft ) % CELL_WIDTH ,
			y	 : (y + this.scrollTop ) % CELL_HEIGHT
		}
	},
	
	getCell	: function( index, top ){
		if ( typeof top == "number" )
			index = this.getIndex( index, top );
		else	
			//����ￄ1�7 event
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
	
	showAt			: function( unit, x, y ){
		this.unitsLayer.showAt( unit, x, y );
		
		return this;
	},
	
	
	//ʵ�����ݵĿ�͸ￄ1�7
	//���ݿ��ܻ���Ӵ�����Ҫ���ǹ��������
	activeWidth : 0,
	activeHeight : 0
	
});

