var Mat = require("./mat.js");
var Sequence = require("./sequence.js");
var beats = require("./beats.js");

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
	var barspermillisec = beats.getBarsPerMillisecond(bpm);
	var controls = null;

	/**
	 * Render the correct actions for a given time in the routine
	 */
	function renderTime(time) {
		var actions = sequence.getActionsByTime(time);
		mat.renderActions(actions);
	}

	var startTimestamp = null;
	var maxtime = sequence.getMaxTime();
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
		if (controls) controls.setTime(progress);
	}

	/**
	 * Sets the current point in time of the routine
	 * @param {number} time The normalised time in bars
	 */
	function setTime(time) {
		// TODO: remember the current time
		pause();
		renderTime(time);
	}
	this.setTime = setTime;

	function getMaxTime() {
		return sequence.getMaxTime();
	}
	this.getMaxTime = getMaxTime;

	/**
	 * Adds controls for playing the routine
	 * @param {DOMElement} container A DOM element to put all the relevant controls in.
	 */
	function addControls(container) {
		var Controls = require('./controls');
		controls = new Controls(container, this);
	}
	this.addControls = addControls;

	function pause() {
		playing = false;
	}

	/**
	 * Starts animating the routine (from the start)
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