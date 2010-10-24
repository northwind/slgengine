/**
 * 程序主入门
 */
$(function(){
	
	if ( $.browser.msie )
		return false;
		
	PANEL = new Panel();
	
	PANEL.setSmallMap(  "images/smallmap/1-1.png" )
		;
	
	PANEL.on( "start", function( panel ){
		
		//ActionMgr.start( 2 );
		
		//var unit = panel.getUnit( "caocao" );
		
		/*
		unit.go( CellMgr.get( 10, 5 ), function(){
			
			unit.speak( "这是第几天 这一座城市每天在下雪", function(){
				
				unit.attackCell( PANEL.getCell( 0,0 )  );
				
				PANEL.stopScript();
			} );			
			
		} );
		*/
		//PANEL.addStatic( "fire", 100, 100 );
		//PANEL.addStatic( "redStar", 200, 100 );
		//PANEL.addStatic( "storm", 200, 100 );
		
		//unit.addBuff( "confuse" );
		//unit.addBuff( "stop" );
		
		//unit.speak( "这是第几天 这一座城市每天在下雪", function(){
			
			//unit.gainStuff( Pocket.get( "1" ) );
			//unit.fall();
			//unit.attackCell( PANEL.getCell( 0,0 )  );
			
		//} );

	} );
		
 });