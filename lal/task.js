$ (function(){
	var $tel = $('.bottom_p1 > span').text();
	alert($tel);
	$(".bottom > a").attr("href","tel:"+$tel);
	
	$('.pull-down').bind("touchend",function(){
		if($(this).prev().hasClass("active")){
			$(this).children().attr("src","imgs/mid_1.png");
			$(this).prev().removeClass("active"); 
		}else{
			$(this).prev().addClass("active");
			$(this).children().attr("src","imgs/mid_2.png");
		}
	});
});