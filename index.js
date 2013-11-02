var canvas;

function initRoutine(newcanvas) {
	if (newcanvas.tagName.toLowerCase() != "canvas") {
		throw "Canvas element must be passed into init";
	}
	if (newcanvas.getAttribute("data-cheer-routine-inited")) {
		throw "Can only have one routine on the mat at a time";
	}
	newcanvas.setAttribute("data-cheer-routine-inited", true);
	canvas = newcanvas;
}

module.exports.init = initRoutine;