var buster = require("buster");
var Point = require("../point.js");

// The unit under test
var Action = require("../action.js");

buster.testCase("action", {
    "Test constructor and getters": function () {
        var rawdata = {
            x: 4,
            y: 5.5,
            z: 2,
            bar: 4,
            beat: 5,
            unknown_param: "foobar"
        };
        var point = new Point(rawdata);
        var action = new Action(point, "back handspring");
        
        buster.assert.equals(action.getTime(), 4.5, "Wrong Time");
        buster.assert.equals(action.getRawData(), rawdata, "Wrong Raw Data");
        buster.assert.equals(action.getPoint(), point, "Wrong Raw Data");
    }
});