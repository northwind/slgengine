/**
 * @author sina
 */

$(function(){
 	//不支持IE
	if ( $.browser.msie ){
		$("#download").show();
		
		return false;
	}
	
	//控制区域
	$("#control").show();
	$("#grid").toggle( function(){
		PANEL.showGrid();
	}, function(){
		PANEL.hideGrid();
	} );
	//添加角色
	$("#add").click( function(){
		var p = new Unit({
			gx :  $("#posX").val(),  gy :  $("#posY").val(),  moveable : true, overlay : false,
			name : $("#name").val(),  hp : parseInt( $("#hp").val() ), team : parseInt( $("#team").val() ), role : $("#role").val(),
			id  : $("#id").val(), symbol : $("#role").val(), level :parseInt($("#level").val()),
			 step :parseInt($("#step").val()), range :parseInt($("#range").val()) , rangeType : 2
		});
		
		PANEL.showUnit( p );
	} );
	//删除角色
	$("#del").click( function(){
		PANEL.delUnit( $("#id2").val() );
	} );
	//移动窗口
	$("#move").click( function(){
		PANEL.moveTo( $("#moveX").val(), $("#moveY").val() );
	} );
	//显示/隐藏血条
	$("#hpline").toggle( function(){
		PANEL.unitsLayer.hpLineForce = true;
	},function(){
		PANEL.unitsLayer.hpLineForce = false;
	} );	
		
		
 });