/* 切换学校JS */
$(document).ready(function () {
    showSchool();
    changeSchool();
    search();//头部搜索框
})
/* 更换显示学校 */
function showSchool() {
    //切换学校
    $('#change_school a').click(function () {
        $('#SwitchSchoolModal').modal('show')
    });
}
/* 选择并切换学校 */
function changeSchool() {
    $(".school-wrap dd a").click(function () {
        var schoolid = $(this).attr("data-url");
        $.ajax({
            type: "POST",
            url: "/Home/ChangeSchool",
            data: "id=" + schoolid,
            success: function (data) {
                //刷新当前页面
                window.location.reload();
            }
        });
    });
};

//头部搜索框
function search() {
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

//页面加入收藏
function AddFavorite(sURL, sTitle) {
    try {
        window.external.addFavorite(sURL, sTitle);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(sTitle, sURL, "");
        }
        catch (e) {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}