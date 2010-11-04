/**
 * 事件
 * 负责引导动作执行，依序执行
 * name	 : 事件名
 * options : 事件的配置 默认只执行一次
 * type	: 事件类型 1 角色事件 2系统事件 
 * current : 当前动作
 * index	: 从第几个动作开始执行
 */
var Event = Manager.extend({
	name : "",
	fn		  : null,
	scope : null,
	options	: null,
	current	: null,
	index	: 0, 
	condition : null,
	
	init	: function( config ){
		this._super( arguments[0] );
		
		this.options = this.options;
		
		return this;
	},
	
	getObj	: 	function(){
		return this.obj;
	},
	
	hung	: function(){
		var obj = this.getObj();
		if (obj) {
			var actions = this.actions;
			for (var i=0; i<actions.length; i++) {
				var a, config = $.extend( {
					index	: i,
					type	: 1,
					mgr		: this,
					actions	: this.actions,
					fn	: this.next,
					scope : this
				}, actions[ i ] );
				
				if ( config.type == 1 )
					a = new UnitAction( config );
				else if ( config.type == 2 )
					a = new SysAction( config );
				else if ( config.type == 3 )
					a = new GroupAction( config );
				else
					a = new Action( config );	
					
				this.reg( i, a );					
			}
			//注册事件
			obj.on( this.name, this.check, this );
		}
	},
	
	/**
	 * 进行判断
	 * index : 第几个参数
	 * symbol : == | >= | <= | < | > ...
	 * compare	 :  待对比项
	 * script  : 自定义脚本
	 */
	check	: function(){
		//log( "event check : " + this.name );
		var flag = true;
		if ( this.condition && this.condition.length > 0 ){
			for (var i=0; i<this.condition.length; i++) {
				var c = this.condition[i], str;
				var l = c.index || 0;
				if ( c.script )
					str = "flag=flag && (" + c.script + ")";
				else
					str = "flag=flag && ( arguments[ " + l + " ] " + (c.symbol || "==") + c.compare + ")";
						
				try {
					eval( str );
				} 
				catch (e) {
					flag = true;
				}
			}
		}
		if ( flag ){
			//取消注册
			this.getObj().un( this.name, this.check, this );
			this.start();
		}
	},
	
	next	: function(){
		var b = this.current.getNext.apply( this.current, arguments );
		log( "next = " + b );
		if ( b == -1 ){
			// no next
			this.stop();
		}	else if ( b != undefined || b != null )
			this.process( b );
		else
			this.stop();	
	},
	
	//继续执行
	process	: function( id ){
		var a = typeof id == "object" ? id :  this.get( id );
		if (a) {
			this.current = a;
			a.start();
		}else{
			//执行不下去了
			this.stop();
		}		
	},
	
	//事件响应后开始执行	
	start	: function(){
		log( "event start function : " + this.name );
		//block事件
		this.getObj().suspendEvent( this.name );	
		PANEL.runScript();
		this.current = this.get( this.index );
		if ( this.current ) 
			this.current.start();
		else
			this.stop();	
	},	
	
	stop: function(){
		log( "stop event : " + this.name );
		delete this.current;
		this.active = false;
		//block事件
		this.getObj().resumeEvent( this.name );	
		PANEL.stopScript();		
	}
}); 
//角色事件
var UnitEvent = Event.extend({
	id		: "",  //角色ID
	
	getObj	: 	function(){
		return PANEL.getUnitById( this.id );
	}
}); 
//系统事件
var SysEvent = Event.extend({
	
	getObj	: 	function(){
		return PANEL;
	}
}); 
//战场事件
var BattleEvent = Event.extend({
	
	getObj	: 	function(){
		return PANEL.unitsLayer;
	}
}); 


//事件管理器 执行某个事件需从这里接入
var ScriptMgr = Manager.extend({
	current	: null,	
	
	//工厂模式生成事件对象
	load	: function(){
		for (var i=0; i<ACTIONGROUPS.length; i++) {
			var g = ACTIONGROUPS[i];
			
			if ( g.event && g.event.active === true ){
				var e, econfig = $.extend( {
					actions	: g.actions
				} ,g.event );
				
				if ( econfig.type == 1 )
					e = new UnitEvent( econfig );
				else if ( econfig.type == 2 )
					e= new SysEvent( econfig );
				else if ( econfig.type == 3 )
					e= new BattleEvent( econfig );	
				else
					e = new Event( econfig );
				
				this.reg( i, e);
				e.hung();						
			}
		}
		return this;
	}		
}); 

ScriptMgr = new ScriptMgr();
