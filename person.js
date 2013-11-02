
/**
 * A class representing an individual within the routine and storing all the points they need to be at throughout.
 */
 function Person() {

 	/**
 	 * A list of actions which the person perfroms during the routine
 	 */
 	var actions = [];

 	/**
 	 * Adds an action which the persion is to perform during the routine
 	 * @param {Action} action An action for the person to perform
 	 */
 	function addAction(action) {
 		var i,l, replace = false;

 		// Loop through the existing points until passing the time where the new point goes
 		for (i=0, l=actions.length; i<l; i++) {
 			if (action.getTime() > actions[i].getTime()) {
 				continue;

 			// Time travel isn't permitted in cheer routines, so assume that a person can only be in one place at a time
 			// If an action clashes with the time of an existing action, replace it.
 			} else if (action.getTime() == actions[i].getTime()) {
 				replace = true;
 			}
 			actions.splice(i, replace?1:0, action);
 			return;
 		}
 		actions.push(action);
 	}
 	this.addAction = addAction;

	/**
	 * Returns an action for what the person is performing at a given time
	 *
	 * @param {number} time A normalised time value (in bars)
	 * @return {Action} The action the person is performing
	 */
	function getActionByTime(time) {
		var i, l, previous = null;
		for (i=0, l=actions.length; i<l; i++) {
			if (actions[i].getTime() > time) {
				return previous;
			} else {
				previous = actions[i];
			}
		}
		// TODO: Add tweening

		// If the time given is after all the person's points, then they should remain in their final position
		return previous;
	}
	this.getActionByTime = getActionByTime;

	function getRawData() {
		var output = [];
		for (i=0, l=actions.length; i<l; i++) {
			output.push(actions[i].getRawData());
		}
		return output;
	}
	this.getRawData = getRawData;
 }

 module.exports = Person;