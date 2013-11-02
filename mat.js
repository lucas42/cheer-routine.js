/**
 * An object for rendering a representation of the mat and everyone on it into a canvas element
 * 
 * @param {HTMLCanvasElement} canvas A canvas element
 * @returns {Routine}
 */
function Mat(canvas) {
	if (canvas.tagName.toLowerCase() != "canvas") {
		throw "Canvas element must be passed into init";
	}
	if (canvas.getAttribute("data-cheer-routine-inited")) {
		throw "Can only have one routine on the mat at a time";
	}
	canvas.setAttribute("data-cheer-routine-inited", true);

	/**
	 * Renders a list of action objects onto the mat
	 * @param {object} actions A an object of key value pairs, where key is the person id and value is an Action object
	 */
	function renderActions (actions) {
		var personid;
		for (personid in actions) {

			// TODO: actually render the points on the mat
			console.log(personid, actions[personid]);
		}
	}
	this.renderActions = renderActions;
}

module.exports = Mat;