(function($) {
	$(function() {
		$(document).ready(function(){
			var fadeWd = $('#myCarousel').css('margin-left');
			$('#slideshow-wrapper .fade').width(fadeWd);
		});
		$(window).on('resize', function(){
			var fadeWd = $('#myCarousel').css('margin-left');
			$('#slideshow-wrapper .fade').width(fadeWd);
		});
	});
})(jQuery)