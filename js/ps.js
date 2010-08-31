/**
 * @author Administrator
 */

var PS = function( config ){
	$.extend( this, config );
	return this;
}

PS.prototype = {
	
	//将图像灰化
	gray		: function( ctx, imageData ){
		var w = imageData.width,
				h = imageData.height,
				ret = ctx.createImageData( w, h );
				
		for (i=0; i<w; i++)
		{
			for (j=0; j<h; j++)
			{
			    var index=(i*4)*w+(j*4);
			
			    var red=imageData.data[index];
			    var green=imageData.data[index+1];
			    var blue=imageData.data[index+2];
			    var alpha=imageData.data[index+3];
			
			    var average=(red+green+blue)/3;
			
			    ret.data[index]=average;
			    ret.data[index+1]=average;
			    ret.data[index+2]=average;
			    ret.data[index+3]=alpha;
			  }
		}
		
		return ret;
	},
	
	// 生成ImageData
	 createImageData	: function( ctx, ori, from, w, h ){
			var	ret = ctx.createImageData( w, h );
			var total = w * h * 4;
			from = from * w * 4;
			for (var i= 0 ; i< total; i++) {
				ret.data[ i ] = ori.data[ from + i ];
			}
			
			return ret;
	},
	
	// 生成ImageData
	//对称图像
	 createImageDataTurn	: function( ctx, ori, from, w, h ){
			var	ret = ctx.createImageData( w, h );
			var total = w * h * 4;
			from = from * w * 4;
			for (var i=0; i<w; i++) {
				for (var j=0; j<h; j++) {
					var  a =  (i * w + j) * 4,
							b = from + a,
							c =  (i * w + (w-j)) * 4;
							
					ret.data[ c++ ] = ori.data[ b++ ];
					ret.data[ c++ ] = ori.data[ b++ ];
					ret.data[ c++ ] = ori.data[ b++ ];
					ret.data[ c++ ] = ori.data[ b++ ];
				}
			}
			
			return ret;
	}			
	
};

PS = new PS();

