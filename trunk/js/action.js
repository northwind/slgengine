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
