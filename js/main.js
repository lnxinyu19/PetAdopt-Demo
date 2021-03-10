(function($) {

	"use strict";


	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

  // var carousel = function() {
	// 	$('.carousel-testimony').owlCarousel({
	// 		center: true,
	// 		loop: true,
	// 		items:1,
	// 		margin: 30,
	// 		stagePadding: 0,
	// 		nav: false,
	// 		navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
	// 		responsive:{
	// 			0:{
	// 				items: 1
	// 			},
	// 			600:{
	// 				items: 2
	// 			},
	// 			1000:{
	// 				items: 3
	// 			}
	// 		}
	// 	});

	// };
	// carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});
  $('#goTop-btn').click(function(e) {
    e.preventDefault();
    $('html,body').animate({
        scrollTop: 0
      }, 600);        
  });
})(jQuery);

