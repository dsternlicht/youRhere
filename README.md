# youRhere jQuery plugin

* http://yourhere.gandtblog.com/
* Copyright 2012, Daniel Sternlicht
* http://www.danielsternlicht.com
* Dual licensed under the MIT or GPL Version 2 licenses.		
* Enjoy :)

## What does "youRhere" jQuery plugin do?

"youRhere" is an awesome jQuery plugin which give your readers a chance to mark their article reading- progress by just clicking it.

## Features

* 100% Free
* Using HTML5 local storage API
* Full "rtl" & "ltr" support
* First time usage wizard
* Very easy to implement
* Cross Browsers support
* Multiple configurability options
* 1 JS file - Only 12k
* Minimized version - Only 8k

## Usage

As I said, it's very easy to implement "youRhere" in your website. All you have to do is to include the "jquery.urhere.js" file, and then activate it on the relevant container. For example:

	<script type="text/javascript" src="js/jQuery.Last.Version"></script> 
	<script type="text/javascript" src="js/jquery.yourhere.js"></script> 
	<script type="text/javascript">	
	$(document).ready(function(){	
		$('#content').yourhere();	
	});	
	</script>

## Options

When you activate the plugin, the activation function can pass a few arguments which allow you to control the plugin. Here is a list of options with their default settings:

	firstTimeWizard: true,
	useLocalStorage: true,
	autoScrollToMarker: true, 
	markerDirection: 'left',
	tempMarkerBackground: '#B7B7B7',
	markerLineBackground: '#FFF82A',
	markerBackgroundOpacity: '0.7',
	markerBackground: '#000',
	markerWidth: '5px', 
	supportedElements: 'h1, h2, h3, h4, h5, h6, p, ul, li'
	
Let's have a quick look about "youRhere" options.

### firstTimeWizard

Sets the activation of the "first time wizard" when the plugin detect it's the first time the user enter this website. Accept "true" or "false".

### useLocalStorage

Controls the HTML5 Local Storage API that allow the user to save his reading progress by marking a line. Accept "true" or "false".

### autoScrollToMarker

In case your "useLocalStorage" is set to "true" you can specified if you want the users window to scroll automatically to the last line they have marked. Accept "true" or "false".

### markerDirection

Controls which way the marker will appear. Your choices between 'right' or 'left'.

### tempMarkerBackground

Controls the scrolling "marker" background. Sets a "Background" property to the ".yourhere-tempMarker" DIV. Basically can accept anything you want including background colors, images, positions and so on..

### markerLineBackground

Controls the background color of the highlighted line. Accept any color with any format you want. f.e "black", "#000000", "rgb(0,0,0)".

### markerBackgroundOpacity

Sets an "Opacity" property to the highlighted line background. Accept any number in the range of 0.0 - 1.0.

### markerBackground

Controls the "marker" element background. Sets a "Background" property to the ".yourhere-marker" DIV. Can accept anything you want including background colors, images, positions and so on..

### markerWidth

Sets a "Width" property to the Marker element ('.yourhere-marker'). Accept a number of pixels. f.e "20px"

### supportedElements

Sets which DOM elements will respond to the youRhere click event (highlighted text). Accept multiple elements, should be seperated by ",". f.e: "p, h2, blockquote" - will trigger the click event on paragraphs, heading 2 text and blockquotes.

## Demo

You can see a few examples on our Demo Page at: http://yourhere.gandtblog.com/demo.html

## Release

* Current 1.4 beta - Added window.resize & hover events support and fixed bugs. Updated on 8/2/12.
* 1.3 beta - Added "first time wizard", changed functionality and fixed some bugs. Last updated on 2/2/12. 
* 1.2 beta - Added scroll to last marker option and bug fixes. Last updated on 31/1/12. 
* 1.1 beta - Added HTML5 Local Storage support and bug fixes. Last updated on 30/1/12. 
* 1.0 beta - "youRhere" jQuery plugin. Last updated on 27/1/12.

Don't forget to like & share youRhere from:
http://yourhere.gandtblog.com/