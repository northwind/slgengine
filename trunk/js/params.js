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

UNDERCOVER = true, 
PANEL = null,
//窗口的宽高
WINDOW_WIDTH = 960,
WINDOW_HEIGHT= 480,
DISPLAY_HEIGHT = 160,

SPEED	= 340,	//调节unit切换图片的速度
STEP	= 60 ,	//调节走路速度
ASPEED  = 120,  //攻击速度
TIPSPEED  = 0,  //提示信息显示速度

//队伍集合
TEAMS	= [{
	faction : 1, team : 100, name : "我军"
},{
	faction : 1, team : 200, name : "友军"
},{
	faction : 0, team : 1, name : "敌军"
}],
//UNIT集合，配置项参考UNIT类
UNITS	= [{
	gx :  10,  gy : 6,  type : 100, moveable : true, overlay : false, urlImg : "images/move/110-1.png", range : 1, rangeType : 1,
	symbol	: "caocao", name : "曹操", hp : 4 , attackFreqMax : 2, faction : 1, team : 100, exp : 98, id : "caocao",
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
	symbol	: "footman",  faction : 1, team : 200,  name : "刘备", exp : 86,
	imgMove	:"images/move/1-1.png",
	imgAtk	: "images/atk/1-1.png",
	imgSpc	: "images/spc/1-1.png",
	imgFace	: "images/face/23-1.png"	
},{
	gx :  10,  gy : 0,  type : 101, moveable : true, overlay : false, urlImg : "images/move/1-1.png", range : 2, rangeType : 2,
	symbol	: "footman",  faction : 0, team : 1,  name : "关羽",
	imgMove	:"images/move/1-1.png",
	imgAtk	: "images/atk/1-1.png",
	imgSpc	: "images/spc/1-1.png",
	imgFace	: "images/face/23-1.png"	
}
,{
	gx :  11,  gy : 4,  type : 101, moveable : true, overlay : false, urlImg : "images/move/1-1.png", range : 2, rangeType : 2,
	symbol	: "footman",  faction : 1, team : 200,  name : "张飞",
	imgMove	:"images/move/1-1.png",
	imgAtk	: "images/atk/1-1.png",
	imgSpc	: "images/spc/1-1.png",
	imgFace	: "images/face/23-1.png"	
},{
	gx :  11,  gy : 12,  type : 101, moveable : true, overlay : false, urlImg : "images/move/1-1.png", range : 2, rangeType : 2,
	symbol	: "footman", faction : 0, team : 1,
	imgMove	:"images/move/1-1.png",
	imgAtk	: "images/atk/1-1.png",
	imgSpc	: "images/spc/1-1.png",
	imgFace	: "images/face/23-1.png"	
},{
	gx :  12,  gy : 12,  type : 101, moveable : true, overlay : false, urlImg : "images/move/1-1.png", range : 2, rangeType : 2,
	symbol	: "footman",  faction : 0, team : 1,
	imgMove	:"images/move/1-1.png",
	imgAtk	: "images/atk/1-1.png",
	imgSpc	: "images/spc/1-1.png",
	imgFace	: "images/face/23-1.png"	
},{
	gx :  0,  gy : 19,  type : 101, moveable : true, overlay : false, urlImg : "images/move/1-1.png", range : 2, rangeType : 2,
	symbol	: "footman", faction : 0, team : 1,
	imgMove	:"images/move/1-1.png",
	imgAtk	: "images/atk/1-1.png",
	imgSpc	: "images/spc/1-1.png",
	imgFace	: "images/face/23-1.png"	
},{
	gx :  19,  gy : 5,  step: 9, type : 101, moveable : true, overlay : false, urlImg : "images/move/26-1.png", range : 2, rangeType : 2,
	symbol	: "archer", name : "弓箭手", faction : 0, team : 1,
	imgMove	:"images/move/26-1.png",
	imgAtk	: "images/atk/26-1.png",
	imgSpc	: "images/spc/26-1.png",
	imgFace	: "images/face/16-1.png"	
}],

CHAPTER = "第一章 破晓",
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
		MAJORBORDER = [  "#fdc92b", "#15D317", "#FF654E" ],
		MAJORBG ="rgba(31,41,61,0.4)",
		//单元格颜色信息
		CELLCOLOR = [ "rgba(255,255,255,0.6)"  ],
		
		HighLightDeep = 190,    //高亮度
		
		STRENGTHHP	= 10, //一点力量增加的血量
		AGILITYDEF  = 0.5, //一点敏捷增加的防御值
		INTELLIGENCEMP = 10,  //一点智力增加的魔法值
		
		GOODS = [ {
			id			: 1,
			desc	: "恢复HP",
			count	: 2,
			name	: "恢复用豆",
			consumable : true,
			effect	: 3,
			img		: "images/item/82-1.png",
			animation : {
				color	: "#00ff80",
				text	: "+50"		
			},
			listeners : {
				apply	: function( unit, fireman ){
					unit.onIncrease( 50 );
					fireman.finish();
				}
			}
		},{
			id			: 2,
			desc	: "下雨",
			count	: 1,
			name	: "水灵珠",
			consumable : false,
			nounit	: true,
			effect	: 7,
			img		: "images/item/87-1.png",
			listeners : {
				apply	: function( unit ){
					unit.finish();
				}
			}
		},{
			id			: 3,
			desc	: "小李飞刀",
			count	: 10,
			name	: "飞镖",
			rangeType : 2,
			range	: 2, 
			consumable : true,
			effect	: 7,
			img		: "images/item/1-1.png",
			animation : {
				color	: "#ff0000",
				text	: "-20"		
			},
			listeners : {
				apply	: function( unit, fireman ){
					fireman.hurt( unit, 20 );
				}
			}			
		}]		
		
		;  


// 全局变量
var canvas, ctx;
//阵营 队伍
var FACTION = 1, TEAM = 100;

		
		