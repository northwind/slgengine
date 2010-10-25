/**
 * 工具集
 */
if ( window.console == undefined )
	console = {};
if ( console.debug == undefined )
	console.debug = function( str ){};
function log( str ){
	console.debug( str );
}	
/*
 * 获得index值
*/
function getIndex( x, y ){
	return x * CELL_YNUM + y;
}
//判断是否为空
 function _isEmpty( obj ){
	for( var i in obj )
		return false;
	return true;	
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

//获取时间戳
var __d = new Date();
function getTime(){
	return __d.getTime() + "" + Math.round( (Math.random() * 1000) );
}

//绑定作用域
function bind( fn,scope ){
	return function(){
		if ( fn )
			fn.apply( scope || this, arguments );
	}
}




