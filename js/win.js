/**
 * 窗口类
 * 所有弹出窗口的基类
 * 统一样式与取消操作
 */
var Win = Component.extend({
	cls		: "_win",
	hidden  : true,
	
	init: function( config ){
		this.addEvents( "pop" );
		this._super( config );
		
		this.layer = PANEL.winLayer;
		this.el.appendTo( this.ct );
		
		var _self = this;
		this.content = $("<div>").appendTo( this.el );
		//取消按钮
		this.canselBtn = $("<button>").addClass("_cansel").text("取消").wrap("<div></div>")
								.mousedown( function( e ){
									if ( e.which == 1 )
										_self.cansel( e );
								} )
								.appendTo( this.el );
								
		this.el.mousemove( function( e ){
			e.stopPropagation();
			//取消正在显示的鼠标滑过的效果
			PANEL.cellLayer.unactiveCell();
		} );
		
		this.on( "show", this.onShow, this );
		
		return this;	
  	},
	
	onShow	: function(){
		var x = this.el.position().left, y = this.el.position().top,
			   w = this.el.outerWidth( true ), h = this.el.outerHeight( true );
		
		//边缘检测
		if ( x < 0 )
			x = CELL_WIDTH * 2;
		if ( y < 0 )
			y = CELL_HEIGHT;
		if ( x + w > MAX_W )
			x = MAX_W  -w;
		if ( y + h > MAX_H )
			y = MAX_H - h;	
		
		this.showAt( x, y );					
		//清除正在显示的攻击单元格
		PANEL.unitsLayer._removeCells();		
	},
	
	//取消菜单时
	cansel	: function( e ){
		this.hide();
	}
	
});
