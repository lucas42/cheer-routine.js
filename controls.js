var beats = require("./beats.js");

/**
 * A class responsible for manage controls in the DOM
 * @param {DOMElement} container A DOM element to put all the relevant controls in.
 * @param {Routine} The routine the controls are to manage
 */
function Controls(container, routine) {
	if (container.nodeType != 1) throw "Container must be an element node";

	var slider = document.createElement('input');
	slider.type = "range";
	slider.min = 0;
	slider.max = routine.getMaxTime();

	// Snap to the nearest beat
	slider.step = beats.convertBeatsToBars(1);
	slider.addEventListener("change", sliderMoved);
	container.appendChild(slider);


	function sliderMoved(event) {
		routine.setTime(this.value);
	}

	function setTime(time) {
		slider.value = time;
	}
	this.setTime = setTime;
}

module.exports = Controls;