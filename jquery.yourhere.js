/**************************************************************
	* youRhere v1.4 - jQuery Plugin
	* http://yourhere.gandtblog.com/
	* Copyright 2012, Daniel Sternlicht
	* http://www.danielsternlicht.com
	* Dual licensed under the MIT or GPL Version 2 licenses.		
	* Enjoy :)
***************************************************************/

(function($) {
	
	// youRhere jQuery plugin
	$.yourhere = {
		
		init: function(options, box) {			
			var boxLineHeight = parseFloat(box.css('fontSize'));
			var basicZindex = box.css('z-index') != 'auto' ? parseInt(box.css('z-index')) : 10;			
			
			// Check the container has position and set a default if not
			if(box.css('position') == 'static') box.css('position', 'relative');	

			// Initialized the default settings
			$.yourhere.opts = $.extend({}, $.fn.yourhere.defaults, options);

			// Set a relative position to the container childrens
			box.children().css({zIndex: basicZindex + 2, position: 'relative'});
			
			// Create the marker
			$('<div class="yourhere-marker"></div>').hide().appendTo(box).css({
				position: 'absolute',
				zIndex: basicZindex + 3,
				width: $.yourhere.opts.markerWidth,
				cursor: 'pointer',
				background: $.yourhere.opts.markerBackground,
				height: boxLineHeight + 'px'		
			});
			
			// Create the marker highlight line
			$('<div class="yourhere-markerline"></div>').hide().appendTo(box).css({
				position: 'absolute',
				zIndex: basicZindex + 1,
				backgroundColor: $.yourhere.opts.markerLineBackground,
				opacity: $.yourhere.opts.markerBackgroundOpacity,
				height: boxLineHeight + 'px'		
			});	
			
			// Check for previus data storage
			$.yourhere.checkStorage(box);
			
			// Create the temporary marker
			$.yourhere.tempMarker(box, boxLineHeight, basicZindex);						
			
			// Events handler
			$.yourhere.eventsHandler(box, boxLineHeight);
						
		},
		
		eventsHandler: function(box, boxLineHeight) {
			var boxOffset = box.offset().top;
			
			// Hover event to reveal / hide the temp marker
			box.hover(function(){
				box.find('.yourhere-temp-marker').stop(true, true).fadeIn('slow');
			}, function(){
				box.find('.yourhere-temp-marker').stop(true, true).fadeOut('slow');
			});
			
			// Click event on an element
			box.children($.yourhere.opts.supportedElements).click(function(e){
				if(localStorage && !localStorage.getItem('yourhere_first_time') && $.yourhere.opts.firstTimeWizard) {
					placeMarker($(this), e);					
					$.yourhere.firstTime(box);
					box.children($.yourhere.opts.supportedElements).unbind('click');
				}
			});
			
			// Double click event on an element
			box.children($.yourhere.opts.supportedElements).dblclick(function(e){
				placeMarker($(this), e);
				if(localStorage && !localStorage.getItem('yourhere_first_time') && $.yourhere.opts.firstTimeWizard) $.yourhere.firstTime(box);
			});

			// Mouse move event
			box.children().mousemove(function(e){
				var lineHeight = parseFloat($(this).css('lineHeight')) > parseFloat($(this).css('fontSize')) ? parseFloat($(this).css('lineHeight')) : parseFloat($(this).css('fontSize'));
				var y = e.pageY - boxOffset - (lineHeight / 2);
				if(e.pageY < boxOffset + lineHeight / 2 || e.pageY > box.height() + boxOffset) return;
				box.find('.yourhere-temp-marker').stop(true, true).animate({
					top: y,
					height: lineHeight + 'px'
				}, 'fast');
			});
			
			// Hide the marker
			box.find('.yourhere-marker').dblclick(function() {
				$(this).fadeOut('fast');
				box.find('.yourhere-markerline').fadeOut('fast');
				if(localStorage && $.yourhere.opts.useLocalStorage)
					localStorage.removeItem('yourhere_' + window.location.href);
			});
			
			function placeMarker(elm, e) {
				var lineHeight = parseFloat(elm.css('lineHeight')) > parseFloat(elm.css('fontSize')) ? parseFloat(elm.css('lineHeight')) : parseFloat(elm.css('fontSize'));	
				var elmOffset = elm.offset().top;
				var z = e.pageY - elmOffset;
				var e = Math.floor(z / lineHeight);
				var y = elmOffset - boxOffset + (e * lineHeight);
				$.yourhere.markerCreator(box, y, lineHeight);
				if(localStorage && $.yourhere.opts.useLocalStorage){
					localStorage.removeItem('yourhere_' + window.location.href);
					localStorage.setItem('yourhere_' + window.location.href, y + "," + lineHeight);
				}
			}
		},
		
		tempMarker: function(box, lineHeight, z) {
			$('<div class="yourhere-temp-marker"></div>').appendTo(box).css({
				position: 'absolute',
				zIndex: z + 1,
				width: $.yourhere.opts.markerWidth,
				height: lineHeight + 'px',				
				top: 0,
				background: $.yourhere.opts.tempMarkerBackground
			});
			box.find('.yourhere-temp-marker').css($.yourhere.opts.markerDirection, (-(box.find('.yourhere-temp-marker').width()) + 'px'))
			.hide();
		},
		
		markerCreator: function(box, y, lineHeight) {
			// Remove previus markers
			box.find('.yourhere-marker, .yourhere-markerline').fadeOut('fast');
			
			// Place the marker
			box.find('.yourhere-marker').stop(true, true)
			.fadeIn().css({
				height: lineHeight + 'px',				
				top: y				
			});		
			
			// Place the marker line
			box.find('.yourhere-markerline').stop(true, true)
			.fadeIn()
			.width(box.outerWidth() + box.find('.yourhere-marker').width())
			.css({
				height: lineHeight + 'px',				
				top: y				
			});
			
			// Give the marker left / right offset
			box.find('.yourhere-marker, .yourhere-markerline').css($.yourhere.opts.markerDirection, (-(box.find('.yourhere-marker').width()) + 'px'));
		},
		
		checkStorage: function(box) {
			if(localStorage && $.yourhere.opts.useLocalStorage) {
				var data = localStorage.getItem('yourhere_' + window.location.href);
				if(data && data != '') {
					var arr = data.split(',');
					$.yourhere.markerCreator(box, parseInt(arr[0]), parseInt(arr[1]));
					if($.yourhere.opts.autoScrollToMarker) {
						setTimeout(function() {
							$('body').animate({
								scrollTop: parseInt(arr[0])
							});
						}, 1500);
					}										
				}
			} else {
				if(localStorage) localStorage.removeItem('yourhere_' + window.location.href);
				return;
			}
		},
		
		firstTime: function(box) {
			// Check if tooltip already exist
			if(box.find('.yourhere-tooltip').length <= 0) {
				
				// Create the tooltip
				$('<div class="yourhere-tooltip"><div class="yourhere-tooltip-step"></div></div>').appendTo(box).hide()
				.css({
					width: '220px',
					height: '100px',
					padding: '10px',
					background: '#eee',
					position: 'absolute',
					top: '0',
					border: '1px solid #c7c7c7',
					borderRadius: '5px',
					boxShadow: '0 1px 2px rgba(0,0,0,0.4), inset 0 0 1px #fff',
					lineHeight: '18px',
					fontSize: '12px',
					direction: 'ltr',
					zIndex: '999'
				});
				
				var tooltip = box.find('.yourhere-tooltip');				
				tooltip.css($.yourhere.opts.markerDirection, -(parseFloat(tooltip.outerWidth()) / 2) + 'px')
				.find('.yourhere-tooltip-step').html($.yourhere.firstTimeSteps[0]);								
				
				$('<div class="yourhere-tooltip-cornerT"></div>').appendTo(tooltip)
				.css({
					width: 0,
					height: 0,
					borderTop: '9px solid #eee',
					borderRight: '10px solid transparent',
					borderLeft: '10px solid transparent',
					position: 'absolute',
					bottom: '-9px',
					left: parseFloat(tooltip.width()) / 2 - 5 + 'px',
					color: '#909090',
					zIndex: '999'
				});
				
				$('<div class="yourhere-tooltip-cornerB"></div>').appendTo(tooltip)
				.css({
					width: 0,
					height: 0,
					borderTop: '10px solid #c7c7c7',
					borderRight: '11px solid transparent',
					borderLeft: '11px solid transparent',
					position: 'absolute',
					bottom: '-10px',
					left: parseFloat(tooltip.find('.yourhere-tooltip-cornerT').css('left')) - 1 + 'px',
					zIndex: '998'
				});
				
				$('<span class="yourhere-tooltip-close">x</span>').appendTo(tooltip)
				.css({
					position: 'absolute',
					top: '0',
					right: '5px',
					fontSize: '12px',
					color: '#a7a7a7',
					cursor: 'pointer',
					zIndex: '1000'
				});
				
				$('<a class="yourhere-tooltip-next" href="#">next</a>').appendTo(tooltip).css({
					position: 'absolute',
					right: '10px',
					bottom: '5px'
				});
			}
			
			// Place the tooltip relative to the youRhere marker
			setTimeout(function(){
				$('.yourhere-tooltip').fadeIn(function(){
					$('.yourhere-tooltip').animate({top: parseFloat(box.find('.yourhere-marker').css('top')) - parseFloat($('.yourhere-tooltip').outerHeight()) - 13});					
					$.yourhere.checkOffset();
				});
			}, 1000);
			
			$.yourhere.firstTimeTutorialEvents(box, tooltip);
		},
		
		checkOffset: function() {
			var tooltip = $('.yourhere-tooltip');
			if(tooltip.offset().left < 0) {
				tooltip.stop().animate({left: 0 + 'px'});
			}
			else {
				tooltip.stop().animate({left: -(parseFloat(tooltip.outerWidth()) / 2) + 'px'});
			}
		},
		
		firstTimeTutorialEvents: function(box, tooltip) {
			var step = 0;
			
			// Close the tooltip
			tooltip.find('.yourhere-tooltip-close').live('click', function(e){
				e.preventDefault();
				tooltip.fadeOut('normal', function(){
					$(this).remove();
				});
				if(localStorage) localStorage.setItem('yourhere_first_time', false);
			});
			
			// Next button events
			tooltip.find('.yourhere-tooltip-next').live('click', function(e){
				e.preventDefault();
				step++;
				tooltip.find('.yourhere-tooltip-step').fadeOut('fast', function(){
					$(this).html($.yourhere.firstTimeSteps[step]).fadeIn('slow');
				});
				if(step == $.yourhere.firstTimeSteps.length - 1) {
					var nextBtn = $(this);
					nextBtn.removeClass('yourhere-tooltip-next').text('close');					
					setTimeout(function(){
						nextBtn.addClass('yourhere-tooltip-close');
					}, 500);
				}
			});
			
			$(window).resize(function(){
				$.yourhere.checkOffset();
			});
		},

		firstTimeSteps: [
			'<strong>Hey you</strong>! <br />We have noticed that this is the first time your\'re using "<a href="http://yourhere.gandtblog.com" target="_blank">youRhere</a>" marker in this website, so we made just for you a short "how to?" tutorial.',
			'<strong>youRhere</strong> allow you to mark a line on the page by just <strong>double clicking it</strong>, so you could save your reading progress and come back to it later. <br />Don\'t be shy, try it now!',
			'If you accidently marked a line and you want to remove the highlight from the page your\'e reading, you may do so by just <strong>double click on the marker itself</strong>.',
			'That\'s it! <br /> This is all you have to know about <strong>youRhere</strong>. For more information you can visit <a href="http://yourhere.gandtblog.com" target="_blank">youRhere official website</a>. <br />Enjoy!'
		],
		
		opts: {}
		
	}
	
	// Creating new instance for each youRhere call
	$.fn.yourhere = function( options ) {
		var yourhere = new $.yourhere.init( options, this );        
    };
	
	// youRhere default properties
	$.fn.yourhere.defaults = {
		firstTimeWizard: true,
		useLocalStorage: true,
		autoScrollToMarker: true,
		markerDirection: 'left',
		tempMarkerBackground: '#b7b7b7',
		markerLineBackground: '#FFF82A',
		markerBackgroundOpacity: '0.7',
		markerBackground: '#000',
		markerWidth: '5px',
		supportedElements: 'h1, h2, h3, h4, h5, h6, p, ul, li'
	}

})(jQuery);