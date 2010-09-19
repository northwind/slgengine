/**
 * @author sina
 */

$(function(){
	
	if ( $.browser.msie )
		return false;
		
	PANEL = new Panel();
	
	PANEL
		.setBgImage( "images/bigmap/1-1.jpg" )
		.setUnits( UNITS );
	
		
 });