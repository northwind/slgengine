/**
 * @author Norris
 */
/*
	w h : �Ӵ��Ŀ�͸�
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
		this.ctx= this.canvas[0].getContext("2d");
		
		//支持拖拽
		var x, y, drag = false, el=this.el, _self = this.el;
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
					_self.scrollLeft = (this.scrollLeft -= e.pageX - x);
				
				if (y != e.pageY) 
					_self.scrollTop = (this.scrollTop -= e.pageY - y);
				
				x = e.pageX;
				y = e.pageY;
			}			
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
		
		//this._createCellLayer();
		
		return this;		
	},
	
	//������Ԫ��LAYER
	_createCellLayer	: function(){
		if ( this.cellLayer )
			this.cellLayer.remove();
		
		this.cellLayer = LayerMgr.reg( 100, CELL_XNUM*CELL_WIDTH, CELL_YNUM*CELL_HEIGHT, CellLayer );
	},
	
	showGrid			: function(){
		var ctx = this.ctx;
		ctx.strokeStyle  = "rgba(255,165,0,1)";   
		ctx.beginPath();
		ctx.moveTo( 10, 10 ); 
		ctx.lineTo( 125, 10 );
		ctx.stroke();
		
		return this;
	},
	
	//����setBgImage ����LAYER
	setBgImage		: function( url, width, height ){
		//if ( !this.bgLayer )
		//	this.bgLayer = LayerMgr.reg( 1, width, height );
		
		//this.bgLayer.setBgImage( img );
		
		this.canvas.attr({
			width	: width,
			height	: height
		}).css( {
			background : "url('" + url + "') no-repeat"
		 } );
/*
		var img = new Image(), cxt = this.cxt, canvas = this.canvas[0];
		img.onload = function(){
			canvas.width = width;
			canvas.height = height;
			cxt.drawImage(img,0,0);
		}
		img.src = url;
*/
		
		return this;
	},
	
	setUnits		: function( data ){
		if ( !this.unitsLayer )
			this.unitsLayer = LayerMgr.reg( 200, CELL_XNUM*CELL_WIDTH, CELL_YNUM*CELL_HEIGHT, UnitLayer );
				
		this.unitsLayer.setData( data ).paint().play();
		
		return this;
	},	
	
	//ÿ�ֿ�ʼʱ���ô˺���
	_paint	: function(){
		
		return this;
	},
	
	//������λ�õõ���Ӧ�����
	// �������Ϊ event/ Index / x, y���λ��
	getPoints	: function( x, y ){
		if ( y === undefined ){
			if ( typeof x == "number" )
				return{
					left 	:  x % CELL_XNUM,
					top	:  parseInt( x / CELL_XNUM ),
					index: x
				};
			//������� event	
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
	//�õ�����ֵ
	getIndex : function( left, top ){
		return left < 0 || top <0 || left > CELL_XNUM || top > CELL_YNUM ? -1 : top * CELL_XNUM + left;
	},
	
	getCell	: function( index, top ){
		if ( typeof top == "number" )
			index = this.getIndex( index, top );
		else	
			//����� event
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
	
	
	//ʵ�����ݵĿ�͸�
	//���ݿ��ܻ���Ӵ�����Ҫ���ǹ��������
	activeWidth : 0,
	activeHeight : 0
	
});

