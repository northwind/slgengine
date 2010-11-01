/**
 * 队伍类
 * 管理整个个队伍中的单位，检测回合结束与是否都阵亡等
 * 触发teamStart,teamEnd,teamOver
 */
var Team = Manager.extend({
	name	: "",
	faction : 0,
	team	: 0,
	layer	: null,
	
	init	: function(){
		this.addEvents( "teamStart","teamEnd","teamOver" );
		this._super( arguments[0] );
		
		return this;
	},
	
	add		: function( unit ){
		unit.bindEvent( "standby", this.checkEnd, this )
			  .on( "dead", function( unit ){
				this.remove( unit );
				if ( !PANEL.isScripting() )
					this.checkOver( unit );
			 }, this );
				
		this.reg( unit.id, unit  );
	},

	checkEnd	: function(){
		var flag = true;
		for ( var key in this.items ) {
			var unit = this.items[key];
			//当同一队伍中有任何一个可以移动时跳出循环
			if ( !unit.lock ) {
				flag = false;
				break;
			}
		}
		if (flag) {
			this.end();
		}		
	},
	
	checkOver	: function(){
		var flag = true;
		for ( var key in this.items ) {
			var unit = this.items[key];
			//当同一队伍中有任何一个可以移动时跳出循环
			if ( !unit.dead ) {
				flag = false;
				break;
			}
		}
		if (flag) {
			this.over();
		}		
	},
	
	start			: function(){
		log( "team : start : " + this.name );
		this.each( function(){
			this.unLock();
		} );			
		this.fireEvent( "teamStart", this );
	},
	
	end			: function(){
		log( "team : end : " + this.name );
		this.each( function(){
			this.restore();			
		} );				
		this.fireEvent( "teamEnd", this );
	},
	
	finish		: function(){
		log( "team : finish :" + this.name  );
		this.end();		
	},
	
	over		: function(){
		log( "team : over :" + this.name  );
		this.fireEvent( "teamOver", this );
	},
	
	restore	: function(){
		log( "team : restore :" + this.name  );
		this.each( function(){
			this.restore();
		} );
	},
	
	remove	: function( unit ){
		log( "team : " + this.name + " remove unit : " + unit.id ); 
		this.unreg( unit.id );
	},
	
	members	: function(){
		return this.items;
	},
	
	destroy	: function(){
		
	},
	
	equal		: function( f, t ){
		return this.faction == f && this.team == t;
	}
	
});
