/**
 * An object for rendering a representation of the mat and everyone on it into a canvas element
 * 
 * @param {HTMLCanvasElement} canvas A canvas element
 * @returns {Routine}
 */
function Mat(canvas) {
	var height, width, context = canvas.getContext("2d");
	var currentactions = {};
	var highlightedPerson =  null;

	// Number of pixels which are equivalent to 6 foot in real life;
	var scale = 100;

	// The colour of the mat
	var matColor = "rgb(0,0,100)";

	// The colour of the guide lines placed onto the mat
	var lineColor = "rgb(100, 100, 100)";
	var pointColor = "rgb(255, 255, 255)";
	var highlightPointColor = "rgb(255, 100, 100)";
	var pointRadius = 10;
	height = 7 * scale;
	width = 9 * scale;


	if (canvas.tagName.toLowerCase() != "canvas") {
		throw "Canvas element must be passed into init";
	}
	if (canvas.getAttribute("data-cheer-routine-inited")) {
		throw "Can only have one routine on the mat at a time";
	}
	canvas.addEventListener("click", canvasclick);
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
		var personid, highlight;
		renderMat();
		currentactions = actions;
		for (personid in actions) {
			highlight = (personid == highlightedPerson);
			drawPoint(actions[personid].getPoint(), highlight);
		}
	}
	this.renderActions = renderActions;

	/**
	 * Draw a single point on the mat
	 * @param {Point} point The point to draw
	 * @param {boolean} [highlight] Whether to highlight the point (defaults to false)
	 */
	function drawPoint(point, highlight) {
		var x, y, radius;
		x = point.getX() * scale;
		y = height - (point.getY() * scale);
		radius = pointRadius + point.getZ();
		context.fillStyle = highlight?highlightPointColor:pointColor;
		context.beginPath();
		context.arc(x, y, radius, 0, Math.PI*2, true);
		context.fill();
	}

	/**
	 * Returns the id of a person near the coordinates given
	 * Note: if multiple people are nearby, only one is returned.  (which one isn't defined)
	 *
	 * @param {number} x The number of pixels across the canvas
	 * @param {number} y The number of pixels down the canvas
	 * @returns {string|null} Returns the id of a person or null if there are no people near the point
	 */
	function getPersonIdByCoords(x, y) {
		var personid, point;
		var scaledRadius = pointRadius/scale;
		x = x / scale;
		y = (height - y) / scale;
		for (personid in currentactions) {
			point = currentactions[personid].getPoint();
			if ((x > point.getX() - scaledRadius)
				&& (x < point.getX() + scaledRadius)
				&& (y > point.getY() - scaledRadius)
				&& (y < point.getY() + scaledRadius)) {
				return personid;
			}
		}
		return null;
	}

	function canvasclick(event) {
		var personid = getPersonIdByCoords(event.offsetX, event.offsetY);
		if (personid == highlightedPerson) return;
		if (highlightedPerson) {
			var oldpoint = currentactions[highlightedPerson].getPoint();
			drawPoint(oldpoint, false);
		}
		highlightedPerson = personid;
		if (!personid) return;
		var newpoint = currentactions[personid].getPoint();
		drawPoint(newpoint, true);
	}
}

module.exports = Mat;