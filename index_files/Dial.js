$(document).ready(function () {
    // GA tags
   

    // video player
    $('.video-button').click(function () {
        id = $(this).attr("data-id") - 1;
        watchVideo(id);
    });

    $('#modal-video').on('hidden.bs.modal', function () {
        $('.watch-video-body').html("&nbsp;");
    });

    if (!isTouchDevice()) {
        $(".products-tab").hover(showNavProducts);
        $("#navProductsChildren > li").hover(showSubNavProducts);
        $("#submenuBodyWash > li").hover(showSubNavLevelTwoProducts);
        $(".about-tab").hover(showNavAbout);
    }
    else {
        $(".products-tab").click(showNavProducts);
        $("#navProductsChildren > li").click(showSubNavProducts);
        $("#submenuBodyWash > li").click(showSubNavLevelTwoProducts);
        $(".about-tab").click(showNavAbout);
    }

    // desktop sticky nav
    $("body.body-about a:contains('About Us')").parent().addClass("active");
    $("body.body-products li#navProducts").addClass("active");
    $("body.body-product-detail li#navProducts").addClass("active");

    // background image swap 
    if ($('body').hasClass("body-products") || $('body').hasClass("body-products-landing") || $('body').hasClass("body-product-detail") || $('body').hasClass("body-faqs") || $('body').hasClass("body-contact") || $('body').hasClass("body-press") || $('body').hasClass("body-guarantee") || $('body').hasClass("body-write-review")) {
        $('.navbar').addClass("our-products");
        $('body').addClass("our-products-container");
        $('body').removeClass("body-mobile");
    }
    else {
        $('.navbar').removeClass("our-products");
        $('body').removeClass("our-products-container");
    }

    // carousel modifications
    var totalItems = $('.item').length;
    var currentIndex = $('div.active').index() + 1;

    $('.num').html('' + currentIndex + '/' + totalItems + '');

    $('#myCarousel').on('slid.bs.carousel', function (e) {
        currentIndex = $('#myCarousel div.active').index() + 1;
        $('.num').html('' + currentIndex + '/' + totalItems + '');
    });

    $(".products-header-links a").click(function (e) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 125
        }, 1000);
        e.preventDefault(); //this is the important line.
    });

    // mobile nav helpers
    $("#navAccordion .panel-collapse").on("show.bs.collapse", function () {
        var panel = $(this)[0];
        var parent;

        switch (panel.id) {
            case "collapseAbout":
                parent = $("#navHeadingAbout");
                break;
            case "collapseProducts":
                parent = $("#navHeadingProducts");
                break;
            case "collapseNavBodyWash":
                parent = $("#productsNavBodyWash");
                break;
            case "collapseNavBarSoap":
                parent = $("#productsNavBarSoap");
                break;
            case "collapseNavHandSoap":
                parent = $("#productsNavHandSoap");
                break;
            case "collapseNavLotion":
                parent = $("#productsNavLotion");
                break;
            case "collapseNavForKids":
                parent = $("#productsNavForKids");
                break;
            case "collapseNavAcneControl":
                parent = $("#productsNavAcneControl");
                break;
            case "collapseNavForMen":
                parent = $("#productsNavForMen");
                break;
            default:
                break;
        }

        if (parent)
            parent.addClass("in");
    });

    $("#navAccordion .panel-collapse").on("hidden.bs.collapse", function () {
        var panel = $(this)[0];
        var parent;

        switch (panel.id) {
            case "collapseAbout":
                parent = $("#navHeadingAbout");
                break;
            case "collapseProducts":
                parent = $("#navHeadingProducts");
                break;
            case "collapseNavBodyWash":
                parent = $("#productsNavBodyWash");
                break;
            case "collapseNavBarSoap":
                parent = $("#productsNavBarSoap");
                break;
            case "collapseNavHandSoap":
                parent = $("#productsNavHandSoap");
                break;
            case "collapseNavLotion":
                parent = $("#productsNavLotion");
                break;
            case "collapseNavForKids":
                parent = $("#productsNavForKids");
                break;
            case "collapseNavAcneControl":
                parent = $("#productsNavAcneControl");
                break;
            case "collapseNavForMen":
                parent = $("#productsNavForMen");
                break;
            default:
                break;
        }

        if (parent)
            parent.removeClass("in");

        // bug in Bootstrap? - when any nested panel is collapsed, the collapse event is also triggered for the parent, afterwards
        // may just be the intended functionality related to "data-parent" attribute
        // anyway, solved this by doing a return false here, which stops the javascript after collapsing just the child
        return false;
    });

    // image rollovers

    $('.learn-more').on('mouseover', function () {
        this.src = "/images/learnMoreOver.png";
    });

    $('.learn-more').on('mouseout', function () {
        this.src = "/images/learnMoreOut.png";
    });

    $('.view-all').on('mouseover', function () {
        this.src = "/images/viewAllOver.png";
    });

    $('.view-all').on('mouseout', function () {
        this.src = "/images/viewAllOut.png";
    });

    $('.see-faqs').on('mouseover', function () {
        this.src = "/images/AboutUs/seeFaqsButtonOver.png";
    });

    $('.see-faqs').on('mouseout', function () {
        this.src = "/images/AboutUs/seeFaqsButtonOut.png";
    });

    $('.see-guarantee').on('mouseover', function () {
        this.src = "/images/AboutUs/seeGuaranteeOver.png";
    });

    $('.see-guarantee').on('mouseout', function () {
        this.src = "/images/AboutUs/seeGuaranteeOut.png";
    });

    $('.shop-now').on('mouseover', function () {
        this.src = "/images/Products/shopNowOver.png";
    });

    $('.shop-now').on('mouseout', function () {
        this.src = "/images/Products/shopNowOut.png";
    });

    /*****  product size dropdown  *****/

    var productName = $("body").attr("class").split(' ')[1];
    var jsonObject, prodSizesDD, category, sizes;

    if ($(".product-detail-container").length > 0)
        category = $(".product-detail-container").attr("class").split(' ')[2];

    if ($('.product-sizes-mobile').is(':visible')) {
        prodSizesDD = $('.product-sizes-mobile');
    }
    else
        prodSizesDD = $('.product-sizes-desktop');

    $.getJSON("/JSON/dial-soap-bin.json")
        .done(function (json) {
            var dataAsJsonString = JSON.stringify(json);
            $('.json_data').val(dataAsJsonString);
        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
            jsonObject = JSON.parse(json);
        });

    setTimeout(function () {
        try {
            var jsonData = $('.json_data').val();
            jsonObject = JSON.parse(jsonData);

            sizes = getProductSizes(jsonObject, category, productName);

            $.each(sizes, function (val, text) {
                prodSizesDD.append($('<option></option>').val(text).html(text));
            });
        } catch (e) {
            alert(e); // error in the above string (in this case, yes)!
        }
    }, 1500);

    prodSizesDD.change(function () {
        var size = this.value;
        $('.not-available').remove();
        $('.bin-list').slideUp("fast", "swing");

        if (size != -1) {
            setProductSizeImage(jsonObject, productName, category, size);
        }
        else
            setProductSizeImage(0);
    });

