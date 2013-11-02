/**
 * An object for rendering a representation of the mat and everyone on it into a canvas element
 * 
 * @param {HTMLCanvasElement} canvas A canvas element
 * @returns {Routine}
 */
function Mat(canvas) {
	if (canvas.tagName.toLowerCase() != "canvas") {
		throw "Canvas element must be passed into init";
	}
	if (canvas.getAttribute("data-cheer-routine-inited")) {
		throw "Can only have one routine on the mat at a time";
	}
	canvas.setAttribute("data-cheer-routine-inited", true);
}

module.exports = Mat;