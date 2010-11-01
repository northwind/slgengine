/**
 *	负责展示每个角色会使用的魔法
    选中后调用魔法的apply方法
 */
var MagicBox = Win.extend({
	cls		: "_win _prop",	
	unit	: null,
	selected	: null,
	
	init: function( config ){
		this.addEvents( "over" );
		this._super( config );
		
		this.content.addClass( "_tablect" );
		
		this.table = $( '<table cellspacing="0" ><thead>' +
                			    '<tr><td width="150px" >名称</td><td align="center" width="100px">功效</td>' +
								'<td align="center" width="40px">消耗MP</td>' +
                			    '</tr></thead><tbody></tbody></table>' ).appendTo( this.content );
		
		PANEL.unitsLayer.on( "click", this.onClick, this );
		this.on( "show", this.list, this );
		
		return this;	
  	},
	
	list	: function(){
		var fragment = document.createDocumentFragment();
		for( var key in this.unit.magics ){
			var item = this.unit.magics[ key ];
			
			fragment.appendChild( this._createTr( item ) );
		}
		
		var _self = this;
		this.table.children("tbody").empty().append( fragment ).find( 'tr' ).hover( function(){
			$( this ).toggleClass( "active" );
		} ).click( function(){
			// MP不足时点击不生效
			if (!$(this).hasClass("unactive")) {
				var id = $(this).attr("param");
				_self.select(id);
			}
		} );
	},
	
	_createTr	: function( item ){
		return $( '<tr param="' + item.id + '"><td><img src="' + item.img + '">' + item.name +
						'</td><td align="center">' + item.desc + 
						'</td><td align="center">' + item.needMP +
						'</td></tr>' )
						.addClass( item.needMP > this.unit.mp ? "unactive" : "" )
						[ 0 ];
	},
	
	select		: function( id ){
		this.layer.concealWin();
		this.hide();
		this.selected = this.unit.magics[ id ];
		this.selected.use( this.unit );
	},
	
	onClick		: function( cell, unit ){
		//如果有选道具
		if ( this.selected ){
			if ( this.selected.canAttack( cell, unit ) ){
				this.layer.lock();
				
				//this.unit.on( "standby", this.onOver, this, { one : true} );
				this.selected.on( "over", this.onOver, this, { one : true} );
				//使用
				this.selected.apply( cell, unit );
				
				delete this.selected;
			}
			return false;
		}
	},
	
	onOver		: function(){
		//判断施放魔法后是否还可以继续行动
		if (true) {
			this.layer.unreg(this);
			this.layer.unlock();
			this.fireEvent("over", this);
			delete this.unit;
		}
	},
	
	//覆盖父类 
	cansel	: function( e ){
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