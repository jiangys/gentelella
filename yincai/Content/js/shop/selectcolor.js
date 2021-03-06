/*!
* selectColor.js
* Author: JSMask
* Date:	2017
*/
var SelectColor = (function() {
    var d = null;
    var c = [];
    var b = {
        elem: ".select-color",
        range: "|",
        left: 0,
        index: 0,
        data: [{
            colorName: "白色系",
            colorNum: "rgb(255, 255, 255)",
            colorList: [{
                colorName: "乳白色",
                colorNum: "rgb(255, 251, 240)"
            },
            {
                colorName: "白色",
                colorNum: "rgb(255, 255, 2255)"
            },
            {
                colorName: "米白色",
                colorNum: "rgb(238, 222, 176)"
            }]
        },
        {
            colorName: "灰色系",
            colorNum: "rgb(128, 128, 128)",
            colorList: [{
                colorName: "浅灰色",
                colorNum: "rgb(228, 228, 228)"
            },
            {
                colorName: "深灰色",
                colorNum: "rgb(102, 102, 102)"
            },
            {
                colorName: "灰色",
                colorNum: "rgb(128, 128, 128)"
            },
            {
                colorName: "银色",
                colorNum: "rgb(192, 192, 192)"
            }]
        },
        {
            colorName: "黑色系",
            colorNum: "rgb(0, 0, 0)",
            colorList: [{
                colorName: "黑色",
                colorNum: "rgb(0, 0, 0)"
            }]
        },
        {
            colorName: "红色系",
            colorNum: "rgb(255, 0, 0)",
            colorList: [{
                colorName: "桔红色",
                colorNum: "rgb(255, 117, 0)"
            },
            {
                colorName: "玫红色",
                colorNum: "rgb(223, 27, 118)"
            },
            {
                colorName: "粉红色",
                colorNum: "rgb(255, 182, 193)"
            },
            {
                colorName: "红色",
                colorNum: "rgb(255, 0, 0)"
            },
            {
                colorName: "藕色",
                colorNum: "rgb(238, 208, 216)"
            },
            {
                colorName: "西瓜红",
                colorNum: "rgb(240, 86, 84)"
            },
            {
                colorName: "酒红色",
                colorNum: "rgb(153, 0, 0)"
            }]
        },
        {
            colorName: "黄色系",
            colorNum: "rgb(255, 255, 0)",
            colorList: [{
                colorName: "卡其色",
                colorNum: "rgb(195, 176, 145)"
            },
            {
                colorName: "姜黄色",
                colorNum: "rgb(255, 199, 115)"
            },
            {
                colorName: "明黄色",
                colorNum: "rgb(255, 255, 1)"
            },
            {
                colorName: "杏色",
                colorNum: "rgb(247, 238, 214)"
            },
            {
                colorName: "柠檬黄",
                colorNum: "rgb(255, 236, 67)"
            },
            {
                colorName: "桔色",
                colorNum: "rgb(255, 165, 0)"
            },
            {
                colorName: "浅黄色",
                colorNum: "rgb(250, 255, 114)"
            },
            {
                colorName: "荧光黄",
                colorNum: "rgb(234, 255, 86)"
            },
            {
                colorName: "金色",
                colorNum: "rgb(255, 215, 0)"
            },
            {
                colorName: "香槟色",
                colorNum: "rgb(255, 249, 177)"
            },
            {
                colorName: "黄色",
                colorNum: "rgb(255, 255, 0)"
            }]
        },
        {
            colorName: "绿色系",
            colorNum: "rgb(0, 128, 0)",
            colorList: [{
                colorName: "军绿色",
                colorNum: "rgb(93, 118, 42)"
            },
            {
                colorName: "墨绿色",
                colorNum: "rgb(0,87,55)"
            },
            {
                colorName: "浅绿色",
                colorNum: "rgb(152, 251, 152)"
            },
            {
                colorName: "绿色",
                colorNum: "rgb(0, 128, 0)"
            },
            {
                colorName: "翠绿色",
                colorNum: "rgb(10, 163, 68)"
            },
            {
                colorName: "荧光绿",
                colorNum: "rgb(35, 250, 7)"
            },
            {
                colorName: "青色",
                colorNum: "rgb(0, 224, 158)"
            }]
        },
        {
            colorName: "蓝色系",
            colorNum: "rgb(0, 0, 254)",
            colorList: [{
                colorName: "天蓝色",
                colorNum: "rgb(68, 206, 246)"
            },
            {
                colorName: "孔雀蓝",
                colorNum: "rgb(0, 164, 197)"
            },
            {
                colorName: "宝蓝色",
                colorNum: "rgb(75, 92, 196)"
            },
            {
                colorName: "浅蓝色",
                colorNum: "rgb(210, 240, 244)"
            },
            {
                colorName: "深蓝色",
                colorNum: "rgb(4, 22, 144)"
            },
            {
                colorName: "湖蓝色",
                colorNum: "rgb(48, 223, 243)"
            },
            {
                colorName: "蓝色",
                colorNum: "rgb(0, 0, 254)"
            },
            {
                colorName: "藏青色",
                colorNum: "rgb(46, 78, 126)"
            }]
        },
        {
            colorName: "紫色系",
            colorNum: "rgb(128, 0, 128)",
            colorList: [{
                colorName: "浅紫色",
                colorNum: "rgb(237, 224, 230)"
            },
            {
                colorName: "深紫色",
                colorNum: "rgb(67, 6, 83)"
            },
            {
                colorName: "紫红色",
                colorNum: "rgb(139, 0, 98)"
            },
            {
                colorName: "紫罗兰",
                colorNum: "rgb(183, 172, 228)"
            },
            {
                colorName: "紫色",
                colorNum: "rgb(128, 0, 128)"
            }]
        },
        {
            colorName: "棕色系",
            colorNum: "rgb(124, 75, 0)",
            colorList: [{
                colorName: "巧克力色",
                colorNum: "rgb(210,105,30)"
            },
            {
                colorName: "标土棕",
                colorNum: "rgb(115,74,18)"
            },
            {
                colorName: "赭色",
                colorNum: "rgb(160,82,45)"
            },
            {
                colorName: "乌贼墨棕",
                colorNum: "rgb(94,38,18)"
            },
            {
                colorName: "沙棕色",
                colorNum: "rgb(244,164,96)"
            },
            {
                colorName: "栗色",
                colorNum: "rgb(125, 0, 0)"
            },
            {
                colorName: "棕色",
                colorNum: "rgb(124, 75, 0)"
            }]
        }]
    };
    var e = Object.assign ||
    function(j) {
        for (var g = 1; g < arguments.length; g++) {
            var h = arguments[g];
            for (var f in h) {
                if (Object.prototype.hasOwnProperty.call(h, f)) {
                    j[f] = h[f]
                }
            }
        }
        return j
    };
    function a() {
        d = e({},
        b, arguments[0]);
        var f = this;
        this.index = d.index;
        this.createElement(function() {
            f.render()
        })
    }
    a.prototype.createElement = function(f) {
        this.mainbox = document.createElement("div");
        this.nav = document.createElement("ul");
        this.box = document.createElement("div");
        this.colorlist = document.createElement("ul");
        $(this.mainbox).addClass("color-group-wrapper color-dropdown-wrapper");
        $(this.nav).addClass("color-group-panel");
        $(this.box).addClass("colors-panel");
        $(this.colorlist).addClass("color-list");
        $(this.box).html('<p class="colors-panel-title">常用标准颜色</p>');
        $(this.box).append(this.colorlist);
        $(this.mainbox).append(this.nav);
        $(this.mainbox).append(this.box);
        f && f()
    };
    a.prototype.render = function() {
        var l = this;
        var h = $(this.mainbox);
        var n = $(this.nav);
        var k = $(this.colorlist);
        var g = $(d.elem);
        var f = null;
        var o = "";
        var m = "";
        for (var j = 0; j < d.data.length; j++) {
            o += '<li class="color-tag" data-index="' + j + '">' + '<a href="#">' + '<div class="color-block" style="background:' + d.data[j]["colorNum"] + ';"></div>' + "<span>" + d.data[j]["colorName"] + "</span>" + "</a>" + "</li>"
        }
        n.html(o);
        k.html(this.createList());
        $("body").append(this.mainbox);
        n.find("li.color-tag").hover(function(p) {
            p.stopPropagation();
            var i = $(this).attr("data-index");
            if (i == l.index) {
                return
            }
            l.index = i;
            k.html(l.createList())
        });
        $("body").on("click", ".color-group-panel li.color-tag",
        function(i) {
            i.stopPropagation()
        });
        $("body").on("click", ".color-list li.color-tag",
        function(q) {
            q.stopPropagation();
            var p = $(this).attr("data-index");
            var i = d.data[l.index]["colorList"][p]["colorName"];
            if (f.val() != "") {
                c = f.val().split(d.range)
            } else {
                c = []
            }
            if (c.indexOf(i) != -1) {
                return
            }
            c.push(i);
            f.val(c.join(d.range));
            c.length = 0
        });
        h.css({
            display: "none"
        });
        g.off("click").on("click",
        function(q) {
            q.stopPropagation();
            f = $(this);
            if (f.val() != "") {
                c = f.val().split(d.range)
            }
            var p = f.offset().left + d.left;
            var i = f.offset().top + f.get(0).offsetHeight;
            h.css({
                position: "absolute",
                left: p,
                top: i,
                display: "block",
                zIndex: "2999"
            });
            $("html").off("click").on("click",
            function() {
                h.hide()
            })
        })
    };
    a.prototype.createList = function() {
        var h = "";
        var f = this.index;
        var j = d.data[f]["colorList"];
        for (var g = 0; g < j.length; g++) {
            h += '<li class="color-tag" data-index="' + g + '">' + '<a href="#">' + '<div class="color-block" style="background:' + j[g]["colorNum"] + ';"></div>' + "<span>" + j[g]["colorName"] + "</span>" + "</a>" + "</li>"
        }
        return h
    };
    return a
} ());