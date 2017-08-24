window.onload = function(){
	var body = document.getElementsByTagName('body')[0];
	var nav = document.querySelector('.nav');
	var nav_con = getByClass('document', 'nav-con');
	var down = document.getElementById('down');
	var tail = document.getElementById('tail');
	var line = document.getElementById('bot-line');
	var conta =  document.querySelector('.conta');
	var left =  document.querySelector('.left');
	var aLine = getByClass('document', 'line');
	var brief = document.getElementById('brief');
	var logo = document.getElementById('logo');
	var color =  document.querySelector('.color');
	var group =  document.querySelector('.group-nav');
	var oLi =  group.getElementsByTagName('li');
	var group_main = document.querySelectorAll('.group-main');
	var pageMain = document.querySelectorAll('.main');
	var pageT = document.querySelector('.top');
	var mainNav = getByClass('document', 'right');
	var mainLi = mainNav[0].getElementsByTagName('li');
	var work = getByClass('document', 'work');
	var img =  work[0].getElementsByTagName('img');
	var center = getByClass('document', 'work-center');
	var div =  center[0].getElementsByTagName('div');
	var iSpeed = 0;
	var index = 0;
	var wh = 0;
	var va = 0;
	var i = 0,timer = null,kong = false;
	var off = 0, con = -1, oldF = 0, oldT = 0, oldL = 0;
	absolute();

	//作品展示区
	for(let i=0; i<img.length; i++){
		img[i].onclick = function(){
			div[va].style.display = 'none';
			div[va].style.opacity = '0';
			va = i;
			div[i].style.display = 'block';

			startMove(div[i],30,{opacity:100})
			console.log('1')
		}
	}



	//联系我们的页面显示
	tail.onclick = function(){
		con *=-1;
		if(con == 1){
			conta.style.display = "block";
			startMove(conta,20,{bottom:0})
			startMove(tail,20,{bottom:500},function(){
				nav.style.opacity = '0';
			})
		}else{
			startMove(conta,20,{bottom:-500},function(){
				conta.style.display = "none";
			})
			startMove(tail,20,{bottom:0},function(){
				nav.style.opacity = '1';
			})
		}
	}

	timer = setInterval(function(){
		i++;
		if(i%2 ==0){
		startMove(down,20,{top:-30})
	}else{
		startMove(down,20,{top:-38})
	}
	},500)

	//尾部的联系我们
	tail.onmouseover = function(){
		off = down.offsetLeft;
		down.style.display = 'none';
		startMove(line,20,{height:100,bottom:0})
	}
	tail.onmouseout = function(){
		down.style.display = 'block';
		down.style.left = off+'px';
		startMove(line,20,{height:6,bottom:0})
	}
	
	
	window.onresize = function(){
		// absolute();
	}

	//滑过吊坠的事件
	for(let i=0;i<nav_con.length;i++){
		nav_con[i].index = i;
		nav_con[i].onmouseover = function(){
			oldF = this.offsetHeight;
			oldT = this.offsetTop;
			oldL = this.offsetLeft;
			this.style.backgroundColor = 'yellow';
			startMove(this,20, {lineHeight:180,width:180,top:-(180-this.offsetWidth)/2+this.offsetTop,left:-(180-this.offsetWidth)/2+this.offsetLeft})
			if(this.offsetHeight>180){
				this.style.height = '180px';
				this.style.width = '180px';
			}
		}
		nav_con[i].onmouseout = function(){
			this.style.backgroundColor = '#fff';
			startMove(this,20, {lineHeight:oldF,width:oldF,top:oldT,left:oldL})

		}

		//吊坠和细线跟着鼠标走
		nav_con[i].onmousedown = function(ev){
			var event = event||ev;
			var _this = this;
			var disY = event.clientY-this.offsetTop;
			var disp = event.clientY;
			var disH = aLine[this.index].offsetHeight;
			_this.onmousemove = function(ev){
				var event = event||ev;
				if(aLine[_this.index].offsetHeight>400){
					return;
				}
				_this.style.top = event.clientY-disY+"px";
				aLine[_this.index].style.height = event.clientY-disp+disH + 'px';
			}
			document.onmouseup = function(){
				_this.onmousemove = null;
				document.onmouseup = null;
				_this.style.backgroundColor = '#fff';
				startMove(aLine[_this.index],20,{height:disH})
				startMove(_this,20, {lineHeight:oldF,width:oldF,top:oldT,left:oldL});
				
				pagemove1(pageMain[i],i);
				mainLi[wh].style.color = '#fff';
				mainLi[wh].style.border = 'none';
				wh = _this.index;
				mainLi[wh].style.color = 'red';
				mainLi[wh].style.border = '2px solid blue';
				for( let j=0;j<mainLi.length;j++){
					mainNav[0].style.display = 'block';
					var t = j*60+50*(j+1);
					springN(mainLi[j],t);	
				}
			}
			return false;
		}

	}

	

	//头部导航栏
	for( let j=0;j<mainLi.length;j++){
		mainLi[j].index = j;
		mainLi[j].onclick = function(){
			mainLi[wh].style.color = '#fff';
	 		mainLi[wh].style.border = 'none';
			this.style.border = '2px solid blue';
			this.style.color = 'red';
			pagemove2(this,wh)
			wh = this.index;
			iLocate = wh;
		}
		
			
	}

	left.onclick = function(){
		mainNav[0].style.display = 'none';
		console.log(iLocate)
		if(iLocate ==0){
			startMove(brief,30,{top:964},function(){	
				redu();
			})
		}else{
			startMove(pageMain[iLocate],30,{top:964},function(){
				pageMain[iLocate].style.display = 'none';
				pageMain[iLocate].style.top = '964px';
			})
		}
		pageT.style.display = 'block';
		pageT.style.top = '-964px';
		startMove(pageT,30,{top:66})
	}

	for(i=0; i<oLi.length;i++){
		oLi[i].index = i;
		oLi[i].onmouseover = function(){
			kong = true;
			var _this = this;
			clearInterval(timer)
			timer = setInterval(function(){
			if(!kong){
				return;
			}else{
				spring(color,_this.offsetLeft);
			}},30)
			this.onclick = function(){
				startM(group_main[index], {top:700,opacity:0,transform:0});
				index = this.index;
				startM(group_main[index], {top:66,opacity:1,transform:360});
			}
		}

	}
	group.onmouseout = function(){
		clearInterval(timer)
		timer = setInterval(function(){
			spring(color,oLi[index].offsetLeft);
		},20)
		
		kong = false;
	}
// ------------------------------------------------
	var ok1 = false;
	var ok2 = false;
	var ok3 = false;
	var isMobile=/^(?:13\d|15\d)\d{5}(\d{3}|\*{3})$/;   
	var isPhone=/^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;

	//验证用户名
	$('input[name="name"]').focus(function(){
		$(this).val('').css("color","#000");
	}).blur(function(){
		if($(this).val()!=''){
			$(this).next().text('输入成功').removeClass('state1').addClass('state2');
			ok1=true;
		}else{
			$(this).next().text('*姓名不能为空').removeClass('state2').addClass('state1');
		}
	});

	//验证电话
	$('input[name="phone"]').focus(function(){
		$(this).val('').css("color","#000");
	}).blur(function(){
		if(isMobile.test($(this).val()) || isPhone.test($(this).val())){
			$(this).next().text('输入成功').removeClass('state1').addClass('state2');
			ok2=true;
		}else{
			$(this).next().text('*电话格式不正确').removeClass('state2').addClass('state1');
		}
	});

	//验证邮箱
	$('input[name="email"]').focus(function(){
		$(this).val('').css("color","#000");
	}).blur(function(){
		if($(this).val().search(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)==-1){
			$(this).next().text("*email格式不正确").removeClass('state2').addClass('state1');
		}else{
			$(this).next().text('输入成功').removeClass('state1').addClass('state2');
			ok3 = true;
		}
	});

	//给其他文本框添加焦点事件
	$('.input_2').focus(function(){
		$(this).val('').css("color","#000");
	}).blur(function(){
		if($(this).val()==''){
			$(this).val('专业').css("color","#BDBCBC");
		}
	});
	$('.input_3').focus(function(){
		$(this).val('').css("color","#BDBCBC");
	}).blur(function(){
		if($(this).val()==''){
			$(this).val('自我介绍').css("color","#BDBCBC");
		}
	});
	$('.input_5').focus(function(){
		$(this).val('').css("color","#BDBCBC");
	}).blur(function(){
		if($(this).val()==''){
			$(this).val('为什么加入我们').css("color","#BDBCBC");
		}
	});

	//确认信息是否正确
	$('input[name="btn"]').click(function(){
		if(ok3 && ok2 && ok1){
			alert("恭喜您，提交成功！我们会尽快给您答复");
		}
		else{
			alert("提交错误！");
		}
	});
	// =============
	var photoWall = document.getElementById("photoWall");
	var shadow = document.getElementById("shadow");
	var box = document.getElementById("box2");
	var h4 =  document.getElementById("h4");
	var aP = box.getElementsByTagName("p");
	var iLi = photoWall.getElementsByTagName("li");
	var aImgs = photoWall.getElementsByTagName("img");
	var zindex = 0, i = 0;

	beNum();
	position(leftNum,topNum);

	for(let i=0; i<iLi.length;i++){
		aImgs[i].onmouseover = function(){
			
			zindex++;
			h4.style.display = 'none';
			
			aP[i].style.display = 'block';
			iLi[i].style.zIndex = zindex;			
			
		}

		aImgs[i].onmouseout = function(){
			
			aP[i].style.display = 'none';
			h4.style.display = 'block';
			
		}

		

	}



}

