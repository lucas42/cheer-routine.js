/**
 * An object for rendering a representation of the mat and everyone on it into a canvas element
 * 
 * @param {HTMLCanvasElement} canvas A canvas element
 * @returns {Routine}
 */
function Mat(canvas) {
	var height, width, context = canvas.getContext("2d");

	// Number of pixels which are equivalent to 6 foot in real life;
	var scale = 100;

	// The colour of the mat
	var matColor = "rgb(0,0,100)";

	// The colour of the guide lines placed onto the mat
	var lineColor = "rgb(100, 100, 100)";
	height = 7 * scale;
	width = 9 * scale;


	if (canvas.tagName.toLowerCase() != "canvas") {
		throw "Canvas element must be passed into init";
	}
	if (canvas.getAttribute("data-cheer-routine-inited")) {
		throw "Can only have one routine on the mat at a time";
	}
	canvas.setAttribute("data-cheer-routine-inited", true);

	/**
	 * Renders an empty mat with standard guide lines on it
	 */
	function renderMat() {

		canvas.height = height;
		canvas.width = width;

		// Draw the blue background of the matts
		context.fillStyle = matColor;
		context.fillRect(0, 0, width, height);

		// Draws the lines between strips
		context.fillStyle = lineColor;
		for (i=0; i<=9; i++) {
			context.fillRect(i*scale - 2, 0, 4, height);
		}

		// Draw the X in the centre
		var centresize = 10;
		context.strokeStyle = lineColor;
		context.lineWidth = 3;
		context.beginPath();
		context.moveTo(width/2 - centresize, height/2 - centresize);
		context.lineTo(width/2 + centresize, height/2 + centresize);
		context.moveTo(width/2 - centresize, height/2 + centresize);
		context.lineTo(width/2 + centresize, height/2 - centresize);
		context.stroke();
	}


	/**
	 * Renders a list of action objects onto the mat
	 * @param {object} actions An object of key value pairs, where key is the person id and value is an Action object
	 */
	function renderActions (actions) {
		var i, personid;
		renderMat();
		for (personid in actions) {

			// TODO: actually render the points on the mat
			console.log(personid, actions[personid]);
		}
	}
	this.renderActions = renderActions;
}

module.exports = Mat;