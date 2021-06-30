$(function() {
	// 点击登录注册页面切换
	//不要用事件委托来写   不然吃大亏  草
	$('#login-box').on('click', function() {
		$('.login-box').hide();
		$('.reg-box').show();
	})
	$('#reg-box').on('click', function() {
		$('.login-box').show();
		$('.reg-box').hide();
	})

	// 从layui中获取form对象
	var form = layui.form;
	var layer = layui.layer;
	// 通过form.verify()自定义校验规则
	form.verify({
		pwd: [
			/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
		],
		// 校验两次密码是否一致的规则
		repwd: function(value) {
			// 通过形参拿到的是 再次输入密码框 中的内容
			//再拿到密码框中的内容进行比较
			var pwd = $('.reg-box #pwd').val();
			if (pwd !== value) {
				return '两次输入的密码不一致！'
			}
		}
	})

	// 监听表单的提交事件
	$('#form_reg').on('submit', function(e) {
		e.preventDefault();
		$.post('/api/reguser', {
			username: '$("#form_reg [name=username]").val()',
			password: '$("#form_reg [name=password]").val()'
		}, function(res) {
			console.log(res);
			if (res.status !== 0) {
				// return console.log(res.message);
				return layer.msg(res.message);
			} else {
				// console.log('注册成功！');
				layer.msg('注册成功！');
				// 注册成功自动跳转到登录页面
				$('#reg_box').click();
			}

		})
	})

	// 监听表单的登录事件
	$('#form_login').submit(function(e) {
		e.preventDefault();
		$.ajax({
			method: 'POST',
			url: '/api/login',
			data: $(this).serialize(),
			success: function(res) {
				console.log(res);
				if (res.status !== 0) {
					// 跳转到主页面
					location.href = './index.html';
					
					return layer.msg('登录失败！');
				} else {
					layer.msg('登录成功！');
					console.log(res.token);

				}
			}
		})
	})
})
