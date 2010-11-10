/**
 * 简化单元层
 * 支持寻路/攻击/移动的方法
 * units	: 当前战场中可见的所有角色
 * items	: 所有角色 包括未上场或已经死亡的角色
 */
var WalkLayer = Layer.extend({
	clicked : null,	//已点击
	overed	 : null,  //滑过的
	
	init	: function(){
		this.addEvents( "click");
		this.addEvents( { name : "enter", type : 2 } );
															 
		this._super( arguments[0] );
		
		this.units = {};
		
		//点击画布
		PANEL.on("click", this.onClick, this)
			 .on("contextmenu", this.onContextmenu, this)
			 .on("mousemove", this.onMousemove, this)
			 .on("keydown", this.onKeydown, this)
			 .on("keyup", this.onKeyup, this)
			 .on("paint", this.onPaint, this ); //定时更新
		
		return this;
	},
	
	
	start		: function(){
		log( "this.WalkLayer.start" );
		
		SoundMgr.play( "battle" );
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
		this.bindEvent( "enter", function( unit ){
				
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
	},	
	
	onKeyup	: function( e ){
	},		
	
	onMousemove	: function( e ){
		var  cell = this.playground.getCell( e );
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
		return this.playground.winLayer.passby() && !PANEL.isScripting();
	},
	
	onClick	: function( e ){
		//有弹出菜单时不触发click
		if ( this.canClick() ) {
			var cell = this.playground.getCell(e),
				unit = this.getUnitByIndex( cell.index );
			
			//注册的事件返回false时不继续执行
			this.fireEvent("click", cell, unit, this); 
			
		}
	},
	
	//A* 算法寻路
	findWay			: function( character, from, to ){
		var ret =[], opened = {}, closed = {}, units = this.units, 
			node = null, minD, tmpNode, faction = character.faction,
			targetX = to.x, targetY = to.y, loops = 0, rate = 20, weight ;
		
		//直线距离 	
	    function calcD( tmp ){
			if ( tmp.d )
				return tmp.d;
				
			var m = targetX - tmp.x , n = targetY - tmp.y;
	        tmp.d = Math.sqrt( m *m + n * n );
			//优化 走直线权值偏大 相当于行走路径偏小
			if ( tmp.parent && rate && tmp.parent.face == tmp.direct( tmp.parent ) )
				tmp.d -= weight;
				
			return tmp.d;
	    } 
		function insertSon( node, p ){
			if( !node || node == p ) return;	//抛除父结点 
			
			var key = node.index, unit = units[key];
			
			if (!open[key] && !closed[key] && node && MAP[node.y][node.x] == 0 && (unit ? ( unit.isFriend(faction) ) : true)) {
				node.parent = p;
				calcD(node, p );
				node.face   = node.direct( p );		//记住子结点相对父结点运动的方向
				opened[node.index] = node;
			}
		}			
		//获得子节点
		function getChildren( node ){
			weight = node.d / rate;			//动态更改权值
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
		weight = from.d / rate;
		opened[ from.index ] = from;
				
		while( !_isEmpty( opened ) && loops++ < 100 ){
			minD = 10000000; 
			//找到权值最小的节点
			for( var i in opened ){
				tmpNode = opened[i];
				var d = calcD( tmpNode );
				if ( minD > d ){
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
				if ( node )
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
		//如果终点已经有人站着，则回退一格
		do{
			var cell = ret[ 0 ];
			if ( units[ cell.index ] )
				ret.shift();
			else 
				break;	
		}while( ret.length > 0 )
		
		return ret;				
	},
			
	onContextmenu	: function( e ){
	},	
	
	//在战场上新出现的角色
	showAt				: function( unit ){
		this.units[ unit.cell.index ] = unit; 
		
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
	
	_initUnit	: function( config ){
		config.layer = this;
		var unit = new Unit( config );
			
		unit.on( "move", function( unit ){
			}, this )
			.on( "walk", function( unit, from, to ){
				//已存在的不覆盖
				if ( !this.units[to.index] ) {
					this.units[to.index] = unit;
					
					delete this.units[ unit.tempIndex || from.index];
					delete unit[ "tempIndex" ];
				}else{
					//记录暂时所处的位置 待移动后再删除
					if ( !unit.tempIndex )
						unit.tempIndex = from.index;
				}
			}, this )
			//取消点击时,隐藏该角色属性
			.on( "unclick", function( unit ){
				
			}, this )
			.on( "dead", function( unit ){
				this.delUnitByIndex( unit.cell.index );
			}, this );
		
		if (unit.visiable) {
		}
		return unit;
	},
	
	destroy			: function(){
		PANEL.un("click", this.onClick, this)
			 .un("contextmenu", this.onContextmenu, this)
			 .un("mousemove", this.onMousemove, this)
			 .un("keydown", this.onKeydown, this)
			 .un("keyup", this.onKeyup, this)
			 .un("paint", this.onPaint, this ); //定时更新
			 
		this.items.length = 0;
		this.units = {};
		
		this._super();	 
	}			
}); 