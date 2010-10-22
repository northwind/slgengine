/*
	角色移动后弹出的菜单项
*/
var PocketWin = Win.extend({
	cls		: "_win _prop",	
	unit	: null,
	selected	: null,
	
	init: function( config ){
		this._super( config );
		this.addEvents( "over" );
		
		this.content.addClass( "_tablect" );
		
		this.table = $( '<table cellspacing="0" ><thead>' +
                			    '<tr><td width="150px" >名称</td><td align="center" width="100px">功效</td>' +
								'<td align="center" width="40px">库存</td>' +
                			    '</tr></thead><tbody></tbody></table>' ).appendTo( this.content );
		
		PANEL.unitsLayer.on( "click", this.onClick, this );
		this.on( "show", this.list, this );
		
		return this;	
  	},
	
	list	: function(){
		this.fragment = document.createDocumentFragment();
		
		Pocket.each( this._createTr, this );
		
		var _self = this;
		this.table.children("tbody").empty().append( this.fragment ).find( 'tr' ).hover( function(){
			$( this ).toggleClass( "active" );
		} ).click( function(){
			var id = $(this).attr("param");
			_self.select( id );
		} );
	},
	
	_createTr	: function( key, item ){
		if ( item.count > 0 )
		this.fragment.appendChild( $( '<tr param="' + item.id + '"><td><img src="' + item.src + '">' + item.name +
						'</td><td align="center">' + item.desc + 
						'</td><td align="center">' + item.count +
						'</td></tr>' )[ 0 ] );
	},
	
	select		: function( id ){
		this.layer.concealWin();
		this.hide();
		this.selected = Pocket.get( id );
		this.selected.use( this.unit );
	},
	
	onClick		: function( cell, unit ){
		//如果有选道具
		if ( this.selected ){
			if ( this.selected.canAttack( cell, unit ) ){
				this.layer.lock();
				
				this.unit.on( "standby", function(){
					this.layer.unreg( this );
					this.layer.unlock();
					this.fireEvent( "over", this );
				}, this, { one : true } );
				
				//使用
				this.selected.apply( unit );
				delete this.selected;
			}
			return false;
		}
	},
	
	onOver		: function(){
		this.layer.unlock();
	},
	
	//覆盖父类 
	onCansel	: function( e ){
		this._super(e);
		this.layer.unreg( this );
		delete this.selected;
		delete this.unit;
	},
		
	bind	: function( unit ){
		this.unit = unit;
		return this;
	}
});

// 物品管理类
var Pocket = Manager.extend({
	
	start	: function( data ){
		this.data = data;
		
		for( var key in GOODS ){
			var stuff = new Stuff( GOODS[key] );
			
			this.reg( key, stuff );
		}
	}
});

Pocket = new Pocket();
