window.onload = function() {
	vercode();
	var height = document.body.clientHeight;
	console.log(height);
	document.getElementsByTagName('img')[0].height = height;
	var BtnLogin = document.getElementById('login');
	BtnLogin.addEventListener("click",function(){
			login();
		},false);
}

//获取浏览器的cookie
function getCookie(name)
{
	var arr,reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr = document.cookie.match(reg))
       return unescape(arr[2]);
    else
       return null;
}

//验证码获取
function vercode(){
	$.ajax({
		url: "http://scoreapi.xiyoumobile.com/users/verCode",
		method: 'GET',
		dataType: 'jsonp',
		success: function(data){
			// console.log(data);
			document.getElementById('verImg').setAttribute("src",data.result.verCode);
			document.cookie = "session=" + data.result.session;
		},
	});
}

//登录
function login(){
	var username = document.getElementById('username').value,
		password = document.getElementById('password').value,
		verCode = document.getElementById('verCode').value,
		session = getCookie('session');
	if(username.length == 0 || password.length == 0){
		alert("输入不能为空!");
	}else{
		$.ajax({
			url: "http://scoreapi.xiyoumobile.com/users/login",
			method: 'GET',
			dataType: 'jsonp',
			data: {
				username: username,
				password: password,
				session: session,
				verCode: verCode,
			},
			success: function(data){
				console.log(data);
				if (data.error == false) {
					document.cookie = "username=" + username;
					document.cookie = "password=" + password;
					document.cookie = "sessions=" + data.result.session;
					window.location.href = "score.html";
				}else {
					alert("用户名或密码输入有误，请重新输入！");
					username.value = "";
					password.value = "";
					verCode.value = "";
					vercode();
				}
			}
		})
	}
}
