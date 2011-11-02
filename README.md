# Simple Image Comparison jQuery Plugin

* Author: John Dyer [http://j.hn/](http://j.hn/)
* License: GPLv2/MIT
* Thanks: my employer, [Dallas Theological Seminary](http://www.dts.edu/)

## Installation and Usage

### 1. Add Script and Stylesheet

	<script src="jquery.js"></script>
	<script src="pinbox.js"></script>
	<link rel="stylesheet" href="pinbox.css" />

### 2. Add an `<img />` tag and specify dimensions
	
	<img src="images/convent-pano.jpg"
		width="940"
		height="365"
		data-small-src="images/convent-pano-inner.jpg"
		data-small-width="507"
		data-small-height="264"
		data-small-left="163"
		data-small-top="11"
		class="pinbox"
		alt="View from Convent Street"
	/>

### 3. Call the jQuery Plugin

	<script>
	jQuery(document).ready(function($) {
		$('.pinbox').pinbox();
	});
	</script>

	