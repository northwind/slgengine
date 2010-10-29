/**
 * 程序主入门
 */
$(function(){
	
	if ( $.browser.msie )
		return false;
	
	//初始化进度条
	var process = new Process();
	
	process.on("end", function(){
		log( "process end" );
		var p = new Panel();
	}).start();	
	
	
		
 });