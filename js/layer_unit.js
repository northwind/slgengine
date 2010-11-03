/**
 * 单元层
 * 负责统一调用角色的接口
 * 触发 回合/队伍 事件
 * 支持寻路/攻击/移动的方法
 * units	: 当前战场中可见的所有角色
 * items	: 所有角色 包括未上场或已经死亡的角色
 */
var UnitLayer = Layer.extend({
	clicked : null,	//已点击
	overed	 : null,  //滑过的
	
	teamIndex	: 0,	//当前哪只队伍在行动
	round		: 0,    //第几回合
	
	init	: function(){
		this.addEvents( "click");
		this.addEvents( { name : "roundStart", type : 2 }, { name : "roundEnd", type : 2 }, 
		                 { name : "battleStart", type : 2 },{ name : "battleOver", type : 2 } ,
									{ name : "teamStart", type : 2 }, { name :"teamEnd", type : 2 },
									{ name : "teamOver", type : 2 }, { name : "enter", type : 2 });
									 
		this._super( arguments[0] );
		
		this.teams = [];
		this.units = {};
		
		this.setTeams( TEAMS );
		this.setUnits( UNITS );
				
		//点击画布
		PANEL.on("click", this.onClick, this)
			 .on("contextmenu", this.onContextmenu, this)
			 .on("mousemove", this.onMousemove, this)
			 .on("keydown", this.onKeydown, this)
			 .on("keyup", this.onKeyup, this)
			 .on("paint", this.onPaint, this ); //定时更新
		
		this.bindEvent( "battleStart", this.startRound, this )
			 .bindEvent( "roundStart", this.onRoundStart, this )
			 .bindEvent( "roundEnd", this.onRoundEnd, this )
			 //.bindEvent( "teamStart", this.onTeamStart, this )	//AI自动接手
			 .bindEvent( "teamEnd", this.onTeamEnd, this )
			 .bindEvent( "teamOver", this.onTeamOver, this );
		
		return this;
	},
	
	setTeams : function( data ){
		for (var i=0; i<data.length; i++) {
			this.addTeam( data[i] );
		}
		return this;
	},
	
	addTeam	: function( team ){
		team.layer = this;
		var t = new Team( team );
		
		//设置全局变量
		if ( t.equal( FACTION, TEAM ) )
			MYTEAM = t;
		else if ( t.faction != FACTION )
			ENEMY = t;
		else
			FRIENDS = t;		
		//处理team相关的事件 增加回合参数
		t.on( "teamStart", function( team ){
			this.fireEvent( "teamStart", team, this.round );
		}, this ).on( "teamEnd", function( team ){
			this.fireEvent( "teamEnd", team, this.round );
		}, this ).on( "teamOver", function( team ){
			this.fireEvent( "teamOver", team, this.round );
		}, this )
		
		this.teams.push( t );
	},
	
	findTeam	: function( f, t ){
		for (var i=0; i<this.teams.length; i++) {
			var team = this.teams[ i ];
			if ( team.equal( f, t ) )
				return team;
		}
		return null;
	},
	
	removeTeam	: function( team ){
		var i = $.inArray( team, this.teams );
		if (i > -1) {
			if ( this.teamIndex >= i  )
				this.teamIndex--;			//指针回退一格
				
			this.teams.splice(i, 1);
		}
	},
	
	getCurrentTeam	: function(){
		return this.teams[ this.teamIndex ];
	},
	
	start		: function(){
		log( "this.unitsLayer.start" );
		
		this.fireEvent( "battleStart", this );		
	},
	
	startRound	: function(){
		//先播放动画再触发事件			
		this.round++;
		log( "startRound : " + this.round );
		//第一回合不显示动画
		if (this.round == 1) {
			this.fireEvent( "roundStart", this.round );
		}
		else {
			//PANEL._showTopLine("第 " + this.round + " 回合", function(){
				this.fireEvent( "roundStart", this.round );
			//}, this);
		}
	},
	
	onRoundStart	:  function(){
		this.teamIndex = 0;
		var team = this.getCurrentTeam();
		if ( team )
			this.startTeam( team );
		else{
			//没有队伍可执行了
		}	
	},
	
	onRoundEnd	: function(){
		this.startRound();
	},
	
	startTeam	: function( team ){
		if ( team.count() == 0 ){
			//没有可行动的角色时 跳过该队伍
			this.onTeamEnd();
		}else{
			log( "startTeam : " + team.name );
			var tip = team.name + " 阶段";
			//将回合信息放在第一个执行的队伍后
			if ( this.teamIndex == 0 )
				tip += "<br/><small>第" + this.round + "回合</small>";
				
			PANEL._showTopLine( tip, function(){
				team.start();
			}, this);
		}		
	},
	
	onTeamStart	: function(){
	},
	
	onTeamEnd	: function(){
		if ( this.teamIndex++ == this.teams.length - 1 ) {
			//回合结束
			log( "roundEnd : " + this.round );
			this.fireEvent( "roundEnd", this.round );
		}else{
			//继续下一个队伍
			var team = this.getCurrentTeam();
			if ( team )
				this.startTeam( team );
		}			
	},
	
	onTeamOver	: function( team ){
		this.removeTeam( team );
	},
	
	finishTeam : function( f, t ){
		var team = this.findTeam( f, t );
		if ( team )
			team.finish();
	},
	
	setUnits : function( data ){
		for (var i = 0; i < data.length; i++) {
			var unit = this._initUnit( data[i] );
			this.items.reg( unit.id, unit );
			
			//添加没有阵亡同时可见的角色
			if ( !unit.dead && unit.visiable ){
				this.units[ unit.cell.index ] = unit;
			}
		}			
		return this;
	},
	
	//角色进入某一个单元格
	//判断获得物品
	onEnter	: function( unit ){
		unit.suspendEvent( "standby" );
		this.bindEvent( "enter", function( unit ){
				unit.resumeEvent( "standby" );
			 }, this )
			 .fireEvent("enter", unit, unit.cell.x, unit.cell.y );
	},
		
	onPaint	: function(){
		//绘制图像
		for( var key in this.units ){
			this.units[ key ].draw();
		}
		//绘制状态图标
		for( var key in this.units ){
			this.units[ key ].drawBuff();
		}				
		//绘制提示信息
		for( var key in this.units ){
			this.units[ key ].drawTip();
		}			
	},
	
	onKeydown	: function( e ){
		//按ALT时
		if ( e.which == 18 )
			for( var index in this.units )
				this.units[ index ].hpLineForce = true;
				
		//没有弹出菜单时右键才有效
		if ( e.which == 27 && PANEL.winLayer.passby() ){
			if ( this.clicked )
				this.clicked.unClick();
			
			this._removeCells();	
		}			
	},	
	
	onKeyup	: function( e ){
		//按ALT时
		if ( e.which == 18 ){
			for( var index in this.units )
				this.units[ index ].hpLineForce = false;
		}
	},		
	
	onMousemove	: function( e ){
		var  cell = PANEL.getCell( e );
		if (cell) {
			var unit = this.getUnitByIndex( cell.index );
			//已经存在则隐藏
			if (this.overed && unit != this.overed) {
				this.overed.hideMajor();
				delete this.overed;
			}
			if ( unit && this.overed != unit) {
				this.overed = unit.showMajor();
			}
		}
	},
	
	canClick	: function(){
		return PANEL.winLayer.passby() && !PANEL.isScripting();
	},
	
	onClick	: function( e ){
		//有弹出菜单时不触发click
		if ( this.canClick() ) {
			var cell = PANEL.getCell(e),
				unit = this.getUnitByIndex( cell.index );
			
			//注册的事件返回false时不继续执行
			this.fireEvent("click", cell, unit, this); 
			
			if (this.clicked) {
				//如果可以攻击
				if ( unit && this.clicked.canAttack(cell, unit ) ) {
					this._removeCells();
					
					this.clicked.attack( unit, function(){
						log( "after unit attack" );
						this.finish();
					}, this.clicked, { one : true } );
				}
				else 
					//如果可以移动
					if (this.clicked.canMove(cell)) {
					
						this._removeCells();
						this.clicked.moveTo(cell);
					}
			}
			else {
				if ( unit ) 
					unit.click(e);
				//没有锁定同时具有移动性
				if ( unit && !unit.lock && unit.moveable && unit.isSibling( FACTION, TEAM) ) {
				//if ( unit && !unit.lock && unit.moveable ) {
					unit.showMoves();
					
					this.clicked = unit;
				}
			}
		}
	},
	
	_removeCells			: function(){
		PANEL.cellLayer.paintCells( MOVECOLOR, {} );
		PANEL.cellLayer.paintCells( ATTACKCOLOR, {} );
		PANEL.cellLayer.strokeCells( ATTACKCOLOR, {} );
	},
	
	showAttackCells		: function( obj ){
		PANEL.cellLayer.paintCells( ATTACKCOLOR, obj );
	},
	
	//得到以cell为中心，相隔range的所有cell
	_getRectAtkCells	: function( cell, range ){
		var all = {}, x = cell.x, y = cell.y;
		
		for ( i= x-range ; i<=x + range; i++) {
			for ( j= y-range ; j<=y + range; j++) {
					var node = PANEL.getCell( i, j);
					if ( node )
						all[ node.index ] = node;
			}
		}			
		return all;
	},
	
	getAttackCells	: function( cell,	range, type ){
		var all = {}, index = cell.index, x = cell.x, y = cell.y;
		
		switch( type ) {
			case 1:	//全方位攻击
				all = this._getRectAtkCells( cell, range );		
				break;
			case 2:	//蔓延型
				//先找出全方位攻击的CELL
				var  ret = this._getRectAtkCells( cell, range );	
				//再筛选相距cell range远的单元格
				for( var key in ret ){
					var tmp = ret[ key ];
					if ( cell.distance( tmp ) <= range ){
						all[ tmp.index ] = tmp;
					}
				}
				break;
			case 3:	//散射型
				//先找出全方位攻击的CELL
				var  ret = this._getRectAtkCells( cell, range );	
				//再筛选相距cell range远的单元格
				for( var key in ret ){
					var tmp = ret[ key ];
					if ( cell.distance( tmp ) == range ){
						all[ tmp.index ] = tmp;
					}
				}
				
				break;		
			case 4:	//十字型
				//先找出全方位攻击的CELL
				var  ret = this._getRectAtkCells( cell, range );	
				//再筛选相距cell range远的单元格 并且X/Y轴相等
				for( var key in ret ){
					var tmp = ret[ key ];
					if ( cell.distance( tmp ) == range && ( tmp.x == cell.x || tmp.y == cell.y ) ){
						all[ tmp.index ] = tmp;
					}
				}
				
				break;		
			case 5:	//直线型
				//先找出全方位攻击的CELL
				var  ret = this._getRectAtkCells( cell, range );	
				//再筛选相距cell range远的单元格 并且X/Y轴相等
				for( var key in ret ){
					var tmp = ret[ key ];
					if ( cell.distance( tmp ) <= range && ( tmp.x == cell.x || tmp.y == cell.y ) ){
						all[ tmp.index ] = tmp;
					}
				}
				
				break;	
			case 6:	//方框型
				//先找出全方位攻击的CELL
				var  ret = this._getRectAtkCells( cell, range );	
				//再筛选相距cell range远的单元格 并且X/Y轴相等
				for( var key in ret ){
					var tmp = ret[ key ];
					if ( tmp.x == (cell.x + range) || tmp.y == (cell.y + range) ||
						 tmp.x == (cell.x - range) || tmp.y == (cell.y - range)  ){
						all[ tmp.index ] = tmp;
					}
				}
				
				break;													
		}
		
		//把自身刨出去
		delete all[ index ];

		return all;		
	},
	
	getWalkCells : function( cell, step ){
		if ( step <= 0 )
				return {}[ cell.index ]  = cell ;
		
		var open = {}, closed = {}, units = this.units;
		//删除原指针
		delete cell.parent;
		open[ cell.index ] = cell;
		
		function prepare( x,y,parent ){
			var key = getIndex( x, y ), unit = units[ key ], child =  PANEL.getCell( x, y );
			//判断是否可以行走/是否已经计算过/如果有单位在单元格上判断是否可以叠加
			if ( child && !open[key] && !closed[key] && MAP[y] && MAP[y][x] ==0 && (unit ? unit.overlay : true  ) ) {
				child.parent = parent;
				open[key] = child;
			}	
		}
			
		while( !_isEmpty( open ) && step-- >0 ){
			for (var key in open ) {
				node = open[ key ];
				//添加到已处理过的closed表
				closed[ key ] = node;
				
				//添加子节点
				//up
				prepare( node.x, node.y-1, node );	
				//down
				prepare( node.x, node.y +1 , node );
				//left
				prepare( node.x -1, node.y, node );
				//right
				prepare( node.x +1, node.y, node );
				
				//并从OPEN表中删除
				delete open[ key ];
			}
		}
		
		return closed;
	},
	
	//A* 算法寻路
	findWay			: function( character, from, to ){
		//return [ from ];
		var ret =[], opened = {}, closed = {}, units = this.units, 
			node = null, minD, tmpNode, faction = character.faction,
			targetX = to.x, targetY = to.y, loops = 0;
		
		//直线距离 	
	    function calcD( tmp ){
			if ( tmp.d )
				return tmp.d;
				
			var m = targetX - tmp.x , n = targetY - tmp.y;
	        return tmp.d = Math.sqrt( m *m + n * n );
	    } 
		function insertSon( node, p ){
			if (node) {
				var key = node.index, unit = units[key];
				
				if (!open[key] && !closed[key] && node && MAP[node.y][node.x] == 0 && (unit ? (unit.overlay && !unit.isEnemy(faction)) : true)) {
					calcD(node);
					node.parent = p;
					opened[node.index] = node;
				}
			}
		}			
		//获得子节点
		function getChildren( node ){
			//up
			insertSon( node.up(), node );
			//down
			insertSon( node.down(), node );
			//left
			insertSon( node.left(), node );
			//right
			insertSon( node.right(), node );
		} 	

		//删除原指针
		delete from.parent;
		calcD( from );
		opened[ from.index ] = from;
				
		while( !_isEmpty( opened ) && loops++ < 100 ){
			minD = 10000000; 
			//找到权值最小的节点
			for( var i in opened ){
				tmpNode = opened[i];
				var d = calcD( tmpNode );
				if ( d < minD ){
					minD = d;
					node = tmpNode;
				}	
			}
			
			//添加到已处理过的closed表
			closed[ node.index ] = node;
						
			//如果找到了，终止循环
			if ( node == to ) {
				opened = {};
				break;
			}else{
				//获得子节点
				getChildren( node );
			}
			
			//并从OPEN表中删除
			delete opened[ node.index ];				
		}
		
		//回朔找出路径
		if ( closed[ to.index ] ){
			var step = node;// closed[ target.key ];
			while ( step.parent ) {
				ret.push( step );
				step = step.parent;
			}
		}
		
		return ret;				
	},
			
	onContextmenu	: function( e ){
		//没有弹出菜单时右键才有效
		if ( !PANEL.winLayer.hasWindow() ) {
			if ( this.clicked )
				this.clicked.unClick();
			
			this._removeCells();	
		}
	},	
	
	//在战场上新出现的角色
	showAt				: function( unit ){
		this.units[ unit.cell.index ] = unit; 
		
		var team = this.findTeam( unit.faction, unit.team );
		if ( team )
			team.add( unit );
		
		return this;
	},
	
	getUnitByIndex	: function( key ){
		return this.units[ key ];
	},	
	
	getUnitById : function( id ){
		return this.items.get( id ); 
	},		
	
	delUnitByIndex	: function( index ){
		delete this.units[ index ];
	},
	
	//取消已选中
	deleteClicked	: function( unit ){
		if ( unit == this.clicked )
			delete this.clicked;
	},
	
	_initUnit	: function( config ){
		config.layer = this;
		var unit = new Unit( config );
			
		unit.on( "standby", this.deleteClicked, this )
			//.on( "standby", this.onEnter, this )
			.on( "move", function( unit ){
				log( "move event : unit.auto = "  + unit.auto);
				//运行脚本时不弹框
				if ( !PANEL.isScripting() && !unit.auto )
					PANEL.popActionMenu( unit, unit.cell.dx - CELL_WIDTH * 2, unit.cell.dy - CELL_HEIGHT );
			}, this )
			.on( "walk", function( unit, from, to ){
				//角色移动时及时更新管理器
				//窗口自动跟随
				if ( unit.auto ){
					PANEL.moveToCell( to );
				}
				this.units[ to.index ] = this.units[ from.index ];
				delete this.units[ from.index ];
			}, this )
			//点击角色时显示该角色属性
			.on( "click", PANEL.showUnitAttr, PANEL )
			//状态更改时重新显示该角色属性
			.on( "change", function( unit ){
				if ( unit == this.clicked )
					PANEL.showUnitAttr( unit );
			}, this )
			//取消点击时,隐藏该角色属性
			.on( "unclick", function( unit ){
				if ( unit == this.clicked )
					PANEL.hideUnitAttr();
					
				this.deleteClicked( unit );
			}, this )
			.on( "dead", function( unit ){
				this.delUnitByIndex( unit.cell.index );
			}, this );
		
		if (unit.visiable) {
			var team = this.findTeam(unit.faction, unit.team);
			if (team) {
				team.add(unit);
			}
		}
		return unit;
	}
}); 