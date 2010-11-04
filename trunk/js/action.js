/**
 * 动作
 * 事件触发后按序执行动作
 * next  : 该动作执行过后的下个动作 >下个动作 <上一个动作
 * desc : 该动作的描述
 * type	: 动作类型 1 角色动作 2系统动作 
 * options : 弹出选择项
 */
var Action = Observable.extend({
	index		: null,
	next	: ">",
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
	
	start	: function(){
		var obj = this.getObj();
		if ( obj && obj[ this.action ])
			obj[ this.action ].apply( obj, this.params );
		else{
			log( "没有执行主体或没有方法 ： " + obj + " action : " + this.action );
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
		}else if ( this.next == ">" )
			return ++this.index;
		else if ( this.next == "<" )
			return --this.index;
		else				
			return this.next;
	}
}); 
//角色动作
var UnitAction = Action.extend({
	id		: "",
	
	getObj	: 	function(){
		return PANEL.getUnitById( this.id );
	}
}); 
//系统动作
var SysAction = Action.extend({
	
	getObj	: 	function(){
		return PANEL;
	}
}); 
//群体动作
var GroupAction = Action.extend({
	group		: null,
	actions		: null,
	
	getObj	: 	function(){
		return eval( this.group + ".members()" );
	},
	
	start	: function(){
		var obj = this.getObj();
		if (obj) {
			
			var oriNext = this.getNext(), index = this.mgr.count(), newNext = this.mgr.count(),
				params = this.params.slice( 0, this.params.length -2 );
			//在动作数组后批次增加每个角色的动作
			for( var key in obj ){
				var unit = obj[ key ];
				var a = new UnitAction ({
					index	: index,
					id	: unit.id,
					action : this.action,
					params : Array.prototype.slice.call( params, 0 ),
					fn	   : this.fn,
					scope  : this.scope
				});
				
				this.mgr.reg( index++, a );
			}
			//设置下一个执行索引
			this.next = newNext;
			//全部执行完毕后回跳到原来该执行的动作
			this.mgr.get( this.mgr.count() -1 ).next = oriNext;
			
			//没有执行主体
			if (this.fn) 
				this.fn.call(this.scope || this);			
		}
		else {
			//没有执行主体
			if (this.fn) 
				this.fn.call(this.scope || this);
		}	
	}	
}); 
