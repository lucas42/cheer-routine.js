var beats = require("./beats.js");

/**
 * A Sequence is an ordered collection of points in spacetime.
 */
function Sequence(rawdata) {
	var data = normaliseData(rawdata);

	/**
	 * Returns a point for where a given person is at a given time
	 *
	 * @param {Number} person A person's ID
	 * @param {Number} time A normalised time value (in bars)
	 * @return {Object} A point in spacetime
	 */
	function getPointByPersonAndTime(person, time) {
		var i, l, previous = null;
		if (!(person in data)) return previous;
		for (i=0, l=data[person].length; i<l; i++) {
			if (data[person][i].t > time) {
				return previous;
			} else {
				previous = data[person][i];
			}
		}
		// TODO: Add tweening

		// If the time given is after all the person's points, then they should remain in their final position
		return previous;
	}

	/**
	 * Returns a list of points for where every person is at a given time
	 * @param {Number} bar Which bar of the music is (must be an integer).
	 * @param {Number} beat Which beat in the bar
	 * @returns {array} A list of points in spacetime
	 */
	function getPointsByTime(bar, beat) {
		var person, time = beats.normalise(bar, beat);
		var points = [];
		var personpoint;
		for (person in data) {
			personpoint = getPointByPersonAndTime(person, time);

			// If no point is returned, then the person isn't on the mat, so ignore them.
			if (!personpoint) continue;
			points.push(personpoint);
		}
		return points;
	}
	this.getPointsByTime = getPointsByTime;
}

function normaliseData(data) {
	var i, l, point, output = {};

	// Group all the points by person
	for (i=0, l=data.length; i<l; i++) {
		point = data[i];
		if (!(point.p in output)) {
			output[point.p] = [];
		}
		output[point.p].push({
			x: point.x,
			y: point.y,
			time: beats.normalise(point.bar, point.beat),
			c: point.c
		});
	}

	// Sort each person's point by time
	// This step needs to follow the previous one because the previous also incorporates beat normalisation
	for (i in output) {
		output[i].sort(function (a,b) {
			return a.t - b.t;
		});
	}
	return output;
}

module.exports = Sequence;