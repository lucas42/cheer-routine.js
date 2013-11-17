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
	slider.addEventListener("change", sliderMoved);
	container.appendChild(slider);

	var addActionButton = document.createElement('input');
	addActionButton.type = 'button';
	addActionButton.addEventListener("click", addAction);
	addActionButton.value = "Add Action";
	container.appendChild(addActionButton);
	update();

	function sliderMoved(event) {
		routine.setCurrentTime(this.value);
	}

	function addAction() {
		alert("TODO");
	}

	/**
	 * Updates controls to match any variables which may have changed
	 */
	function update() {
		slider.min = 0;
		slider.max = routine.getMaxTime();

		// Snap to the nearest beat
		slider.step = beats.convertBeatsToBars(1);
		slider.value = routine.getCurrentTime();
		addActionButton.style.display = routine.isEditable?'block':"none";
	}
	this.update = update;
}

module.exports = Controls;