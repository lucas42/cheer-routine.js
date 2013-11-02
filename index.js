var Sequence = require("./sequence.js");

/**
 * An object representing a complete routine
 * 
 * @param {HTMLCanvasElement} mat A canvas element representing the routine mat
 * @param {array} data An array of all the data points making up the routine
 * @returns {Routine}
 */
function Routine(mat, data) {
	if (mat.tagName.toLowerCase() != "canvas") {
		throw "Canvas element must be passed into init";
	}
	if (mat.getAttribute("data-cheer-routine-inited")) {
		throw "Can only have one routine on the mat at a time";
	}
	mat.setAttribute("data-cheer-routine-inited", true);
	this.mat = mat;
	var sequence = new Sequence(data);

	function renderTime(bar, beat) {
		var points = sequence.getPointsByTime(bar, beat);

		// TODO: actually render the points on the mat
		console.log(points);
	}


	// Begin by rendering the first beat of the first bar.
	renderTime(1,1);
}




module.exports = Routine;