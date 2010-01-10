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
	
	init	: function( config ){
		
		this.el = $( config.el );
		this.x = this.el.position().left;
		this.y = this.el.position().top;
		
		this._super( config );
		
		//拖拽时滚动窗口
		var x, y, drag = false, el=this.el;
		this.el.mousedown( function( e ){
			if (e.which == 1) {
				x = e.pageX;
				y = e.pageY;
				this.style.cursor = "pointer";
				drag = true;
				//支持IE
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
		
		//需要监听document
		$(document).mouseup( function( e ){
			if (e.which == 1) {
				drag = false;
				//支持IE
				if (this.releaseCapture) 
					this.releaseCapture();
				
				el[0].style.cursor = "";
			}
		} );
		
		return this;		
	},
	
	//实际内容的宽和高
	//内容可能会比视窗大，需要考虑滚屏的情况
	activeWidth : 0,
	activeHeight : 0
	
});

