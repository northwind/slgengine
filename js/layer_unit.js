/**
 * @author Norris
 */
var UnitLayer = Layer.extend({
	clicked : null,	//已点击
	overed	 : null,  //滑过的
	moveColor	: "rgba(39,167,216,0.6)", 
	attaColor		: "rgba(255,0,0,0.5)", 
	
	teamIndex	: 0,	//当前哪只队伍在行动
	round		: 0,    //第几回合
	hpLineForce : false,	//是否强制显示血条
	
	init	: function(){
		this._super( arguments[0] );
		this.units = {};
		
		//加载中时执行该事件
		this.addEvents( "loading", "click", "load", "roundStart", "roundEnd", "teamStart", "teamEnd", "teamOver" );
		
		var _self = this;
		//定时更新
		PANEL.on("update", this.update, this );
		//点击画布
		PANEL.on("click", this.onClick, this);
		PANEL.on("contextmenu", this.onContextmenu, this);
		PANEL.on("mousemove", this.onMousemove, this);
		PANEL.on("keydown", this.onKeydown, this);
		PANEL.on("keyup", this.onKeyup, this);
		PANEL.on("paint", this.onPaint, this );
				
		return this;
	},
	
	setTeams : function( data ){
		this.teams = data;

		return this;
	},
	
	start		: function(){
		this.on( "teamStart", this.onTeamStart, this );
		this.on( "roundStart", this.onRoundStart, this );
		
		this.startRound();
	},
	
	startRound	: function(){
		//先播放动画再触发事件			
		this.round++;
		//第一回合不显示动画
		if (this.round == 1) {
			this.fireEvent("roundStart", this.round);
		}
		else {
			PANEL._showTopLine("第 " + this.round + " 回合", function(){
				this.fireEvent("roundStart", this.round);
			}, this);
		}
	},
	
	onRoundStart	:  function(){
		this.teamIndex = 0;
		var team = this.teams[this.teamIndex];
		this.startTeam(team);
	},
	
	startTeam	: function( team ){
		if ( team.faction != FACTION || team.team != TEAM ) 
			//提示信息消失后再触发
			PANEL._showTopLine(team.name + " 阶段", function(){
				this.fireEvent("teamStart", team, this.teamIndex);
			}, this);
		else {
			this.fireEvent("teamStart", team, this.teamIndex);
		}	
	},
	
	onTeamStart	: function( team ){
		for( var key in this.units ){
			var unit = this.units[ key ];
			
			if ( unit.faction == team.faction && unit.team == team.team ){
				unit.unLock();
			}
		}		
	},
	
	endTeam	: function( f, t ){
		//该队伍所有角色取消石像状态
		for( var key in this.units ){
			var unit = this.units[ key ];
			
			if ( unit.faction == f && unit.team == t ){
				unit.restore();
			}
		}	
		
		this.fireEvent( "teamEnd", f, t, this );	
		
		if ( this.teamIndex++ >= this.teams.length - 1 ) {
			//回合结束
			this.fireEvent("roundEnd", this.round );
			
			this.startRound();
		}else{
			//继续下一个队伍
			var team = this.teams[ this.teamIndex ];
			this.startTeam( team );
		}
	},
	
	overTeam	: function( f, t ){
		for (var i=0; i<this.teams.length; i++) {
			var team = this.teams[i];
			if ( team.faction == f && team.team == t ){
				this.teams.splice( i, 1 );
				if ( this.teamIndex >= i )
					this.teamIndex--;
					
				log( team.name + " over" );
				break;
			}
		}
		this.fireEvent( "teamOver", f, t, this );
	},
		
	setUnits : function( data ){
		this.data = data;

		//给每个unit绑定load事件
		var count = 1, sum = this.data.length;
		var callback = function( unit ){
			
			this.fireEvent( "loading", unit, sum, count );
			
			if ( count++ >= sum ){
				this.fireEvent( "load", sum );
			}
		};
		
		for (var i = 0; i < this.data.length; i++) {
			var item = this.data[i];
			//添加监听器
		    item.listeners = item.listeners || {};
			item.listeners.load = item.listeners.load || {
				fn	: callback, scope : this
			}			
			this.units[ getIndex( item.gx, item.gy) ] = this._initUnit(item);
		}			
		return this;
	},
	
	onPaint	: function( timestamp ){
		//console.debug( "unit layer" );
		if (this.units) {
			//绘制图像
			for( var key in this.units ){
				var unit = this.units[ key ];
				
				unit.draw( timestamp );
			}
			//绘制提示信息
			for( var key in this.units ){
				var unit = this.units[ key ];
				
				unit.drawTip( timestamp );
			}			
		}		
	},
	
	update	: function( timestamp ){
	},	
	
	onKeydown	: function( e ){
		//按ALT时
		if ( e.which == 18 )
			this.hpLineForce = true;		
		//没有弹出菜单时右键才有效
		if ( e.which == 27 && PANEL.winLayer.passby() ){
			if ( this.clicked )
				this.clicked.unClick();
			
			this._removeCells();	
		}			
	},	
	
	onKeyup	: function( e ){
		//按ALT时
		if ( e.which == 18 )
			this.hpLineForce = false;		
	},		
	
	onMousemove	: function( e ){
		var  cell = PANEL.getCell( e );
		var unit = this.units[ cell.index ];
		//已经存在则隐藏
		if (this.overed && unit != this.overed) {
			this.overed.hideMajor();
			delete this.overed;
		}
		if ( unit && this.overed != unit ){
			this.overed = unit.showMajor();
		}
	},
	
	onClick	: function( e ){
		//有弹出菜单时不触发click
		if ( PANEL.winLayer.passby()) {
			var cell = PANEL.getCell(e);
			var unit = this.units[cell.index];
			
			//注册的事件返回false时不继续执行
			if (this.fireEvent("click", cell, unit, this) === false) 
				return;
			
			if (this.clicked) {
				//如果可以攻击
				if (this.clicked.preAttack && unit && this.clicked.canAttack(cell)) {
					this._removeCells();
					
					this.clicked.on("attack", function(){
					
					//delete this.clicked;
					
					}, this, {
						single: true
					}).attack(unit);
				}
				else 
					//如果可以移动
					if (this.clicked.canMove(cell)) {
					
						this._removeCells();
						this.clicked.moveTo(cell);
					}
			}
			else {
				//没有锁定同时具有移动性
				if (unit && !unit.lock && unit.moveable) {
					//获得可移动格子
					var obj = this.getWalkCells(cell, unit.step);
					PANEL.cellLayer.paintCells(this.moveColor, obj);
					unit.moves = obj;
					//获得可攻击的格子
					//obj = this.getAttackCells( cell, unit.range, unit.rangeType, unit.team );
					//PANEL.cellLayer.strokeCells( this.attaColor, obj );
					//unit.attacks = obj;
					
					this.clicked = unit;
				}
				
				if (unit) 
					unit.click(e);
			}
		}
	},
	
	_removeCells			: function(){
		PANEL.cellLayer.paintCells( this.moveColor, {} );
		PANEL.cellLayer.paintCells( this.attaColor, {} );
		PANEL.cellLayer.strokeCells( this.attaColor, {} );
		//delete this.clicked;
	},
	
	showAttackCells		: function( obj ){
		PANEL.cellLayer.paintCells( this.attaColor, obj );
	},
	
	getAttackCells	: function( cell,	range, type ){
		var all = {}, index = cell.index, x = cell.x, y = cell.y;
		
		switch( type ) {
			case 1:	//全方位攻击
				var tmp, i, j;
				for ( i= x-range ; i<=x + range; i++) {
					for ( j= y-range ; j<=y + range; j++) {
							var node = PANEL.getCell( i, j);
							all[ node.index ] = node;
					}
				}			
				break;
			case 2:	//十字型
				var open = {}, node;
				open[ index ] = cell;
				
				function prepare( x, y ){
					var tmp = PANEL.getCell( x, y ), i = tmp.index;
					if ( !open[ i ] && !all[ i ] )
						open[ i ] = tmp;
				}
				
				while( range-- > 0 ){			
					for( var key in open){
						all[ key ] = node =  open[ key ];
						
						prepare( node.x, node.y -1 );
						prepare( node.x, node.y+1 );
						prepare( node.x-1, node.y );
						prepare( node.x+1, node.y );
						
						delete open[ key ];
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
			
	onContextmenu	: function( e ){
		//没有弹出菜单时右键才有效
		if ( !PANEL.winLayer.hasWindow() ) {
			if ( this.clicked )
				this.clicked.unClick();
			
			this._removeCells();	
		}
	},	
	
	showAt				: function( unit, x, y ){
		unit.gx = x;
		unit.gy = y;
		
		if ( unit.constructor != Unit )
			unit = this._initUnit( unit );
		
		this.units[ getIndex( x, y ) ] = unit; 
		
		return this;
	},
	getUnit	: function( key ){
		return this.units[ key ];
	},	
	getUnitById : function( id ){
		for( var key in this.units ){
			if (this.units[key].id == id) {
				return this.units[key];
			}
		}
	},		
	delUnit		: function( id ){
		if ( this.units ){
			for( var key in this.units ){
				if (this.units[key].id == id) {
					delete this.units[key];
					break;
				}
			}
		}
		return this;		
	},
	
	//取消已选中
	deleteClicked	: function( unit ){
		if ( unit == this.clicked )
			delete this.clicked;
	},
	
	//检查回合结束
	checkTeamEnd	: function( faction, team ){
		var flag = true;
		for (var key in this.units) {
			var unit = this.units[key];
			//当同一队伍中有任何一个可以移动时跳出循环
			if ( unit.faction == faction && unit.team == team && !unit.lock) {
				flag = false;
				break;
			}
		}	
		if ( flag ){
			this.endTeam( faction, team );
		}
	},
	//检查某队伍是否全军覆没
	checkTeamOver	: function( faction, team ){
		var flag = true;
		for (var key in this.units) {
			var unit = this.units[key];
			if ( unit.faction == faction && unit.team == team && !unit.dead ) {
				flag = false;
				break;
			}
		}	
		if ( flag ){
			this.overTeam( faction, team );
		}
	},	
	//检查失败/胜利条件
	checkVOF		: function( unit ){
		if ( unit.symbol == "caocao" ){
			log( "失败了" );
		}
		return false;
	},
	
	_initUnit	: function( config ){
		config.layer = this;
		if( UNDERCOVER ){
			$.extend( config, {
				imgMove	: "images/move/0.png",
				imgAtk	: "images/atk/0.png",
				imgSpc	: "images/spc/0.png",
				imgFace	: "images/face/0.png"
			} )
		}
					
		var unit = new Unit(config );
		
		unit.on( "standby", function( unit ){
			this.deleteClicked( unit );
			this.checkTeamEnd( unit.faction, unit.team );
		}, this )
		.on( "move", function( unit ){
			PANEL.popActionMenu( unit, unit.cell.dx - CELL_WIDTH * 2, unit.cell.dy - CELL_HEIGHT );
		}, this )
		//角色移动时及时更新管理器
		.on( "walk", function( unit, from, to ){
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
			log( unit.name +  " unclick" );
			if ( unit == this.clicked )
				PANEL.hideUnitAttr();
				
			this.deleteClicked( unit );
		}, this )
		.on( "dead", function( unit ){
			this.delUnit( unit.id );
			this.checkTeamOver( unit.faction, unit.team );
		}, this )
		;
		
		return unit;
	}
}); 