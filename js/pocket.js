/*
	角色移动后弹出的菜单项
*/
var Pocket = Win.extend({
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
		
		this.initGoods( GOODS );
		
		PANEL.unitsLayer.on( "click", this.onClick, this );
		this.on( "show", this.list, this );
		
		return this;	
  	},
	
	initGoods	: function( data ){
		this.data = data;
		this.goods = {};
		for (var i=0; i<data.length; i++) {
			var stuff = new Stuff( data[i] );
			//stuff.on( "over", this.onOver, this );
			
			this.goods[ stuff.id ] = stuff;
		}
		//this.list();
	},
	
	list	: function(){
		var fragment = document.createDocumentFragment();
		for( var key in this.goods ){
			var item = this.goods[ key ];
			if ( item.count > 0 ){
				fragment.appendChild( this._createTr( item ) );
			}
		}
		
		var _self = this;
		this.table.children("tbody").empty().append( fragment ).find( 'tr' ).hover( function(){
			$( this ).toggleClass( "active" );
		} ).click( function(){
			var id = $(this).attr("param");
			_self.select( id );
		} );
	},
	
	_createTr	: function( item ){
		return $( '<tr param="' + item.id + '"><td><img src="' + item.img + '">' + item.name +
						'</td><td align="center">' + item.desc + 
						'</td><td align="center">' + item.count +
						'</td></tr>' )[ 0 ];
	},
	
	select		: function( id ){
		this.layer.concealWin();
		this.hide();
		this.selected = this.goods[ id ];
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
		//this.layer.unreg( this );
		//this.fireEvent( "over", this );
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