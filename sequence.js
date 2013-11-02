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
	 * Just for backwards compatibility so unit tests can check that things haven't regressed in refactor
	 * @param {Number} bar Which bar of the music is (must be an integer).
	 * @param {Number} beat Which beat in the bar
	 * @returns {array} A list of points in spacetime
	 */
	function getPointsByTime(bar, beat) {
		var actions = getActionsByTime(bar, beat);
		var id, output = [];
		for (id in actions) {
			output.push(actions[id].getRawData());
		}
		return output;
	}
	this.getPointsByTime = getPointsByTime;


	/**
	 * Returns a list of actions for where every person is at a given time
	 * @param {Number} bar Which bar of the music is (must be an integer).
	 * @param {Number} beat Which beat in the bar
	 * @returns {object} A object containing the action that each person is doing
	 */
	function getActionsByTime(bar, beat) {
		var personid, time = beats.normalise(bar, beat);
		var action, actions = {};
		for (personid in data) {
			action = data[personid].getActionByTime(time);

			// If no action is returned, then the person isn't on the mat, so ignore them.
			if (!action) continue;
			actions[personid] = action;
		}
		return actions;
	}
	this.getActionsByTime = getActionsByTime;
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