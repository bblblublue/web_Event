// 每次调用$.get(),$.post(),$.ajax(),都会先调用ajaxPrefilter这个函数
// 造这个函数中,可以拿到ajax提供的配置对象
$.ajaxPrefilter(function(options) {
	// 在发起真正的ajax请求之前,统一拼接请求的根路径
	// http://api-breakingnews-web.itheima.net
	options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
	console.log(options.url);
})