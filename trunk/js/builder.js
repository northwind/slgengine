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
	
	var layerBg = LayerMgr.reg( 1, 800, 800 );
	layerBg.setBgImage("images/bg_1.png");
	
	var layerCell = LayerMgr.reg( 100, 800, 800, CellLayer );
	//layerCell.showGrid();
	
	var layerUnits = LayerMgr.reg( 200, 800, 800, UnitLayer );
	layerUnits.setData( UNITS ).paint().play();
	
 });