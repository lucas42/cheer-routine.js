var buster = require("buster");

// The unit under test
var Point = require("../point.js");

buster.testCase("point", {
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

        buster.assert.equals(point.getX(), 4, "Wrong X Value");
        buster.assert.equals(point.getY(), 5.5, "Wrong Y Value");
        buster.assert.equals(point.getZ(), 2, "Wrong Z Value");
        buster.assert.equals(point.getTime(), 4.5, "Wrong Time");
        buster.assert.equals(point.getRawData(), rawdata, "Wrong Raw Data");
    }
});