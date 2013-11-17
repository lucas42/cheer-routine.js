var beats = require("./beats.js");

function Editor(animation) {

	this.form = document.createElement('form');

	var fieldset = document.createElement("fieldset");
	var label, key, inputs = {}
	inputs.p = document.createElement("input");
	inputs.p.label = "Person";
	inputs.x = document.createElement("input");
	inputs.x.label = "X coord";
	inputs.y = document.createElement("input");
	inputs.y.label = "Y coord";
	inputs.z = document.createElement("input");
	inputs.z.label = "Z coord";
	inputs.bar = document.createElement("input");
	inputs.bar.label = "Which count of 8";
	inputs.beat = document.createElement("input");
	inputs.beat.label = "Which count in the bar";
	inputs.c = document.createElement("input");
	inputs.c.label = "Action";
	for(key in inputs) {
		label = document.createElement('label');
		label.appendChild(document.createTextNode(inputs[key].label));
		inputs[key].name = key;
		label.appendChild(inputs[key]);
		fieldset.appendChild(label);
	}
	fieldset.style.display = 'none';
	this.form.appendChild(fieldset);

	var actionButton = document.createElement('input');
	actionButton.type = 'button';
	actionButton.addEventListener("click", actionButtonClick);
	actionButton.value = "New Action";
	this.form.appendChild(actionButton);

	function showFieldset(data) {
		var key;
		var barsbeats = beats.denormalise(animation.getCurrentTime());
		for (key in inputs) {
			if (key in data) inputs[key].value = data[key]
			else if (key in barsbeats) inputs[key].value =  Math.round(barsbeats[key]);
			else inputs[key].value =  "";
		}
		fieldset.style.display = 'block';
		actionButton.value = 'Edit Action'
	}

	function actionButtonClick() {
		if (this.value == "New Action") {
			showFieldset({});
		} else {
			editAction();
		}
	}
	function editAction() {
		alert("TODO");

		fieldset.style.display = 'none';
		actionButton.value = "New Action";
	}

	function canvasclick(event) {
		var roundedX = Math.round(event.normalisedX * 2) / 2;
		var roundedY = Math.round(event.normalisedY * 2) / 2;
		showFieldset({x: roundedX, y: roundedY, z: 0, p: event.personid});
	}
	this.canvasclick = canvasclick;
}
module.exports = Editor;