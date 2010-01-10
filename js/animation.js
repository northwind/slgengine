/**
 * @author Administrator
 */
/*
	GameQuery
*/
var Animation =Observable.extend({
	img : "",
	frames : 2, //the total number of frame in the animation 
	delta	: 32,  //the width of height (depending on the type) of one frame
	rate		: 300,  //the number of milliseconds between two frame
	type		: 2 ,  //the type of animation, it's a binary OR of the following value: 
	distance : 0, // the distance between two image when using multi-animations
	from		: 0,		
	el			: null,
	count	: 0, //计数器
	timer    : 0, //计时器
	callback : null,  //替代Animation.CALLBACK
	scope	   : null,
	loop		: true, //替代Animation.ONCE
	suspend	: false, //记录是否停止播放
	
	x			: 0,
	y			: 0,
	
	init		 : function( config ){
		$.extend( this, config || {} );
		
		this.el.css("background-repeat", "no-repeat");
		this._setPosition( 0 );
		this.el.css("background-image", "url(" + this.img + ")");
					
		return this;
	},
	
	_setPosition : function( i ){
			var d = this.from + i * this.delta;
			if (this.type & Animation.HORIZONTAL){
				this.y =  d; this.x = 0;
			}
			if ( this.type &  Animation.VERTICAL){
				this.x = d; this.y = 0;			
			}
			this.el.css("background-position", "-" + this.x + "px -" + this.y + "px" );		
	},
	
	play		: function(){
		if ( this.el ){

			var p = this.count++ % this.frames;
			this._setPosition( p );
			
			//判断是否播放一轮了
			if ( --p == 0 ){
				//如果不是循环则停止
				if ( !this.loop && this.timer )
					this.stop();
				
				//调用回调函数	
				if ( this.callback )
					this.callback.call( this.scope || this, this );
					
			}else{
				if ( !this.timer ){
					var self = this;
					this.timer = setInterval(function(){
						self.play();
					}, this.rate);					
				}
			}
		}
		
		return this;
	},
	
	stop		: function(){
		this.suspend = true;
		if (this.timer) {
			clearInterval(this.timer);
			delete this.timer;
		}
		
		return this;
	}	
});
	/*
	Animation.VERTICAL for vertical, the various frames are stacked verticaly
	Animation.HORIZONTAL for horizontal, the various frames are layed horizontaly
	Animation.ONCE if you don't want the animation to loop
	Animation.CALLBACK a function executed at the end of each animation cycle
	Animation.MULTI if your image file contain more than one animation side by side
	*/	
$.extend( Animation, {
	VERTICAL 		: 1,
	HORIZONTAL   : 2,
	ONCE					: 4,
	CALLBACK		: 8,
	MULTI					: 16
} );




