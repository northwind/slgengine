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

        //Ĭ�ϲ�������
        var defaultSettings = {
            parent: document,                //��������
            target: this,                    //��קʱ�ƶ��Ķ���
            onmove: function(e) {            //��ק������
                $(settings.target).css({
                    left: e.clientX - dx,
                    top: e.clientY - dy
                });
            },
            onfinish: function(){}            //��ק��ɻص�����
        };

        var settings = $.extend({}, defaultSettings, opts);

        var dx, dy, moveout;

        //��ֹ��קʱѡ���ı�
        this.bind("selectstart", function(){return false;});

        //��갴��ʱ��¼������λ��
        this.mousedown(function(e) {
            var t = $(settings.target);
            dx = e.clientX - parseInt(t.css("left"));
            dy = e.clientY - parseInt(t.css("top"));

            $(settings.parent).mousemove(move).mouseout(out);

            $().mouseup(up);
        });

        //����ڸ����������ƶ�ʱ�Ĵ���
        function move(e) {
            moveout = false;
            settings.onmove(e);
        }

        //����Ƴ���������ʱ�Ĵ���
        function out(e) {
            moveout = true;
            setTimeout(function(){checkout(e);}, 100);    //΢��
        }

        //��ק����
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