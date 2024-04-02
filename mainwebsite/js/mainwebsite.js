$(document).ready(function () {
    // Declaring Global variables and functions
    var App = {
        api:"http://www.aisisoftdevcorptemplate.com/api",
        canvas:$("#canvas"),
        navcanvas:$("#navcanvas"),
        wowFunction:function wow(){
            // Initiate the wowjs
            new WOW().init();
        },
        stickyNav:function stickyNav(){
             // Sticky Navbar
            $(window).scroll(function () {
                if ($(this).scrollTop() > 45) {
                    $('.nav-bar').addClass('sticky-top');
                } else {
                    $('.nav-bar').removeClass('sticky-top');
                }
            });
        },
        backToTop:function backToTop(){
            // Back to top button
            $(window).scroll(function () {
                if ($(this).scrollTop() > 300) {
                    $('.back-to-top').fadeIn('slow');
                } else {
                    $('.back-to-top').fadeOut('slow');
                }
            });
            $('.back-to-top').click(function () {
                $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
                return false;
            });
        },
        spinnerFunction:function spinnerFunction(){
             // Spinner
            var spinner = function () {
                setTimeout(function () {
                    if ($('#spinner').length > 0) {
                        $('#spinner').removeClass('show');
                    }
                }, 1);
            };
            spinner();
        },
        headerFunction:function headerFunction(){
            // Header
            $(".header-carousel").owlCarousel({
                autoplay: true,
                smartSpeed: 1500,
                items: 1,
                dots: true,
                loop: true,
                nav : false,
                navText : [
                    '<i class="bi bi-chevron-left"></i>',
                    '<i class="bi bi-chevron-right"></i>'
                ]
            });
        },
        testimonialFunc:function testimonialFunc(){
            // Testimonials carousel
            $(".testimonial-carousel").owlCarousel({
                autoplay: true,
                smartSpeed: 1000,
                margin: 24,
                dots: false,
                loop: true,
                nav : true,
                navText : [
                    '<i class="bi bi-arrow-left"></i>',
                    '<i class="bi bi-arrow-right"></i>'
                ],
                responsive: {
                    0:{
                        items:1
                    },
                    992:{
                        items:2
                    }
                }
            });
        },
        principleFunc:function principleFunc(){
            $(".principles-carousel").owlCarousel({
                autoplay: true,
                smartSpeed: 1000,
                margin: 24,
                dots: false,
                loop: true,
                nav : true,
                navText : [
                    '<i class="bi bi-arrow-left"></i>',
                    '<i class="bi bi-arrow-right"></i>'
                ],
                responsive: {
                    0:{
                        items:1
                    },
                    992:{
                        items:1
                    }
                }
            });
        }

    }
    $.Mustache.load("templates/templates.html").done(function(){
        Path.map("#/home").to(function(){
            window.scrollTo(0, 0);
            App.navcanvas.html("").append($.Mustache.render("navbar"));
            App.canvas.html("").append($.Mustache.render("home"));
            App.stickyNav();
            App.spinnerFunction();
            App.wowFunction();
            App.backToTop();
            App.headerFunction();
            App.testimonialFunc();
        });

        Path.map("#/about").to(function(){
            window.scrollTo(0, 0);
            App.canvas.html("").append($.Mustache.render("about"));
            App.stickyNav();
            App.spinnerFunction();
            App.backToTop();
            App.wowFunction();
            App.headerFunction();
            App.principleFunc();
        });

        Path.map("#/contact").to(function(){
            window.scrollTo(0, 0);            
            App.canvas.html("").append($.Mustache.render("contactus"));
            App.stickyNav();
            App.spinnerFunction();
            App.backToTop();
            App.wowFunction();
            App.headerFunction();
            App.principleFunc();
            // Contact for Submmission
            $("#contact-form").on('submit',function(e){
                e.preventDefault();
                $("#loader").removeAttr('hidden');
                $("#sendbtn").hide();
                
                var name = $('input[name="name"]').val();
                var email = $('input[name="email"]').val();
                var subject = $('input[name="subject"]').val();
                var message = $('textarea[name="message"]').val();
                
                $.ajax({
                    type: "post",
                    url: App.api + "/email_from_contact_us",
                    data: {
                        name:name,
                        email:email,
                        subject:subject,
                        message:message
                    },
                    dataType: "",
                    error: function(response){
                        $("#modal-content").text(response);
                        $("#exampleModal").modal('toggle');
                        $('#contact-form')[0].reset();
                    },
                    success: function (response) {
                        $("#modal-content").text(response);
                        $("#exampleModal").modal('toggle');
                        $("#sendbtn").show();
                        $("#loader").attr("hidden", true);
                        $('#contact-form')[0].reset();
                    }
                });
                
            });
        });

        Path.map("#/services").to(function(){
            window.scrollTo(0,0);
            App.canvas.html("").append($.Mustache.render("services"));
            App.stickyNav();
            App.spinnerFunction();
            App.backToTop();
            App.wowFunction();
            App.headerFunction();
            App.principleFunc();
        });

        Path.root("#/home");
        Path.listen();
    });
});