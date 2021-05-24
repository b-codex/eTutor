! function(o) {
    "use strict";
    o(window).on("load", function() {
        o("#preloader").length && o("#preloader").delay(50).fadeOut("slow", function() {
            o(this).remove()
        })
    });
    var e = o("#header").outerHeight() - 2;
    if (o(document).on("click", ".nav-menu a, .mobile-nav a, .scrollto", function(n) {
            if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
                var t = o(this.hash);
                if (t.length) {
                    n.preventDefault();
                    var i = t.offset().top - e;
                    return "#header" == o(this).attr("href") && (i = 0), o("html, body").animate({
                        scrollTop: i
                    }, 1500, "easeInOutExpo"), o(this).parents(".nav-menu, .mobile-nav").length && (o(".nav-menu .active, .mobile-nav .active").removeClass("active"), o(this).closest("li").addClass("active")), o("body").hasClass("mobile-nav-active") && (o("body").removeClass("mobile-nav-active"), o(".mobile-nav-toggle i").toggleClass("icofont-navigation-menu icofont-close"), o(".mobile-nav-overly").fadeOut()), !1
                }
            }
        }), o(document).ready(function() {
            if (window.location.hash) {
                var n = window.location.hash;
                if (o(n).length) {
                    var t = o(n).offset().top - e;
                    o("html, body").animate({
                        scrollTop: t
                    }, 1500, "easeInOutExpo")
                }
            }
        }), o(".nav-menu").length) {
        var n = o(".nav-menu").clone().prop({
            class: "mobile-nav d-lg-none"
        });
        o("body").append(n), o("body").prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>'), o("body").append('<div class="mobile-nav-overly"></div>'), o(document).on("click", ".mobile-nav-toggle", function(e) {
            o("body").toggleClass("mobile-nav-active"), o(".mobile-nav-toggle i").toggleClass("icofont-navigation-menu icofont-close"), o(".mobile-nav-overly").toggle()
        }), o(document).on("click", ".mobile-nav .drop-down > a", function(e) {
            e.preventDefault(), o(this).next().slideToggle(300), o(this).parent().toggleClass("active")
        }), o(document).click(function(e) {
            var n = o(".mobile-nav, .mobile-nav-toggle");
            n.is(e.target) || 0 !== n.has(e.target).length || o("body").hasClass("mobile-nav-active") && (o("body").removeClass("mobile-nav-active"), o(".mobile-nav-toggle i").toggleClass("icofont-navigation-menu icofont-close"), o(".mobile-nav-overly").fadeOut())
        })
    } else o(".mobile-nav, .mobile-nav-toggle").length && o(".mobile-nav, .mobile-nav-toggle").hide();
    var t = o("section"),
        i = o(".nav-menu, #mobile-nav");
    o(window).on("scroll", function() {
        var e = o(this).scrollTop() + 200;
        t.each(function() {
            var n = o(this).offset().top,
                t = n + o(this).outerHeight();
            e >= n && e <= t && (e <= t && i.find("li").removeClass("active"), i.find('a[href="#' + o(this).attr("id") + '"]').parent("li").addClass("active")), e < 300 && o(".nav-menu ul:first li:first").addClass("active")
        })
    }), o(window).scroll(function() {
        o(this).scrollTop() > 100 ? o("#header").addClass("header-scrolled") : o("#header").removeClass("header-scrolled")
    }), o(window).scrollTop() > 100 && o("#header").addClass("header-scrolled"), o(window).scroll(function() {
        o(this).scrollTop() > 100 ? o(".back-to-top").fadeIn("slow") : o(".back-to-top").fadeOut("slow")
    }), o(".back-to-top").click(function() {
        return o("html, body").animate({
            scrollTop: 0
        }, 1500, "easeInOutExpo"), !1
    })
  }(jQuery);
  const grade = document.querySelector(".grades"),
    levels = document.querySelector(".levels");
  
  function activity(o) {
    "KG" === o && (levels.innerHTML = "<option>1</option><option>2</option><option>3</option>"), "Primary School" === o && (levels.innerHTML = "<option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option>"), "High School" === o && (levels.innerHTML = "<option>9</option><option>10</option><option>11</option><option>12</option>")
  }
  grade.addEventListener("change", () => {
    activity(grade.value)
  });