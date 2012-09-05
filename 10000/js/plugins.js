!function($) {
	$(function(){
		//字符统计
		$("#textarea-intention,#textarea-empirical").charCount({
	        allowed: 100,
	        warning: 10,
	        css: 'counter',
	        counterElement: 'span',
	        cssWarning: 'warning',
	        cssExceeded: 'exceeded',
	        counterText: '还可以输入'
	    });
	})
	//时段获取
	function timeinterval(){
		var timeBanner = "凌晨";
		var today = new Date();
		var hour = today.getHours();
		if (hour >= 5 && hour < 8) {
			timeBanner = "上午";
		}
		if (hour >= 8 && hour < 12) {
			timeBanner = "上午";
		}
		if (hour >= 12 && hour < 14) {
			timeBanner = "中午";
		}
		if (hour >= 14 && hour < 17) {
			timeBanner = "下午";
		}
		if (hour >= 17 && hour < 19) {
			timeBanner = "傍晚";
		}
		if (hour >= 19 && hour < 23) {
			timeBanner = "晚上";
		}
		return timeBanner;
	}
}(window.jQuery);
$(function(){
	var startDate = new Date;
	var endDate = new Date;
	$('#query_start').datepicker().on('changeDate', function(ev){
		if (ev.date.valueOf() > endDate.valueOf()){
			$('#alert').show().find('strong').text('开始日期不能大于结束日期');
		} else {
			$('#alert').hide();
			startDate = new Date(ev.date);
		}
	});
	$('#query_end').datepicker().on('changeDate', function(ev){
		if (ev.date.valueOf() < startDate.valueOf()){
			$('#alert').show().find('strong').text('结束日期不能小于开始日期');
		} else {
			$('#alert').hide();
			endDate = new Date(ev.date);
		}
	});
});