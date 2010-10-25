/**
 * 动作
 * 事件触发后按序执行动作
 * next  : 该动作执行过后的下个动作
 * desc : 该动作的描述
 * type	: 动作类型 1 角色动作 2系统动作 
 * options : 弹出选择项
 */
var Action = Observable.extend({
	next	: null,
	desc : "",
	script : "",
	fn		  : null,
	scope : null,
	params	: null,
	action	: "",
	obj	: null,
	options : null,	
	
	init	: function(){
		this._super( arguments[0] );
		this.params = this.params || [];
		this.params.push( this.fn, this.scope );
		
		return this;
	},
	
	getObj	: 	function(){
		return this.obj;
	},
	
	start	: function( team ){
		var obj = this.getObj();
		if ( obj )
			obj[ this.action ].apply( obj, this.params );
		else{
			//没有执行主体
			if ( this.fn )
				this.fn.call( this.scope|| this );
		}	
	},
	
	stop: function(){},
	
	getNext	: function(){
		if ( this.action == "showOptions" ){
			//如果是有选择框 第一个参数为选择项
			var v = arguments[0];
			return v;
		}else		
			return this.next;
	}
}); 
//角色动作
var UnitAction = Action.extend({
	id		: "",
	
	init	: function(){
		this._super( arguments[0] );
		return this;
	},
	
	getObj	: 	function(){
		return PANEL.getUnit( this.id );
	}
}); 
//系统动作
var SysAction = Action.extend({
	
	init	: function(){
		this._super( arguments[0] );
		return this;
	},
	
	getObj	: 	function(){
		return PANEL;
	}
}); 

//动作管理器 执行某个动作需从这里接入
var ActionMgr = Manager.extend({
	current	: null,	//正在执行的动作	
	
	init	: function(){
		this._super( arguments[0] );
		
		return this;
	},
	
	//工厂模式生成动作对象
	load	: function(){
		for (var i=0; i<ACTIONS.length; i++) {
			var a, config = $.extend( {
				fn	: this.next,
				scope : this
			}, ACTIONS[ i ] );
			
			if ( config.type == 1 )
				a = new UnitAction( config );
			else if ( config.type == 2 )
				a= new SysAction( config );
			else
				a = new Action( config );	
				
			this.reg( i, a );
		}
		return this;
	},
	
	start	: function( id ){
		var a = typeof id == "object" ? id :  this.get( id );
		if (a) {
			PANEL.runScript();
			this.current = a;
			a.start();
		}
	},
	
	next	: function(){
		var b = this.current.getNext.apply( this.current, arguments );
		if ( b )
			this.start( b );
		else if ( b == -1 ){
			this.stop();
		}	
	},
	
	stop	: function( team ){
		delete this.current;
		PANEL.stopScript();
	}
		
}); 

ActionMgr = new ActionMgr();
