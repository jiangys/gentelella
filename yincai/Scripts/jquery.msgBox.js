(function () {
    function MsgBox() {
        // 设置加载的样式及图片样式
        PNotify.defaults.styling = 'bootstrap3'; // Bootstrap version 3
        PNotify.defaults.icons = 'bootstrap3'; // glyphicons fontawesome4

        // 设置居中显示
        if (typeof window.stackTopCenter === 'undefined') {
            window.stackTopCenter = {
                'dir1': 'down',
                'firstpos1': 25
            };
        }

        var delay = 2000;//显示时间
        function showMsgInfo(msg) {
            PNotify.info({ title: '温馨提示', text: msg, hide: true, delay: delay, stack: window.stackTopCenter });
        }

        function showMsgSuccess(msg) {
            PNotify.success({ title: '成功拉', text: msg, hide: true, delay: delay, stack: window.stackTopCenter });
        }

        function showMsgNotice(msg) {
            PNotify.notice({ title: '警告', text: msg, hide: true, delay: delay, stack: window.stackTopCenter });
        }

        function showMsgError(msg) {
            PNotify.error({ title: '出错拉', text: msg, hide: true, delay: delay, stack: window.stackTopCenter });
        }

        function showConfirmDialog(msg, funcOk) {
            PNotify.info({
                title: '请确认您的操作',
                text: msg,
                hide: false,
                stack: window.stackTopCenter,
                modules: {
                    Confirm: {
                        confirm: true,
                        buttons: [{
                            text: '确定',
                            primary: true,
                            click: function (notice) {
                                if (funcOk) funcOk();
                                notice.close();
                            }
                        }, {
                            text: '取消',
                            primary: false,
                            click: function (notice) {
                                notice.close();
                            }
                        }]
                    },
                    Buttons: {
                        closer: false,
                        sticker: false
                    },
                    History: {
                        history: false
                    },
                }
            });
        };

        this.showMsgInfo = function (msg) { showMsgInfo(msg) };
        this.showMsgSuccess = function (msg) { showMsgSuccess(msg) };
        this.showMsgNotice = function (msg) { showMsgNotice(msg) };
        this.showMsgError = function (msg) { showMsgError(msg) };
        this.showConfirmDialog = function (msg, funcOk) { showConfirmDialog(msg, funcOk) };
    }
    //$.extend($, { sayHi: function () { }});
    //2.当dom树加载完毕后，为 $对象 添加一个 msgBoxObj 消息对象属性
    $(function () {
        $.extend($, {
            msgBoxObj: new MsgBox()
        });
    });
})();