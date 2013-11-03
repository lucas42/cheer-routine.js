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
	var bpm = 70;

	// Work out the bars per millisecond based on the beats per minute;
	var barspermillisec = (bpm / 60000) / 8;

	/**
	 * Render the correct actions for a given time in the routine
	 */
	function renderTime(time) {
		var actions = sequence.getActionsByTime(time);
		mat.renderActions(actions);
	}

	var startTimestamp = null;
	var maxtime = sequence.getMaxTime();
	function renderFrame(timestamp) {
		var progress;
		if (startTimestamp === null) start = timestamp;
		progress = timestamp - startTimestamp;

		// Convert the progress from milliseconds to bars
		progress = progress * barspermillisec;
		renderTime(progress);
		if (progress <= maxtime) {
			window.requestAnimationFrame(renderFrame);
		} else {
			startTimestamp = null;
		}
	}

	/**
	 * Starts animating the routine
	 * @returns {boolean} Whether the routine was started (true) or it was already running (false)
	 */
	function start() {
		if (startTimestamp !== null) return false;
		window.requestAnimationFrame(renderFrame);
		return true;
	}
	this.start = start;

	// Begin with showing the opening positions
	renderTime(0);
}




module.exports = Routine;