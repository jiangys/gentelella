$(function () {
    //获取skus
    $('.colors').on('click', '.color-item', function () {
        detailId = $(this).attr('data-id');
        colorId = $(this).attr('data-colorId');
        colorName = $(this).text();
        $(this).addClass('cur').siblings().removeClass('cur');
        //getSkus(detailId);
    });


});