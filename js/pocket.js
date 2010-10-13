/*
	角色移动后弹出的菜单项
*/
var Pocket = Win.extend({
	cls		: "_win _prop",	
	hidden : true,
	beshow : false, 	//鼠标右键是否该重新现实
	lock	: false,   //锁定不可操作
	
	init: function( config ){
		this._super( config );
		
		this.content.addClass( "_tablect" );
		
		this.table = $( '<table cellspacing="0" ><thead>' +
                			    '<tr><td width="150px" >名称</td><td align="center" width="100px">功效</td>' +
								'<td align="center" width="40px">库存</td>' +
                			    '</tr></thead><tbody></tbody></table>' ).appendTo( this.content );
		
		this.initGoods( GOODS );
		
		return this;	
  	},
	
	initGoods	: function( data ){
		this.data = data;
		this.goods = {};
		for (var i=0; i<data.length; i++) {
			var d = data[ i ];
			this.goods[ d.id ] = new Stuff( d );
		}
		this.list();
	},
	
	list	: function(){
		var fragment = document.createDocumentFragment();
		for( var key in this.goods ){
			var item = this.goods[ key ];
			if ( item.count > 0 ){
				fragment.appendChild( this._createTr( item ) );
			}
		}
		
		this.table.children("tbody").append( fragment ).find( 'tr' ).hover( function(){
			$( this ).toggleClass( "active" );
		} );
	},
	
	_createTr	: function( item ){
		return $( '<tr><td><img src="' + item.img + '">' + item.name +
						'</td><td align="center">' + item.desc + 
						'</td><td align="center">' + item.count +
						'</td></tr>' )[ 0 ];
	}
	
});