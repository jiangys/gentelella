/* 以下全是购物车脚本*/
$(document).ready(function () {
    /** 从cookie中初始化购物车 */
    initCart();
});
var deal = [];
var count = 0;//商品总数量,全局

function addMiniShoppingCart(productid, productName, price, imgurl) {
    var item = { id: productid, name: productName, price: price, sum: 1, imgurl: imgurl };
    var have = false;
    for (f in deal) {
        if (deal[f].id == productid) {
            deal[f].sum += 1;
            have = true;
            break;
        }
    }
    if (!have) {
        //item.sum = Number(food.min);
        deal.push(item);
    }
    freshCart();
    //加入购物车成功
    if ($("#AddCartSucceed").length > 0) {
        $('#AddCartSucceed').modal('show')
        $('.cartCount').text(count);
    }
    return false;
}

/** 刷新购物车 */
function freshCart() {
    var sum = 0;
    count = 0;
    var cart_cookie = '';//定义cookie
    var detail = '<ul>';
    for (f in deal) {
        sum += deal[f].sum * deal[f].price;
        count += parseInt(deal[f].sum);

        detail += '<li class="clearfix">';
        detail += '<a href="" class="pic"><img src="' + deal[f].imgurl + '" /></a>';
        detail += '<a href="" class="name">' + deal[f].name + '</a>';
        detail += '<span class="price">' + deal[f].price + '元 x ' + deal[f].sum + '</span>';
        detail += '<a href="javascript:void(0);" title="删除" onclick="delCartWithID(' + deal[f].id + ');" class="btn-del delItem"><i class="iconfont">&#xe605;</i></a>';
        detail += '</li>';
        cart_cookie += deal[f].id + ',' + deal[f].name + ',' + deal[f].price + ',' + deal[f].sum + ',' + deal[f].imgurl + ' |';
    }
    detail += '</ul>';
    if (cart_cookie != '') {
        detail += '<div class="count clearfix">';
        detail += '<span class="total">共计<em>' + count + '</em>件商品<strong>合计：<em>' + sum + '元</em></strong></span>';
        detail += '<a href="/shop/cart" class="btn btn-danger">去购物车结算</a>';
        detail += '</div>';
    }
    else {
        detail = '<p class="loading">购物车中还没有商品，赶紧选购吧！</p>';
    }

    $('#miniCartList').html(detail);
    cartList(deal, sum);
    //购物车显示数量
    if (count > 0) { $('.cartNum').text("(" + count + ")"); } else { $('.cartNum').text(""); }

    // 存储cookie
    $.cookie('cart_cookie', cart_cookie, { path: '/' });

}

/** 清空cookie的数据 */
function clearDeal() {
    $.cookie('cart_cookie', '', { path: '/' });
}
/** 从cookie中初始化购物车 */
function initCart() {
    var deallist = $.cookie('cart_cookie');
    /** 不存在购物信息时，直接返回 */
    if (!deallist) {
        freshCart();
        return;
    }
    var cartlist = deallist.split('|');
    /** 不存在购物信息时，直接返回 */
    if (cartlist.length < 1) {
        freshCart();
        return;
    }
    /** 将每个菜品依次加入deal后，刷新Cart */
    for (var i = 0; i < cartlist.length - 1; i++) {
        var items = cartlist[i].split(',');
        deal.push({ id: items[0], name: items[1], price: items[2], sum: parseInt(items[3]), imgurl: items[4] });
    }
    freshCart();
}

/** 从购物车里删除 */
function delCartWithID(productid) {
    var newdeal = [];
    for (f in deal) {
        if (deal[f].id != productid) {
            newdeal.push(deal[f]);
        }
    }
    deal = newdeal;
    freshCart();
}

/** 增加数量 */
function addCartWithID(productid) {
    addMiniShoppingCart(productid);
}
/** 减少数量 */
function decreaseCartWithID(productid) {
    var newdeal = [];
    for (f in deal) {
        if (deal[f].id == productid) {
            if (deal[f].sum > 1) {
                deal[f].sum -= 1;
                //if (deal[f].sum < deal[f].min) {
                //    continue;
                //}
            }
            else {
                newdeal.push(deal[f]);
                continue;
            }
        }
        newdeal.push(deal[f]);
    }
    deal = newdeal;
    freshCart();
}

/** 绑定文本框的数量 */
function keyupInputCart(productid, e) {
    var now_num = e.value.replace(/[^0-9]/ig, "");
    if (now_num == "") {
        now_num = 1;
    }
    for (f in deal) {
        if (deal[f].id == productid) {
            deal[f].sum = now_num;
            break;
        }
    }
    freshCart();
};


/** 购物车列表 */
function cartList(deal, sum) {

    if ($("#cart-List").length > 0) {
        var conhtml = '';
        for (f in deal) {
            conhtml += '<tr>';
            conhtml += '<td class="left"><a target="_blank" class="deal" href="#"><img alt="' + deal[f].name + '" src="' + deal[f].imgurl + '"></a></td>';
            conhtml += '<td class="left"><a target="_blank" href="#">' + deal[f].name + '</a></td>';
            conhtml += '<td>可购买</td>';
            conhtml += '<td class="Price-font">¥' + deal[f].price + '</td>';
            conhtml += '<td class="num"><div class="counter" data-productID="' + deal[f].id + '">';
            //conhtml += '<input type="hidden" id="productID" class="productID" name="productID" value="' + deal[f].id + '">';
            conhtml += '<a href="javascript:void(0);" onclick="decreaseCartWithID(' + deal[f].id + ');"  class="minus"><i class="icon"></i></a>';
            conhtml += '<input value="' + deal[f].sum + '"  onkeyup="keyupInputCart(' + deal[f].id + ',this)"  class="cartnum">';
            conhtml += '<a href="javascript:void(0);" onclick="addCartWithID(' + deal[f].id + ');"  class="plus"><i class="icon"></i></a></div></td>';
            conhtml += '<td class="Price-font">¥' + deal[f].price * deal[f].sum + '</td>';
            conhtml += '<td><a class="delete" href="javascript:void(0);"  onclick="delCartWithID(' + deal[f].id + ');" >删除</a></td></tr>';
        }
        $('.buy .Price-font').text("¥" + sum + "");
        $('#cart-List').html(conhtml);
    }
};