/**
* drag for jQuery
*
* author: harry313
* e-mail: harry313@163.com
*
* Version: 1.0.0
*/

(function($) {

    $.fn.draggable = function(opts) {

        //默认参数设置
        var defaultSettings = {
            parent: document,                //父级容器
            target: this,                    //拖拽时移动的对象
            onmove: function(e) {            //拖拽处理函数
                $(settings.target).css({
                    left: e.clientX - dx,
                    top: e.clientY - dy
                });
            },
            onfinish: function(){}            //拖拽完成回调函数
        };

        var settings = $.extend({}, defaultSettings, opts);

        var dx, dy, moveout;

        //防止拖拽时选中文本
        this.bind("selectstart", function(){return false;});

        //鼠标按下时记录鼠标相对位置
        this.mousedown(function(e) {
            var t = $(settings.target);
            dx = e.clientX - parseInt(t.css("left"));
            dy = e.clientY - parseInt(t.css("top"));

            $(settings.parent).mousemove(move).mouseout(out);

            $().mouseup(up);
        });

        //鼠标在父级容器上移动时的处理
        function move(e) {
            moveout = false;
            settings.onmove(e);
        }

        //鼠标移出父级容器时的处理
        function out(e) {
            moveout = true;
            setTimeout(function(){checkout(e);}, 100);    //微调
        }

        //拖拽结束
        function up(e) {
            $(settings.parent).unbind("mousemove", move).unbind("mouseout", out);
            $().unbind("mouseup", up);
            settings.onfinish(e);
        }

        function checkout(e) {
            moveout && up(e);
        }
    };


})(jQuery);