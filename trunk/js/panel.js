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
	
	init	: function( config ){
		
		this.el = $( config.el );
		this.x = this.el.position().left;
		this.y = this.el.position().top;
		
		this._super( config );
		
		this.addEvents("mousedown","mousemove","mouseup","keydown")
		
		var _self = this;
		this.el.mousemove( function(e){
			_self.fireEvent( "mousemove", e, _self );
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
				
				//el[0].style.cursor = "";
			}
		} );
		
		return this;		
	},
	
	//�������λ�õõ���Ӧ������
	getPoints	: function( x, y ){
		if ( y === undefined ){
			y = x.pageY;
			x = x.pageX;
		}
		
		var o =  {
			left    : parseInt( (x-this.x + this.scrollLeft ) / CELL_WIDTH ),
			top	 : parseInt( (y-this.y + this.scrollTop ) / CELL_HEIGHT)
		};
		o.p = 	 o.top * CELL_XNUM + o.left;
		return o;
	},
	
	//ʵ�����ݵĿ�͸�
	//���ݿ��ܻ���Ӵ�����Ҫ���ǹ��������
	activeWidth : 0,
	activeHeight : 0
	
});

