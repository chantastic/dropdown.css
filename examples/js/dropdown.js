var Dropdown,
  DropdownEvents,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Dropdown = (function() {
  function Dropdown(el) {
    if(!el) {
      return;
    }

    this.el = el;
    
    this.close = __bind(this.close, this);
    this.toggle = __bind(this.toggle, this);

    this._focusDismissButton = __bind(this._focusDismissButton, this);
  }

  Dropdown.prototype.toggle = function() {
    var nodeExpanded = this.el.getAttribute('aria-expanded');

    // there's some hidden coarsion happening in $.fn.attr. bypassing for now
    if(nodeExpanded === 'false') {
      this.el.setAttribute('aria-expanded', 'true');
      this._focusDismissButton();
    } else {
      this.el.setAttribute('aria-expanded', 'false');
    }
  };

  Dropdown.prototype.close = function() {
    this.el.setAttribute('aria-expanded', 'false');
    this._focusDropdownTrigger();
  };

  Dropdown.prototype.addDocumentListeners = function () {
    $(document).on('click', '.dropdown', this._handleDocumentEvent);
  };

  Dropdown.prototype._focusDismissButton = function () {
    $(this.el).find('[aria-label=close]')[0].focus();
  };

  Dropdown.prototype._focusDropdownTrigger = function () {
    $(this.el).find('[aria-haspopup]')[0].focus();
  };

  Dropdown.prototype._handleDocumentEvent = function (e) {
    var dropdownNode = this;

    if(e.type !== 'click') { return; }

    if($(e.target).hasClass('dropdown')) {
      new Dropdown(dropdownNode).close();
      return;
    }

    if(e.target.getAttribute('aria-haspopup') === 'true') {
      new Dropdown(dropdownNode).toggle();
      return;
    }

    if(e.target.getAttribute('aria-label') === 'close') {
      new Dropdown(dropdownNode).close();
      return;
    }
  };

  return Dropdown;

})();






$.extend( $.expr[ ":" ], {
    data: $.expr.createPseudo ?
	$.expr.createPseudo(function( dataName ) {
	    return function( elem ) {
		return !!$.data( elem, dataName );
	    };
	}) :
    // support: jQuery <1.8
    function( elem, i, match ) {
	return !!$.data( elem, match[ 3 ] );
    },

    focusable: function( element ) {
	return focusable( element, !isNaN( $.attr( element, "tabindex" ) ) );
    },

    tabbable: function( element ) {
	var tabIndex = $.attr( element, "tabindex" ),
	    isTabIndexNaN = isNaN( tabIndex );
	return ( isTabIndexNaN || tabIndex >= 0 ) && focusable( element, !isTabIndexNaN );
    }
});


// selectors
function focusable( element, isTabIndexNotNaN ) {
    var map, mapName, img,
	nodeName = element.nodeName.toLowerCase();
    if ( "area" === nodeName ) {
	map = element.parentNode;
	mapName = map.name;
	if ( !element.href || !mapName || map.nodeName.toLowerCase() !== "map" ) {
	    return false;
	}
	img = $( "img[usemap='#" + mapName + "']" )[ 0 ];
	return !!img && visible( img );
    }
    return ( /input|select|textarea|button|object/.test( nodeName ) ?
	     !element.disabled :
	     "a" === nodeName ?
	     element.href || isTabIndexNotNaN :
	     isTabIndexNotNaN) &&
	// the element and all of its ancestors must be visible
	visible( element );
}


function visible( element ) {
    return $.expr.filters.visible( element ) &&
	!$( element ).parents().addBack().filter(function() {
	    return $.css( this, "visibility" ) === "hidden";
	}).length;
}
