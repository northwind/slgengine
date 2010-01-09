/**
 * @author Norris
 */
/*
	w h : �Ӵ��Ŀ�͸�
*/
var Panel = Component.extend({
	
	init	: function( config ){
		
		$.extend( this, config );
		
		this.el.addClass("_panel");
		//���ÿ��
		this.el.height( WINDOW_HEIGHT );
		this.el.width( WINDOW_WIDTH );		
		
		//��קʱ��������
		var x, y, drag = false, el=this.el;
		this.el.mousedown( function( e ){
			if (e.which == 1) {
				x = e.pageX;
				y = e.pageY;
				this.style.cursor = "pointer";
				drag = true;
				//֧��IE
				if ( this.setCapture )
					this.setCapture();
			}		
		} );
		
		this.el.mousemove( function( e ){
			if ( drag && e.which == 1 ) {
				if (x != e.pageX) 
					this.scrollLeft -= e.pageX - x;
				
				if (y != e.pageY) 
					this.scrollTop -= e.pageY - y;
				
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
				
				el[0].style.cursor = "";
			}
		} );
		
		return this;		
	},
	
	//ʵ�����ݵĿ�͸�
	//���ݿ��ܻ���Ӵ�����Ҫ���ǹ��������
	activeWidth : 0,
	activeHeight : 0
	
});

