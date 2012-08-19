 !function($) {
    $.fn.extend({
        /**
         * 字数统计
         *
         **/
        charCount: function(options) {

            var defaults = {
                allowed: 140,
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
        }
    })

    $.ajaxSetup ({
                cache: true
        });

    $(".panel-tab:first").show();
    $(".tit-tab li").each(function(index){
        $(this).click(function(){
            if ($(this).attr('class') != 'current') {
                $(this).addClass("current").siblings().removeClass("current");
                $(this).parents(".tit-tab").siblings(".content-tab").find(".panel-tab").eq(index).show().siblings().hide();
                    loadQueryList(index + '');
                }           
            })      
        });
        loadQueryList('init');    
} (window.jQuery);

function getCurTabIndex() { 
            var wo = -1;
            $(".tit-tab li").each(function(index){     
                if ($(this).attr('class') == 'current') {           
                    wo = index;
                }
            });
            return wo;
        }
        
        function loadQueryList(index) {
            //  alert(index);
                var loadingImg = "<div height:500px; width:500px; align='center'><image src='../../hnwt/image/self-service/loading.gif'/></div>";
                $("#requisition_info").html(loadingImg);
                var url = "";       
                if (index == 'init') {
                    //url += "/hnselfservice/complaint/complaint-or-suggestion!gotoComPage.action";
                    url += "/hnselfservice/complaint/complaint-or-suggestion!gotoCouPage.action";
                    iframeFunction(url);
                } else if (index == '0') {          
                    url += "/hnselfservice/complaint/complaint-or-suggestion!gotoComPage.action";
                } else if (index == '1') {          
                    url += "/hnselfservice/complaint/complaint-or-suggestion!gotoOverridingCouPage.action";         
                } else if (index == '2') {      
                    url += "/hnselfservice/complaint/complaint-or-suggestion!gotoCouPage.action";
                } else if (index == '3') {      
                    url += "/hnselfservice/complaint/complaint-or-suggestion!gotoCouPage.action";
                } else if (index == '4') {      
                    url += "/hnselfservice/complaint/complaint-or-suggestion!gotoCouPage.action";
                } else if (index == '5') {      
                    url += "/hnselfservice/complaint/complaint-or-suggestion!gotoCouPage.action";
                } else if (index == '6') {      
                    url += "/hnselfservice/complaint/complaint-or-suggestion!gotoCouPage.action";
                } else if (index == '7') {      
                    url += "/hnselfservice/complaint/complaint-or-suggestion!gotoCouPage.action";
                }
                iframeFunction("requisition_info","uiframe",url);           
        }
        
         window.onload = function(){
             for (var ii = 0; ii < document.links.length; ii++) 
                 document.links[ii].onfocus = function(){
                     this.blur()
                 }
         }