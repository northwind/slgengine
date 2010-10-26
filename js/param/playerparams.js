/**
 * 玩家存储的信息
 */
var 
//UNIT集合，配置项参考UNIT类
UNITS	= [

//友军
{
	id: "firstDie", gx :  7,  gy : 16, range : 2, rangeType : 2, hpMax : 110, hp : 1, symbol	: "archerYellow", miss : 0,
	faction : 1, team : 200, mpMax : 10, mp : 10, name : "弓箭兵", level : 1, face : "images/face/182-1.png",
	listeners : {
		preDead	: function( unit ){
			return false;
		}
	}	 	
},{
	id : "thirdDie", direct:"up", gx :  12,  gy : 17, range : 2, rangeType : 2, hpMax : 110, hp : 20, symbol	: "archerYellow",
	 faction : 1, team : 200, mpMax : 10, mp : 10, name : "弓兵", level : 1, face : "images/face/182-1.png"	
},{
	id : "foota", direct:"up", gx :  10,  gy : 17, range : 2, rangeType : 2, hpMax : 110, hp : 110, symbol	: "footmanYellow", 
	 faction : 1, team : 200, mpMax : 10, mp : 10, name : "步兵", level : 1, face : "images/face/182-1.png"	
},{
	id : "footb", direct:"up", gx :  9,  gy : 18, range : 2, rangeType : 2, hpMax : 110, hp : 110, symbol	: "footmanYellow", 
	 faction : 1, team : 200, mpMax : 10, mp : 10, name : "步兵", level : 1, face : "images/face/182-1.png"	
},{
	id : "secondDie", gx :  12,  gy : 16, range : 2, rangeType : 2, hpMax : 110, hp : 1, symbol	: "enchanterYellow", miss : 0, 
	 faction : 1, team : 200, mpMax : 10, mp : 10, name : "术士", level : 1, face : "images/face/182-1.png",
	listeners : {
		preDead	: function( unit ){
			return false;
		}
	}		 	
},{
	id : "liubei", gx :  12,  gy : 16, range : 2, rangeType : 2, hpMax : 110, hp : 110, symbol	: "liubei", 
	 faction : 1, team : 200, mpMax : 10, mp : 10, name : "刘备", level : 1	 	
},

//敌军
{
	 id : "zhangbao", gx :  9,  gy : 11, range : 2, rangeType : 2, hpMax : 92, hp : 92, symbol	: "sushiBlue",
	 faction : 0, team : 1, mpMax : 48, mp : 48, name : "张宝", level : 5, face : "images/face/154-1.png"	
},{
	 id : "zhangliang", gx :  10,  gy : 11, range : 2, rangeType : 2, hpMax : 92, hp : 92, symbol	: "sushiBlue",
	 faction : 0, team : 1, mpMax : 48, mp : 48, name : "张梁", level : 5, face : "images/face/155-1.png"	
},{
	gx :  5,  gy : 10, range : 2, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军"
},{
	gx :  5,  gy : 11, range : 2, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军"
},{
	gx :  8,  gy : 10, range : 2, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军"
},{
	gx :  7,  gy : 11, range : 2, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军"
},{
	gx :  12,  gy : 10, range : 2, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军"
},{
	gx :  12,  gy : 12, range : 2, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军"
},{
	gx :  9,  gy : 14, range : 2, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军"
},{
	gx :  10,  gy : 14, range : 2, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军"
},{
	gx :  9,  gy : 15, range : 2, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军"
},{
	gx :  10,  gy : 15, range : 2, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军"
},{
	id : "second", gx :  12,  gy : 15, range : 2, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军"
},{
	id : "first", gx :  6,  gy : 16, range : 2, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军", direct : "right"
}]
;  

		
		