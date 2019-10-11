(function ($) {
    $.extend($,
        {
            //显示消息
            alertMsg: function (data, funcSuc,funcErr) {
                switch (data.State) {
                    case 1://操作成功
                        if (funcSuc) funcSuc();
                        break;
                    case 2://操作因为某种原因失败（业务级：比如登陆密码错误）
                        if (funcErr) funcErr();
                        break;
                    case 3:// 没有登录
                        break;
                    case 4:// 没有权限
                        break;
                    case 5:// 异常
                        break;

                }
            },
            /*
               1.0 处理 为 Ajax请求 规定的 Json格式数据
                   responseText : 响应报文字符串
                   funcOk : 当服务器返回状态为OK时调用的回调函数
            */
            procAjaxData: function (data, funcOk) {
                //1.通过 try catch 判断 responseText 是否为 json格式字符串

                try {
                    //1.1.1判断 responseText 是否已经被 easyUI的组件 转成 js对象
                    //if (responseText.Statu) msgObj = responseText;
                    //    //1.1.2如果 是字符串，则 尝试 将 响应报文字符串 转成 js对象 {"Statu":2,"Msg":"用户名或密码错误哦~~","BackUrl":"","Data":null}
                    //else msgObj = eval("(" + responseText + ")");
                    if (!data || !data.State || data == undefined) {
                        alert("消息字符串格式不存在");
                        return;
                    }
                    var msgObj = data;

                    //1.2定义一个 私有 函数，用来判断 函数是否存在，如果存在，则调用该函数，并传入msgBox对象
                    function isFunc(func) {
                        //判断参数是否为空 是否 为一个函数对象
                        if (func != null && func instanceof Function) {
                            func(msgObj);//如果是一个函数，则调用
                        }
                    }

                    //1.3定义一个 私有 函数，用来显示消息
                    function isMsgBoxExist(msg) {
                        if ($.msgBoxObj != null) {//如果检测到 消息框对象 存在，则返回true
                            return true;
                        } else {//如果消息框对象不存在，则直接 alert
                            alert(msg);
                            return false;
                        }
                    }

                    //1.4根据 消息的状态 做不同处理
                    switch (msgObj.State) {
                        case 1://操作成功
                            if (isMsgBoxExist(msgObj.Msg)){
                                $.msgBoxObj.showMsgSuccess(msgObj.Msg);
                                setTimeout(function () { isFunc(funcOk); }, 2000);
                            };
                            break;
                        case 2://操作因为某种原因失败（业务级：比如登陆密码错误）
                            if (isMsgBoxExist(msgObj.Msg)) $.msgBoxObj.showMsgError(msgObj.Msg);
                            break;
                        case 3:// 没有登录
                            if (isMsgBoxExist(msgObj.Msg)) $.msgBoxObj.showMsgError(msgObj.Msg, function () {
                                if (window.top) window.top.location = msgObj.BackUrl;
                                else window.location = msgObj.BackUrl;
                            });
                            break;
                        case 4:// 没有权限
                            if (isMsgBoxExist(msgObj.Msg)) $.msgBoxObj.showMsgError(msgObj.Msg, function () {
                                if (window.top) window.top.location = msgObj.BackUrl;
                                else window.location = msgObj.BackUrl;
                            });
                            break;
                        case 5:// 异常
                            if (isMsgBoxExist(msgObj.Msg)) $.msgBoxObj.showMsgError(msgObj.Msg);
                            break;

                    }
                } catch (e) {
                    alert("消息字符串格式非Json！");
                    throw e;
                }
            }
        });
}(jQuery));