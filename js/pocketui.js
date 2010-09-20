/**
 * @author Norris
 */

var PocketUI = Win.extend({
	cls		: "_pocket",
	
	init: function( config ){
		this._super( config );
		
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
			//阻止PANEL出发mousemove事件
			e.stopPropagation();
		} ).mouseenter( function(){
			//取消正在显示的鼠标滑过的效果
			PANEL.cellLayer.unactiveCell();
		} ).click( function( e ){
			e.stopPropagation();
		} );
		
		//点击右键时取消菜单
		PANEL.on("contextmenu", this.onCansel, this );
		PANEL.on("keydown", function( e ){
			//按ESC时
			if ( e.which == 27 )
				this.onCansel();
		}, this );
		
		return this;	
  	},
	
	showAt	: function( x, y ){
		
		
		this._super( x, y );
		
		
		return this;
	},
	
	//取消菜单时
	onCansel	: function(){
		this.hide();
	}
	
});
