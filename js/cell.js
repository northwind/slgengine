/**
 * @author Norris
 */

var Cell = function( config ){
	$.extend( this, config );
	
	this.dx = this.x * CELL_WIDTH;
	this.dy = this.y * CELL_HEIGHT;
	
	return this;
};

Cell.prototype = {
	parent 	: null,
	
	/*	方位
	 * 			4		3		2
	 * 			1		0		-1
	 * 			-2		-3		-4
	*/		
	direct	: function( to ){
		return (to.y - this.y) * 3 + to.x - this.x;
	},

	directT : function( to ){
		var n = this.direct( to );
		
		switch( n ) {
			case 3: //下
				return "down";
			case -3://上
				return "up";
			case 2://左上
			case -1://左下	
			case -4://左
				return "left";
			case 4://右上
			case -2://右下
			case 1://右
				return "right";
			default:
				return "down";	
		}
	}
		
};

CellMgr	= new function(){
	var cells = {};
	
	return {
		get		: function( x, y ){
			var index = x * CELL_YNUM + y;
			if ( cells[ index ] )
				return cells[ index ];
			else{
				var cell = new Cell( {
					x 	:	x, y : y,  index : index
				} );
				cells[ index ] = cell;
				return cell;
			}
		}
	}
	
};
