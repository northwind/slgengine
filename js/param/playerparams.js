/**
 * 玩家存储的信息
 */
var 
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

//UNIT集合，配置项参考UNIT类
UNITS	= [{
	id: "caocao", gx :  7,  gy : 0, range : 1, rangeType : 2, hpMax : 110, step:7, hp : 110, symbol	: "caocao", 
	magicNames	: [ "light", "storm" ], direct : "down",  burst	:  35,
	faction : 1, team : 100, mpMax : 100, mp : 100, name : "曹操", level : 1,  visiable : false	
},{
	id: "qibing1", gx :  6,  gy : 0, range : 1, rangeType : 2, hpMax : 110, hp : 110, symbol	: "cavalryman", direct : "down",
	faction : 1, team : 200, mpMax : 10, mp : 10, name : "骑兵", level : 1, attackFreqMax : 1, visiable : false, face : "images/face/180-1.png"	
},{
	id: "qibing2", gx :  5,  gy : 0, range : 1, rangeType : 2, hpMax : 110, hp : 110, symbol	: "cavalryman", direct : "down",
	faction : 1, team : 200, mpMax : 10, mp : 10, name : "骑兵", level : 1, attackFreqMax : 1, visiable : false	
},{
	id: "xuzijiang", gx :  9,  gy : 0, range : 1, rangeType : 2, hpMax : 110, hp : 110, symbol	: "xuzijiang",
	faction : 1, team : 200, mpMax : 10, mp : 10, name : "许子将", level : 1, visiable : false	
},

//友军
{
	id: "liubei", gx :  14,  gy : 1, range : 1, rangeType : 2,  burst	:  35,  hpMax : 110, hp : 110, symbol	: "liubei",
	faction : 1, team : 200, mpMax : 10, mp : 10, name : "刘备", level : 1, visiable : false	
},{
	id: "guanyu", gx :  13,  gy : 2, range : 1, rangeType : 2,  burst	:  35, hpMax : 110, hp : 110, symbol	: "guanyu",
	faction : 1, team : 200, mpMax : 10,  attackFreqMax : 2,  mp : 10, name : "关羽", level : 1, visiable : false	
},{
	id: "zhangfei", gx :  13,  gy : 1, range : 1, rangeType : 2,  burst	:  35, hpMax : 110, hp : 110, symbol	: "zhangfei",
	faction : 1, team : 200, mpMax : 10, mp : 10, name : "张飞", level : 1, visiable : false	
},
{
	id: "firstDie", gx :  7,  gy : 16, range : 2, rangeType : 3, hpMax : 110, hp : 1, symbol	: "archerYellow", miss : 0,
	faction : 1, team : 200, mpMax : 10, mp : 10, name : "弓箭兵", level : 1, face : "images/face/183-1.png",
	visiable : true	 	
},{
	id : "thirdDie", direct:"up", gx :  12,  gy : 17, range : 2, rangeType : 3, hpMax : 110, hp : 20, symbol	: "archerYellow",
	 faction : 1, team : 200, mpMax : 10, mp : 10, name : "弓兵", level : 1, face : "images/face/184-1.png"	, visiable : true	
},{
	id : "foota", direct:"up", gx :  10,  gy : 17, revenge	:  35,  burst	:  15,  range : 1, rangeType : 1, hpMax : 110, hp : 110, symbol	: "footmanYellow", 
	 faction : 1, team : 200, mpMax : 10, mp : 10, name : "步兵", level : 1, face : "images/face/182-1.png"	, visiable : true	
},{
	id : "footb", direct:"up", gx :  9,  gy : 18, revenge	:  35, burst	:  15, range : 1, rangeType : 1, hpMax : 110, hp : 110, symbol	: "footmanYellow", 
	 faction : 1, team : 200, mpMax : 10, mp : 10, name : "步兵", level : 1, face : "images/face/185-1.png"	, visiable : true	
},{
	id : "secondDie", gx :  12,  gy : 16, range : 1, rangeType : 2, hpMax : 110, hp : 1, symbol	: "enchanterYellow", miss : 0, 
	faction : 1, team : 200, mpMax : 10, mp : 10, name : "术士", level : 1, face : "images/face/173-1.png", visiable : true	 	
},

//敌军
{
	 id : "zhangbao", gx :  9,  gy : 11, range : 1, rangeType : 2, hpMax : 92, hp : 92, symbol	: "sushiBlue", step : 1, defnum : 10,
	 faction : 0, team : 1, mpMax : 48, mp : 48, name : "张宝", level : 5, face : "images/face/154-1.png"	
},{
	 id : "zhangliang", gx :  10,  gy : 11, range : 1, rangeType : 2, hpMax : 92, hp : 92, symbol	: "sushiBlue", step : 1, defnum : 10,
	 faction : 0, team : 1, mpMax : 48, mp : 48, name : "张梁", level : 5, face : "images/face/155-1.png"	
},{
	gx :  5,  gy : 10, range : 1, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军", visiable : true	
},{
	gx :  5,  gy : 11, range : 1, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军", visiable : true	
},{
	id : "fluster2", gx :  8,  gy : 10, range : 1, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军", visiable : true	, face : "images/face/179-1.png"
},{
	gx :  7,  gy : 11, range : 1, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军", visiable : true	
},{
	id : "fluster", gx :  12,  gy : 10, range : 1, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun", step : 1,
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军", visiable : true	
},{
	gx :  12,  gy : 12, range : 1, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军", visiable : true	
},{
	gx :  9,  gy : 14, range : 1, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军", visiable : true	
},{
	gx :  10,  gy : 14, range : 1, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军", visiable : true	
},{
	gx :  9,  gy : 15, range : 1, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军", visiable : true	
},{
	gx :  10,  gy : 15, range : 1, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军", visiable : true	
},{
	id : "second", gx :  12,  gy : 15, range : 1, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军", visiable : true
},{
	id : "first", gx :  6,  gy : 16, range : 1, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军", direct : "right", visiable : true, face : "images/face/179-1.png"
}]
;  

		
		