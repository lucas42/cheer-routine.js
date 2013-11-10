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
	var slider = null;
	var playing = false;
	function renderFrame(timestamp) {
		var progress;
		if (!playing) return;
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
		if (slider) slider.value = progress;
	}

	/**
	 * Adds controls for playing the routine
	 * @param {DOMElement} container A DOM element to put all the relevant controls in.
	 */
	function addControls(container) {
		slider = document.createElement('input');
		slider.type = "range";
		slider.min = 0;
		slider.max = maxtime;
		slider.step = "any";
		slider.addEventListener("change", sliderMoved);
		container.appendChild(slider);
	}
	this.addControls = addControls;

	function sliderMoved(event) {
		pause();
		renderTime(this.value);
	}

	function pause() {
		playing = false;
	}

	/**
	 * Starts animating the routine
	 * @returns {boolean} Whether the routine was started (true) or it was already running (false)
	 */
	function start() {
		if (playing) return false;
		playing = true;
		window.requestAnimationFrame(renderFrame);
		return true;
	}
	this.start = start;

	// Begin with showing the opening positions
	renderTime(0);
}




module.exports = Routine;