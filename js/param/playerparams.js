/**
 * 玩家存储的信息
 */
var 
//UNIT集合，配置项参考UNIT类
UNITS	= [{
	gx :  11,  gy : 13,  type : 100, moveable : true, overlay : false, range : 1, rangeType : 1,
	symbol	: "caocao", name : "曹操", hp : 4 , attackFreqMax : 2, faction : 1, team : 100, exp : 98, id : "caocao", mp : 100,
	listeners : {
		dead	: function(){
			//alert( this.name );
		}
	},
	magicNames	: [ "light", "storm" ]
},{
	gx :  19,  gy : 19,  type : 101, moveable : true, overlay : false, range : 2, rangeType : 2,
	symbol	: "footman",  faction : 1, team : 100,  name : "刘备", exp : 86, mp : 20,
	magicNames	: [ "light" ]	
},{
	gx :  10,  gy : 0,  type : 101, moveable : true, overlay : false, range : 2, rangeType : 2,
	symbol	: "footman",  faction : 1, team : 200,  name : "关羽"
}
,{
	gx :  11,  gy : 4,  type : 101, moveable : true, overlay : false, range : 2, rangeType : 2,
	symbol	: "footman",  faction : 1, team : 200,  name : "张飞"
},{
	gx :  11,  gy : 12,  type : 101, moveable : true, overlay : false, range : 2, rangeType : 2, hp : 1,
	symbol	: "footman", faction : 0, team : 1
}, {
	gx :  12,  gy : 12,  type : 101, moveable : true, overlay : false, range : 2, rangeType : 2,
	symbol	: "footman",  faction : 0, team : 1
},{
	gx :  0,  gy : 19,  type : 101, moveable : true, overlay : false, range : 2, rangeType : 2,
	symbol	: "footman", faction : 0, team : 1
},{
	gx :  19,  gy : 5,  step: 9, type : 101, moveable : true, overlay : false, range : 2, rangeType : 2,
	symbol	: "archer", name : "弓箭手", faction : 0, team : 1
}]
;  

		
		