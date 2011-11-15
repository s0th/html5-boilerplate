/* Author:	Aron Lakatos / @aronlakatos */

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

function template(s) {
	return false;
}

$(document).ready(function() {
	
    var PNGimageList = [
		'.trans01SAMPLE',
		'.trans02SAMPLE'
	];
    initPNGfix(PNGimageList);

    var bgiframeList = [
		'.overlaySAMPLE'
	];
    initBgiframe(bgiframeList);

	template();	
});