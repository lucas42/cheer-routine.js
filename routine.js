var Mat = require("./mat.js");
var Sequence = require("./sequence.js");
var Animation = require("./animation.js");
var beats = require("./beats.js");

/**
 * An object representing a complete routine
 * 
 * @param {HTMLCanvasElement} canvas A canvas element representing the routine mat
 * @param {array} data An array of all the data points making up the routine
 * @returns {Routine}
 */
function Routine(canvas, data) {
	var animation = new Animation(new Sequence(data), new Mat(canvas));

	/**
	 * Adds controls for playing the routine
	 * @param {DOMElement} container A DOM element to put all the relevant controls in.
	 */
	function addControls(container) {
		var Controls = require('./controls');
		var controls = new Controls(container, this);
		animation.setUpdateFunc(controls.update);
	}
	this.addControls = addControls;
	this.isEditable = false;

	function getAnimation() {
		return animation;
	}
	this.getAnimation = getAnimation;
}




module.exports = Routine;