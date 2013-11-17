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

	var startTimestamp = null;
	var maxtime = sequence.getMaxTime();
	var currentTime = 0;

	/**
	 * Render the correct actions for a given time in the routine
	 */
	function renderCurrentTime() {
		var actions = sequence.getActionsByTime(currentTime);
		mat.renderActions(actions);
		if (controls) controls.update();
	}

	function renderFrame(timestamp) {
		var progress = timestamp - startTimestamp;
		if (!isPlaying()) return;

		// Convert the progress from milliseconds to bars
		currentTime = progress * barspermillisec;
		renderCurrentTime();
		if (currentTime <= maxtime) {
			window.requestAnimationFrame(renderFrame);
		} else {
			pause();
		}
	}

	/**
	 * Sets the current point in time of the routine
	 * @param {number} time The normalised time in bars
	 */
	function setCurrentTime(time) {
		console.log(time);
		currentTime = time;
		renderCurrentTime();

		// If the routine is playing, call the play function again, to update startTimestamp
		if (isPlaying()) playFrom(currentTime);
	}
	this.setCurrentTime = setCurrentTime;

	/**
	 * Gets the current point in time of the routine
	 * @returns {number} The normalised time in bars
	 */
	function getCurrentTime(time) {
		return currentTime;
	}
	this.getCurrentTime = getCurrentTime;

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
		startTimestamp = null;
		if (controls) controls.update();
	}
	this.pause = pause;
	this.isEditable = false;

	/**
	 * Starts animating the routine from the currentTime
	 */
	function play() {
		if (!isPlaying()) playFrom(currentTime);
	}
	this.play = play;

	/**
	 * Play from a specific time (passing in a time, rather than just using currentTime means queued frames won't override it)
	 * @param {number} time A normalised time in bars
	 */
	function playFrom(time) {
		window.requestAnimationFrame(function(timestamp) {
			startTimestamp = timestamp - (time / barspermillisec);
			console.log(startTimestamp);
			renderFrame(timestamp);
		});

	}

	function isPlaying() {
		return startTimestamp !== null;
	}
	this.isPlaying = isPlaying;

	// Begin with showing the opening positions
	renderCurrentTime();
}




module.exports = Routine;