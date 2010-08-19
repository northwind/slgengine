/**
 * @author sina
 */

$(function(){
 	//��ʼ��PANEL
	PANEL = new Panel( {
		ct : $("#container")
	} );
	PANEL.setBgColor("#008000")
		.setBgImage( "images/bg_1.png", 800, 800 )
		.showGrid();
		//.setUnits( UNITS );	
 });