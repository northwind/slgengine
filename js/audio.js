/**
 * 声音管理器
 */
var Sound = Observable.extend({
	src		: "",
	loop		: false,
	pausing : false,
	loaded : false,
	playing : false,
	
	init	: function(){
		this._super( arguments[0] );
		
		var audio = new Audio( PATH + this.src );
		this.audio = audio;
		
		var _self = this;
		audio.addEventListener( "ended", function(){
			_self.onEnd();
		} , true );
		
		return this;
	},
	
	play	: function(){
		this.playing = true;
		if (!this.pausing) {
			this.pausing = false;
			this.audio.load();
			this.audio.play();
		}
	},
	
	pause: function(){
		this.pausing = true;
		this.audio.pause();
	},
	
	onEnd	: function(){
		log( "audio end : " + this.src );
		this.playing = false;
		if ( this.loop ){
			this.play();
		}
	},
	
	turnOn	: function(){
		this.audio.volume = 1;
/*
		this.audio.muted = false;
		if ( this.playing ){
			this.audio.pause();
			this.audio.play();
		}
*/		
	},
	
	//无声
	turnOff	: function(){
		this.audio.volume = 0;
/*
		this.audio.muted = true;
		if ( this.playing ){
			this.audio.pause();
			this.audio.play();
		}
*/
	}		
}); 

var SoundMgr = Manager.extend({
	pausing	: false,
	
	init	: function(){
		
		this._super( arguments[0] );
	},
	
	reg	: function( key, value ){
		if ( !(value instanceof Sound) )
			value = new Sound( value );
		
		this._super( key, value );	
	},
	
	//工厂模式生成事件对象
	load	: function(){
		for( var key in AUDIOS )
			this.reg( key, AUDIOS[ key ] );
	},
	
	play	: function( name ){
		if ( this.get( name ) )
			this.get(name).play();
		else
			log( "SoundMgr doesn`t have : " + name );
	},
	
	pause: function( name ){
		if ( this.get( name ) )
			this.get( name ).pause();
	},
	
	turnOn	: function(){
		this.each( function(){
			this.turnOn();
		} );		
	},
	
	turnOff	: function(){
		this.each( function(){
			this.turnOff();
		} );	
	}	
}); 

SoundMgr = new SoundMgr();
