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
			filename: "param/playerparams.js"
		} ];
		
		return this;
	},
	
	show	: function(){},
	
	choose	: function( n ){
		if ( this.items[ n ] ){
			
			$.getScript( this.items[ n ].filename, function(){
				
				//初始化进度条
				var process = new Process();
				
				process.on("end", function(){
					log( "process end" );
					SoundMgr.load();
					
					//初始化一个新战场
					var b = new Battle( { name : "123" } );
					b.load();
					
					//加载战场 开始更新
					PANEL.load( b ).start();
					
				}).start();					
				
			} );
		}
	}
	
}); 

Save = new Save();

//程序暂时的入口
$( function(){
	
	if ( $.browser.msie )
		return false;
	
	//Save.show();
	Save.choose( 0 );
	
} );

