$(function () {
    //1.为所有的加入购物车按钮绑定方法，addToCart方法里的this就是被点击的【加入购物车】按钮
    $(".addCart").click(addToCart);
    //$(".delCart").click(delToCart);
    //刷新购物车
    freshCart();
    //$('.cart-section').hover(function () {
    //    $("#miniCartList").html(' <p class="loading">数据加载中，请稍后...</p>');
    //    freshCart();
    //}, function () {
    //    //如果不这样写的话，会请求两次freshCart
    //})
});

//var count = 0;//商品总数量

//将产品加入到购物车
function addToCart() {
    //1.0 获取要加入购物车的产品id
    var pid = this.getAttribute("data-productid");
    //2.0 将产品id加入到购物车中，但是 浏览器不知道当前用户是否登陆
    //所以必须发到服务器由服务器页面根据用户登录状态来保存（如果登陆，则保存到数据库【购物车表】；如果没有登陆，则保存到 浏览器 【购物车cookie】）
    $.post("/shop/Cart/CartAdd", { "productId": pid }, function (jsonObj) {
        if (jsonObj.State == "1") {
            //刷新购物车
            freshCart();
            //弹出 加入购物车成功框
            if ($("#AddCartSucceed").length > 0) {
                //$('.cartCount').text(count);
                $('#AddCartSucceed').modal('show')
            }
        }
    }, "json");

}
//执行提交新的数量方法
function delToCart(pid) {
    if (!confirm("您确定要删除吗？")) {
        return;//阻断后面代码执行
    }
    //var pid = this.getAttribute("data-pid");
    $.post("/shop/Cart/CartChange", { "productId": pid, "num": 0 }, function (jsonObj) {
        if (jsonObj.State == "1") {
            freshCart();//刷新购物车
        }
    }, "json");
}


//刷新购物车
function freshCart() {
    $.post("/shop/Cart/GetCartList", function (data) {
        var sum = 0;
        var count = 0;
        if (data.length > 0) {
            var detail = '<ul>';
            for (var i = 0; i < data.length; i++) {
                sum += data[i].Count * data[i].BarginPrice;
                count += parseInt(data[i].Count);

                detail += '<li class="clearfix">';
                detail += '<a href="" class="pic"><img src="' + data[i].ImgThumbnailUrl + '" /></a>';
                detail += '<a href="" class="name">' + data[i].ProductName + '</a>';
                detail += '<span class="price">' + data[i].BarginPrice + '元 x ' + data[i].Count + '</span>';
                detail += '<a href="javascript:void(0);" title="删除" onclick="delToCart(' + data[i].ProductID + ');"  class="btn-del delCart"><i class="iconfont">&#xe605;</i></a>';
                detail += '</li>';
            }
            detail += '</ul>';
            detail += '<div class="count clearfix">';
            detail += '<span class="total">共计<em>' + count + '</em>件商品<strong>合计：<em>' + sum + '元</em></strong></span>';
            detail += '<a href="/shop/cart" class="btn btn-danger">去购物车结算</a>';
            detail += '</div>';
        }
        else {
            detail = '<p class="loading">购物车中还没有商品，赶紧选购吧！</p>';
        }
        $('#miniCartList').html(detail);
        //购物车显示数量
        if (count > 0) { $('.cartNum').text("(" + count + ")"); } else { $('.cartNum').text(""); }
    }, "json");

};


//将产品加入到收藏
function addFav() {
    //1.0 获取要加入购物车的产品id
    var pid = this.getAttribute("data-productid");
    $.post("/Favorite/AddFav", { "collectID": pid ,"type":"1"}, function (jsonObj) {
        if (jsonObj == "Ok") {
            //弹出 加入收藏成功框
            if ($("#AddFavSucceed").length > 0) {
                $('#AddFavSucceed').modal('show')
            }
        }
        else {
            if ($("#LoginModal").length > 0) {
                $('#LoginModal').modal('show')
            }
        }
    }, "json");

}