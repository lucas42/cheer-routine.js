var buster = require("buster");
var Point = require("../point.js");
var Action = require("../action.js");

// The unit under test
var Person = require("../person.js");

buster.testCase("person", {
    "Test Person class": function () {
    	var i, l, rawdata = [
            {x:4.5, y:3.5, z:0, bar:1, beat:1, c: "stand"},
            {x:4.5, y:4, z:0, bar:1, beat:3, c: "run"},
            {x:4.5, y:6, z:0, bar:1, beat:7, c: "back handspring"},
    	];
        var point, action, person = new Person();
        for(i=0, l=rawdata.length; i<l; i++) {
            // Make a copy so class can't modify object unexpectedly
            var rawdatacopy = JSON.parse(JSON.stringify(rawdata[i]));

            point = new Point(rawdatacopy);
            action = new Action(point, rawdatacopy.c);
            person.addAction(action);
        }
        action = person.getActionByTime(1.0);
        buster.assert.equals(action.getRawData(), rawdata[0], "Wrong starting action returned");

        action = person.getActionByTime(1.25);
        buster.assert.equals(action.getRawData(), rawdata[1], "Wrong second action returned");

        action = person.getActionByTime(1.75);
        buster.assert.equals(action.getRawData(), rawdata[2], "Wrong final action returned");

        action = person.getActionByTime(1.5);

        // TODO: after tweening is implemented, y should be 5
        //buster.assert.equals(action.getRawData(), {x:4.5, y:5, z:0, bar:1, beat:3, c: "run"}, "Wrong inbetween action returned");
        buster.assert.equals(action.getRawData(), {x:4.5, y:4, z:0, bar:1, beat:3, c: "run"}, "Wrong inbetween action returned");


        var maxTime = person.getMaxTime();
        buster.assert.equals(maxTime, 1.75, "Wrong max time returned");

        var actualdata = person.getRawData();

        /**
         * Just sort the data in a consistent way
         */
        function sortdata(a, b) {
            if (a.x != b.x) return a.x - b.x;
            if (a.y != b.y) return a.y - b.y;
            if (a.z != b.z) return a.z - b.z;
            if (a.bar != b.bar) return a.bar - b.bar;
            return a.beat - b.beat;
        }

        // The order of the data isn't important, so make it consistent for comparison purposes
        actualdata.sort(sortdata);
        rawdata.sort(sortdata);
        buster.assert.equals(actualdata, rawdata, "raw data has changed");
    }
});