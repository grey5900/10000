!function($) {
	$.ajaxSetup({
		cache : true
	});
	$(function() {
		//tab切换
		$(".panel-tab:first").show();
		$(".tit-tab li").each(function(index) {
			$(this).click(function() {
				if ($(this).attr('class') != 'current') {
					$(this).addClass("current").siblings().removeClass("current");
					$(this).parents(".tit-tab").siblings(".content-tab").find(".panel-tab").eq(index).show().siblings().hide();
					loadQueryList(index + '');
				}
			})
		});
		loadQueryList('init');
	})
	function getCurTabIndex() {
		var wo = -1;
		$(".tit-tab li").each(function(index) {
			if ($(this).attr('class') == 'current') {
				wo = index;
			}
		});
		return wo;
	}

	// function loadQueryList(index) {
		// //alert(index);
		// var loadingImg = "<div height:500px; width:500px; align='center'></div>";
		// $("#requisition_info").html(loadingImg);
		// var url = "";
		// if (index == 'init') {
			// url += "http://127.0.0.1:8020/10000/action/action_support_0.action";
			// iframeFunction(url);
		// } else if (index == '0') {
			// url += "http://127.0.0.1:8020/10000/action/action_support_0.action";
		// } else if (index == '1') {
			// url += "http://127.0.0.1:8020/10000/action/action_support_1.action";
		// } else if (index == '2') {
			// url += "http://127.0.0.1:8020/10000/action/action_support_2.action";
		// } else if (index == '3') {
			// url += "http://127.0.0.1:8020/10000/action/action_support_3.action";
		// } else if (index == '4') {
			// url += "http://127.0.0.1:8020/10000/action/action_support_4.action";
		// } else if (index == '5') {
			// url += "http://127.0.0.1:8020/10000/action/action_support_5.action";
		// } else if (index == '6') {
			// url += "http://127.0.0.1:8020/10000/action/action_support_6.action";
		// }
		// iframeFunction("requisition_info", "uiframe", url);
	// }


	window.onload = function() {
		for (var ii = 0; ii < document.links.length; ii++)
			document.links[ii].onfocus = function() {
				this.blur()
			}
	}
}(window.jQuery);