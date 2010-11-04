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
		active	: false,
		type	: 3,
		name	: "battleStart"
	},	
	actions	: [{
		type	: 2,
		action  : "playAnimation",
		params  : [ "zhuque", 100, 100 ]
	}]
},
			// --------------------------------------刘备攻击------------------------------------------------
{
	desc: "刘备攻击",
	event:{
		active : true,
		type	: 1,
		id		: "liubei",
		name   : "preAttack",
		condition : [{
			script : "ROUND < 3"
		}]
	},
	actions : [{
		id			: "liubei",
		action : "speak",
		params : [ "这是万民的愤怒！" ]
	}]	
},
				// -------------------------------------------走到张梁附近-------------------------------------------
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
	},{
		id	   : "zhangliang",
		action : "speakTo",
		params : [ "caocao", "少废话，看我宰了你！" ]
	},{
		id	   : "caocao",
		action : "speakTo",
		params : [ "zhangliang", "贼军就是贼军，如此不识实务，不配做以军之将，哼！" ]
	}]	
},
			// -------------------------------------------开场白-------------------------------------------
{
	desc	: "开场白",
	event	: {
		active	: false,
		type	: 3,
		name	: "battleStart"
	},
	actions	: [{
		type	: 2,
		action : "moveWinTo",
		params : [ 0, 1000 ]
	},{
		id		: "first",
		action : "speak",
		params : [ "去死吧" ]
	},{
		id		: "first",
		action : "attack",
		params : [ "firstDie" ]
	},{
		id		: "second",
		action : "speak",
		params : [ "啊" ]
	},{
		id		: "second",
		action : "attack",
		params : [ "secondDie" ]
	},{
		id		: "thirdDie",
		action : "fall"
	},{
		id		: "thirdDie",
		action : "speak",
		params : [ "呼、呼、哈……支持不了！<br/>再这样下去，我们会全军覆没的。" ]
	},{
		id		: "foota",
		action : "speak",
		params : [ "可恶，黄巾军的人越来越多。" ]
	},{
		id		: "foota",
		action : "turnRight"
	},{
		id		: "foota",
		action : "speak",
		params : [ "再过一会儿骑兵队会来增援的。无论无何都要顶住！" ]
	},{
		id		: "footb",
		action : "turnRight"
	},{
		id		: "footb",
		action : "speak",
		params : [ "可是依我看，还是保住自家性命要紧，现在的官军谁不这么想！" ]
	},{
		id		: "footb",
		action : "turnUp"
	},{
		id		: "footb",
		action : "speak",
		params : [ "何况咱们这里是战况最激烈的颍川，我看腐败的官军不会派兵赶来送死的。" ]
	},{
		id		: "foota",
		action : "turnLeft"
	},{
		id		: "foota",
		action : "speak",
		params : [ "话虽如此，不过援军的骑兵队长是曹操，听说他是个厉害角色。" ]
	},{
		id		: "foota",
		action : "turnUp"
	},{
		id		: "foota",
		action : "speak",
		params : [ "就信他这次吧。<br/>如今也只有等他来了。" ]
	},{
		id		: "thirdDie",
		action : "speak",
		params : [ "快、快点来吧！" ]
	},{
		type	: 2,
		action : "moveWinTo",
		params : [ 0, 300 ]
	},{
		id		: "zhangbao",
		action : "turnRight"
	},{
		id		: "zhangbao",
		action : "speak",
		params : [ "对方可真顽强。" ]
	},{
		id		: "zhangliang",
		action : "speak",
		params : [ "哼，迟早要打败他们的！可恶的官军，竟然攻打这里！一定要让他们后悔。" ]
	},{
		id		: "zhangbao",
		action : "turnDown",
		next	: -1
	}]
},{
	desc: "友军阶段1",
	event: {
		active : false,
		type: 3,
		name: "teamStart",
		condition : [{
			index : 0,
			symbol : "==",
			compare : "FRIENDS"
		}]
	},
	actions: [{
		type	: 2,
		action : "moveWinTo",
		params : [ 0, 1000 ]
	},{
		id	: "foota",
		action : "swing"
	},{
		id	: "foota",
		action : "speak",
		params : ["再坚持一会儿！<br/>让他们知道官军不是好惹的！"],
		next	: -1
	}]
},
				// -------------------------------------------刘备登场-------------------------------------------
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
	actions: [{
		type	: 2,
		action : "moveWinTo",
		params : [ 400, 0 ]
	},{
		id			: "liubei",
		action : "appear"
	},{
		id			: "guanyu",
		action : "appear"
	},{
		id			: "zhangfei",
		action : "appear"
	},{
		id	: "liubei",
		action : "speak",
		params : ["看起来好像赶上了。不过在这种寡不敌众的情况下，此地的官军好像也陷入了苦战。"]
	},{
		id	: "guanyu",
		action : "turnRight"
	},{
		id	: "guanyu",
		action : "speak",
		params : ["咱们应该里外夹攻，不过我军兵力还是少了些。"]
	},{
		id	: "zhangfei",
		action : "turnRight"
	},{
		id	: "zhangfei",
		action : "speak",
		params : ["二哥就会穷担心，我一个人就可以应付他们了。"]
	},{
		id	: "liubei",
		action : "speak",
		params : ["咱们可不能丢下官军不管，从背后抄过去直捣鹿岩吧。<br/>冲啊！"]
	},{
		id	: "liubei",
		action : "go",
		params : [ { x : 11, y : 5 } ]
	},{
		id	: "guanyu",
		action : "go",
		params : [ { x : 10, y : 5 } ]
	},{
		id	: "zhangfei",
		action : "go",
		params : [ { x : 12, y : 5 } ]
	}]
},
		// ---------------------------------------------角色阵亡-----------------------------------------
{
	desc: "友军弓兵firstDie阵亡1",
	event:{
		active	: true,
		type	: 1,
		id		: "firstDie",
		name	: "preDead"
	},
	actions : [{
		id		: "firstDie",
		action : "speak",
		params : [ "可，可恨……" ],
		next	: -1		
	}]
},{
	desc: "友军术士secondDie阵亡1",
	event:{
		active	: true,
		type	: 1,
		id		: "secondDie",
		name	: "preDead"
	},
	actions : [{
		id		: "secondDie",
		action : "speak",
		params : [ "啊……" ],
		next	: -1		
	}]
},{
	desc: "友军弓兵thirdDie阵亡1",
	event:{
		active	: true,
		type	: 1,
		id		: "thirdDie",
		name	: "preDead"
	},
	actions : [{
		id		: "thirdDie",
		action : "speak",
		params : [ "唔，援军……援军还不来吗……？" ],
		next	: -1		
	}]
},{
	desc: "张宝阵亡1",
	event:{
		active	: true,
		type	: 1,
		id		: "zhangbao",
		name	: "preDead"
	},
	actions : [{
		id		: "zhangbao",
		action : "speak",
		params : [ "难道我真的要死在这里？唔……" ],
		next	: -1		
	}]
},{
	desc: "张梁阵亡1",
	event:{
		active	: true,
		type	: 1,
		id		: "zhangliang",
		name	: "preDead"
	},
	actions : [{
		id		: "zhangliang",
		action : "speak",
		params : [ "可恨，竟然败在这帮家伙手上……" ],
		next	: -1		
	}]
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
	actions : [{
		id		: "liubei",
		action : "followMe"
	},{
		id		: "liubei",
		action : "speak",
		params : [ "二弟、三弟，等一等，这样下去前面的官军会被歼灭，在这里放火吧。" ]
	},{
		id		: "guanyu",
		action : "speak",
		params : [ "对！把他们的注意力引到这里……说不定敌人也会因此动摇的。" ]
	},{
		id		: "zhangfei",
		action : "speak",
		params : [ "那我去放火。" ]
	},{
		id		: "liubei",
		action : "speak",
		params : [ "我可不想双方有太多人无辜丧命，你可要把握好分寸。" ]
	},{
		id		: "zhangfei",
		action : "swing"
	},{
		type : 2,	
		action : "addStatic",
		params : [ "fire", 13, 5 ] 
	},{
		id		   : "guanyu",
		action : "go",
		params : [ { x : 8, y : 5 } ] 
	},{
		id		   : "guanyu",
		action : "speak",
		params : [ "这里也点上" ] 
	},{
		id		   : "guanyu",
		action : "swing"
	},{
		type : 2,	
		action : "addStatic",
		params : [ [{ name : "fire", x : 7, y : 5 }, { name : "fire", x : 6, y : 4 }]  ] 
	},{
		type : 2,	
		action : "sleep",
		params : [ 500 ] 
	},{
		id		   : "zhangfei",
		action : "turnRight"
	},{
		id		   : "zhangfei",
		action : "turnLeft"
	},{
		id		   : "zhangfei",
		action : "turnDown"
	},{
		id		   : "zhangfei",
		action : "swing"
	},{
		id		   : "zhangfei",
		action : "speak",
		params : [ "不行、不行啊，火势太小了，根本烧不到鹿岩！" ]
	},{
		id		   : "xuzijiang",
		action : "speak",
		params : [ "呵、呵、呵，那么这样呢？" ]
	},{
		id		   : "guanyu",
		action : "turnRight"
	},{
		id		   : "guanyu",
		action : "speak",
		params : [ "咦？" ]
	},{
		id		   : "zhangfei",
		action : "turnLeft"
	},{
		id		   : "zhangfei",
		action : "speak",
		params : [ "谁？！" ]
	},{
		type	   : 2,
		action : "playAnimation",
		params : [ "zhuque", 240, 160 ]
	},{
		type : 2,	
		action : "addStatic",
		params : [ [{ name : "fire", x : 15, y : 5 }, { name : "fire", x : 15, y : 6 } , { name : "fire", x : 15, y : 7 },
						   { name : "fire", x : 14, y : 4 }, { name : "fire", x : 14, y : 5 } , { name : "fire", x : 14, y : 6 },  { name : "fire", x : 14, y : 7 } , { name : "fire", x : 14, y : 8 },
						   { name : "fire", x : 13, y : 6 }, { name : "fire", x : 13, y : 7 } , { name : "fire", x : 13, y : 8 },  { name : "fire", x : 13, y : 9 },
						   { name : "fire", x : 12, y : 6 }, { name : "fire", x : 12, y : 7 } ,
						   { name : "fire", x : 7, y : 6 }, { name : "fire", x : 7, y : 7 } , 
						   { name : "fire", x : 6, y : 5 }, { name : "fire", x : 6, y : 6 } , { name : "fire", x : 6, y : 7 }, { name : "fire", x : 6, y : 8 } , { name : "fire", x : 6, y : 9 },
						   { name : "fire", x : 5, y : 6 }, { name : "fire", x : 5, y : 7 } , { name : "fire", x : 5, y : 8 }]  ] 
	},{
		id		: "fluster",
		action : "followMe"
	},{
		id		: "fluster",
		action : "turnUp"
	},{
		id		: "fluster",
		action : "turnRight"
	},{
		id		: "fluster",
		action : "turnLeft"
	},{
		id		: "fluster",
		action : "turnUp"
	},{
		id		: "fluster",
		action : "turnDown"
	},{
		id		: "fluster",
		action : "speak",
		params : [ "火！火！" ]
	},{
		id		: "fluster",
		action : "turnUp"
	},{
		id		: "fluster",
		action : "speak",
		params : [ "敌人从后面包抄过来了！" ]
	},{
		id		: "zhangliang",
		action : "followMe"
	},{
		id	: "zhangliang",
		action : "turnUp"
	},{
		id		: "zhangliang",
		action : "speak",
		params : [ "什么？你说有人偷袭……" ]
	},{
		id	: "zhangbao",
		action : "turnUp"
	},{
		id		: "zhangbao",
		action : "speak",
		params : [ "是官军的援兵吗？" ]
	},{
		id	: "zhangbao",
		action : "turnDown"
	},{
		id		: "zhangbao",
		action : "swing"
	},{
		id		: "zhangbao",
		action : "speak",
		params : ["派人对付后面的敌人！"]
	},{
		id		: "zhangbao",
		action : "fall"
	},{
		id		: "zhangbao",
		action : "speak",
		params : ["糟了……全部都不听使唤……"]
	},{
		type	: 3,
		group	: "ENEMY",	
		action : "addBuff",
		params : [ "confuse" ]
	},{
		type	: 2,
		action : "moveWinTo",
		params : [ 100, 0 ]
	},{
		id		: "guanyu",
		action : "speak",
		params : [ "啊！" ]
	},{
		id		: "zhangfei",
		action : "turnDown"
	},{
		id		: "zhangfei",
		action : "speak",
		params : [ "这是怎么回事？！" ]
	},{
		id		: "liubei",
		action : "speak",
		params : [ "不知道，现在管不了那么多了，眼前才是最重要的！" ]
	},{
		id		: "liubei",
		action : "swing"
	},{
		id		: "liubei",
		action : "speak",
		params : [ "如今敌人一片混乱，正是取胜的好机会！目标是敌军主将张宝、张梁。" ]
	},{
		id		: "liubei",
		action : "speak",
		params : [ "冲吧。" ]
	}, 
	// ---------------------------------------------曹操登场-----------------------------------------
	{
		type	: 2,
		action : "moveWinTo",
		params : [ 0, 0 ]
	},{		
		id		: "qibing1",
		action : "appear"
	}, {		
		id		: "qibing2",
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
	} ,{		
		id		: "caocao",
		action : "speak",
		params : [  "听说这边的官军正在苦战，这火势是……？！"  ]
	},{		
		id		: "qibing2",
		action : "turnRight"
	}, {		
		id		: "qibing2",
		action : "speak",
		params : [  "队长，好像是那边的人放的火，不过不像是官军……"  ]
	},{		
		id		: "caocao",
		action : "turnRight"
	},{		
		id		: "caocao",
		action : "speak",
		params : [  "恩，好像是义军。"  ]
	},{		
		id		: "caocao",
		action : "turnUp"
	},{		
		id		: "caocao",
		action : "speak",
		params : [  "你们先去鹿岩，我到义军那边看看！"  ]
	}, {		
		id		: "qibing2",
		action : "speak",
		params : [  "是"  ]
	}, {		
		id		: "qibing1",
		action : "speak",
		params : [  "是"  ]
	}, {		
		id		: "qibing2",
		action : "go",
		params : [  { x : 9,  y : 7 }  ]
	}, {		
		id		: "qibing1",
		action : "go",
		params : [  { x : 10,  y : 7 }  ]
	}, {		
		id		: "caocao",
		action : "go",
		params : [  { x : 11,  y : 4 }  ]
	}, {		
		id		: "caocao",
		action : "turnDown"
	}, {		
		id		: "caocao",
		action : "speak",
		params : [ "我是官军骑兵队长，姓曹名操字孟德。奉朝廷之命讨伐黄巾军，请问阁下尊姓大名。"  ]
	}, {		
		id		: "liubei",
		action : "turnUp"
	}, {		
		id		: "liubei",
		action : "speak",
		params : [ "我是刘备刘玄德，虽然只是农民出身，但看到当今天下大乱，为了拯救百姓，才率领义兵讨伐的。"  ]
	}, {		
		id		: "liubei",
		action : "speak",
		params : [ "希望让我与两位兄弟增援官军，一切还请曹大人差遣。"  ]
	},{		
		id		: "caocao",
		action : "speak",
		params : [ "多亏了玄德兄，黄巾军已经陷入混乱，我也没必要下达什么指示了。"  ]
	},{		
		id		: "caocao",
		action : "speak",
		params : [ "只要击毙鹿岩中的两人便可，你们还是自行奋战吧，那么后会有期。"  ]
	},{		
		id		: "caocao",
		action : "go",
		params : [ { x : 10, y : 6 }  ]
	},{		
		id		: "liubei",
		action : "go",
		params : [ { x : 9, y : 6 }  ]
	},{		
		type	: 2,
		action : "showGoal"
	},{		
		type	: 2,
		action : "lightenUnit",
		params : [ "zhangbao" ]
	},{		
		type	: 2,
		action : "lightenUnit",
		params : [ "zhangliang" ]
	},
	// ---------------------------------------------许子将登场-----------------------------------------
	{
		type	: 2,
		action : "moveWinTo",
		params : [ 0, 0 ]
	},{		
		id			: "xuzijiang",
		action : "appear"
	},	{		
		id			: "xuzijiang",
		action : "speak",
		params : [ "终于要开战了，曹大人。" ]
	},{		
		id			: "caocao",
		action : "turnUp"
	},{		
		id			: "caocao",
		action : "speak",
		params	: [ "哦？你是刚才那位给我看相的老人家，为何会到战场来？" ]
	},{		
		id			: "xuzijiang",
		action : "speak",
		params	: [ "因为我听人家说，这是曹大人第一次上阵，所以就赶来了。" ]
	},{		
		id			: "xuzijiang",
		action : "speak",
		params	: [ "我来主要是想告诉你一些……战场上应该注意的基本要点。曹大人，不知您意下如何？" ]
	},{		
		type		: 2,
		action : "choose",
		params	: [ "", [{ t : "真是求之不得", v : ">" }, { t : "没有这个必要", v : ">" }] ]
	},{		
		id			: "caocao",
		action : "speak",
		params	: [ "老人家的好意我心领了。曹某毕竟也是通晓兵法之人，我看就不用劳烦赐教了。" ]
	},{		
		id			: "xuzijiang",
		action : "speak",
		params	: [ "原来如此，真不愧是曹大人。您就当这是老头子的多虑，请别放在心上。" ]
	},{		
		id			: "xuzijiang",
		action : "speak",
		params	: [ "那小老儿告辞了。<br/>呵、呵、呵、呵。" ]
	},{		
		id			: "xuzijiang",
		action : "disappear"
	},{		
		id			: "caocao",
		action : "turnDown"
	},{		
		type		: 2,
		action : "showWhole",
		params	: [ "开始作战" ],
		next		: -1
	}
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
		// ---------------------------------------------胜利之后-----------------------------------------
{
	desc: "胜利之后",
	event:{
		active : true,
		type	: 3,
		name   : "battleWin"
	},
	actions : [{
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
		type	: 3,
		group	: "MYTEAM",	
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

		
		