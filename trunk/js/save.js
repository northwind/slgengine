/**
 * 负责存档的读取/存储/展示
 * type	: 存档类型
 * TODO 加密 战场信息
 */
var Save = Observable.extend({
	items	: null,
	
	init	: function(){
		this._super( arguments[0] );
		
		this.items = [ {
			type	: 1,
			filename: "js/param/playerparams.js"
		},{
			type	: 2,
			id		: "1",
			filename: "js/param/scene/1.js"
		} ];
		
		return this;
	},
	
	show	: function(){},
	
	choose	: function( n ){
		var item = this.items[ n ];
		
		if ( item ){
			PANEL.clear();
			
			if (item.type == 2) {
				//初始化一个新战场
				PLAYGROUND = new Theater( { name : CHAPTER,
					bg	: BGIMAGE,
					goal : GOAL
				 } );
				PLAYGROUND.start();				
			}
			else 
				if (item.type == 1) {
					_self = this;
					$.getScript(this.items[n].filename, function(){
						_self.load();
					});
				}
		}
	},
	
	load	: function(){
				//初始化进度条
				var process = new Process();
				
				process.on("end", function(){
					log( "process end" );
					
					//初始化一个新战场
					PLAYGROUND = new Battle( { name : CHAPTER,
						bg	: BGIMAGE,
						goal : GOAL
					 } );
					PLAYGROUND.start();
					
				}).start();				
	}
	
}); 

Save = new Save();

