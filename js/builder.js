/**
 * 程序主入门
 */
$(function(){
	
	if ( $.browser.msie )
		return false;
	
	PANEL = new Panel();
	
	//开始更新
	PANEL.start();
	SoundMgr.load();
		
	//Save.show();
	Save.choose( 1 );	
	
		
 });