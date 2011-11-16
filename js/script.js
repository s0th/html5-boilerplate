/* Author:	Aron Lakatos / @aronlakatos */

function template(s) {
	return false;
}

function initPNGfix(imgList) {
	if ( $('html').hasClass('msie6') ) {		// execute in ie6 only (relies on jQuery Browser Plugin 2.3)
		for (x in imgList) {
			if ( imgList[x].length ) {
				DD_belatedPNG.fix(imgList[x]);
			};
			x++;
		}		
	}
}

function initScrollable(s) {
	if ( $('#'+s.carouselId).length > 0 ) {		//don't execute if no matching container present on page
		var carouselId = s.carouselId; 
		var vertical = s.vertical; 
		var circular = s.circular; 
		var fade = s.fade;
		var fadeOver = s.fadeOver;
		var imgWidth = s.imgWidth;
		var imgHeight = s.imgHeight;
		var speed = s.speed; 
		var scrollInterval = s.scrollInterval; 
		var fadeInterval = s.fadeInterval;
		var naviPosition = -1;
		var circMod = 0;
		var stepMod = 1;	/* forward by default (1) */
		var naviTheme = s.naviTheme;
		var naviHCenter = s.naviHCenter;
		var naviVCenter = s.naviVCenter;
		
		/* store clicked navigator position */
		$("#"+carouselId+' .navi a').click(function() {	naviPosition = $(this).index();	}); 		
		/* change stepping modifier to negative on backward navigation */
		$("#"+carouselId+' .prev').click(function() { stepMod = -1 }); 
		
		/* add vertical styling class on vertical preset */
		if ( vertical ) { $("#"+carouselId).addClass('verticalPreset') };			
		/* adding modifier in circular mode to correct the slide indexing 
		  (cloned items are being added on circular mode, 
		  so the item indexing is different than expected) */
		if ( circular ) { circMod = 1 };		
		/* cancel speed on fading mode*/
		if ( fade ) { speed = 0 };		
		/* add class on fadeOver mode*/
		if ( fadeOver ) { $("#"+carouselId).addClass('fadeOver') };
		
		$("#"+carouselId+' .naviWrapper').addClass(naviTheme);
		
		/* call scrollable/navigator/autoscroll */
		$("#"+carouselId)
			.scrollable({ 
				circular: circular, 
				touch: false, 
				vertical: vertical,
				speed: speed
				})
			.navigator()
			.autoscroll({ autoplay: true, interval: scrollInterval });		

		/* initialize api */
		var api = $("#"+carouselId).data("scrollable");
		var fadeItem;
		var activeItem;
		var prevActiveItem;
		var carouselImages = $("#"+carouselId+" img");
				
		/* execute fade functions */
		if ( fade ) {
			activeItem = $("#"+carouselId+" .items div").eq(0+circMod);
			activeItem.addClass('active');

			function preSeek(api) {			
				if ( naviPosition < 0 ) {
					var i = api.getIndex();
					
					/* fix the fading of the first item when navigating backwards */
					if ( ( i == -1 ) && ( stepMod == -1 ) ) { stepMod = -2 };
					
					fadeItem = carouselImages.eq(i+circMod+stepMod);
					fadeItem.hide();
					stepMod = 1;	/* reset the backwards modifier */
				} else {
					fadeItem = carouselImages.eq(naviPosition+circMod);
					fadeItem.hide();
				};
			};
			
			function postSeek(api) {
				try{
					try{ prevActiveItem.removeClass('prevActive') } catch(err) {};					
					activeItem.removeClass('active');
					prevActiveItem = activeItem;
					prevActiveItem.addClass('prevActive');
				} catch(err) {};
				activeItem = fadeItem.closest('div');
				activeItem.addClass('active');				
			
				if ( naviPosition < 0 ) {
					fadeItem.fadeIn(fadeInterval);
				} else {
					fadeItem.fadeIn(fadeInterval);
					naviPosition = -1;
				};
			};		
			
			api.onBeforeSeek(function (){ preSeek(api) });
			api.onSeek(function (){ postSeek(api) });		
		} 
		
		/* correct 1px horizontal offset bug (IE) */
		if ( $('html').hasClass('msie') ) {
			api.onSeek(function (){
				var _target = $("#"+carouselId+" .items");
				var posLeft = parseInt( _target.css('left') );
				var modValue = Math.abs( posLeft % imgWidth );
				if ( (modValue) > 0 ) {
					correction = imgWidth - modValue;
					_target.css('left', (posLeft - correction) + 'px' );
				};
			});					
		};
		
		/* fix offset bug / reset the faulty position - START */			
		if ( vertical === true ) {
			$("#"+carouselId+" .items").css('top','-'+imgHeight+'px');			
		} else {
			$("#"+carouselId+" .items").css('left','-'+imgWidth+'px');			
		}		
		/* fix offset bug / reset the faulty position - END */

		/* calculate navigator positions*/
		
		var _navigator = $("#"+carouselId+' .naviWrapper .navi');
		var _carousel = $("#"+carouselId);
		
		function setNaviPosition(_navigator,_carousel,_naviAttr,_carouselAttr,_naviPosition) {
			var _navigatorValue = _navigator.prop(_naviAttr);
			var _carouselValue = parseInt(_carousel.css(_carouselAttr));
			_navigator.css(_naviPosition,( _carouselValue / 2 - _navigatorValue / 2 ));			
		};

		if ( naviHCenter ) {
			setNaviPosition(_navigator,_carousel,'offsetWidth','width','left');	
		};
		if ( naviVCenter ) { 
			setNaviPosition(_navigator,_carousel,'offsetHeight','height','top');
		};
		
	}
}

function applyScrollableLinks() {
	if ( $('.slideContent').length > 0 ) {
		$('.scrollable .slideContent').click(function(evt) {
			evt.preventDefault();
			_el = $(this).prev('a');
			
			if ( _el.attr('target') === '_blank' ) {
				window.open(_el.attr('href'), '');						
			} else {
				window.location = _el.attr('href');						
			};						
		});
	};
}


$(document).ready(function() {
	
	template();	
	
    $('body').addClass('jsEnabled');	
	
    var PNGimageList = [
		'.trans01SAMPLE',
		'.trans02SAMPLE'
	];
    initPNGfix(PNGimageList);

    var bgiframeList = [
		'.overlaySAMPLE'
	];
    initBgiframe(bgiframeList);

    /* eductation products carousel */
    var scrollableParams = {
        carouselId: 'carousel_he_global',
        vertical: true,
        circular: true,
        fade: false,
        fadeOver: false,
        imgWidth: 958,
		imgHeight: 281,
        speed: 400,
        scrollInterval: 7000,
        fadeInterval: 1000,
        naviTheme: 'HE_GlobalV',
        naviVCenter: true
    }
    initScrollable(scrollableParams);
	applyScrollableLinks();		
});