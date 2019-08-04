// JavaScript Document
function slider() {
    var $next = $('.og_next');//右边下一个按钮
    var $prev = $('.og_prev');//左边上一个按钮
    var $mainlist = $('.mainlist'); //主要内容
    var $swaplist = $('.swaplist'); //被自制的内容，主要用于左边
    var $list = $('.swaplist,.mainlist');//左右内容同时
    var $li = $('.mainlist li');//计算li
    var width = 690;//总宽度＝ul_width*imgList
    var ul_width = 230;//ul宽度
    var imgList = 3;//图片摆放张数

    /***不需要自动滚动，去掉即可***/
    time = window.setInterval(function () {
        $next.click();
    }, 5000);
    /***不需要自动滚动，去掉即可***/
    linum = $li.length;//图片数量
    w = linum * ul_width;//ul宽度
    $list.css('width', w + 'px');//ul宽度
    $swaplist.html($mainlist.html());//复制内容

    $next.click(function () {

        if ($list.is(':animated')) {
            $list.stop(true, true);
        }

        if ($li.length > imgList) {//多于3张图片
            ml = parseInt($mainlist.css('left'));//默认图片ul位置
            sl = parseInt($swaplist.css('left'));//交换图片ul位置
            if (ml <= 0 && ml > w * -1) {//默认图片显示时
                $swaplist.css({ left: width + 'px' });//交换图片放在显示区域右侧
                $mainlist.animate({ left: ml - width + 'px' }, 'slow');//默认图片滚动				
                if (ml == (w - width) * -1) {//默认图片最后一屏时
                    $swaplist.animate({ left: '0px' }, 'slow');//交换图片滚动
                }
            } else {//交换图片显示时
                $mainlist.css({ left: width + 'px' })//默认图片放在显示区域右
                $swaplist.animate({ left: sl - width + 'px' }, 'slow');//交换图片滚动
                if (sl == (w - width) * -1) {//交换图片最后一屏时
                    $mainlist.animate({ left: '0px' }, 'slow');//默认图片滚动
                }
            }
        }
    })
    $prev.click(function () {

        if ($list.is(':animated')) {
            $list.stop(true, true);
        }
        if ($li.length > imgList) {
            ml = parseInt($mainlist.css('left'));
            sl = parseInt($swaplist.css('left'));
            if (ml <= 0 && ml > w * -1) {
                $swaplist.css({ left: w * -1 + 'px' });
                $mainlist.animate({ left: ml + width + 'px' }, 'slow');
                if (ml == 0) {
                    $swaplist.animate({ left: (w - width) * -1 + 'px' }, 'slow');
                }
            } else {
                $mainlist.css({ left: (w - width) * -1 + 'px' });
                $swaplist.animate({ left: sl + width + 'px' }, 'slow');
                if (sl == 0) {
                    $mainlist.animate({ left: '0px' }, 'slow');
                }
            }
        }
    })
};

//$(document).ready(function () {
//    $('.og_prev,.og_next').hover(function () {
//        $(this).fadeTo('fast', 0.7);
//    }, function () {
//        $(this).fadeTo('fast', 0.4);
//    })
//})

