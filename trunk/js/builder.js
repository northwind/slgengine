/**
 * @author sina
 */

$(function(){
 	//��ʼ��PANEL
	PANEL = new Panel( {
		ct : $("#container")
	} );
	
	var p = new Unit({
		gx :  2,  gy : 2,  moveable : true, overlay : false, urlImg : "images/footman.png"
	});
	
	PANEL.setBgColor("#008000")
		.setBgImage( "images/bg_1.png" )
		.moveTo( 100, 200 )
		.setUnits( UNITS )
		.showUnit( p, 5, 5 )
		//.showGrid()
		//.hideGrid();
 });