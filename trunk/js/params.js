/**
 * @author sina
 */

//store global params
var 
CELL_WIDTH	= 32,
CELL_HEIGHT	= 32,
CELL_XNUM	= 25,
CELL_YNUM	= 25,

//窗口的宽高
WINDOW_WIDTH = 480,
WINDOW_HEIGHT=480,
aaa=0, bbb = 0,
//UNIT集合，配置项参考UNIT类
UNITS	= [{
	gx :  10,  gy : 10,  type : 100, moveable : true, overlay : false
},{
	gx :  12,  gy : 12,  type : 101, moveable : true, overlay : false
},{
	gx :  aaa++,  gy : bbb++,  type : 101, moveable : true, overlay : false
},{
	gx :  aaa++,  gy : bbb++,  type : 101, moveable : true, overlay : false
},{
	gx :  aaa++,  gy : bbb++,  type : 101, moveable : true, overlay : false
},{
	gx :  aaa++,  gy : bbb++,  type : 101, moveable : true, overlay : false
},{
	gx :  aaa++,  gy : bbb++,  type : 101, moveable : true, overlay : false
},{
	gx :  aaa++,  gy : bbb++,  type : 101, moveable : true, overlay : false
},{
	gx :  aaa++,  gy : bbb++,  type : 101, moveable : true, overlay : false
},{
	gx :  aaa++,  gy : bbb++,  type : 101, moveable : true, overlay : false
},{
	gx :  aaa++,  gy : bbb++,  type : 101, moveable : true, overlay : false
},{
	gx :  aaa++,  gy : bbb++,  type : 101, moveable : true, overlay : false
},{
	gx :  aaa++,  gy : bbb++,  type : 101, moveable : true, overlay : false
},{
	gx :  aaa++,  gy : bbb++,  type : 101, moveable : true, overlay : false
},{
	gx :  aaa++,  gy : bbb++,  type : 101, moveable : true, overlay : false
},{
	gx :  aaa++,  gy : bbb++,  type : 101, moveable : true, overlay : false
},{
	gx :  aaa++,  gy : bbb++,  type : 101, moveable : true, overlay : false
},{
	gx :  aaa++,  gy : bbb++,  type : 101, moveable : true, overlay : false
},{
	gx :  aaa++,  gy : bbb++,  type : 101, moveable : true, overlay : false
},{
	gx :  aaa++,  gy : bbb++,  type : 101, moveable : true, overlay : false
},{
	gx :  aaa++,  gy : bbb++,  type : 101, moveable : true, overlay : false
},{
	gx :  aaa++,  gy : bbb++,  type : 101, moveable : true, overlay : false
},{
	gx :  aaa++,  gy : bbb++,  type : 101, moveable : true, overlay : false
},{
	gx :  aaa++,  gy : bbb++,  type : 101, moveable : true, overlay : false
}],

/*
	0  草地
	1  树木
	2  山地
	3  河流
	4  桥梁
	5  帐篷
*/
MAP	= 	[[ 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		 [ 1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,2,1,1,1,1,1,1,1,1],
		 [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		 [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		 [ 0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0],
		 [ 0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,1,0,0,1,0,0,0,0],
		 [ 0,0,0,0,0,2,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0],
		 [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,0,0,0,0],
		 [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		 [ 0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		 [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
		 [ 0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		 [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		 [ 1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		 [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		 [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		 [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		 [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		 [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		 [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		 [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		 [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		 [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		 [ 1,1,1,1,1,0,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1],
		 [ 1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1]
		];  
		
		