/*****  BIN  *****/

var validatorFlag = false;

    $('.shop-now').on('click', function () {
    var binContainer;
    var selectedValue = prodSizesDD.find('option').filter(":selected").val();
    var currentValue = localStorage.getItem("selectedOption");

    ga('send', 'event', 'Sales', 'Click', 'Shop Now');

    $('.not-available').remove();

    if ((validatorFlag == false || selectedValue != currentValue) && selectedValue != 'select-size') {
        localStorage.setItem("selectedOption", selectedValue.toString());
        $('.not-available').remove();
        $('.bin-list').remove();

        $.ajax({
            url: setProductSizeURL(jsonObject, productName, category, selectedValue),
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var json_obj = jQuery.parseJSON(JSON.stringify(data));
                var output = "<ul class='bin-list' style='display: none;'>";

                $.each(json_obj.getResult[0].ResultGroups[0].OnlineShops, function (key, val) {
                    var link, image, listItem;

                    $.each(val.OfferInfo.Offers, function (i, j) {
                        link = this.Deeplink;
                    });

                    $.each(val.Logos, function (i, j) {
                        image = this.LogoSmall;
                    });

                    if(this.Name == "Walgreens")
                        listItem = '<li><a class="shop-now-walgreens" href="' + link + ' target="_blank" onclick="ga(\'send\', \'event\', \'Sales\', \'Click\', \'Walgreens Shop Now\');"><img src="http://' + image + '"/></a></li>'; 
                    if (this.Name == "Walmart")
                        listItem = '<li><a class="shop-now-walmart" href="' + link + ' target="_blank" onclick="ga(\'send\', \'event\', \'Sales\', \'Click\', \'Walmart Shop Now\');"><img src="http://' + image + '"/></a></li>';
                    if (this.Name == "Target")
                        listItem = '<li><a class="shop-now-target" href="' + link + ' target="_blank" onclick="ga(\'send\', \'event\', \'Sales\', \'Click\', \'Target Shop Now\');"><img src="http://' + image + '"/></a></li>';
                    if (this.Name == "Jet.com")
                        listItem = '<li><a class="shop-now-jet" href="' + link + ' target="_blank" onclick="ga(\'send\', \'event\', \'Sales\', \'Click\', \'Jet Shop Now\');"><img src="http://' + image + '"/></a></li>';
                    if (this.Name == "Amazon.com")
                        listItem = '<li><a class="shop-now-amazon" href="' + link + ' target="_blank" onclick="ga(\'send\', \'event\', \'Sales\', \'Click\', \'Amazon Shop Now\');"><img src="http://' + image + '"/></a></li>';

                    output += listItem;
                });

                output += "</ul>";

                if ($('#bin-container.mobile').is(':visible')) {
                    binContainer = $('#bin-container.mobile');
                }
                else
                    binContainer = $('#bin-container.non-mobile');

                binContainer.append(output);

                if (!binContainer.find('li').length) {
                    binContainer.append('<b class="not-available">Online retailers not available for this product variant currently!</b>');
                }

                binContainer.find('.bin-list').slideDown('fast');
                validatorFlag = true;
            },
            error: function (request, error) {
                if ($('#bin-container.mobile').is(':visible')) {
                    binContainer = $('#bin-container.mobile');
                }
                else
                    binContainer = $('#bin-container.non-mobile');

                if (!binContainer.find('li').length) {
                    var output = "<ul class='bin-list' style='display: none;'>";
                    output += "<b class='not-available'>Online retailers not available for this product variant currently!</b>";
                    output += "</ul>";
                }

                binContainer.append(output);
                binContainer.find('.bin-list').slideDown('fast');
                validatorFlag = true;
            }
        });
    }
    else {
        if (selectedValue == 'select-size')
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Please select a product size!!'
            });
        else
            $('.bin-list').slideToggle("fast", "swing");

        $('.not-available').remove();
    }
    });
});