//头部导航的点击事件函数

function pagemove2(obj,lo){
	var brief = document.getElementById('brief');
	var pageMain = document.querySelectorAll('.main');
	var pageT = document.querySelector('.top');
	var logo = document.getElementById('logo');
	if(lo != obj.index){
		if(lo ==0){
			startMove(brief,20,{top:-964},function(){	
				redu();
			})
		}else{
			startMove(pageMain[lo],20,{top:-964},function(){
				pageMain[lo].style.display = 'none';
				pageMain[lo].style.top = '964px';
			})
		}
	}
	if(obj.index == 0){
		brief.style.display = 'block';
		startMove(brief,30,{top:0},function(){	
			logo.style.display = "block";
			colli();
		})
	}else{
	pageMain[obj.index].style.display = 'block';
	startMove(pageMain[obj.index],30,{top:64});
	}


}
//还原简介原有的样式
function redu(){
	var brief = document.getElementById('brief');
	var logo = document.getElementById('logo');
	var brief_line = document.querySelector('.brief-line');
	var brief_na1 = document.getElementById('brief-name1');
	var brief_na2 =  document.querySelector('.brief-name2');
	var brief_two =  document.querySelector('.brief-two');
	startMove(logo);
	startMove(brief_na1);
	startMove(brief_na2,function(){
		startMove(brief_two);
	});
	brief.style.display = 'none';
	logo.style.display = "none";
	logo.style.top = "0";
	brief_line.style.width = '200px';
	brief_line.style.backgroundColor = '#fff';
	brief_two.style.opacity = '0';
	brief_na1.style.opacity = '0';
	brief_na2.style.opacity = '0';
	brief.style.top = '964px';
}

