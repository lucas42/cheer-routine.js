var beats = require("./beats.js");

/**
 * A class for controlling the animation of a sequence on a mat
 * 
 * @param {Sequence} sequence A sequence of actions to animate
 * @param {Mat} mat The mat to show the sequence on
 * @returns {Animation}
 */
function Animation(sequence, mat) {

	var bpm = 70;

	// Work out the bars per millisecond based on the beats per minute;
	var barspermillisec = beats.getBarsPerMillisecond(bpm);
	var update = function () {};

	var startTimestamp = null;
	var maxtime = sequence.getMaxTime();
	var currentTime = 0;

	/**
	 * Render the correct actions for a given time in the routine
	 */
	function renderCurrentTime() {
		var actions = sequence.getActionsByTime(currentTime);
		mat.renderActions(actions);
		update();
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

	function pause() {
		startTimestamp = null;
		update();
	}
	this.pause = pause;

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

	/**
	 * Sets a function which gets called when the animation updates
	 * Ideally this would be done with event/pubsub
	 * @param {function} updateFunc The function to call
	 */
	function setUpdateFunc(updateFunc) {
		if (typeof updateFunc != "updateFunc must be a function") 
		update = updateFunc;
	}
	this.setUpdateFunc = setUpdateFunc;

	// Begin with showing the opening positions
	renderCurrentTime();

}
module.exports = Animation;