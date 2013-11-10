var beats = require("./beats.js");
var Point = require("./point.js");
var Action = require("./action.js");
var Person = require("./person.js");

/**
 * A Sequence is an ordered collection of points in spacetime.
 */
function Sequence(rawdata) {
	var data = normaliseData(rawdata);

	/**
	 * Returns a list of actions for where every person is at a given time
	 * @param {number} bar Which bar of the music is (must be an integer).
	 * @param {number} beat Which beat in the bar
	 * @returns {object} An object containing the action that each person is doing
	 */
	function getActionsByBeat(bar, beat) {
		var time = beats.normalise(bar, beat);
		return this.getActionsByTime(time);
	}
	this.getActionsByBeat = getActionsByBeat;

	/**
	 * Returns a list of actions for where every person is at a given time
	 * @param {number} time A normalised time value (in bars)
	 * @returns {object} An object containing the action that each person is doing
	 */
	function getActionsByTime(time) {
		var personid, action, actions = {};
		for (personid in data) {
			action = data[personid].getActionByTime(time);

			// If no action is returned, then the person isn't on the mat, so ignore them.
			if (!action) continue;
			actions[personid] = action;
		}
		return actions;
	}
	this.getActionsByTime = getActionsByTime;

	/**
	 * Returns the last time that any action in this sequence is scheduled for
	 * @returns {number} max time (in bars)
	 */
	function getMaxTime() {
		var personid, personmax, max = 0;
		for (personid in data) {
			personmax = data[personid].getMaxTime();
			if (personmax > max) max = personmax;
		}
		return max;
	}
	this.getMaxTime = getMaxTime;


	/**
	 * Returns a list of all the points in the sequence.  Used so the data can be stored and the sequence/routine recreated later
	 * @returns {array} A list of all the points
	 */
	function getRawData() {
		var i, l, persondata, output = [];
		for (personid in data) {
			persondata = data[personid].getRawData();
			for (i=0, l=persondata.length; i<l; i++) {
				persondata[i].p=personid;
				output.push(persondata[i]);
			}
		}
		return output;
	}
	this.getRawData = getRawData;
}

function normaliseData(data) {
	var i, l, pointdata, output = {};

	// Group all the points by person
	for (i=0, l=data.length; i<l; i++) {
		pointdata = data[i];
		if (!(pointdata.p in output)) {
			output[pointdata.p] = new Person(pointdata.p);
		}
		output[pointdata.p].addAction(new Action(new Point({
			x: pointdata.x,
			y: pointdata.y,
			z: pointdata.z,
			bar: pointdata.bar,
			beat: pointdata.beat
		}), pointdata.c));
	}
	return output;
}

module.exports = Sequence;