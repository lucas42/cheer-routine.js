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

        // Make a copy so class can't modify object unexpectedly
        var rawdatacopy = JSON.parse(JSON.stringify(rawdata));
        var point = new Point(rawdatacopy);
        var action = new Action(point, "back handspring");
        rawdata.c = "back handspring";

        buster.assert.equals(action.getTime(), 4.5, "Wrong Time");
        buster.assert.equals(action.getRawData(), rawdata, "Wrong Raw Data");
        buster.assert.equals(action.getPoint(), point, "Wrong Raw Data");
    }
});