//$(window).on('load', function () {
//    var sizes = getProductSizes(jsonObject, category, productName);

//    $.each(sizes, function (val, text) {
//        prodSizesDD.append($('<option></option>').val(text).html(text));
//    });
//});


/******************** misc JavaScript functions ********************/


$(window).resize(function () {
    viewport = window.innerWidth;
    $("#viewport").text(viewport);
});

$(window).on('load', function () { // executes after everything loads
    viewport = window.innerWidth;
    $("#viewport").text(viewport);
});

var showNavProducts = function () {
    $(".products-menu").toggle();
    $(".products-menu > a").toggleClass("active");
};

var showNavAbout = function () {
    $(".about-menu").toggle();
    $(".about-menu > a").toggleClass("active");
};

var showSubNavProducts = function () {
    var activeSub = $(this).find(".dropdown-submenu");
    activeSub.toggle();
    $(this).find("a").toggleClass("active");
};

var showSubNavLevelTwoProducts = function () {
    var activeSub = $(this).find(".dropdown-submenu-leveltwo");
    activeSub.toggle();
    $(this).find("a").toggleClass("active");
};

var titles = [
    'Dial<sup>&reg;</sup> Coconut Milk Body Wash ',
    'Dial<sup>&reg;</sup> Hibiscus Water Body Wash',
    'Dial Complete<sup>&reg;</sup> Kitchen Collection Presents: Gilled Salmon & Leeks',
    'Dial Complete<sup>&reg;</sup> Kitchen Collection Presents: Goat Cheese Pastry Rounds',
    'Dial Complete<sup>&reg;</sup> Kitchen Collection Presents: Herbed Deviled Egg Bruchetta',
    'Dial Complete<sup>&reg;</sup> Kitchen Collection Presents: Thai Chicken Curry Stir Fry',
    'Dial<sup>&reg;</sup> for Men Infinite Fresh Awkward to Awesome',
    'Dial<sup>&reg;</sup> for Men Infinite Fresh Handshake'
];

