/**
 * 场景参数
 */
var Scene_1 = {
	
	name		: "营中大帐",
	bg			: PATH + "images/bigmap/1-1.jpg",
	CELL_XNUM	: 20,
	CELL_YNUM   : 20,
	
	
	ACTIONGROUPS	: [{
		desc: "测试",
		event:{
			active	: false,
			type	: 3,
			name	: "battleStart"
		},	
		actions	: [{
			type	   : 4,
			action : "playAnimation",
			params : [ "zhuque", 240, 160 ]
		}]
	}],
	
	map			: [
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
};

		
		