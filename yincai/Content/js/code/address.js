

$(function () {
    //点击新增
    $("#useNewAddr").click(doAddAddress);
    //点击编辑
    $(".editAddress").click(doEditAddress);
    //点击删除
    $(".delAddress").click(doDelAddress);
});


//增加收货地址
function doAddAddress() {
    $("#myModalLabel").text("新增地址");
    $("#AddressID").val("");
    $("#Address").val("");
    $("#Contact").val("");
    $("#Phone").val("");
    $("#ShortPhone").val("");
    //设置表单请求路径
    $("#formAddr").attr("action", "/UserAddress/Add");
    $('#addressModal').modal('show')
};
//编辑地址
function doEditAddress() {
    var $edit = $(this).parent().parent();
    var addr = $edit.attr("data-street");
    var addid = $edit.attr("data-addid");
    var shorttel = $edit.attr("data-shorttel");
    var tel = $edit.attr("data-tel");
    var contact = $edit.attr("data-contact");

    //alert(street);
    $("#myModalLabel").text("编辑地址");
    $("#AddressID").val(addid);
    $("#Address").val(addr);
    $("#Contact").val(contact);
    $("#Phone").val(tel);
    $("#ShortPhone").val(shorttel);


    //设置表单请求路径
    $("#formAddr").attr("action", "/UserAddress/Edit");
    $('#addressModal').modal('show');
};
//删除地址
function doDelAddress() {
    var $edit = $(this).parent().parent();
    var addrid = $edit.attr("data-addid");
    if (!confirm("您确定要删除吗？")) {
        return;//阻断后面代码执行
    }
    $.post("/UserAddress/Del", { id: addrid }, function (data) {
        $.procAjaxData(data, function () {
            //刷新当前页面
            window.location.reload();
        });
    });
};
//新增地址成功
function onSuccessed(jsonData) {
    if (jsonData == "OK") {
        $('#addressModal').modal('hide');
        //刷新当前页面
        window.location.reload();
    }
};
//检查新增的地址格式是否正确
function checkAll() {

    if ($.trim($("#Contact").val()) == '') {
        $("#warningMsg").html("请输入收货人姓名");
        return false;
    }
    //验证手机号
    rePhone = /^(13[0-9]{9})|(15[89][0-9]{8})$/;
    if (!rePhone.test($("#Phone").val())) {
        $("#warningMsg").html("请输入正确的11位手机号");
        return false;
    }

    if ($.trim($("#Address").val()) == '') {
        $("#warningMsg").html("请输入收货地址");
        return false;
    }
    return true;
}