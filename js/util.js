
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
function	_loadImg( src, onload, onerror ){
	var img = new Image();
	img.onload = onload || function(){};
	img.onerror = onerror || function(){};
	img.src = src;
}

//check数组中的image对象，水平翻转
function waitTurn( wait, turn, fn ){
	
	var p = 0;
	
	//while
	
}

var __d = new Date();
function getTime(){
	return __d.getTime();
}





