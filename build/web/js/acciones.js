var cod = localStorage.getItem("cod");
var fullname = localStorage.getItem("fullname");

$(document).ready(function () {
    $(".codigo").text(cod);
    $(".name").text(fullname);
    $('.collapsible').collapsible();
    $(".button-collapse").sideNav();

    $("#editar").click(function () {
        $("#modal1").modal();
    });

    $(".cambioLi").click(function () {
        var $div = $(this).children(".collapsible-header");
        var $icon = $div.children(".material-icons");
        var $badge = $div.children("span");
        $badge.remove();
        if ($icon.text() === "mail") {
            $icon.text("drafts");
        }
    });

    $("#logout").click(function () {
        localStorage.removeItem("cod");
        localStorage.removeItem("fullname");
        window.location.href = "login.html";
    });

    $(".clickTab").click(function () {
        var $child1 = $(this).children();
        var $span = $child1.children();
        $span.remove();
    });

    $(".clickSide").click(function () {
        var $a = $(this).children();
        var $badge = $a.children("span");
        $badge.remove();
    });
});