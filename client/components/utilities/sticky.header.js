$(document).ready(function () {
    $(window).scroll(function () {

        // header in app view
        var header = $(".navbar-fixed-top"),
            headerHeight = header.outerHeight(),
            subheader = $('.subheader'),
            subheaderHeight = subheader.outerHeight(),
            actualSubheaderHeight = $(document).find('.subheader.fixed').outerHeight(),
            windowScrollTop = $(window).scrollTop();

        if (windowScrollTop > 1) { //1 to fix the safari rubberband scroll behaviour
            $(".messages").css({position: 'fixed', top: headerHeight + actualSubheaderHeight}) //too lazy to add a proper css class
            if (!subheader.hasClass('fixed')) {
                subheader.after("<div id='placeholderSubheader' style='display: block; position: relative; height: " + subheaderHeight + "px;'>&nbsp;</div>");
            }
            subheader.addClass('fixed');
        }
        else {
            $(".messages").css({position: 'relative', top: 'auto'});
            $(".subheader").removeClass('fixed');
            $('#placeholderSubheader').remove();
        }

        // header in main view
        var mainNavbar = $('.main-navbar');

        if (windowScrollTop > 1 ) {
            mainNavbar.removeClass('navbar-padded');
            header.find('.btn[ui-sref="access.register"]').removeClass('btn-primary-outline').addClass('btn-primary');
        } else {
            mainNavbar.addClass('navbar-padded');
            header.find('.btn[ui-sref="access.register"]').removeClass('btn-primary').addClass('btn-primary-outline');
        }
    });
});