var videos = [
    'https://www.youtube.com/embed/ft5p1vMKXm4',
    'https://www.youtube.com/embed/gdWEcKiljsI',
    'https://www.youtube.com/embed/-eANWMCRbzU',
    'https://www.youtube.com/embed/NfOkZnhG5gs',
    'https://www.youtube.com/embed/NU6S2g4isDE',
    'https://www.youtube.com/embed/lJQQioK6an0',
    'https://www.youtube.com/embed/qqMFG8PLcwI',
    'https://www.youtube.com/embed/x3NPBCRlJvU'
];

function watchVideo(voteid) {
    $('.watch-video-title').html(titles[voteid]);

    var url = videos[voteid];

    var _html = '<iframe style="width:100%; height:500px" width="560" height="315" src="' + url + '?rel=0&autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';

    $('.watch-video-body').html(_html);
}

function getProductSizes(json, category, product) {
    var sizes = [];
    
    $.each(json.binData.categories, function (l1key, l1val) {
        if (l1val.category == category) {
            $.each(l1val.products, function (l2key, l2val) {
                if (l2val.product == product)
                    $.each(l2val.variants, function (l3key, l3val) {
                        sizes.push(this.size);
                    });
            });
        }
    });

    return sizes;
}

function getProductVariantEAN(json, category, product, size) {
    var ean;

    $.each(json.binData.categories, function (l1key, l1val) {
        if (l1val.category == category) {
            $.each(l1val.products, function (l2key, l2val) {
                if (l2val.product == product)
                    $.each(l2val.variants, function (l3key, l3val) {
                        if (l3val.size == size) {
                            ean = this.ean;
                            return false;
                        }
                    });
            });
        }
    });

    return ean;
}

function getProductVariantImage(json, category, product, size) {
    var image;

    $.each(json.binData.categories, function (l1key, l1val) {
        if (l1val.category == category) {
            $.each(l1val.products, function (l2key, l2val) {
                if (l2val.product == product)
                    $.each(l2val.variants, function (l3key, l3val) {
                        if (l3val.size == size) {
                            image = this.src;
                            return false;
                        }
                    });
            });
        }
    });

    return image;
}

function setProductSizeURL(json, product, category, size) {
    var ean = getProductVariantEAN(json, category, product, size);
    var urlStart = "https://api.commerce-connector.com/REST/2.0/OnlineShop?token=881bc827a5ba693c32729f168becb3fac271f4b5&Country=us&Language=en&O_ResultFields=Id%2CName%2CDescription%2CContactInfo%2CAddressInfo%2CPriority%2CIsMobileReady%2CLogos%2CCustomerRestriction%2CCurrency%2COfferInfo%2CPaymentOptions%2CShippingDefinitions%2CProductGroups%2CImages%2CEvents%2CCustomFields&F_SubId=markenwebsite&F_Ean=";
    var url = urlStart.concat(ean); // "https://api.commerce-connector.com/REST/2.0/OnlineShop?token=881bc827a5ba693c32729f168becb3fac271f4b5&Country=us&Language=en&O_ResultFields=Id%2CName%2CDescription%2CContactInfo%2CAddressInfo%2CPriority%2CIsMobileReady%2CLogos%2CCustomerRestriction%2CCurrency%2COfferInfo%2CPaymentOptions%2CShippingDefinitions%2CProductGroups%2CImages%2CEvents%2CCustomFields&F_SubId=markenwebsite&F_Ean=00017000003245";
    return url.toString();
}

function setProductSizeImage(json, product, category, size) {
    var img = getProductVariantImage(json, category, product, size);
    $('.header-image-container > img').attr('src', img);
}

/******** Global variables ********/

function isTouchDevice() {
    var el = document.createElement('div');
    el.setAttribute('ongesturestart', 'return;'); // or try "ontouchstart"
    return typeof el.ongesturestart === "function";
}

var viewport = window.innerWidth;