(function($) {
	$(function() {
		$(document).ready(function(){
			var fadeWd = $('#myCarousel').css('margin-left');
			$('#slideshow-wrapper .fade').width(fadeWd);

			if ($(window).width() <= 796){
				var lfOffset = (($(window).width()) - 400) / 2;
				$('#myCarousel .caption').css('left', lfOffset);
			}
		});
		$(window).on('resize', function(){
			var fadeWd = $('#myCarousel').css('margin-left');
			$('#slideshow-wrapper .fade').width(fadeWd);

			if ($(window).width() <= 796){
				var lfOffset = (($(window).width()) - 400) / 2;
				$('#myCarousel .caption').css('left', lfOffset);
			}
			else{
				$('#myCarousel .caption').css('left', '130px');
			}
		});
		$('#menu-btn').on('click', function(){
			if ($('#mobile-nav').hasClass('open')){
				$('#mobile-nav').removeClass('open');
			}
			else{
				$('#mobile-nav').addClass('open');
			}
		});
	});
})(jQuery)