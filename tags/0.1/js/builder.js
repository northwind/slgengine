/**
 * @author sina
 */

$(function(){
 	//��ʼ��PANEL
	PANEL = new Panel( {
		el : $("#panel")
	} );
	PANEL.setBgColor("#008000")
				.setBgImage( "images/bg_1.png", 800, 800 )
				.setUnits( UNITS );	
 });