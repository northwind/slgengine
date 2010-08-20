/**
 * @author sina
 */

$(function(){
 	//��ʼ��PANEL
	PANEL = new Panel( {
		ct : $("#container")
	} );
	
	var p = new Unit();
	
	PANEL.setBgColor("#008000")
		.setBgImage( "images/sina.jpg" )
		.moveTo( 100, 200 )
		//.setUnits( MAP )
		//.showAt( 5, 5 )
		.showGrid()
		.hideGrid();
		//.setUnits( UNITS );	
 });