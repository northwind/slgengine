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
	
	/*	�жϴ����CELL���Լ����ĸ�����
	 * 			4		3		2
	 * 			1		0		-1
	 * 			-2		-3		-4
	*/		
	direct	: function( to ){
		return (to.y - this.y) * 3 + to.x - this.x;
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
