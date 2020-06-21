
var sideMenuShown = true;
var collapse = (function () {
    if (sideMenuShown) {
        sideMenuCollapse();
    }
    else {
        sideMenuRevert();
    }
});
function sideMenuCollapse() {
    $("#mainContent").css({ 'display': 'block' });
    $("#sideBar").css({ "width": "0", "opacity": "0" });
    $("section#mainContent").css({ "width": "100%" });
    $("nav.bg-white").css({ "width": "100%" });
    sideMenuShown = false;
}

function sideMenuRevert() {
    if ((window.innerWidth) < 567) {
        $("#mainContent").css({ 'display': 'none' });
    }
    $("#sideBar").css({ "width": "260px", "opacity": "1" });
    $("section#mainContent").css({ "width": "calc(100% - 260px)" });
    $("nav.bg-white").css({ "width": "calc(100% - 260px)" });
    sideMenuShown = true;
}

$(window).on('resize load', function () {
    console.log(window.innerWidth)
    if (window.innerWidth < 767) {
        sideMenuCollapse();
    }
    else {
        sideMenuRevert();
    }
});
