function Editor() {
	function newAction() {
		alert("new action");
	}
	this.newAction = newAction;

	function canvasclick(event) {

		// If clicking on an existing person, don't show an overlay
		if (event.personid) return;
		console.log(event.normalisedX, event.normalisedY);
	}
	this.canvasclick = canvasclick;
}
module.exports = Editor;