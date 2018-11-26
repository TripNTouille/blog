/**
 * navigation.js
 *
 * Handles toggling the navigation menu for small screens.
 */
( function() {
	var container, button, menu;

	container = document.getElementById( 'site-navigationbwrap' );
	if ( ! container )
		return;

	button = container.getElementsByTagName( 'h1' )[0];
	if ( 'undefined' === typeof button )
		return;

	menu = container.getElementsByTagName( 'ul' )[0];

	// Hide menu toggle button if menu is empty and return early.
	if ( 'undefined' === typeof menu ) {
		button.style.display = 'none';
		return;
	}

	if ( -1 === menu.className.indexOf( 'nav-menu' ) )
		menu.className += ' nav-menu';

	button.onclick = function() {
		if ( -1 !== container.className.indexOf( 'toggled' ) )
			container.className = container.className.replace( ' toggled', '' );
		else
			container.className += ' toggled';
	};
} )();

( function() {
	var is_webkit = navigator.userAgent.toLowerCase().indexOf( 'webkit' ) > -1,
	    is_opera  = navigator.userAgent.toLowerCase().indexOf( 'opera' )  > -1,
	    is_ie     = navigator.userAgent.toLowerCase().indexOf( 'msie' )   > -1;

	if ( ( is_webkit || is_opera || is_ie ) && 'undefined' !== typeof( document.getElementById ) ) {
		var eventMethod = ( window.addEventListener ) ? 'addEventListener' : 'attachEvent';
		window[ eventMethod ]( 'hashchange', function() {
			var element = document.getElementById( location.hash.substring( 1 ) );

			if ( element ) {
				if ( ! /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) )
					element.tabIndex = -1;

				element.focus();
			}
		}, false );
	}
})();

/**
 * sticky-nav.js
 *
 * License: GNU General Public License v2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 *
 */
jQuery(document).ready(function($) {
	var $filter = $('.main-navigationbwrap');
	var $filterSpacer = $('<div />', {
		"class": "filter-drop-spacer",
		"height": $filter.outerHeight()
	});


	if ($filter.size())
	{
		$(window).scroll(function ()
		{
			if (!$filter.hasClass('fix') && $(window).scrollTop() > $filter.offset().top)
			{
				$filter.before($filterSpacer);
				$filter.addClass("fix");
			}
			else if ($filter.hasClass('fix')  && $(window).scrollTop() < $filterSpacer.offset().top)
			{
				$filter.removeClass("fix");
				$filterSpacer.remove();
			}
		});
	}

});
