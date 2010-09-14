
if ( window.console == undefined )
	console = {};
if ( console.debug == undefined )
	console.debug = function( str ){};
	
/*
 * 获得index值
*/
function getIndex( x, y ){
	return x * CELL_YNUM + y;
}
/*
 * 输入event或者具体数值返回相对坐标值
*/
function getPoints( x, y ){
	if (typeof x == "number") {
		return {
			x: x % CELL_XNUM,
			y: parseInt(y / CELL_YNUM)
		}
	}
	
	if ( x.layerY ){
		//events时
		y = x.layerY;
		x = x.layerX;
	}
	
	var o =  {
		x    :   parseInt ( x   / CELL_WIDTH ),
		y	 :  parseInt( y   / CELL_HEIGHT)
	}
	return o;
}
//载入image
function	_loadImg( src, fn ){
	var img = new Image();
	img.onload = fn;
	img.src = src;
}