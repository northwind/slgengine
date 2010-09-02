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
			    var index=(i*h+j) * 4;
			
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
	
	//生成ImageData
	//对称图像反转
	 createImageDataTurn	: function( ctx, ori, from, w, h ){
			var	ret = ctx.createImageData( w, h );
			var total = w * h * 4;
			from = from * w * 4;
			for (var j=0; j<h; j++) {
				for (var i=0; i<w; i++) {
					var  a =  (j * w + i) * 4,
							b = from + a,
							c =  (j * w + w- i) * 4;
							
					ret.data[ c++ ] = ori.data[ b++ ];
					ret.data[ c++ ] = ori.data[ b++ ];
					ret.data[ c++ ] = ori.data[ b++ ];
					ret.data[ c++ ] = ori.data[ b++ ];
				}
			}
			
			return ret;
	},
	
	//将整个图片设置为某一颜色值
	 setColorR	: function( ctx, imageData, n ){
		var w = imageData.width,
				h = imageData.height,
				ret = ctx.createImageData( w, h );
		
		var total = w * h * 4;
		
		for (var i=0; i<total; i +=4 ) {
			
			ret.data[i]  = n; // imageData[ i ];
		    ret.data[i+1]= imageData.data[ i + 1 ];
		    ret.data[i+2]= imageData.data[ i + 2 ];
		    ret.data[ i+3]= imageData.data[ i + 3 ];
		}	
		
		return ret;
	},
	
	//将整个图片设置为某一颜色值
	 setColorG	: function( ctx, imageData, n ){
		var w = imageData.width,
				h = imageData.height,
				ret = ctx.createImageData( w, h );
		
		var total = w * h * 4;
		
		for (var i=0; i<total; i +=4 ) {
			var red=imageData.data[i],
			    green=imageData.data[i+1],
			    blue=imageData.data[i+2];
			
			var a = (red + green + blue) / 3;
				
			ret.data[i]  = a;
		    ret.data[i+1]= a + n;
		    ret.data[i+2]= a;
		    ret.data[ i+3]= imageData.data[ i + 3 ];
		}	
		
		return ret;
	},
	
	//将整个图片设置为某一颜色值
	 setColorB	: function( ctx, imageData, n ){
		var w = imageData.width,
				h = imageData.height,
				ret = ctx.createImageData( w, h );
		
		var total = w * h * 4;
		
		for (var i=0; i<total; i +=4 ) {
			
			ret.data[i]  = imageData.data[ i ];
		    ret.data[i+1]= imageData.data[ i + 1 ];
		    ret.data[i+2]= n;
		    ret.data[ i+3]= imageData.data[ i + 3 ];
		}	
		
		return ret;
	},
	
	//高亮整个图片
	 highlight	: function( ctx, imageData, n ){
		var w = imageData.width,
				h = imageData.height,
				ret = ctx.createImageData( w, h );
		
		var total = w * h * 4;
		
		for (var i=0; i<total; i +=4 ) {
			
			ret.data[i]  = imageData.data[ i ] + n;
		    ret.data[i+1]= imageData.data[ i + 1 ] + n;
		    ret.data[i+2]= imageData.data[ i + 2 ] + n;
		    ret.data[ i+3]= imageData.data[ i + 3 ];
		}	
		
		return ret;
	},
	
	//去色   紫色 247, 0, 255
	 removeColor	: function( ctx, imageData, r, g, b ){
		var w = imageData.width,
				h = imageData.height,
				ret = ctx.createImageData( w, h );
		
		var total = w * h * 4;
		
		for (var i=0; i<total; i +=4 ) {
			var red=imageData.data[i],
			    green=imageData.data[i+1],
			    blue=imageData.data[i+2];
			
			//相等则全透明	
			if ( r == red && green == g && blue == b ){
				ret.data[ i+3]= 0;
			}else{
				ret.data[i]  = red;
		    	ret.data[i+1]= green;
		    	ret.data[i+2]= blue;
		    	ret.data[ i+3]= imageData.data[ i + 3 ];
			}
		}	
		
		return ret;
	}					
	
};

PS = new PS();
