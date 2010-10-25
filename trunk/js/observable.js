/**
 * 观察者设计模式
 * 所有对象具有事件响应的能力
 * 
 * one : 只执行一次
*/
var Event = function(obj, name){
    this.name = name;
    this.obj = obj;
    this.listeners = [];
};

Event.prototype = {
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
        var ls = this.listeners.slice(0), scope, len = ls.length;
        if(len > 0){
            this.firing = true;
            var args = Array.prototype.slice.call(arguments, 0);
            for(var i = 0; i < len; i++){
                var l = ls[i];
				if (l.fireFn) {
					if (l.fireFn.apply(l.scope || this.obj || window, arguments) === false) {
						this.firing = false;
						return false;
					}
					//删除单次执行
					if (l.options.one) {
						this.listeners.splice(i, 1);
					}
				}
            }
            this.firing = false;
        }
        return true;
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
	
    fireEvent : function(){
        if(this.eventsSuspended !== true){
            var ce = this.getEvent( arguments[0] );
            if( ce )
                return ce.fire.apply(ce, Array.prototype.slice.call(arguments, 1));
        }
        return true;
    },
	
	getEvent : function( name ){
		return this.events[ name.toLowerCase() ]
	},
	
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
            ce = new Event(this, eventName);
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
	
	destroy		 : function(){
		this.suspendEvents = true;
		this.purgeListeners();
		this.events = {};
	}
});