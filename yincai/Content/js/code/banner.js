$(document).ready(function(){
	
	$(".banner_ctrl a").hover(function(){
		$(this).fadeTo(100,.5);
		},function(){
		$(this).fadeTo(100,.1);
	});
			
	var tNum = $(".slider .banner-bg").length - 1;
	var nNum=0;		
	$(".banner_ctrl .prev").click(function(){
		(nNum-1)<0?n2=tNum:n2=nNum-1;
		bSwitch(nNum,n2);
		nNum=n2;
	});	
	$(".banner_ctrl .next").click(function(){
		(nNum+1)>tNum?n2=0:n2=nNum+1;
		bSwitch(nNum,n2);
		nNum=n2;
	});
	function bSwitch(nNum,n2){
	    $(".slider .banner-bg:eq(" + nNum + ")").fadeOut();
	    $(".slider .banner-bg:eq(" + n2 + ")").fadeIn();
	};
							
	$(function(){
		var switchTime;
	    $(".slider").hover(function () {
			clearInterval(switchTime);
		},function(){
		switchTime = setInterval(function(){
			(nNum+1)>tNum?n2=0:n2=nNum+1;
			bSwitch(nNum,n2);
			nNum=n2;
		},4000);
		}).trigger("mouseleave");
	});

});