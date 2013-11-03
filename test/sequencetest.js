var buster = require("buster");

// The unit under test
var Sequence = require("../sequence.js");

buster.testCase("beats", {
    "Test getting points by time": function () {
    	var actions, sequence, rawdata = [
            {x:4.5, y:3.5, z:0, bar:1, beat:1, p:"1", c: "stand"},
            {x:4, y:3.5, z:0, bar:1, beat:1, p:"2", c: "stand"},
            {x:5, y:3.5, z:0, bar:1, beat:1, p:"3", c: "stand"},
            {x:4.5, y:6, z:0, bar:1, beat:5, p:"1", c: "back handspring"},
            {x:4, y:1, z:0, bar:2, beat:1, p:"2", c: "roundoff"},
            {x:5, y:1, z:0, bar:2, beat:1, p:"3", c: "roundoff"},
    	];
        sequence = new Sequence(rawdata);
        actions = sequence.getActionsByBeat(1, 1);

        buster.assert.equals(actions[1].getRawData().x, 4.5, "Person 1 starts in wrong x position");
        buster.assert.equals(actions[1].getRawData().y, 3.5, "Person 1 starts in wrong y position");
        buster.assert.equals(actions[2].getRawData().x, 4, "Person 2 starts in wrong x position");
        buster.assert.equals(actions[2].getRawData().y, 3.5, "Person 2 starts in wrong y position");
        buster.assert.equals(actions[3].getRawData().x, 5, "Person 3 starts in wrong x position");
        buster.assert.equals(actions[3].getRawData().y, 3.5, "Person 3 starts in wrong y position");



        actions = sequence.getActionsByBeat(1, 5);

        buster.assert.equals(actions[1].getRawData().x, 4.5, "Person 1 moves x position");
        buster.assert.equals(actions[1].getRawData().y, 6, "Person 1 in wrong y position");
        buster.assert.equals(actions[2].getRawData().x, 4, "Person 2 moves x position");
        buster.assert.equals(actions[2].getRawData().y, 3.5, "Person 2 moves y position");
        buster.assert.equals(actions[3].getRawData().x, 5, "Person 3 moves x position");
        buster.assert.equals(actions[3].getRawData().y, 3.5, "Person 3 move y position");



        actions = sequence.getActionsByBeat(2, 1);

        buster.assert.equals(actions[1].getRawData().x, 4.5, "Person 1 moves x position");
        buster.assert.equals(actions[1].getRawData().y, 6, "Person 1 moves y position");
        buster.assert.equals(actions[2].getRawData().x, 4, "Person 2 moves x position");
        buster.assert.equals(actions[2].getRawData().y, 1, "Person 2 in wrong y position");
        buster.assert.equals(actions[3].getRawData().x, 5, "Person 3 moves x position");
        buster.assert.equals(actions[3].getRawData().y, 1, "Person 3 in wrong y position");

        var actualdata = sequence.getRawData();

        /**
         * Just sort the data in a consistent way
         */
        function sortdata(a, b) {
            if (a.x != b.x) return a.x - b.x;
            if (a.y != b.y) return a.y - b.y;
            if (a.z != b.z) return a.z - b.z;
            if (a.bar != b.bar) return a.bar - b.bar;
            if (a.beat != b.beat) return a.beat - b.beat;
            return a.p - b.p;
        }

        // The order of the data isn't important, so make it consistent for comparison purposes
        actualdata.sort(sortdata);
        rawdata.sort(sortdata);
        buster.assert.equals(actualdata, rawdata, "raw data has changed");
    }
});