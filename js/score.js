window.onload = function(){
	getParameter();
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

//获取所需参数
function getParameter(){
	var userId = getCookie("username"),
		userPsd = getCookie("password"),
		sessionPer = getCookie("sessions");
	personImg(userId,sessionPer);
	personInfo(userId,userPsd);
	getScore(userId,userPsd,sessionPer);
}

//个人信息显示
function personInfo(userId,userPsd){
	var	id = document.getElementsByTagName('li')[0],
		name =  document.getElementsByTagName('li')[2],
		col = document.getElementsByTagName('li')[1],
		cla = document.getElementsByTagName('li')[3];
	$.ajax({
		url: "http://scoreapi.xiyoumobile.com/users/info",
		method: 'GET',
		dataType: 'jsonp',
		data: {
			username: userId,
			password: userPsd
		},
		success:function(data){
			// console.log(data);
			id.innerHTML = data.result.username;
			name.innerHTML = data.result.name;
			col.innerHTML = data.result.college;
			cla.innerHTML = data.result.class;
		}
	});
}

//个人用户头像显示
function personImg(userId,sessionPer){
	var	url = "http://scoreapi.xiyoumobile.com/users/img?username=" + userId + "&session=ASP.NET_SessionId=" + sessionPer;
	document.getElementById('personImg').src = url;
}

//获取
function getScore(userId,userPsd,sessionPer) {
	
	$.ajax({
		url : "http://scoreapi.xiyoumobile.com/score/year",
		dataType : 'jsonp',
		data : {
			username : userId,
			password : userPsd,
			session : sessionPer
		},
		success : function(data){
			console.log(data);
			getYearTerm(data);
			// initUpScore(data);
			selInquire(data);
		}
	});

}

//显示学年和学期
function getYearTerm(data){
	var myYearTerm = document.getElementsByTagName('select')[0];
	for(i = 0;i < data.result.score.length;i++){
		for(j = 0;j < data.result.score[i].Terms.length;j++){
			var option = document.createElement('option');
			option.innerHTML = "学年 | " + data.result.score[i].year + "     第" + data.result.score[i].Terms[j].Term + "学期";
			option.value = "学年 | " + data.result.score[i].year + "  第" + data.result.score[i].Terms[j].Term + "学期";
			myYearTerm.appendChild(option);
		}
	};
}

//默认显示最新成绩
function initUpScore(data){
	var options = document.getElementsByTagName('select')[0].getElementsByTagName('option'),
		last = options[options.length - 1];
	last.selected = "selected";
	var myYear = data.result.score[data.result.score.length - 1],
		myTerm = myYear.Terms[myYear.Terms.length - 1];
	selInquire(data);
}


	// for(i = 0;i < myScore.length - 1;i++){
	// 	var myTerm = myScore[i].Terms;
	// 	console.log(myTerm);
	// 	for(j = 0;j < myTerm.length - 1;j++){
	// 		console.log(myYearTerm.scoreLen[i].Terms[j]);
	// 	}
	// }

//选择查询成绩
function selInquire(data){
	var options = document.getElementsByTagName('select')[0].getElementsByTagName('option'),
	    optNum = options.length,
	    myScore = data.result.score,     
	    myYearTerm = document.getElementsByTagName('select')[0],
	    scoreShow = document.getElementById('scoreShow');

		myYearTerm.onchange = function(){
			for(k = 0;k < optNum ;k++){
				if(myYearTerm.selectedIndex == k){
					var rowNum = Math.floor(k / 2),  //第几学年
					cloumnNum = k % 2;           //第几学期
				console.log(myScore[rowNum].Terms[cloumnNum]);
				var all = myScore[rowNum].Terms[cloumnNum];
					for(m = 0;m < all.Scores.length;m++){
						var project = document.createElement('div');
						project.className = "project";
						var	score = document.createElement('div');
						score.className = "score";
						var	state = document.createElement('div');
						state.className = "state";
						var	pro_1 = document.createElement('div');
						var	pro_2 = document.createElement('div');
						var	ul_1 = document.createElement('ul');
						var	ul_2 = document.createElement('ul');
						var	ul_1_li_1 = document.createElement('li');
						var	ul_1_li_2 = document.createElement('li');
						var	ul_2_li_1 = document.createElement('li');
						var	ul_2_li_2 = document.createElement('li');
						var	sta_1 = document.createElement('div');

						pro_1.innerHTML = all.Scores[m].Title;
						pro_2.innerHTML = all.Scores[m].Type;
						ul_1_li_1.innerHTML = "卷面成绩：" + all.Scores[m].RealScore;
						ul_1_li_2.innerHTML = "平时成绩：" + all.Scores[m].UsualScore;
						ul_2_li_1.innerHTML = "最终成绩：" + all.Scores[m].EndScore;
						ul_2_li_2.innerHTML = "绩点：" + all.Scores[m].Credit;
						sta_1.innerHTML = all.Scores[m].Exam;

						scoreShow.appendChild(project);
						scoreShow.appendChild(score);
						scoreShow.appendChild(state);
						project.appendChild(pro_1);
						project.appendChild(pro_2);
						score.appendChild(ul_1);
						score.appendChild(ul_2);
						ul_1.appendChild(ul_1_li_1);
						ul_1.appendChild(ul_1_li_2);
						ul_2.appendChild(ul_2_li_1);
						ul_2.appendChild(ul_2_li_2);
						state.appendChild(sta_1);
					}
				}
			}
		}
	// initUpScore(data);
}

//选择查询类型
// function typeChoice(){
// 	var typeSucc = document.getElementById('success'),
// 		typeFail = document.getElementById('fail'),
// 		typeMkup = document.getElementById('makeup');
// 	typeSucc.addEventListener('click',function(){
// 		initialScore();
// 	},'false');
// 	typeFail.addEventListener('click',function(){

// 	},'false');
// 	typeMkup.addEventListener('click',function(){

// 	},'false');
// }