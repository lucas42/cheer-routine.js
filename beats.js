/**
 * Utility functions for handling musical bars and the beats they contain
 */

// For now, assume all bars contain 8 beats.  This is the case for the vast majority of cheer music, but won't work if anyone chooses to use Tubular Bells.
var beatsInABar = 8;

/**
 * Take a bar number and a beat and normalise them to a float
 * @param {Number} bar Which bar of the music is (must be an integer).
 * @param {Number} beat Which beat in the bar (NB: beats start at 1, not zero for consistency with spoken counts)
 * @returns {Number} A float representing the position in music (unit in bars)
 */
function normaliseBeats(bar, beat) {
	if (beat < 1) throw "Beats in the bar start at 1";
	if (beat >= (beatsInABar + 1) ) throw "There are only "+beatsInABar+" beats in the bar";

	// Make sure the bar is an integer
	var output = Math.floor(bar);

	// subtract one from the beat to make it zero indexed
	beat = beat - 1;

	// Work out how far through the bar the given beat is.
	beat = beat / beatsInABar;

	output += beat;

	return output;
}

/**
 * Takes a float and splits it out into a bar and beat number
 * @param {Number} time A float representing time through the music (in bars)
 * @returns {object} An object containing properties for bar and beat
 */
function denormaliseBeats(time) {
	var bar = Math.floor(time);
	var partial = time - bar;
	var beat = beatsInABar * partial;

	// Add one to the beat because humans start counting at 1
	beat = beat + 1;

	return {
		bar: bar,
		beat: beat
	};
}

module.exports.normalise = normaliseBeats;
module.exports.denormalise = denormaliseBeats;