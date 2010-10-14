/**
 * @author sina
 */

$(function(){
	
	if ( $.browser.msie )
		return false;
		
	PANEL = new Panel();
	
	PANEL
		.setBgImage( "images/bigmap/1-1.jpg" )
		.setSmallMap(  "images/smallmap/1-1.png" )
		.setTeams( TEAMS )
		.setUnits( UNITS );
	
	PANEL.on( "start", function( panel ){
		var unit = panel.getUnit( "caocao" );
		unit.speak( "去死吧!" );
	} );
		
 });