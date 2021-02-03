

window.console = window.console || function (t) { };
if (document.location.search.match(/type=embed/gi)) {
    window.parent.postMessage("resize", "*");
}

$(document).ready(() => {
    $("#lightgallery").lightGallery({
        pager: true
    });

});

$("#lightgallery li a").click(function () {
    $('#GalleryCarousel').modal('toggle');
});

$(window).on('resize', function () {
    var win = $(this);
    if (win.width() < 575) {
        $('#social-icons-row').addClass('mx-5');
    } else {
        $('#social-icons-row').removeClass('mx-5');
    }
});