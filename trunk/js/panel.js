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
		this.el = $( config.el || document.body );
		
		this.x = this.el.position().left;
		this.y = this.el.position().top;
		
		this._super( config );
		
		this.addEvents("click","mousemove","keydown");
		var _self = this;
		this.el.mousemove( function(e){
			_self.fireEvent( "mousemove", e, _self );
		} );
		this.el.click( function(e){
			_self.fireEvent( "click", e, _self );
		} );		
		
		//��קʱ��������
		var x, y, drag = false, el=this.el;
		this.el.mousedown( function( e ){
			if (e.which == 1) {
				x = e.pageX;
				y = e.pageY;
				//this.style.cursor = "pointer";
				drag = true;
				//֧��IE
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
		
		LayerMgr.setWrap( this.el );
		this._createCellLayer();
		
		return this;		
	},
	
	//������Ԫ��LAYER
	_createCellLayer	: function(){
		if ( this.cellLayer )
			this.cellLayer.remove();
		
		this.cellLayer = LayerMgr.reg( 100, CELL_XNUM*CELL_WIDTH, CELL_YNUM*CELL_HEIGHT, CellLayer );

	},
	
	//����setBgImage ����LAYER
	setBgImage		: function( img, width, height ){
		if ( !this.bgLayer )
			this.bgLayer = LayerMgr.reg( 1, width, height );
		
		//�������ÿ��	
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
	
	//ÿ�ֿ�ʼʱ���ô˺���
	_paint	: function(){
		
		return this;
	},
	
	//�������λ�õõ���Ӧ������
	// ��������Ϊ event/ Index / x, y���λ��
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
		return top * CELL_XNUM + left;
	},
	
	getCell	: function( index ){
		return this.cells[ index ];
	},
	
	//ʵ�����ݵĿ�͸�
	//���ݿ��ܻ���Ӵ�����Ҫ���ǹ��������
	activeWidth : 0,
	activeHeight : 0
	
});

