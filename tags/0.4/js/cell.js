/**
 * 单元格
 * x : 行
 * y : 列
 * dx : 所在行的像素
 * dy : 所在列的像素
 */

var Cell = function( config ){
	$.extend( this, config );
	
	this.dx = this.x * CELL_WIDTH;
	this.dy = this.y * CELL_HEIGHT;
	this.index = Cell.getIndex( this.x, this.y );
};

Cell.prototype = {
	parent 	: null,	//用于寻路
	
	/*	方位  相对于自身
	 * 			4		3		2
	 * 			1		0		-1
	 * 			-2		-3		-4
	*/		
	direct	: function( to ){
		var diffX = to.x - this.x,
				diffY = this.y - to.y;
		if ( diffX == 0 && diffY == 0 ) return 0;
				
		var d = Math.pow( diffX*diffX + diffY * diffY, 0.5 ),
			   a = Math.acos( diffY/ d );
		
		var r = ( a > Cell.a1 && a <= Cell.a2 ) ? (  diffX > 0 ? -1 : 1 ) : ( diffY > 0 ? 3 : -3 );
		return r;	
		//return (to.y > this.y ? 1 : ( to.y == this.y ? 0 : -1 )) * 3 + 
		//			(to.x > this.x ? 1 : ( to.x == this.x ? 0 : -1 ));
	},

	directT : function( to ){
		var n = this.direct( to );
		
		switch( n ) {
			case -3: //下
				return "down";
			case 3://上
				return "up";
			case -2://左上
			case 1://左下	
			case 4://左
				return "left";
			case -4://右上
			case 2://右下
			case -1://右
				return "right";
			default:
				return "down";	
		}
	},
	
	up	: function(){
		return CellMgr.get( this.x, this.y -1 );
	},
	down	: function(){
		return CellMgr.get( this.x, this.y +1 );
	},
	left	: function(){
		return CellMgr.get( this.x - 1, this.y );
	},
	right	: function(){
		return CellMgr.get( this.x + 1, this.y );
	},
	distance	: function( cell ){
		return Math.abs( this.x - cell.x ) +  Math.abs( this.y - cell.y );
	}			
};
Cell.a1 = Math.PI / 4;
Cell.a2 = 3 * Math.PI / 4;
/**
 * 获得index值
*/
Cell.getIndex = function( x, y){
	return x * CELL_YNUM + y;
}

CellMgr	= new function(){
	var cells = {};
	
	return {
		get		: function( x, y ){
			var index =  Cell.getIndex( x, y );
			if ( cells[ index ] )
				return cells[ index ];
			else if ( x < 0 || y < 0 || x >= CELL_XNUM || y >= CELL_YNUM ){
				return null; //超出边界
			} else {
				var cell = new Cell( {
					x 	:	x, y : y
				} );
				cells[ index ] = cell;
				return cell;
			}
		}
	}
	
};
