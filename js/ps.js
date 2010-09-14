/**
 * @author Administrator
 */

var PS = function( config ){
	$.extend( this, config );
	
	this.canvas = $("<canvas>").addClass("_bboard").appendTo("body")[0];
	this.ctx = this.canvas.getContext("2d");
	
	return this;
}

PS.prototype = {
	
	/*
	 * 复制ctx中某一区域图像，转成Image
*/
	getCanImage	: function( ctxOri, x,y, w, h ){
		var img = new Image(), can = this.canvas;
		
		var data = ctxOri.getImageData( x,y, w,h );
		
		can.width = w;
		can.height = h;
		this.ctx.putImageData( data, 0 ,0 );
		data = can.toDataURL();
		
		img.src = data;
		return img;
	},

	getCanImageTurn	: function( img ){
		var ret = new Image(), can = this.canvas, c = this.ctx;
		var w = img.width, h = img.height;
		
		can.width = w;
		can.height = h;
		
		c.save();
		var matrix  = this.getMatrix( Math.PI, 1, -1 );
		//变换坐标系
		c.translate( w, 0 );
		c.transform( matrix.M11,  matrix.M12, matrix.M21, matrix.M22, 0,0 );
		
		c.drawImage( img, 0, 0 );
		var data = can.toDataURL();
		
		c.restore();
		
		ret.src = data;
		return ret;
	},
	
	getMatrix	:    function (radian, x, y) {
        var Cos = Math.cos(radian), Sin = Math.sin(radian);
        return {
            M11: Cos * x, M12:-Sin * y,
            M21: Sin * x, M22: Cos * y
        };
    },
		
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
	//TODO  transform 优化
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

//DOM树加载完之后
$( function(){
	PS = new PS();
} );
