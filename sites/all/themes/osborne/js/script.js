(function($) {
	$(function() {
		$(document).ready(function(){
			var fadeWd = $('#myCarousel').css('margin-left');
			$('#slideshow-wrapper .fade').width(fadeWd);

			if ($(window).width() <= 796){
				var lfOffset = (($(window).width()) - 400) / 2;
				$('#myCarousel .caption').css('left', lfOffset);
			}
			if ($(window).width() <= 620){
				$('#lightbox .field-item').unbind('click', handler);
			}

			var item, img, title, large_img;
			var CW, CH, CL, CT, hpadding, vpadding, imgtag;
			var lb_loading = false;
			var doc = $(document);
			
			$("#lightbox .field-item").click(function(){
				if(lb_loading) return false;
				lb_loading= true;
				item = $(this);
				img = item.find("img");
				title = item.find("img").attr('title');
				
				//Remove active class from previously clicked item
				$("#lightbox .field-item.active").removeClass("active");
				//Mark the clicked item as active for later use
				item.addClass("active");
				
				//The large image
				large_img = new Image();
				large_img.src = img.attr("src");
				
				//Adding additional HTML
				if($(".lb_backdrop").length < 1)
				{
					var lb_backdrop = '<div class="lb_backdrop"></div>';
					var lb_canvas = '<div class="lb_canvas"></div>';
					var lb_previous = '<span class="lb_previous"><</span>';
					var lb_title = '<span class="lb_title"></span>';
					var lb_next = '<span class="lb_next">></span>';
					var lb_controls = '<div class="lb_controls">'+lb_previous+lb_title+lb_next+'</div>';
					var total_html = lb_backdrop+lb_canvas+lb_controls;
					
					$(total_html).appendTo("body");
				}
				//Fade in lightbox elements if they are hidden due to a previous exit
				if($(".lb_backdrop:visible").length == 0)
				{
					$(".lb_backdrop, .lb_canvas, .lb_controls").fadeIn("slow");
				}
				
				//Display preloader till the large image loads and make the previous image translucent so that the loader in the BG is visible
				if(!large_img.complete) 
					$(".lb_canvas").addClass("loading").children().css("opacity", "0.5")
				
				//Disabling left/right controls on first/last items
				if(item.prev().length == 0)
					$(".lb_previous").addClass("inactive");
				else
					$(".lb_previous").removeClass("inactive");
				if(item.next().length == 0)
					$(".lb_next").addClass("inactive");
				else
					$(".lb_next").removeClass("inactive");
				
				//Centering .lb_canvas
				CW = $(".lb_canvas").outerWidth();
				CH = $(".lb_canvas").outerHeight();
				//top and left coordinates
				CL = ($(window).width() - CW)/2;
				CT = ($(window).height() - CH)/2;
				$(".lb_canvas").css({top: CT, left: CL});
				
				$(large_img).load(function(){
					//Recentering .lb_canvas with new dimensions
					CW = 620;
					CH = 320;
					//.lb_canvas padding to be added to image width/height to get the total dimensions
					hpadding = parseInt($(".lb_canvas").css("paddingLeft")) + parseInt($(".lb_canvas").css("paddingRight"));
					vpadding = parseInt($(".lb_canvas").css("paddingTop")) + parseInt($(".lb_canvas").css("paddingBottom"));
					CL = ($(window).width() - CW)/2;
					CT = ($(window).height() - CH)/2;
					
					//Animating .lb_canvas to new dimentions and position
					$(".lb_canvas").html("").animate({width: CW, height: CH, top: CT, left: CL}, 500, function(){
						//Inserting the image but keeping it hidden
						imgtag = '<img src="'+large_img.src+'" style="opacity: 0; width: 600px; height: 300px;" />';
						$(".lb_canvas").html(imgtag);
						$(".lb_canvas img").fadeTo("slow", 1);
						//Displaying the image title
						$(".lb_title").html(title);
						
						lb_loading= false;
						$(".lb_canvas").removeClass("loading");
					})
				})
			})
			
			//Click based navigation
			doc.on("click", ".lb_previous", function(){ navigate(-1) });
			doc.on("click", ".lb_next", function(){ navigate(1) });
			doc.on("click", ".lb_backdrop", function(){ navigate(0) });
			$('.lb_backdrop').on('click', function(){
				$("#lightbox .field-item.active").removeClass("active");
					$(".lb_canvas").removeClass("loading");
					//Fade out the lightbox elements
					$(".lb_backdrop, .lb_canvas, .lb_controls").fadeOut("slow", function(){
						//empty canvas and title
						$(".lb_canvas, .lb_title").html("");
					})
					lb_loading= false;
			});
			//Keyboard based navigation
			doc.keyup(function(e){
				//Keyboard navigation should work only if lightbox is active which means backdrop is visible.
				if($(".lb_backdrop:visible").length == 1)
				{
					//Left
					if(e.keyCode == "37") navigate(-1);
					//Right
					else if(e.keyCode == "39") navigate(1);
					//Esc
					else if(e.keyCode == "27") navigate(0);
				}
			});
			
			//Navigation function
			function navigate(direction)
			{
				if(direction == -1) // left
					$("#lightbox .field-item.active").prev().trigger("click");
				else if(direction == 1) //right
					$("#lightbox .field-item.active").next().trigger("click");
				else if(direction == 0) //exit
				{
					$("#lightbox .field-item.active").removeClass("active");
					$(".lb_canvas").removeClass("loading");
					//Fade out the lightbox elements
					$(".lb_backdrop, .lb_canvas, .lb_controls").fadeOut("slow", function(){
						//empty canvas and title
						$(".lb_canvas, .lb_title").html("");
					})
					lb_loading= false;
				}
			}

		});


		$(window).on('resize', function(){
			var fadeWd = $('#myCarousel').css('margin-left');
			$('#slideshow-wrapper .fade').width(fadeWd);

			if ($(window).width() <= 796){
				var lfOffset = (($(window).width()) - 400) / 2;
				$('#myCarousel .caption').css('left', lfOffset);
			}
			if ($(window).width() <= 620){
				$('#lightbox .field-item').unbind('click', handler);
			}
			if ($(window).width() > 620){
				$('#lightbox .field-item').bind('click', handler);
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