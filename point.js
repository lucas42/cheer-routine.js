var beats = require("./beats.js");

/**
 * An object representing a point in spacetime.  This includes position in Euclidean Space as well as time.  Note: units are NOT SI, there are in cheerleading units:
 * x: The distance across the mat someone is located.  In units of 6 feet (the width of one strip of standard cheerleading mat).  Standard mats go from 0 (Stage left) to 9 (Stage right).
 * y: The distance down the mat someone is located.  In units of 6 feet.  Standard mats go from 0 (Upstage) to 7 (Downstage).
 * z: How far in the air someone is.  A guide to levels is: 0 - on the floor, 1 - smoosh, 2 - prep, 3 - extention
 * bar: How many bars into the routine the time point is at.  Usually routines start at bar 1, but there can be a intro during bar 0 (often not a full bar)
 * beat: How many beats into the bar the time point is at.
 *
 * @param {object} rawdata An object containing the above properties 
 */
function Point(data) {

	// Remember a normalised version of the time, as calculations on bars and beats is hard.
	var time = beats.normalise(data.bar, data.beat);

	/**
	 * Gets the normalised time value instead of bars/beats
	 * @returns {number}
	 */
	function getTime() {
		return time;
	}
	this.getTime = getTime;

	function getX() {
		return data.x;
	}
	this.getX = getX;

	function getY() {
		return data.y;
	}
	this.getY = getY;

	function getZ() {
		return data.z;
	}
	this.getZ = getZ;

	function getRawData() {
		return data;
	}
	this.getRawData = getRawData;
}


module.exports = Point;