//拉灯的效果切换
var iLocate = 0;
function pagemove1(obj,locate){
	var brief = document.getElementById('brief');
	var pageMain = document.querySelectorAll('.main');
	var pageT = document.querySelector('.top');
	var logo = document.getElementById('logo');
	pageT.style.zIndex = -1;
	startMove(pageT,30,{top:-900},function(){
		pageT.style.display = 'none';
		pageT.style.top = '964px';
	})
	iLocate = locate;
	if(iLocate ==0){
		brief.style.display = 'block';
		startMove(brief,30,{top:0},function(){	
			logo.style.display = "block";
			colli();
		})
	}else{
	pageMain[iLocate].style.display = 'block';
	startMove(pageMain[iLocate],30,{top:64});
	}

}

//部门动画
function startM(obj,json){
	var attr;
	for(attr in json){
		if(attr == 'opacity'){
			obj.style.opacity = json[attr]
		}else if(attr == 'transform'){
			obj.style.transform = 'rotate('+json[attr] +'deg)'; 
		}else{
			obj.style.top = json[attr] + 'px';
		}
	}
}

var Speed = 0;
//弹性
function spring(obj,iTarge){
	//var color =  document.querySelector('.color');
	Speed += (iTarge-obj.offsetLeft)/5;
	Speed *= 0.7;
	obj.style.left = obj.offsetLeft + Speed + 'px'
	
}

