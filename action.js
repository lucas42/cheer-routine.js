/**
 * An object representing an action which happens at a given space and time
 * @param {Point} point The spacetime location of the action
 * @param {string} comment An explanation of what the action is
 */
function Action(point, comment) {
	function getTime() {
		return point.getTime();
	}
	this.getTime = getTime;

	function getPoint() {
		return point;
	}
	this.getPoint = getPoint;

	function getRawData() {
		var data = point.getRawData();
		data.c = comment;
		return data;
	}
	this.getRawData = getRawData;
}

module.exports = Action;