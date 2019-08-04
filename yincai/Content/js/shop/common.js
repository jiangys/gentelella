
/**
* 模块名：共通脚本
* 程序名: 通用方法common.js
* Copyright(c) 2014-2016 jiangyongsheng
**/

var com = {};

$(function () {
    //切换学校
    com.school();
    //搜索框
    com.search();
    //左侧导航搜索
    com.nav_search();
    //去掉火狐虚线,使用这句话，会使所有的文本框都不可以编辑
    //$("a,input,button").focus(function () { this.blur() });
});
//切换学校
com.school = function () {
    $('#change_school a').click(function () {
        $('.top-school').show();
        return false;
    });
    $('.school-close').click(function () {
        $('.top-school').hide();
    });
    //$(document).click(function () { //单击页面任何地方隐藏
    //    $('.top-school').hide();
    //});
    $(document).scroll(function () { //滚动时隐藏
        $('.top-school').hide();
    });
};

com.navfix = function () {
    // 窗口滚动的时候控制悬浮效果。
    var $orderBar = $('#side_nav');
    var orderBarHook = $orderBar.offset().top;
    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop <= orderBarHook) {
            $orderBar.removeClass('fix-top');
        }
        else {
            $orderBar.addClass('fix-top');
        }
    });
}
com.navdrop = function () {
    // 类别导航
    var $navBar = $('.side_nav');
    //非动画
    $navBar.hover(function () {
        $('.navlist').show()
    }, function () {
        $('.navlist').hide();
    })
    //动画
    //$navBar.hover(function () {
    //    $('.navlist').slideDown()
    //}, function () {
    //    $('.navlist').slideUp();  //收起     
    //})
}
//头部搜索框
com.search = function () {
    $(".btn_search").click(function () {
        //alert("请输入要搜索的商品");
        var search = $("#keyword").val();
        if (search == "") {
            alert("请输入要搜索的商品");
        }
        else {
            $("#searchForm").submit();
        }
    });
};
//左侧导航搜索
com.nav_search = function () {
    $("#nav_search").click(function () {
        var search = $("#nav_keyword").val();
        if (search == "") {
            alert("请输入要搜索的商品");
        }
        else {
            $("#keyword").val(search);
            $("#searchForm").submit();
        }

    });
};
//页面加入收藏
function AddFavorite(sURL, sTitle)
{
    try
    {
        window.external.addFavorite(sURL, sTitle);
    }
    catch (e)
    {
        try
        {
            window.sidebar.addPanel(sTitle, sURL, "");
        }
        catch (e)
        {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}