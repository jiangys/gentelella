var isLogin = 0;
var styleId = GetQueryString('styleId');
var secondId = '';//款式id
var secondName = '';//款式名称
var detailId = '';//商品详情id
var colorId = '';//颜色id
var colorName = '';//颜色名称
var cartFlg = true;
var merchantId = 0;
var firstSortId;
$(function () {
    $('.pro-des').on('blur', '.purchase input', function () {
        //alert(123)
        this.value = this.value.replace(/[^\d]/g, 0);
    });
    //$(window).scroll(function () {
    //    var h = $(document).scrollTop();
    //    var infoH = $('#details').height();
    //    var topH = infoH + 306;
    //    if (h > topH) {
    //        $(".r-top").addClass("r-top-fixed");
    //    } else {
    //        $(".r-top").removeClass("r-top-fixed");
    //    };
    //});
    //$('.t-top-list .list-item').click(function () {
    //    $(this).addClass('cur').siblings().removeClass('cur')
    //});
    //$('.r-top-btn').click(function () {
    //    $('.t-top-list .list-item').removeClass('cur')
    //});
    //$(document).on('click', '.crumbs-list a:last', function () {
    //    var categoryId = $(this).attr('data-id');
    //    var category = $(this).text();
    //    window.location.href = "/allpro?categoryId=" + categoryId + "&category=" + escape(category)
    //});
    //获取商品详情
    getDetails(styleId);
    //获取颜色
    //$('.styles').on('click', '.style-item', function () {
    //    secondId = $(this).attr('data-secondId');
    //    secondName = $(this).text();
    //    $(this).addClass('cur').siblings().removeClass('cur');
    //    getColors(styleId, secondId)
    //});
    //获取skus
    $('.colors').on('click', '.color-item', function () {
        detailId = $(this).attr('data-id');
        colorId = $(this).attr('data-colorId');
        colorName = $(this).text();
        $(this).addClass('cur').siblings().removeClass('cur');
        //getSkus(detailId);
    });
    //添加购物车
    $('.saveCart').click(function () {
        var accountType = $('#accountType').val();
        var skus = [];
        var saveFlag = $(this).attr('data-index');
        $('.sizes .size-item').each(function () {
            if ($(this).find('input').val() > 0) {
                skus.push({ "size": $(this).find('.size-name').text(), "price": $(this).find('.s-price').text(), "KC": $(this).find('.stock').text(), "count": $(this).find('input').val() })
            }

        });

        if (accountType == '1') {
            if (firstSortId == '3') {
                alert('您还不是高定合伙人，无法定制西装。如果需要开通西装定制权限，请联系定制链客服。')
                return;
            }
        }
        if (accountType == '2') {
            if (firstSortId == '3') {
                window.location.href = "https://dgdealer.dingzhilian.com/console"
                return;
            } else {
                alert('您还不是团定合伙人，无法采购团定商品。如果需要开通购买权限，请联系定制链客服。')
                return;
            }
        }
        if (accountType == '3') {
            if (firstSortId == '3') {
                window.location.href = "https://dgdealer.dingzhilian.com/console"
                return;
            }
        }
        if (skus.length == 0) {
            showmsg('请添加采购数量')
            return;
        } else {
            if (cartFlg) {
                addCart(secondId, secondName, detailId, colorId, colorName, saveFlag, styleId, JSON.stringify(skus), merchantId)
            }

        }
    });

});
//添加购物车
function addCart(secondId, secondName, detailId, colorId, colorName, saveFlg, styleInfoId, datalist, merchantId) {
    cartFlg = false;
    $.ajax({
        url: '/web/cart/saveCart',
        type: 'post',
        dataType: 'json',
        data: { 'secondId': secondId, 'secondName': secondName, 'detailId': detailId, 'colorId': colorId, 'colorName': colorName, 'saveFlg': saveFlg, 'styleInfoId': styleInfoId, 'datalist': datalist, 'supplier': merchantId }
    }).done(function (res) {
        if (res.code == '200') {
            var data = res.dataObject;
            if (saveFlg == 0) {
                showmsg('购物车添加成功');
                $('#cart-num').text(data)
            } else if (saveFlg == 1) {
                window.location.href = "/confirm?cartIds=" + data
            }
        } else if (res.code == '911') {
            showmsg(res.msg)
            setTimeout(function () {
                $('.loginframe').show();
            }, 1500)
        } else {
            showmsg(res.msg)
        }
        cartFlg = true;
    }).fail(function (res) {
        showmsg(res.msg)
        cartFlg = true;
    })
}
//获取商品详情信息
function getDetails(id) {
    $.ajax({
        url: '/web/goods/getMallDetail?styleId=' + id,
        type: 'get',
        dataType: 'json'
    }).done(function (res) {
        if (res.code == '200') {
            var data = res.dataObject;
            var categoryPath = data.categoryPath;
            merchantId = data.merchantId;
            isLogin = data.isLogin;
            if (isLogin == 0) {
                $('.login-on').show();
            } else if (isLogin != 0 && (data.dealerType == "1" || data.dealerType == "0" || data.dealerType == "-2" || data.dealerType == "100")) {
                if (data.firstSortId != '3') {
                    $('.add-cart').show();
                }
                $('.buy-now').show();
            }
            //获取分站信息
            stationInfo(styleId, isLogin);
            //导航
            var crumbHtml = '<a class="crumbs-home" href="/">首页</a>';
            if (categoryPath.length > 0) {
                if (categoryPath) {
                    for (var i = 0; i < categoryPath.length; i++) {
                        crumbHtml += ' &gt;<a data-id="' + categoryPath[i].id + '">' + categoryPath[i].categoryName + '</a>';
                    }
                }
            }
            $('.crumbs-list').html(crumbHtml);
            //var lastChild=$('.crumbs-list a:last-child');
            //lastChild.text(lastChild.text().substr(0,lastChild.text().indexOf('>')-1))
            //商品名称
            $('.pro-name .n-words').text(data.name);
            //价格
            if (isLogin != 2) {
                $('.sale-price').text(data.priceArea);
            } else {
                $('.sale-price').text("暂无权限查看价格");
            }
            $('.cost-price').text('[' + data.originalPriceArea + ']');
            if (data.isSpecial == '0') {
                $('.cost-price').hide();
            }
            //获取商品分区
            var tags = data.areaName.split(',')
            var tagsHtml = '';
            if (data.areaName) {
                for (var i = 0; i < tags.length; i++) {
                    tagsHtml += '<span class="tags">' + tags[i] + '</span>';
                }
            }
            $('.tags-list').html(tagsHtml);
            //指数
            if (data.goodsExponent == '0' || data.goodsExponent == '') {
                $('.pro-info .index b').text('--');
            } else {
                $('.pro-info .index b').text(data.goodsExponent);
            }

            //销量
            $('.pro-info .sales-volume b').text(data.basicSalesAmount);
            //售后率
            $('.sale-rate .item-words').text(data.afterRate + '%')
            //商品标签
            var goodsTag = data.goodsTag.split(',')
            var goodsTagHtml = '';
            if (data.goodsTag) {
                for (var i = 0; i < goodsTag.length; i++) {
                    goodsTagHtml += '<span class="item-tags">' + goodsTag[i] + '</span>';
                }
            }
            $('.item-tags-list').html(goodsTagHtml);
            //商品面料
            $('.fabric .item-words').text(data.fabric);
            //起订量
            $('.min-quantity .item-words').text(data.startMakeAmount);
            //建议价格
            if (data.suggestSellingPrice) {
                $('.suggested-price .item-words').html('￥' + data.suggestSellingPrice);
            } else {
                $('.suggested-price .item-words').html('--');
            }
            if (isLogin == 2) {
                $('.suggested-price .item-words').html('--');
            }
            //商品来源
            $('.source .item-words').text(data.source);
            //款式
            firstSortId = data.firstSortId;
            if (firstSortId == '2') {
                $('.styles').hide();
                $('.sizes .item-title').text('规格/数量');
                $('.skus .size-title .title-item:first').text('规格');
                $('.fabric .item-title').text('材质');
            } else if (firstSortId == '1') {
                $('.sizes .item-title').text('尺码/数量');
                $('.skus .size-title .title-item:first').text('尺码');
                $('.fabric .item-title').text('面料');
            }
            var styles = data.styleSecondList;
            var stylesHtml = '';
            for (var i = 0; i < styles.length; i++) {
                stylesHtml += '<span class="style-item" data-secondId="' + styles[i].styleSecondId + '">' + styles[i].styleSecondName + '</span>'
            }
            secondId = styles[0].styleSecondId;
            secondName = styles[0].styleSecondName
            $('.styles .style-lists').html(stylesHtml);
            $('.style-lists .style-item:first-child').addClass('cur')
            //getColors
            getColors(styleId, styles[0].styleSecondId);
            //获取商品图片
            var imgList = data.imgList;
            var imgHtml = ''
            for (var i = 0; i < imgList.length; i++) {
                imgHtml += "<li class='img-item'><img class='imglazy' data-original='" + imgList[i].smallImg + "'  mid='" + imgList[i].bigImg + "' big='" + imgList[i].bigImg + "'></li>"
            }
            $('.img-list').html(imgHtml);
            $('.img-list .img-item:first-child').addClass('cur')
            $('.middle-img img').attr('data-original', imgList[0].bigImg);
            $('.middle-img img').attr('rel', imgList[0].bigImg);
            $(".jqzoom").imagezoom();
            $("#thumblist li").click(function () {
                $(this).addClass("cur").siblings().removeClass("cur");
                $(".jqzoom").attr('src', $(this).find("img").attr("mid"));
                $(".jqzoom").attr('rel', $(this).find("img").attr("big"));
            });
            //获取商品详情
            $('.details-imgs').html(data.showDetails.replace(/<br\/>/g, ''))
            $('.printing').html(data.printCraftwork);
            $('.return-instro').html(data.returnExplain);

            //获取发货时间
            if (data.printSendTime) {
                $('.delivery-time').html('今日下单，预计' + data.sendTime + '发货，加印花延至' + data.printSendTime + '发货')
            } else {
                $('.delivery-time').html('今日下单，预计' + data.sendTime + '发货')
            }

            $(".imglazy").lazyload({ effect: 'fadeIn' });
        } else if (res.code == '911') {
            console.log(res.msg)
        } else if (res.code == '120') {
            showmsg(res.msg, 1600)
            setTimeout(function () {
                window.location.href = "/index"
            }, 2400)
        } else {
            showmsg(res.msg)
        }


    }).fail(function (res) {
        showmsg(res.msg)
    })
}
//获取商品颜色
function getColors(styleId, secondId) {
    $.ajax({
        url: '/web/goods/queryStyleDetail',
        type: 'post',
        dataType: 'json',
        data: { 'styleId': styleId, 'secondId': secondId }
    }).done(function (res) {
        if (res.code == '200') {
            var data = res.dataObject;
            var colorHtml = '';
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    colorHtml += '<span data-colorId="' + data[i].colorId + '" data-id="' + data[i].id + '" class="color-item">' + data[i].colorName + '</span>'
                }
                detailId = data[0].id;
                colorId = data[0].colorId;
                colorName = data[0].colorName;
                getSkus(data[0].id);
                $('.color-lists').html(colorHtml)
                $('.color-lists .color-item:first-child').addClass('cur');
            } else {
                $('.color-lists').html(colorHtml)
            }
        } else if (res.code == '911') {
            console.log(res.msg)
        } else {
            showmsg(res.msg)
        }


    }).fail(function (res) {
        showmsg(res.msg)
    })
}
//获取sku
function getSkus(id) {
    $.ajax({
        url: '/web/goods/queryStyleSku',
        type: 'post',
        dataType: 'json',
        data: { 'detailId': id }
    }).done(function (res) {
        if (res.code == '200') {
            var data = res.dataObject;
            var skuHtml = '';
            if (data) {
                $('.sizes').show()
                for (var i = 0; i < data.length; i++) {
                    if (data[i].mallPrice == 0 || data[i].mallPrice == "未设置") {
                        skuHtml += '<li class="size-item"><p class="size-name">' + data[i].sizeName + '</p><p class="stock">' + data[i].store + '</p><p class="s-price">' + data[i].mallPrice + '</p><p class="purchase"><input type="text" value="0" name="quantity" disabled maxlength="5"></p></li>'
                    } else {
                        skuHtml += '<li class="size-item"><p class="size-name">' + data[i].sizeName + '</p><p class="stock">' + data[i].store + '</p><p class="s-price">' + data[i].mallPrice + '</p><p class="purchase"><input type="text" value="0" name="quantity" maxlength="5"></p></li>'
                    }

                }
                $('.size-lists').html(skuHtml)
                if (firstSortId == '3' || isLogin == 2) {
                    $('.sizes').hide();
                }
            } else {
                $('.sizes').hide()
                $('.size-lists').html(skuHtml)
            }
        } else if (res.code == '911') {
            console.log(res.msg)
        } else {
            showmsg(res.msg)
        }


    }).fail(function (res) {
        showmsg(res.msg)
    })
}
//获取分站信息
function stationInfo(styleId, isLogin) {
    $.ajax({
        url: '/web/goods/getMerchandiseDealer',
        type: 'post',
        dataType: 'json',
        data: { 'styleId': styleId }
    }).done(function (res) {
        if (res.code == '200') {
            var data = res.dataObject;
            var infoList = data.infoList;
            var sHtml = '';
            for (var i = 0; i < infoList.length; i++) {
                if (isLogin == 0) {
                    sHtml += '<div class="rec-item"><a  href="/details?styleId=' + infoList[i].id + '"><img data-original="' + infoList[i].compress228 + '" class="lazy"></a><p class="r-price" onclick="loginShow()">登录查价</p><p class="r-name">' + infoList[i].name + '</p></div>'
                } else if (isLogin == 1) {
                    sHtml += '<div class="rec-item"><a  href="/details?styleId=' + infoList[i].id + '"><img data-original="' + infoList[i].compress228 + '" class="lazy"></a><p class="r-price">' + infoList[i].priceArea + '</p><p class="r-name">' + infoList[i].name + '</p></div>'
                } else if (isLogin == 2) {
                    sHtml += '<div class="rec-item"><a  href="/details?styleId=' + infoList[i].id + '"><img data-original="' + infoList[i].compress228 + '" class="lazy"></a><p class="r-price">暂无权限查价</p><p class="r-name">' + infoList[i].name + '</p></div>'
                }

            }
            $('.rec-lists').html(sHtml);
            $('.sub-title').text(data.name);
            $('.sub-img').attr('data-original', data.url);
            $('.sun-index').text('平均指数:' + data.avgExponent);
            $('.sub-cycle').text('平均供货周期:' + data.avgSendDay + '天');
            $(".lazy").lazyload({ effect: 'fadeIn' });
        } else if (res.code == '911') {
            console.log(res.msg)
        } else {
            showmsg(res.msg)
        }


    }).fail(function (res) {
        showmsg(res.msg)
    })
}