function springN(obj,iTarge){
	obj.speed = 0;
	obj.timer=setInterval(function(){
		obj.speed += (iTarge-obj.offsetLeft)/5;
		obj.speed *= 0.8;
		obj.style.left = obj.offsetLeft + obj.speed + 'px';
	},50)
}

//定位函数
function absolute(){
	var nav_con = getByClass('document', 'nav-con');
	for(i=0;i<nav_con.length;i++){
		nav_con[i].style.left = nav_con[i].offsetLeft + 'px';
		nav_con[i].style.top = nav_con[i].offsetTop + 'px';
	}
	for(i=0;i<nav_con.length;i++){
		nav_con[i].style.position = 'absolute';
	}
}

//通过class获取元素
function getByClass(oPanrent,sClass){
	var child=document.getElementsByTagName('*');
	var i,aResult=[];
	for(i=0;i<child.length;i++){
		if(child[i].className==sClass){
			aResult.push(child[i]);
		}
	}
	return aResult;
}

function getStyle(obj, attr)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[attr];
	}
	else
	{
		return getComputedStyle(obj, false)[attr];
	}
}

//联动框架
function startMove(obj,time, json, fn)
{	
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var bStop=true;		
		for(var attr in json)
		{
		
			var iCur=0;

			if(attr=='opacity')
			{
				iCur=parseInt(parseFloat(getStyle(obj, attr))*100);
			}
			else
			{
				iCur=parseInt(getStyle(obj, attr));
			}

		
			var iSpeed=(json[attr]-iCur)/8;
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);

		
			if(iCur!=json[attr])
			{
				bStop=false;
			}

			if(attr=='opacity')
			{
				obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
				obj.style.opacity=(iCur+iSpeed)/100;
			}
			else
			{
				obj.style[attr]=iCur+iSpeed+'px';
			}
		}

		if(bStop)
		{
			clearInterval(obj.timer);

			if(fn)
			{
				fn();
			}
		}
	}, time)
}
//简介的动画
function colli(){
	var logo = document.getElementById('logo');
	var brief_line = document.querySelector('.brief-line');
	var brief_na1 = document.getElementById('brief-name1');
	var brief_na2 =  document.querySelector('.brief-name2');
	var brief_two =  document.querySelector('.brief-two');
	var timer = null;
	var iSpeed = 0;
	timer=setInterval(function(){
		iSpeed +=2;
		var t = iSpeed+ logo.offsetTop;
		if(t >=250){
			iSpeed*=-0.6;
			t = 250;
			startMove(brief_line,3,{width:300,height:5})
		}
		if(t!=250){
			startMove(brief_line,3,{width:200,height:1})
		}
		logo.style.top = t+'px';
		if(Math.abs(iSpeed)<=2&&Math.abs(250-logo.offsetTop)<=3){
			logo.style.top = "250px";
			startMove(brief_line,3,{width:300,height:5})
			brief_line.style.backgroundColor = 'yellow'
			startMove(brief_na1,50,{opacity:100})
			startMove(brief_na2,70,{opacity:100},function(){
				startMove(brief_two,30,{opacity:100})
			})
			clearInterval(timer);
		}
	},30)
}
// ======

var leftNum = new Array();
var topNum = new Array();
function beNum(){
	var photoWall = document.getElementById("photoWall");
	var aLi = photoWall.getElementsByTagName("li");
	var aImgs = photoWall.getElementsByTagName("img");
	var p = 0;
	var numL = 15;
	var numT = 50;
	for(var i=0;i<aLi.length;i++){
		
		if(p<4){
			p++;
		}else{
			p=1;
			numL = 15;
			numT+=150;
		}
		leftNum[i] = numL;
		numL+=20;
		topNum[i] = numT;
	}
}


function position(leftNum,topNum){
	var photoWall = document.getElementById("photoWall");
	var aLi = photoWall.getElementsByTagName("li");
	var aImgs = photoWall.getElementsByTagName("img");
	for(let j=0;j<aLi.length;j++)
	{
		aLi[j].style.left = leftNum[j]+"%";
		aLi[j].style.top = topNum[j]+'px';
			
	}
			
}