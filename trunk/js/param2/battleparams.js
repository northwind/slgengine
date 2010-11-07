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
		type: 2,
		action : "checkGoal"		
	},{
		type: 2,
		action : "checkGoal"		
	},{
		id			: "liubei",
		action : "appear"
	},{
		id			: "guanyu",
		action : "appear"
	},{
		id			: "zhangfei",
		action : "appear"
	},
	// ---------------------------------------------曹操登场-----------------------------------------
	{		
		id		: "qibing1",
		action : "appear"
	}, {		
		id		: "caocao",
		action : "appear"
	}, {		
		id		: "caocao",
		action : "go",
		params : [  { x : 8, y : 2 }  ]
	}, {		
		id		: "qibing1",
		action : "go",
		params : [  { x : 7, y : 2 }  ]
	}, {		
		id		: "qibing2",
		action : "go",
		params : [  { x : 8, y : 1 }  ]
	}, {		
		type :3 ,
		group	: "ENEMY",
		action : "disappear"
	},{
		id		: "caocao",
		action : "speakTo",
		params  : [ "liubei", "玄德兄只有义军之名，未免可惜，不如和我一起共事吧？" ]
	},{
		id		: "liubei",
		action : "speakTo",
		params  : [ "caocao", "如今尚有许多地方战火未息，因此虽然承蒙好意相邀，我们还是必须前往讨贼。" ]
	},{
		id		: "caocao",
		action : "speak",
		params  : [ "是吗，那么我也不便勉强，我还有别的任务，那就后会有期了，改日相见了。" ]
	},{
		id		: "caocao",
		action : "go",
		params : [ { x :  10,  y : 18 } ]
	},{
		id		: "qibing1",
		action : "go",
		params : [ { x :  10,  y : 18 } ]
	},{
		id		: "qibing2",
		action : "go",
		params : [ { x :  10,  y : 18 } ]
	},{
		id		: "foota",
		action : "go",
		params : [ { x :  10,  y : 18 } ]
	},{
		id		: "footb",
		action : "go",
		params : [ { x :  10,  y : 18 } ]
	},{
		id		: "thirdDie",
		action : "go",
		params : [ { x :  10,  y : 18 } ]
	},{
		id		: "liubei",
		action : "speakTo",
		params  : [ "guanyu", "此人和以往所见官军不同，叫做曹操吗？……" ]
	},{
		id		: "guanyu",
		action : "speakTo",
		params  : [ "liubei", "乱世之势不可预测，获许日后还会再见。" ]
	},{
		id		: "liubei",
		action : "speakTo",
		params  : [ "guanyu", "好，我们就一面收拾黄巾军的余孽，一面前往公孙瓒的阵营，到那之后再考虑将来吧。" ]
	},{
		id		: "zhangfei",
		action : "speakTo",
		params  : [ "liubei", "好，怎么都行，能吃饱饭就行，哈哈哈哈！" ]
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

		
		