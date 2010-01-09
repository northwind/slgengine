/**
 * @author sina
 */

$(function(){
 	//≥ı ºªØPANEL
	myPanel = new Panel( {
		el : $("#panel")
	} );
	myPanel.setBgColor("#008000");
	
	LayerMgr.setPanel( myPanel );
	
	var layerBg = LayerMgr.reg( 100, 800, 600, BackgroundLayer );
	//layerBg.setBgImage("images/sunset.jpg");
	//layerBg.showGrid();
	
	var layerUnits = LayerMgr.reg( 200, 800, 600, UnitLayer );
	layerUnits.setData( MAP ).paint();
	
 });