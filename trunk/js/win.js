/**
 * @author Norris
 */
var Win = Component.extend({
	cls		: "_win",
	hidden  : true,
	
	init: function( config ){
		this._super( config );
		this.layer = PANEL.winLayer;
		this.el.appendTo( this.ct );
		
		this.addEvents( "pop", "cansel" );
		
		var _self = this;
		this.content = $("<div>").appendTo( this.el );
		//取消按钮
		this.cansel	 = $("<button>").addClass("_cansel").text("取消").wrap("<div></div>")
								.mousedown( function( e ){
									if ( e.which == 1 )
										_self.onCansel( e );
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
		//清除正在显示的攻击单元格
		PANEL.unitsLayer._removeCells();		
	},
	
	//取消菜单时
	onCansel	: function( e ){
		this.fireEvent( "cansel", this );
		
		this.hide();
	}
	
});