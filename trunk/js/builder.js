/**
 * @author sina
 */

$(function(){
 	//��ʼ��PANEL
	PANEL = new Panel( {
		el : $("#panel")
	} );
	PANEL.setBgColor("#008000");
	
	LayerMgr.setPanel( PANEL );
	
	var layerBg = LayerMgr.reg( 1, 800, 800 );
	layerBg.setBgImage("images/bg_1.png");
	
	var layerCell = LayerMgr.reg( 100, 800, 800, CellLayer );
	//layerCell.showGrid();
	
	var layerUnits = LayerMgr.reg( 200, 800, 800, UnitLayer );
	layerUnits.setData( UNITS ).paint().play();
	
 });