!function($) {
	var loading = false;
    $.fn.extend({
        /**
         * 字数统计
         *
         **/
        charCount: function(options) {

            var defaults = {
                allowed: 100,
                warning: 10,
                css: 'counter',
                counterElement: 'span',
                cssWarning: 'warning',
                cssExceeded: 'exceeded',
                counterText: ''
            };

            var options = $.extend(defaults, options);

            function calculate(obj) {
                var count = $(obj).val().length;
                var available = options.allowed - count;
                if (available <= options.warning && available >= 0) {
                    $(obj).next().addClass(options.cssWarning);
                } else {
                    $(obj).next().removeClass(options.cssWarning);
                }
                if (available < 0) {
                	//设置为0
	            	available = 0;
	            	//截断超出部分
	            	$(obj).val($(obj).val().substr(0,options.allowed));
                    $(obj).next().addClass(options.cssExceeded);
                } else {
                    $(obj).next().removeClass(options.cssExceeded);
                }
                $(obj).next().html(options.counterText + available);
            };

            this.each(function() {
                $(this).after('<' + options.counterElement + ' class="' + options.css + '">' + options.counterText + '</' + options.counterElement + '>');

                calculate(this);
                $(this).keyup(function() {
                    calculate(this)
                });
                $(this).change(function() {
                    calculate(this)
                });
                
            });
        },
    })
} (window.jQuery);
function newWindow(url){    
    window.open(url);
}
//生成一个iframe并且加载一个Url到指定的div
function iframeFunction (divName,uiframe,url){
      //var requrl = getCmsFullUrl(url);    
      var html = "<iframe src='" + url + "'"
      html += " width='100%' id ='"+uiframe+"' onload='autoHeight(this);' scrolling='no' frameborder='0' allowtransparency='true'>"
      html += " </iframe>";
      $("#"+divName).html(html);
}
//iframe动态调整自身高度
 var objiframe;
function autoHeight(myiframe){
    objiframe= myiframe;    
    if(objiframe.addEventListener||objiframe.readyState=="complete"){
        setTimeout("iframeHeight()","200");//为了保证IFRAME内容被浏览器解析完毕增加延迟获取高度
    }
 }
 function iframeHeight(){
    if(objiframe.Document){//ie自有属性
        objiframe.style.height =objiframe.Document.body.scrollHeight+25+'px';
    }else if(objiframe.contentDocument){//ie,firefox,chrome,opera,safari
        objiframe.height = objiframe.contentDocument.body.offsetHeight+25+'px';       
    }
} 
//返回上一个页面（保留上一个页面数据）支持火狐
function gohistory(){
    history.go(-1);
    return false;
}


