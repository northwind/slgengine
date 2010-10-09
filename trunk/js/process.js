/**
 * @author sina
 */

var Process = Observable.extend({
	process : 0, //当前加载进度
	speed	: 100, //更新速度
	next	: 0, //下一步可显示最大数值
	msg	: "", //说明文字
		
	init	: function( config ){
		this._super( config );
		
		this.el = $("#loader");
		//加载完毕后执行init事件
		this.addEvents( "start", "end" );
		
		return this;
	},
	
	start	: function(){
		//自动递增到next
		var _self = this;
		var fn = function(){
			
			if (_self.process < _self.next) {
				_self.process++;
				//显示当前进度
				_self.count();
			}
			if ( _self.process >= 100 )
				_self.end();
		};
		this.timer = setInterval( fn, this.speed ); 
		
		PANEL.mask();
		this.el.show();
		
		this.fireEvent("start");
		
		this.tip( 1, "开始加载..." );
		
		fn();
		
		return this;
	},
	
	count	: function(){
		this.el.html( this.process + "/100%　　" +  this.msg );
	},
	
	tip	: function( next, msg ){
		
		this.next = next;
		this.msg = msg;
		
		//console.debug( "tip : next : " + this.next + " msg : " + msg );
		
		return this;
	},
	
	add	: function( n, msg ){
		this.next += n;
		this.msg = msg;
		
		//console.debug( "add : next : " + this.next + " msg : " + msg );
		if ( this.next >= 100 )
			this.end();
			
		return this;
	},
	
	end	: function(){
		if ( this.timer )
			clearInterval( this.timer );
			
		//console.debug( "process end" );
		
		this.el.html("").hide();
		PANEL.unmask();
		
		this.fireEvent("end");
	}
	
});

