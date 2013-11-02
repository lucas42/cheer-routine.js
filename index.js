var beats = require("./beats.js");

/**
 * An object representing a complete routine
 * 
 * @param {HTMLCanvasElement} mat A canvas element representing the routine mat
 * @param {array} data An array of all the data points making up the routine
 * @returns {Routine}
 */
function Routine(mat, data) {
	if (mat.tagName.toLowerCase() != "canvas") {
		throw "Canvas element must be passed into init";
	}
	if (mat.getAttribute("data-cheer-routine-inited")) {
		throw "Can only have one routine on the mat at a time";
	}
	mat.setAttribute("data-cheer-routine-inited", true);
	this.mat = mat;
	data = normaliseData(data);
	function getPoint(person, time) {
		var i, l, previous = null;
		if (!(person in data)) return previous;
		for (i=0, l=data[person].length; i<l; i++) {
			if (data[person][i].t > time) {
				return previous
			} else {
				previous = data[person][i];
			}
		}

		// If the time given is after all the person's points, then they should remain in their final position
		return previous;
	}

	function renderTime(bar, beat) {
		var person, time = beats.normalise(bar, beat);
		var points = [];
		var personpoint;
		for (person in data) {
			personpoint = getPoint(person, time);

			// If no point is returned, then the person isn't on the mat, so ignore them.
			if (!personpoint) continue;
			points.push(personpoint);
		}

		// TODO: actually render the points on the mat
		console.log(points);
	}


	// Begin by rendering the first beat of the first bar.
	renderTime(1,1);
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


module.exports = Routine;