/*!
 * jQuery Pinbox
 * author: John Dyer (http://j.hn/)
 *
 * Copyright 2011, John Dyer, Dallas Theological Seminary
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Date: October 4, 2011
 */

(function($) {
$.fn.pinbox = function() {
	return this.each(function() {

		var img = $(this),

			// the outer container which has relative positioning for the inner components
			outer = $('<div class="pinbox-outer"></div>')
				.css({
					//background: 'url(' + img.attr('src') + ') top left no-repeat',
					width: img.attr('width') + 'px',
					height: img.attr('height') + 'px'
				})
				.insertAfter(img)
				.append(img),

			// the always visible border around the image
			border = $('<div class="pinbox-border"></div>')
				.css({
					width: img.data('small-width') + 'px',
					height: img.data('small-height') + 'px'
				})
				.appendTo(outer),

			// the container for the image
			inner = $('<div class="pinbox-inner"></div>')
				.css({
					width: img.data('small-width') + 'px',
					height: img.data('small-height') + 'px'
				})
				.appendTo(border),

			innerImg =$('<img src="' +  img.data('small-src') + '" width="' +  img.data('small-width') + '" height="' +  img.data('small-height') + '" />')
				.appendTo(inner);

		// adjust top/left for border thickness
		border.css({top: (parseInt(img.data('small-top'), 10) - parseInt(border.css('border-top-width'), 10)) + 'px',
					left: (parseInt(img.data('small-left'), 10) - parseInt(border.css('border-left-width'), 10)) + 'px'});


		outer.hover(
			function(e) {
				$(document).bind('mousemove',mouseMove);
				inner.css({display: 'block', opacity: 0});
			},
			function (e) {
				$(document).unbind('mousemove',mouseMove);
				inner.css({display: 'none', opacity: 0});
			}
		);

		function mouseMove(e) {

			// positions and sizes
			var outerPos = outer.offset(),
				mousePos = {x: e.pageX - outerPos.left, y: e.pageY - outerPos.top},
				outerDim = {width: outer.outerWidth(), height: outer.outerHeight() },
				borderPos = {top: parseFloat(border.css('top'),10), left: parseFloat(border.css('left'),10)},
				borderDim = {width: border.outerWidth(true), height: border.outerHeight(true) },

				opacityFromTop = 	1 - ((borderPos.top - mousePos.y) / borderPos.top),
				opacityFromRight = 	1 + ((borderPos.left + borderDim.width - mousePos.x) / (outerDim.width - borderPos.left - borderDim.width)),
				opacityFromBottom = 1 + ((borderPos.top + borderDim.height - mousePos.y) / (outerDim.height - borderPos.top - borderDim.height)),
				opacityFromLeft = 	1 - ((borderPos.left - mousePos.x) / borderPos.left),

				opacity = 0,
				place = ''
				;


			if (mousePos.y < borderPos.top) {

				// NW
				if (mousePos.x < borderPos.left) {
					opacity = Math.min(opacityFromTop, opacityFromLeft);

				// NE
				} else if (mousePos.x > borderPos.left + borderDim.width) {
					opacity = Math.min(opacityFromTop,opacityFromRight);

				// N
				} else {
					opacity = opacityFromTop ;
				}

			} else if (mousePos.y > borderPos.top + borderDim.height) {
				// UNDER

				// SW
				if (mousePos.x < borderPos.left) {
					opacity = Math.min(opacityFromBottom,opacityFromLeft);

				// SE
				} else if (mousePos.x > borderPos.left + borderDim.width) {
					opacity = Math.min(opacityFromBottom,opacityFromRight);

				// S
				} else {
					opacity = opacityFromBottom;
				}

			} else {
				// MIDDLE

				// W
				if (mousePos.x < borderPos.left) {
					opacity = opacityFromLeft;

				// E
				} else if (mousePos.x > borderPos.left + borderDim.width) {
					opacity = opacityFromRight;

				// N
				} else {
					opacity = 1;
				}

			}

			inner.css({opacity: opacity});
		}

		return outer;
	});
}
})(jQuery);
