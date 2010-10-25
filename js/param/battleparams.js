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
//角色集合
ROLES = {
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
		imgFace	: "images/face/80-1.png"		
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

ACTIONS= [{
	type	: 1,
	id		: "first",
	action : "speak",
	params : [ "去死吧" ],
	next	: 1
},{
	type	: 1,
	id		: "first",
	action : "attack",
	params : [ "firstDie" ],
	next	: 2,
},{
	type	: 1,
	id		: "firstDie",
	action : "speak",
	params : [ "可、可恨……" ],
	next	: 3
},{
	type	: 1,
	id		: "firstDie",
	action : "die",
	params : [ null ],
	next	: 4
},{
	type	: 1,
	id		: "second",
	action : "speak",
	params : [ "啊" ],
	next	: 5
},{
	type	: 1,
	id		: "second",
	action : "attack",
	params : [ "secondDie" ],
	next : 6
},{
	type	: 1,
	id		: "secondDie",
	action : "speak",
	params : [ "啊……" ],
	next : 7
},{
	type	: 1,
	id		: "secondDie",
	action : "die",
	params : [ null ],
	next	: 8
},{
	type	: 1,
	id		: "thirdDie",
	action : "fall",
	next : 9
},{
	type	: 1,
	id		: "thirdDie",
	action : "speak",
	params : [ "呼、呼、哈……支持不了！<br/>再这样下去，我们会全军覆没的。" ],
	next : 10
},{
	type	: 1,
	id		: "foota",
	action : "speak",
	params : [ "可恶，黄巾军的人越来越多。" ],
	next : 11
},{
	type	: 1,
	id		: "foota",
	action : "turnRight",
	next : 12
},{
	type	: 1,
	id		: "foota",
	action : "speak",
	params : [ "再过一会儿骑兵队会来增援的。无论无何都要顶住！" ],
	next : 13
},{
	type	: 1,
	id		: "footb",
	action : "turnRight",
	next : 14
},{
	type	: 1,
	id		: "footb",
	action : "speak",
	params : [ "可是依我看，还是保住自家性命要紧，现在的官军谁不这么想！" ],
	next : 15
},{
	type	: 1,
	id		: "footb",
	action : "turnUp",
	next : 16
},{
	type	: 1,
	id		: "footb",
	action : "speak",
	params : [ "何况咱们这里是战况最激烈的颍川，我看腐败的不会派兵赶来送死的。" ],
	next : 17
},{
	type	: 1,
	id		: "foota",
	action : "turnLeft",
	next : 18
},{
	type	: 1,
	id		: "foota",
	action : "speak",
	params : [ "话虽如此，不过援军的骑兵队长是曹操，听说他是个厉害角色。" ],
	next : 19
},{
	type	: 1,
	id		: "foota",
	action : "turnUp",
	next : 20
},{
	type	: 1,
	id		: "foota",
	action : "speak",
	params : [ "就信他这次吧。<br/>如今也只有等他来了。" ],
	next : 21
},{
	type	: 1,
	id		: "thirdDie",
	action : "speak",
	params : [ "快、快点来吧！" ],
	next : 22
}],

CHAPTER = "颍川之战",
BGIMAGE	= "images/bigmap/1-1.jpg",
GOAL = "胜利条件<br/>&nbsp;&nbsp;击毙张宝和张良!<br/>限制回合数&nbsp;20",
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

		
		