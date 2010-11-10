/**
 * 面板类
 * 显示层的容器，负责所有场景均会用到的功能
 * 具体的绘制功能由各个层负责
 */
var Panel = Component.extend({
	cls   : "_panel",
	suspend	: true,  //停止更新
	drawable: true,   //可以绘画
	scripting : 0, //是否正在执行脚本
	
	scrollLeft : 0,	//窗口左移的像素
	scrollTop : 0,  //窗口上移的像素
	consoleHeight : 160 + 23,	//控制台加工具条高度
	
	dps		 :  24, //帧数
	item		: null,		
	
	init		: function( config ){
		this.el = $( "#panel" );
		this.ct = $("#wrap");
		
		this.addEvents( "start", "stop", "click","runScript","stopScript","globalClick","mouseleave","mousemove","contextmenu","keydown","keyup" );
		this.addEvents( { name : "paint", type : 3 } );
		
		this._super( config );
		
		//初始化画布 开始隐藏
		canvas = $("#canvas")[0];
		canvas.width = 0;
		canvas.height = 0; 
		ctx = canvas.getContext("2d");
		
		//TODO 初始化窗口宽高
				
		//mask layer
		this.masklayer = $("#masklayer").addClass("_masklayer");
		
		//绑定事件
		var x, y, drag = false, el=this.el, _self = this;
		this.el.mousedown( function( e ){
			if (e.which == 1) {
				x = e.pageX;
				y = e.pageY;
				//this.style.cursor = "pointer";
				drag = true;
				
				if ( this.setCapture )
					this.setCapture();
			}		
		} )
		.mousemove( function( e ){
			if ( drag && e.which == 1 ) {
				//if (!_self.isScripting()) {		//执行脚本时锁定屏幕
				if ( true ){
					if (x != e.pageX) 
						el.scrollLeft = (this.scrollLeft -= e.pageX - x);
					
					if (y != e.pageY) 
						el.scrollTop = (this.scrollTop -= e.pageY - y);
				}
				x = e.pageX;
				y = e.pageY;
			}
			
			_self.fireEvent( "mousemove", e, _self );			
		} )
		.click( function( e ){
			_self.fireEvent( "click", e );	
		} )
		.mousewheel( function( e, delta, x, y){
			//向下滚动
			//if (!_self.isScripting()) { //执行脚本时锁定屏幕
			if ( true ){
				if (y == -1) {
					_self.moveWinBy(0, CELL_HEIGHT || 48 );
				}
				else {
					_self.moveWinBy(0, -CELL_HEIGHT || 48 );
				}
			}
			e.preventDefault();
			return false;
		} )
		.bind("contextmenu",function( e ){
				e.preventDefault();
				e.stopPropagation();
				_self.fireEvent("contextmenu", e);			
		}).mouseleave( function(e){
			_self.fireEvent("mouseleave", e);		
		} );	
		
		$(document).mouseup( function( e ){
			if (e.which == 1) {
				drag = false;
				//拖拽兼容IE
				if (this.releaseCapture) 
					this.releaseCapture();
			}
		} ).keydown( function( e ){
			_self.fireEvent( "keydown", e );	
		} ).keyup( function( e ){
			_self.fireEvent( "keyup", e );	
		} ).click(function( e ){
			_self.fireEvent( "globalClick", e );	
		});
		
		//依旧窗口大小更改战场场景大小
		$( window ).resize( function(){
			_self.onResize();
		} ).resize();
		
		return this;		
	},
	
	//窗口大小更改时自动缩放
	onResize	: function( e ){
		//TODO 考虑加载对象的高度
		//item
		var wTo = Math.min( $(window).width(), 960 ),
			hTo = Math.max( $(window).height() - this.consoleHeight, 250 ),
			wDiff = wTo - WINDOW_WIDTH,
			hDiff = hTo - WINDOW_HEIGHT;
			
		WINDOW_HEIGHT = hTo;
		WINDOW_WIDTH = wTo;
		
		this.ct.width( WINDOW_WIDTH );
		this.el.css( { width	: WINDOW_WIDTH, height	: WINDOW_HEIGHT	} );
		this.moveWinTo( this.scrollLeft - wDiff, this.scrollTop  - hDiff  );
		
		this.masklayer.css( { width	: WINDOW_WIDTH, height	: WINDOW_HEIGHT	} );
	},
	
	load			: function( obj ){
		this.item = obj;
		this.item.hung();
		return this;
	},
	
	unload			: function(){
		this.stop();
		//抛弃所有监听者 load时再重新注册
		this.purgeListeners();
		
		delete this.item;
		return this;
	},
	
	clear	: function(){
		this.purgeListeners();
	},

	//  更改游戏速度
	speed			: function( n ){
		this.dps = n;
		this.stop();
		this.repaint();
		return this;
	},

	start				: function(){
		if ( !this.suspend )
			this.stop();
		
		this.repaint();
		
		this.suspend = false;		
		this.fireEvent( "start" );
		
		return this;
	},
	
	repaint	: function(){
		//触发器
		var inter = 1000 / this.dps, _self = this, item = this.item;
		this.timer = setInterval( function(){
			//TODO 优化为只需要重新的地方才清除
			ctx.clearRect( 0,0, MAX_W, MAX_H );
			
			//item.paint();	
			_self.fireEvent("paint");
		} , inter );		
	},
	
	stop				: function(){
		this.suspend = true;	
		if (this.timer) {
			clearInterval(this.timer);
			this.fireEvent( "stop" );
		}
		return this;	
	},
	
	lineTimer: 0,	
	//面板中间显示提示信息
	_showTopLine		: function( str, fn, scope ){
		this.mask();
		
		if ( this.lineTimer )
			clearTimeout( this.lineTimer );
		
		$("#maskUp").html( str ).css({
				height  : 100,
				width	: MAX_W,
				background : "",
				top		: (WINDOW_HEIGHT -100)/2 
				//top		: 25
		}).show();
		
		var _self = this;
		this.lineTimer =setTimeout( function(){
			_self._hideTopLine( fn , scope );
			_self.lineTimer=0;
		}, 1500 );			
	},
	
	//整个面板显示提示信息
	showWhole		: function( text, fn, scope ){
		this._showTopLine(  "" , fn, scope );
		$("#maskUp").html( text ).css({
			background : "",
			width	: MAX_W,
			height  : WINDOW_HEIGHT,
			top		:  23
		});
	},	
	_hideTopLine		: function( fn, scope ){
		var _self = this;
		$("#maskUp").fadeOut( 300, function(){
			_self.unmask();
			if ( fn )
				fn.call( scope || _self )			
		} );
	},
	//  options : [ { v : 返回值, t : 显示文字 }, { ... }, ... ] 
	choose			: function( title, options, fn, scope ){
		this._choose( null, title, options, fn, scope );
	},	
	//显示选择框
	_choose		: function( src, title, options, fn, scope ){
		this.mask();
		
		var ct = $("._options").clone(), _self = this, clicked = false;
		if ( src )
			ct.find(".face").show().find("img").attr("src", src );
		else
			ct.find(".face").hide();
				
		ct.find("h6").html( title );
		
		var sel = ct.find("ul");
		for (var i=0; i<options.length; i++) {
			$("<li>").attr( "value", options[i].v ).html( (i + 1) + ". " + options[i].t ).appendTo( sel );
		}
		sel.children("li").click( function(){
			if ( clicked )
				return;
			clicked = true;	
			var v =  $(this).attr("value");
			_self._hideTopLine( function(){
				$("#maskUp")[0].style.background = "";
				if ( fn )
					fn.call( scope || this, v );				
			} );
		} ).hover( function(){
			$(this).toggleClass("active");
		} );
		
		$("#maskUp").empty().append( ct.show() ).css({
				height  : 200,
				width	: MAX_W,
				background : "none",
				top		: (WINDOW_HEIGHT -200)/2
		}).show();
	},					
	
	//移动屏幕300ms后回调	
	moveWinTo			: function(x, y, fn, scope ){
		if (x != undefined) 
			this.el[0].scrollLeft = (this.scrollLeft = x);
		
		if (y != undefined) 
			this.el[0].scrollTop = (this.scrollTop = y);
		
		if ( fn )
			setTimeout( bind( fn, scope || PANEL ), 300 );
			
		return this;			
	},
	
	moveWinBy		: function( x, y, fn, scope ){
		x = x || 0;
		y = y || 0;
		
		x = this.el[0].scrollLeft + x;
		y = this.el[0].scrollTop + y;
		
		this.moveWinTo( x, y, fn, scope );
		
		return this;
	},

	//判断某个位置是否在窗口内
	isInside		: function( dx, dy ){
		if ( dx < (this.scrollLeft) || dx > this.scrollLeft + WINDOW_WIDTH )
			return false;
		if ( dy < (this.scrollTop) || dy > this.scrollTop + WINDOW_HEIGHT)
			return false;
		
		return true;
	},

	//设置背景图片
	setBgImage	: function( url ){
		if ( !UNDERCOVER )
			canvas.style.background = "url('" + url + "') no-repeat";
			
		return this;
	},
			
	mask		: function (){
		this.masklayer.show();
		return this;			  
	},

	unmask 		: function (){
		this.masklayer.hide();
		return this;	
	},
	
	//script 采取计数器方式 当减到0时触发停止执行
	runScript		: function(){
		this.scripting++;
		this.fireEvent( "runScript", this );
	},
	stopScript	: function(){
		this.scripting--;
		if ( !this.isScripting() )
			this.fireEvent( "stopScript", this );
	},
	isScripting	: function(){
		return this.scripting > 0;
	},
	//延迟多少毫秒
	sleep		: function( ms, fn, scope ){
		setTimeout( function(){
			if ( fn )
				fn.call( scope || this, this );
		}, ms );
	}
});



