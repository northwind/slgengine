/**
 * 进度条
 * 所有加载完毕后再执行其他
 */
var Process = Observable.extend({
	count : 0, //当前加载进度
	msg	: "", //说明文字
		
	init	: function( config ){
		this._super( config );
		
		this.el = $("#loader");
		//加载完毕后执行init事件
		this.addEvents( "end" );
		
		return this;
	},
	
	//加载状态图像
	_loadBuffsImg	: function(){
		var count = 0, i = 0, _self = this;
		for( var name in BUFFS ){
			count++;
		}
		for( var name in BUFFS ){
			(function(){
				var buff = BUFFS[ name ];
				_loadImg( buff.src, function(){
					buff.img = this;
					i++;
					//全部加载完
					if ( i >= count ){
						_self.add( 10, "状态图片加载完毕..." );
					}
				} );
			})();
		}		
	},
	//加载状态图像
	_loadGoodsImg	: function(){
		var count = 0, i = 0, _self = this;
		for( var name in GOODS ){
			count++;
		}
		for( var name in GOODS ){
			(function(){
				var buff = GOODS[ name ];
				_loadImg( buff.src, function(){
					buff.img = this;
					i++;
					//全部加载完
					if ( i >= count ){
						_self.add( 10, "物品图片加载完毕..." );
					}
				} );
			})();
		}		
	},	
	//加载魔法图像
	_loadAnimationImg	: function(){
		var count = 0, i = 0, _self = this;
		for( var name in ANIMATIONS ){
			count++;
		}
		for( var name in ANIMATIONS ){
			(function(){
				var a = ANIMATIONS[ name ];
				_loadImg( a.src, function(){
					ctx.clearRect( 0,0, this.width, this.height );
					ctx.drawImage( this, 0, 0  );
					//切割图片
					var totalH = this.height, n = totalH / a.h, imgs = [];
					for (var j=0; j<n; j++) {
						imgs.push( PS.getCanImage( ctx, 0, a.h * j, a.w, a.h ) );
					}
					a.imgs = imgs;
					i++;
					//全部加载完
					if ( i >= count ){
						_self.add( 10, "魔法图片加载完毕..." );
					}
				} );
			})();
		}		
	},		
	
	_loadBackgroundImg	: function(){
		_loadImg( BGIMAGE, bind( function(){
			this.add( 20, "背景图片加载完毕..." );
		}, this) );
	},

	_loadRoleImg	: function(){
		ImgMgr = new Manager();
		var count = 0, _self = this;
		for( var key in ROLES ){
			count++;
		} 		
		for( var key in ROLES ){
			var r = new UnitImg( $.extend( {
				id	: key,
				listeners	: {
					load	: function( role ){
						_self.add( Math.floor( 52/ count ) , role.id + "图片加载完毕..." );
					}
				}
			}, ROLES[ key ] ) );
			
			ImgMgr.reg( key, r );
		} 
	},
			
	start	: function(){
		PANEL.mask();
		this.el.show();
		
		this._loadBuffsImg();
		this._loadGoodsImg();
		this._loadAnimationImg();
		this._loadBackgroundImg();
		this._loadRoleImg();
				
		return this;
	},
	
	add	: function( n, msg ){
		this.count += n;
		this.msg = msg;
		
		this.el.html( this.count + "/100%　　" +  this.msg );
				
		if ( this.count >= 100 )
			this.end();
			
		return this;
	},
	
	end	: function(){
		this.el.html("").hide();
		PANEL.unmask();
		
		this.fireEvent("end");
	}
	
});

