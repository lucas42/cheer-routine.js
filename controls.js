var beats = require("./beats.js");
var Editor = require("./editor.js");

/**
 * A class responsible for manage controls in the DOM
 * @param {DOMElement} container A DOM element to put all the relevant controls in.
 * @param {Animation} The animation to control
 */
function Controls(container, animation) {
	if (container.nodeType != 1) throw "Container must be an element node";

	var slider = document.createElement('input');
	slider.type = "range";
	slider.addEventListener("change", sliderMoved);
	container.appendChild(slider);


	var addPlayPauseButton = document.createElement('input');
	addPlayPauseButton.type = 'button';
	addPlayPauseButton.addEventListener("click", playPause);
	container.appendChild(addPlayPauseButton);

	var editable = false;
	var addActionButton = document.createElement('input');
	addActionButton.type = 'button';
	addActionButton.addEventListener("click", addAction);
	addActionButton.value = "Add Action";
	container.appendChild(addActionButton);
	var editor = new Editor();

	update();

	function sliderMoved(event) {
		animation.setCurrentTime(this.value);
	}

	function playPause(event) {
		if (this.value == "Play") {
			animation.play();
		} else {
			animation.pause();
		}
	}

	function addAction(event) {
		alert("TODO");
	}

	/**
	 * Updates controls to match any variables which may have changed
	 */
	function update() {
		slider.min = 0;
		slider.max = animation.getMaxTime();

		// Snap to the nearest beat
		slider.step = beats.convertBeatsToBars(1);
		slider.value = animation.getCurrentTime();
		addActionButton.style.display = editable?'block':"none";
		addPlayPauseButton.value = animation.isPlaying()?"Pause":"Play";
	}
	this.update = update;

	/**
	 * Sets whether or not the routine should be editable by the user
	 * @param {boolean} isEditable Whether the user should be able to edit the routine
	 */
	function setEditable(isEditable) {
		editable = isEditable;
		update();
	}
	this.setEditable = setEditable;
}

module.exports = Controls;