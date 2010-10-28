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
        scope = scope || this.obj;
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
        return {fn: fn, scope: scope || this.obj, options: o || {}, fireFn: fn};
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
		this.index = 0;		//重置为0
		this.args = Array.prototype.slice.call(arguments, 0);
		this.next();
		
        return true;
    },
	
	next	: function(){
		if ( this.suspend )		//暂停时什么都不做
			return;
		
		if (!this.ls) {
			return this.done();
		}
		var len = this.ls.length;
		if ( this.index == len ) {
			//指向最后一个
			return this.done();
		}
		else {
			for (var i=this.index; i<len; i++) {
				if ( this.name == "start" )
					log( "this.suspend = " + this.suspend );
				//停止时跳过
				if ( !this.suspend ){
					var l = this.ls[ i ];
					if (l.fireFn && !l.remove ) {
						if (l.fireFn.apply(l.scope || this.obj || window, this.args ) === false) {
							//监听器返回false时强制退出
							return this.done();
						}
						//删除单次执行
						if (l.options.one) {
							this.splice = true;
							l.remove = true;	//标记为待删除
						}
					}					
				}else{
					this.index = i;		//保存
					//跳出循环
					return;
				}
			}
			if ( !this.suspend )
				//没有block
				this.done();
		}		
	},
	
	bind	: function( fn, scope ){
		this.fn = fn;
		this.scope = scope;
	},
	
	//事件中所有的监听器均执行完毕
	done	: function(){
		delete this.ls;
		delete this.args;
		
		//剔除需要删除的监听器
		if ( this.splice ){
			var len = this.listeners.length;
			for (var i= len - 1; i > 0; i-- ) {
				var l = this.listeners[ i ];
				if ( l.remove )
					this.listeners.splice( i, 1 );
			}
		}
		
		this.firing = false;
		
		if ( this.fn )
			return this.fn.call( this.scope || this.obj, this.obj );	
		
		return true;		
	},
	
	pause	: function(){
		this.suspend = true;
	},
	
	resume	: function(){
		this.suspend = false;
		this.next();	//继续执行下一个监听器
	}	
};

var Observable = Class.extend({
	
	init: function(){
		this.events = {};
		$.extend( this, arguments[0] || {} );
		
	    if(this.listeners){
	        this.on(this.listeners);
	        delete this.listeners;
	    }		
	},	
	
	/**
	 * this.fireEvent( "name", argumetns[0], ... );
	 * this.fireEvent( {
	 * 						name : "name",
	 * 						fn	 : fn,		//事件执行完毕后回调
	 * 						scope: scope
	 * 					}, argumetns[0], ... );
	*/	
    fireEvent : function( config ){
        if(this.eventsSuspended !== true){
			var name, fn, scope, ce;
			if ( typeof config == "string" ){
				ce = this.getEvent( config );
			}else{
				ce = this.getEvent( config.name );
				fn = config.fn;
				scope = config.scope;
			}
			
            if ( ce ) {
				if ( fn )
					ce.bind( fn, scope );
					
				return ce.fire.apply(ce, Array.prototype.slice.call(arguments, 1));
			}
        }
        return true;
    },
	
	getEvent : function( name ){
		return this.events[ name.toLowerCase() ]
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
		
        o = (!o || typeof o == "boolean") ? {} : o;
        eventName = (eventName+"").toLowerCase();
        var ce = this.events[eventName] || true;
        if(typeof ce == "boolean"){
            ce = new EventObs(this, eventName);
            this.events[eventName] = ce;
        }
        ce.addListener(fn, scope, o);
		
		return this;
    },

    un : function(eventName, fn, scope){
        var ce = this.events[eventName.toLowerCase()];
        if(typeof ce == "object"){
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

    addEvents : function(o){
        for( var i = 0, a = arguments, v; v = a[i]; i++ )
            if( !this.events[ a[i] ] )
                o[a[i]] = true;
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
		log( "suspendEvent function" );
        var ce = this.getEvent( eventName );
		if ( ce )
			ce.pause();
    },

    resumeEvent : function( eventName ){
		log( "resumeEvent function" );
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