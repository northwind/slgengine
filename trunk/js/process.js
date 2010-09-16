/**
 * @author sina
 */

var Process = function(){
	
}

Process.prototype = {
	process : 0,
	speed	: 100,
	next	: 0,
	
	init	: function( config ){
		$.extend( this, config );
		
		this.el = $("<div>").addClass("_loader").appendTo( this.ct );
		
		return this;
	},
	
	start	: function(){
		if ( this.timer )
			clearInterval( this.timer );
			
		//自动递增到next
		var fn = function(){
			
			if ( this.process < this.next ) 
				this.process++;
			
		};
		this.timer = setInterval( fn, this.speed ); 
		
		PANEL.mask();
		this.el.show();
		
		this.tip( 1, "开始加载" );
		
		fn();
		
		return this;
	},
	
	tip	: function( next, msg ){
		
		this.next = next;
		
		console.debug( "next : " + next + " msg : " + msg );
		
		this.el.html( msg );
		
		return this;
	},
	
	end	: function(){
		
		console.debug( "process end" );
		
		this.el.hide();
		PANEL.unmask();
		
	}
	
};

Process = new Process();	

