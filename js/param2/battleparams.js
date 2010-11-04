/**
 * 战场参数
 */
var 
//队伍集合
TEAMS	= [{
	faction : 1, team : 100, name : "我军"
},{
	faction : 1, team : 200, name : "友军"
},{
	faction : 0, team : 1, name : "敌军"
}],
//形象集合
FIGURES = {
	"caocao"	: {
		imgMove	:"images/move/109-1.png",
		imgAtk	: "images/atk/109-1.png",
		imgSpc	: "images/spc/109-1.png",
		imgFace	: "images/face/1-1.png"		
	},
	"liubei"	: {
		imgMove	:"images/move/145-1.png",
		imgAtk	: "images/atk/145-1.png",
		imgSpc	: "images/spc/145-1.png",
		imgFace	: "images/face/40-1.png"		
	},	
	"guanyu"	: {
		imgMove	:"images/move/146-1.png",
		imgAtk	: "images/atk/146-1.png",
		imgSpc	: "images/spc/146-1.png",
		imgFace	: "images/face/14-1.png"		
	},	
	"zhangfei"	: {
		imgMove	:"images/move/147-1.png",
		imgAtk	: "images/atk/147-1.png",
		imgSpc	: "images/spc/147-1.png",
		imgFace	: "images/face/41-1.png"		
	},			
	"xuzijiang"	: {
		imgMove	:"images/move/80-1.png",
		imgAtk	: "images/atk/80-1.png",
		imgSpc	: "images/spc/80-1.png",
		imgFace	: "images/face/214-1.png"		
	},			
	"cavalryman"	: {  //骑兵
		imgMove	:"images/move/14-1.png",
		imgAtk	: "images/atk/14-1.png",
		imgSpc	: "images/spc/14-1.png",
		imgFace	: "images/face/181-1.png"			
	},	
	"archer"	: {
		imgMove	:"images/move/26-1.png",
		imgAtk	: "images/atk/26-1.png",
		imgSpc	: "images/spc/26-1.png",
		imgFace	: "images/face/178-1.png"			
	},
	"footman" :	{
		imgMove	:"images/move/1-1.png",
		imgAtk	: "images/atk/1-1.png",
		imgSpc	: "images/spc/1-1.png",
		imgFace	: "images/face/23-1.png"			
	},
	"huangjinjun"	: {
		imgMove	:"images/move/103-1.png",
		imgAtk	: "images/atk/103-1.png",
		imgSpc	: "images/spc/103-1.png",
		imgFace	: "images/face/192-1.png"			
	},		
	"sushiBlue" :	{
		imgMove	:"images/move/84-1.png",
		imgAtk	: "images/atk/84-1.png",
		imgSpc	: "images/spc/84-1.png",
		imgFace	: "images/face/154-1.png"			
	},	
	"enchanterYellow"	:  {  //魔法师
		imgMove	:"images/move/71-1.png",
		imgAtk	: "images/atk/71-1.png",
		imgSpc	: "images/spc/71-1.png",
		imgFace	: "images/face/176-1.png"			
	},
	"footmanYellow" :	{
		imgMove	:"images/move/2-1.png",
		imgAtk	: "images/atk/2-1.png",
		imgSpc	: "images/spc/2-1.png",
		imgFace	: "images/face/180-1.png"			
	},
	"archerYellow"	: {
		imgMove	:"images/move/23-1.png",
		imgAtk	: "images/atk/23-1.png",
		imgSpc	: "images/spc/23-1.png",
		imgFace	: "images/face/16-1.png"			
	}		
},

