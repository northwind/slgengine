/**
 * 全局参数
 */
var 
CELL_WIDTH	= 48,
CELL_HEIGHT	= 48,
CELL_XNUM	= 20,
CELL_YNUM	= 20,

MAX_H = CELL_HEIGHT * CELL_YNUM,
MAX_W = CELL_WIDTH * CELL_XNUM,

UNDERCOVER = false, 
DEBUG	= false,
PANEL = null,
//窗口的宽高
WINDOW_WIDTH = 960,
WINDOW_HEIGHT= 480,
DISPLAY_HEIGHT = 160,

SPEED	= 8,	//调节unit切换图片的速度
STEP	= 4 ,	//调节走路速度
ASPEED  = 2,  //攻击速度
TIPSPEED  = 5,  //提示信息显示速度

HPHEIGHT = 7,//血条的高度
//血条颜色展示 共五档，每档用两个色值
HPCLR	= [ ["#7a2200", "#8d2b00"] ,  ["#8a3200", "#9d3b00"] ,  ["#7a7100", "#978c00"] ,
			  ["#297a00", "#329700"] ,  ["#007a00", "#009700"]      ],
//主要信息颜色 边框、背景
MAJORBORDER = [  "#fdc92b", "#15D317", "#FF654E" ],
MAJORBG ="rgba(31,41,61,0.4)",

CELLCOLOR = [ "rgba(255,255,255,0.6)"  ], //单元格颜色信息
SELECTEDCLR = [ "#fdc92b"  ],   //选中的颜色

MOVECOLOR = "rgba(39,167,216,0.6)",  //移动时颜色 
ATTACKCOLOR = "rgba(255,0,0,0.5)",	//攻击时颜色 

HighLightDeep = 190,    //高亮度

STRENGTHHP	= 10, //一点力量增加的血量
AGILITYDEF  = 0.5, //一点敏捷增加的防御值
INTELLIGENCEMP = 10  //一点智力增加的魔法值
;  
//物品 魔法
var 
GOODS = {
			1 : {
			id			: 1,
			desc	: "恢复HP",
			count	: 1,
			name	: "恢复用豆",
			consumable : true,
			effect	: 3,
			src		: "images/item/82-1.png",
			animation : {
				color	: "#00ff80",
				text	: "+50"		
			},
			listeners : {
				apply	: function( unit, fireman ){
					unit.onIncrease( 50 );
				}
			}
		}, 
			2	: {
			id			: 2,
			desc	: "下雨",
			count	: 1,
			name	: "水灵珠",
			consumable : false,
			nounit	: true,
			effect	: 7,
			src		: "images/item/87-1.png",
			listeners : {
				apply	: function( unit ){
					
				}
			}
		},
			3 : 	{
			id			: 3,
			desc	: "小李飞刀",
			count	: 10,
			name	: "飞镖",
			rangeType : 2,
			range	: 2, 
			consumable : true,
			effect	: 7,
			src		: "images/item/1-1.png",
			animation : {
				color	: "#ff0000",
				text	: "-20"		
			},
			listeners : {
				apply	: function( unit, fireman ){
					unit.getHurt( 20, fireman );
				}
			}			
		}, 
			4: 		{
			id			: 4,
			desc	: "恢复MP",
			count	: 5,
			name	: "绛珠仙草",
			consumable : true,
			effect	: 3,
			src		: "images/item/94-1.png",
			animation : {
				color	: "#0080ff",
				text	: "+50"		
			},
			listeners : {
				apply	: function( unit, fireman ){
					unit.onIncreaseMP( 50 );
				}
			}
		},			
		"taipingqing"	: {
			id			: "taipingqing",
			desc	: "太平清领道",
			count	: 0,
			name	: "水灵珠",
			consumable : false,
			nounit	: true,
			effect	: 7,
			src		: "images/item/77-1.png",
			listeners : {
				apply	: function( unit ){
					
				}
			}
		},
		},		
		//状态
		BUFFS = {
			confuse : {
				last	: 2,
				src	   : "images/magic/49-1.png",
				desc  : "迷糊中",
				listeners : {
					apply	: function( unit ){
						unit.lock = true;	//锁定用户
					}
				}					
			},
			stop		   : {
				src	   : "images/magic/51-1.png",
				desc  : "不能移动"
			}
		},
		
		ANIMATIONS = {
			fire	: {
				src	   : "images/magic/fire.png",
				w		: 48,
				h		: 48,
				inter   : 5
			},
			redStar	: {
				src	   : "images/magic/35-1.png",
				w		: 64,
				h		: 64,
				inter   : 1
			},
			storm	: {
				src	   : "images/magic/25-1.png",
				w		: 75,
				h		: 90,
				inter   : 2
			},
			zhuque	: {
				src	   : "images/magic/zhuque.png",
				w		: 300,
				h		: 300,
				inter   : 3,
				audio : "bird"
			}			
		},
		
		MAGICS = {
			light	: {
				name	: "圣光",
				desc	: "恢复HP",
				img		: "images/item/82-1.png",
				animation : "redStar",
				range	: 1, 			
				rangeType : 1,     	
				needMP	: 10,	
				effect	: 3,	
				listeners : {
					apply	: function( unit, fireman ){
						unit.onIncrease( 50 );
					},
					over	: function( magic, fireman ){
						//fireman.finish();
					}
				}	
			},
			storm	: {
				name	: "风暴",
				desc	: "单体减伤",
				img	   	: "images/item/1-1.png",
				needMP	: 50,
				range	: 4, 			
				rangeType : 2,     
				animation : "storm",	
				effect	: 7,	
				listeners : {
					apply	: function( unit, fireman ){
						unit.getHurt( 50, fireman );
					},
					over	: function( magic, fireman ){
						//fireman.finish();
					}
				}					
			}
		},
		
		AUDIOS	= {
			battle	: {
				src : "audios/battle.ogg", loop : true
			},
			attack	: {
				src : "audios/attack.ogg"
			},
			dead	: {
				src : "audios/dead.ogg"
			},
			gain	: {
				src : "audios/gain.ogg"
			},
			movefoot	: {
				src : "audios/move1.ogg", loop : true
			},
			movehorse	: {
				src : "audios/movehorse.ogg" , loop : true
			},
			turn	: {
				src : "audios/turn.ogg"
			},
			upgrade	: {
				src : "audios/upgrade.ogg"
			},
			appear	: {
				src : "audios/appear.ogg"
			},
			bird		: {
				src : "audios/bird.ogg"
			},
			script	: {
				src : "audios/open.ogg"
			}
		};
		
// 全局变量
var canvas, ctx;
//阵营 队伍 及快捷方式 //第几回合
var FACTION = 1, TEAM = 100, MYTEAM, FRIENDS, ENEMY, ROUND = 0;

		
		