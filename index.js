var Mat = require("./mat.js");
var Sequence = require("./sequence.js");

/**
 * An object representing a complete routine
 * 
 * @param {HTMLCanvasElement} canvas A canvas element representing the routine mat
 * @param {array} data An array of all the data points making up the routine
 * @returns {Routine}
 */
function Routine(canvas, data) {
	var mat = new Mat(canvas);
	var sequence = new Sequence(data);

	function renderTime(bar, beat) {
		var actions = sequence.getActionsByTime(bar, beat);

		// TODO: actually render the points on the mat
		console.log(actions);
	}


	// Begin by rendering the first beat of the first bar.
	renderTime(1,1);
}




module.exports = Routine;