ACTIONGROUPS   = [{
	desc: "测试",
	event:{
		active	: true,
		type	: 3,
		name	: "battleStart"
	},	
	actions	: [{
		id		: "zhangbao",
		action  : "addBuff",
		params  : [ "confuse" ]
	},{
		id		: "zhangliang",
		action  : "addBuff",
		params  : [ "confuse" ]
	}]
},	// --------------------------------------------------------------------------------------
{
	desc: "刘备攻击",
	event:{
		active : true,
		type	: 1,
		id		: "caocao",
		name   : "preAttack",
		condition : [{
			script : "ROUND < 3"
		}]
	},
	actions : [{
		id			: "caocao",
		action : "speakTo",
		params : [ "zhangbao", "这是万民的愤怒！" ]
	}]	
},	
{
	desc: "走到张梁附近",
	event:{
		active : true,
		type	: 1,
		id		: "caocao",
		name   : "standby",
		condition : [{
			script : " PANEL.getUnitById('caocao').isAround('zhangliang') "
		}]
	},
	actions : [{
		id	   : "caocao",
		action : "speakTo",
		params : [ "zhangliang", "你就是张梁吧，虽然身为贼军，毕竟也是一军之将，干脆乖乖投降吧。" ]
	}]	
},
{
	desc: "敌军阶段1",
	event: {
		active : true,
		type: 3,
		name: "teamStart",
		condition : [{
			index : 0,
			symbol : "==",
			compare : "ENEMY"
		},{
			index : 1,
			symbol : "==",
			compare : "1"
		}]
	},
	actions: []
},{
	desc: "第二回合开始",
	event:{
		active : true,
		type: 3,
		name: "roundStart",
		condition : [{
			index : 0,
			symbol : "==",
			compare : "2"
		}]
	},
	actions : [
	// ---------------------------------------------曹操登场-----------------------------------------

	]
},
			// ---------------------------------------------获得物品-----------------------------------------
{
	desc: "获得物品1",
	event:{
		active : true,
		type: 3,
		name: "enter",	//unit cell.x cell.y
		condition : [{
			index : 1,
			symbol : "==",
			compare : "13"
		},{
			index : 2,
			symbol : "==",
			compare : "12"
		}]		
	},
	actions : [{
		type: 2,
		action : "gainStuffOnCell",
		params : [ 13, 12, 1, 1 ],
		next	: -1		
	}]
},{
	desc: "获得物品2",
	event:{
		active : true,
		type: 3,
		name: "enter",	//unit cell.x cell.y
		condition : [{
			index : 1,
			symbol : "==",
			compare : "13"
		},{
			index : 2,
			symbol : "==",
			compare : "13"
		}]		
	},
	actions : [{
		type: 2,
		action : "gainStuffOnCell",
		params : [ 13, 13, 1, 1 ],
		next	: -1		
	}]
},{
	desc: "获得物品3",
	event:{
		active : true,
		type: 3,
		name: "enter",	//unit cell.x cell.y
		condition : [{
			index : 1,
			symbol : "==",
			compare : "9"
		},{
			index : 2,
			symbol : "==",
			compare : "11"
		}]		
	},
	actions : [{
		type: 2,
		action : "gainStuffOnCell",
		params : [ 9, 11, 1, 1 ],
		next	: -1		
	}]
},		
	// ---------------------------------------------从死者身上搜刮物品-----------------------------------------
{
	desc: "从死者身上搜刮物品1",
	event:{
		active : true,
		type	: 1,
		id		: "zhangbao",
		name   : "dead"
	},
	actions : [{
		id			: "zhangbao",
		action : "award",
		params : [ "taipingqing", 1 ]
	}]	
},	
			// ---------------------------------------------检查胜利/失败-----------------------------------------
{
	desc: "检查胜利1",
	event:{
		active : true,
		type	: 1,
		id	   : "zhangbao",
		name   : "dead"		
	},
	actions : [{
		type: 2,
		action : "checkGoal"
	}]
},{
	desc: "检查胜利2",
	event:{
		active : true,
		type	: 1,
		id	   : "zhangliang",
		name   : "dead"		
	},
	actions : [{
		type: 2,
		action : "checkGoal"
	}]
},{
	desc: "检查失败1",
	event:{
		active : true,
		type	: 1,
		id	   : "caocao",
		name   : "dead"		
	},
	actions : [{
		type: 2,
		action : "checkFail"
	}]
},{
	desc: "检查失败2",
	event:{
		active : true,
		type	: 3,
		name   : "roundEnd",
		condition : [{
			index : 0,
			symbol : ">=",
			compare : "10"
		}]		
	},
	actions : [{
		type: 2,
		action : "checkFail"
	}]
}
		// ---------------------------------------------胜利之后-----------------------------------------
,{
	desc: "胜利之后",
	event:{
		active : true,
		type	: 3,
		name   : "battleWin"
	},
	actions : [{
		id		: "caocao",
		action : "speak",
		params  : [ "玄德兄只有义军之名，未免可惜，不如和我一起共事吧？" ]
	}]
}	

],

CHAPTER = "颍川之战",
BGIMAGE	= "images/bigmap/1-1.jpg",
GOAL = "胜利条件<br/>&nbsp;&nbsp;击毙张宝和张良!<br/>限制回合数&nbsp;10",
VICTORYN = 2,	//已达成胜利的条件数  当达到一定数量后获得胜利
FAILEDN = 1, 	//已失败的条件数   达到一定数量后失败
/*
	0  可以行走
	1  不可行走
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
		]
		;  

		
		