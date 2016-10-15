$(function() {

	var scrollset = $(window).height() - $('.main_header').height();
	var header_holder = $('.header_holder');

	// Mobile Menu
	$('.header_parent_wrap').append('<div class="mobile-navigation-toggle"><div class="toggle-box"><div class="toggle-inner"></div></div></div>');
	$('.mobile_menu_wrapper').html($('.main_header nav').html());

	$('.mobile-navigation-toggle').on("click", function() {
		$('.mobile_menu_wrapper').slideToggle(300);
		$(this).toggleClass("is-active");
	});

	$('.mobile_menu_wrapper li').find('a').on("click", function(e) {
		if($(this).parent().hasClass("menu-item-has-children")) {
			e.preventDefault();
		} 
		$(this).parent().toggleClass("showsub").children('.sub-nav').slideToggle();
	});


	// Fixed & Transparent
	var body = $('body');
	if ($('.sticky_menu_enabled').size() > 0 && $(window).width() > 900) {
		if ($('.strip_template').size() > 0) {
			var scrollset = $(window).height() - $('.main_header').height();
		} else {
			header_holder.show();
			body.addClass('fixed_show');
			scrollset = 0;
		}
		$(window).on('scroll', function () {
			if ($(window).scrollTop() > scrollset) {
				body.addClass('small_sticky');
				if ($('.strip_template').size() > 0) {
					header_holder.show();
					body.addClass('fixed_show');
				}
			} else {
				body.removeClass('small_sticky');
				if ($('.strip_template').size() > 0) {
					header_holder.hide();
					body.removeClass('fixed_show');
				}
			}
		});
	}

});
