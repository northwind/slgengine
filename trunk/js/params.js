/**
 * @author sina
 */

//store global params
var 
CELL_WIDTH	= 48,
CELL_HEIGHT	= 48,
CELL_XNUM	= 20,
CELL_YNUM	= 20,

MAX_H = CELL_HEIGHT * CELL_YNUM,
MAX_W = CELL_WIDTH * CELL_XNUM,
			
PANEL = null,
//窗口的宽高
WINDOW_WIDTH = 960,
WINDOW_HEIGHT= 480,

SPEED	= 340,	//调节unit切换图片的速度
STEP	= 60 ,	//调节走路速度
ASPEED  = 120,  //攻击速度

//UNIT集合，配置项参考UNIT类
UNITS	= [{
	gx :  10,  gy : 6,  type : 100, moveable : true, overlay : false, urlImg : "images/move/110-1.png", range : 1, rangeType : 1,
	symbol	: "caocao", name : "曹操", hp : 4 , attackFreqMax : 2, faction : 1, team : 100,
	imgMove	:"images/move/110-1.png",
	imgAtk	: "images/atk/110-1.png",
	imgSpc	: "images/spc/110-1.png",
	imgFace	: "images/face/1-1.png",
	listeners : {
		dead	: function(){
			//alert( this.name );
		}
	}
},{
	gx :  10,  gy : 7,  type : 101, moveable : true, overlay : false, urlImg : "images/move/1-1.png", range : 2, rangeType : 2,
	symbol	: "footman", 
	imgMove	:"images/move/1-1.png",
	imgAtk	: "images/atk/1-1.png",
	imgSpc	: "images/spc/1-1.png",
	imgFace	: "images/face/23-1.png"	
},{
	gx :  10,  gy : 0,  type : 101, moveable : true, overlay : false, urlImg : "images/move/1-1.png", range : 2, rangeType : 2,
	symbol	: "footman", 
	imgMove	:"images/move/1-1.png",
	imgAtk	: "images/atk/1-1.png",
	imgSpc	: "images/spc/1-1.png",
	imgFace	: "images/face/23-1.png"	
},{
	gx :  11,  gy : 4,  type : 101, moveable : true, overlay : false, urlImg : "images/move/1-1.png", range : 2, rangeType : 2,
	symbol	: "footman", 
	imgMove	:"images/move/1-1.png",
	imgAtk	: "images/atk/1-1.png",
	imgSpc	: "images/spc/1-1.png",
	imgFace	: "images/face/23-1.png"	
},{
	gx :  11,  gy : 12,  type : 101, moveable : true, overlay : false, urlImg : "images/move/1-1.png", range : 2, rangeType : 2,
	symbol	: "footman", 
	imgMove	:"images/move/1-1.png",
	imgAtk	: "images/atk/1-1.png",
	imgSpc	: "images/spc/1-1.png",
	imgFace	: "images/face/23-1.png"	
},{
	gx :  12,  gy : 12,  type : 101, moveable : true, overlay : false, urlImg : "images/move/1-1.png", range : 2, rangeType : 2,
	symbol	: "footman",  
	imgMove	:"images/move/1-1.png",
	imgAtk	: "images/atk/1-1.png",
	imgSpc	: "images/spc/1-1.png",
	imgFace	: "images/face/23-1.png"	
},{
	gx :  0,  gy : 19,  type : 101, moveable : true, overlay : false, urlImg : "images/move/1-1.png", range : 2, rangeType : 2,
	symbol	: "footman", 
	imgMove	:"images/move/1-1.png",
	imgAtk	: "images/atk/1-1.png",
	imgSpc	: "images/spc/1-1.png",
	imgFace	: "images/face/23-1.png"	
},{
	gx :  19,  gy : 5,  step: 9, type : 101, moveable : true, overlay : false, urlImg : "images/move/26-1.png", range : 2, rangeType : 2,
	symbol	: "archer", name : "弓箭手",
	imgMove	:"images/move/26-1.png",
	imgAtk	: "images/atk/26-1.png",
	imgSpc	: "images/spc/26-1.png",
	imgFace	: "images/face/16-1.png"	
}],

/*
	0  草地
	1  树木
	2  山地
	3  河流
	4  桥梁
	5  帐篷
*/
MAP	= 	[
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
			[ 0,0,0,0,0,1,1,1,1,0,0,1,1,1,1,0,0,0,0,0 ],
			[ 0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0 ],
			[ 0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0 ],
			[ 0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0 ],
			[ 0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0 ],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0 ],
			[ 0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0 ],
			[ 0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0 ],
			[ 0,0,0,0,0,1,1,1,1,0,0,1,1,1,1,0,0,0,0,0 ],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ]
		],
		//血条的高度
		HPHEIGHT = 7,
		//血条颜色展示 共五档，每档用两个色值
HPCLR	= [ ["#7a2200", "#8d2b00"] ,  ["#8a3200", "#9d3b00"] ,  ["#7a7100", "#978c00"] ,
					  ["#297a00", "#329700"] ,  ["#007a00", "#009700"]      ],
		//主要信息颜色 边框、背景
		MAJOR = [  "#fdc92b", "rgba(31,41,61,0.4)" ],
		//单元格颜色信息
		CELLCOLOR = [ "rgba(255,255,255,0.6)"  ],
		
		HighLightDeep = 160    //高亮度
		
		;  


// 全局变量
var canvas, ctx;
//阵营 队伍
var FACTION = 1, TEAM = 100;

		
		