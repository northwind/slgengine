/**
 * 观察者设计模式
 * 所有对象具有事件响应的能力
 * 事件支持回调函数
 * 
 * one : 只执行一次
 * -sync: 异步执行
 * fn	: 回调
 * scope
*/
var EventObs = function(obj, name){
    this.name = name;
    this.obj = obj;
    this.listeners = [];
};

EventObs.prototype = {
	index	: 0,
	suspend : false,
	splice	: false,	//有需要清除的监听器
	
    addListener : function(fn, scope, options){
        if(!this.isListening(fn, scope)){
            var l = this.createListener(fn, scope, options);
            if(!this.firing){
                this.listeners.push(l);
            }else{ // if we are currently firing this event, don't disturb the listener loop
                this.listeners = this.listeners.slice(0);
                this.listeners.push(l);
            }
        }
    },

    createListener : function(fn, scope, o){
        return { fn: fn, scope: scope || this.obj, options: o || {} };
    },

    findListener : function(fn, scope){
        scope = scope || this.obj;
        var ls = this.listeners;
        for(var i = 0, len = ls.length; i < len; i++){
            var l = ls[i];
            if(l.fn == fn && l.scope == scope){
                return i;
            }
        }
        return -1;
    },

    isListening : function(fn, scope){
        return this.findListener(fn, scope) != -1;
    },

    removeListener : function(fn, scope){
        var index;
        if((index = this.findListener(fn, scope)) != -1){
            if(!this.firing){
                this.listeners.splice(index, 1);
            }else{
                this.listeners = this.listeners.slice(0);
                this.listeners.splice(index, 1);
            }
            return true;
        }
        return false;
    },

    clearListeners : function(){
        this.listeners.length = 0
    },

    fire : function(){
		//复制当前监听器数组的副本
        this.ls = this.listeners.slice(0);
        this.firing = true;
		this.index = 0; //重置为0
		this.args = Array.prototype.slice.call(arguments, 0);
		
		this.next();
		
        return true;
    },
	
	next	: function(){
		if ( this.suspend || !this.ls )		//暂停时什么都不做
			return;
		
		var len = this.ls.length;
		if ( this.index == len ) {
			//指向最后一个
			this.done();
			return;
		}
		else {
			
			var l = this.ls[ this.index ];
			//执行
			l.fn.apply(l.scope , this.args );
			
			//删除单次执行
			if (l.options.one) {
				this.splice = true;
				l.remove = true;	//标记为待删除
			}			
			
			if (!this.suspend) {
				this.index++; //递增
				this.next();
			}	
		}		
	},
	
	bind	: function( fn, scope ){
		this.fn = fn;
		this.scope = scope;
	},
	
	//事件中所有的监听器均执行完毕
	done	: function(){
		//剔除需要删除的监听器
		if ( this.splice ){
			this.splice = false;
			var len = this.listeners.length;
			for (var i= len - 1; i >= 0; i-- ) {
				var l = this.listeners[ i ];
				if ( l.remove )
					this.listeners.splice( i, 1 );
			}
		}
		
		this.firing = false;
		
		if ( this.fn )
			this.fn.apply( this.scope, this.args );
		
		delete this.ls;
		delete this.args;		
	},
	
	pause	: function(){
		this.suspend = true;
	},
	
	resume	: function(){
		this.suspend = false;
		this.index++; //递增
		this.next();	//继续执行下一个监听器
	}	
};
/**
 * 即时消息
 * 用于高效循环类的消息
*/
var EventImd = function(obj, name){
    this.obj = obj;
    this.listeners = [];
};
EventImd.prototype = {
    addListener : function(fn, scope ){
        this.listeners.push( {
			scope: scope || this.obj,
			fn: fn
		} );
    },

    fire : function(){
		var ls = this.listeners;
		for (var i= 0, len = ls.length; i<len; i++ ) {
			var l = ls[ i ];
			
			l.fn.apply( l.scope, arguments );
		}
    }
};
/**
 * 默认消息
*/
var EventNormal = function(obj, name){
    this.name = name;
    this.obj = obj;
    this.listeners = [];
};
EventNormal.prototype = {
	
    addListener : function(fn, scope,o){
        var l = this.createListener(fn, scope, o);
        this.listeners.push(l);
    },

    createListener : function(fn, scope,o){
        return { scope: scope || this.obj, fn: fn, options : o || {} };
    },

    findListener : function(fn, scope){
        scope = scope || this.obj;
        var ls = this.listeners;
        for(var i = 0, len = ls.length; i < len; i++){
            var l = ls[i];
            if(l.fn == fn && l.scope == scope){
                return i;
            }
        }
        return -1;
    },

    removeListener : function(fn, scope){
        var index;
        if((index = this.findListener(fn, scope)) != -1){
            if(!this.firing){
                this.listeners.splice(index, 1);
            }else{
                this.listeners = this.listeners.slice(0);
                this.listeners.splice(index, 1);
            }
            return true;
        }
        return false;
    },

    clearListeners : function(){
        this.listeners.length = 0
    },

    fire : function(){
		var ls = this.listeners.slice( 0 );
		for (var i= 0, len = ls.length; i<len; i++ ) {
			var l = ls[ i ];
			
			if ( l.options.one )
				this.listeners.splice( i, 1 );
							
			l.fn.apply( l.scope, arguments );
		}
    }
};
/**
 * 观察者模式
 * 注册与分发消息
 * 先添加事件再注册
*/
var Observable = Class.extend({
	eventsSuspended : false,
	
	init: function(){
		$.extend( this, arguments[0] || {} );
		if ( !this.events )
			this.events = {};
					
	    if(this.listeners){
	        this.on(this.listeners);
	        delete this.listeners;
	    }		
	},	
	
	/**
	 * this.fireEvent( "name", argumetns, ... );
	*/	
    fireEvent : function( name ){
        //if(this.eventsSuspended !== true){
			var ce = this.getEvent( name );
						
            if ( ce ) {
				return ce.fire.apply(ce, Array.prototype.slice.call(arguments, 1));
			}else if ( DEBUG )
				log( "no event : " + name );
        //}
    },
	
	/** 
	 * 	需要回调的事件先绑定回调函数
	 */
	bindEvent	: function( name, fn, scope ){
		var ce = this.getEvent( name );
		if ( ce ){
			if (!ce.bind) {
				if (DEBUG) 
					log("event : " + name + " no bind function");
			}
			else 
				ce.bind(fn, scope);
		}
		return this;
	},
	
	getEvent : function( name ){
		return this.events[ name ];
	},
	
	/**
	 * 监听单个事件
	 * this.on( "name", fn, scope, {...} ); 
	 * 多个事件共享同一配置
	 * this.on( {
	 * 				"name" : fn1,
	 * 				"name2": fn2,
	 * 				scope  : scope,
	 *              one	   : true
	 *           } );
	 * 监听多个事件，每个监听器配置不相同          
	 * this.on( {
	 * 				"name" : {
	 * 							fn : fn,
	 * 							scope : scope,
	 * 							one : true,
	 * 						  }
	 *           } );
	*/
    on : function(eventName, fn, scope, o){
        if(typeof eventName == "object"){
            o = eventName;
            for(var e in o){
                if(typeof o[e] == "function"){
                    // shared options
                    this.on(e, o[e], o.scope,  o);
                }else{
                    // individual options
                    this.on(e, o[e].fn, o[e].scope, o[e]);
                }
            }
            return this;
        }
		
		var ce = this.getEvent( eventName );
		if (!ce) {
			this.addEvents(eventName);
			ce = this.getEvent( eventName );
		}
       	ce.addListener(fn, scope, o);
		
		return this;
    },

    un : function(eventName, fn, scope){
        var ce = this.events[eventName];
        if(typeof ce == "object" && ce.removeListener){
            ce.removeListener(fn, scope);
        }
		return this;
    },

    purgeListeners : function(){
        for(var evt in this.events){
            if(typeof this.events[evt] == "object"){
                 this.events[evt].clearListeners();
            }
        }
    },

    addEvents : function(){
		if ( !this.events )
			this.events = {};
		
        for (var i = 0, a = arguments, v; v = a[i]; i++) {
			var name = v, type = 1;
			if ( typeof v == "object" ){
				name = v.name;
				type = v.type;
			}
			
			if ( !this.events[ name ] ){
				var obj;
				if ( type == 2 ){
					obj = new EventObs( this, name );
				}else if ( type == 3 )
					obj = new EventImd(this, name );
				else	
					obj = new EventNormal(this, name );					
					
				this.events[ name ] = obj;
			} 
		}
    },

    hasListener : function(eventName){
        var e = this.events[eventName];
        return typeof e == "object" && e.listeners.length > 0;
    },

    suspendEvents : function(){
        this.eventsSuspended = true;
    },

    resumeEvents : function(){
        this.eventsSuspended = false;
    },

    suspendEvent : function( eventName ){
		log( "suspendEvent function : " + eventName );
        var ce = this.getEvent( eventName );
		if ( ce )
			ce.pause();
    },

    resumeEvent : function( eventName ){
		log( "resumeEvent function : " + eventName );
        var ce = this.getEvent( eventName );
		if ( ce )
			ce.resume();
    },
		
	destroy		 : function(){
		this.suspendEvents = true;
		this.purgeListeners();
		this.events = {};
	}
});