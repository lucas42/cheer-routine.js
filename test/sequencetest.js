var buster = require("buster");

// The unit under test
var Sequence = require("../sequence.js");

buster.testCase("beats", {
    "Test getting points by time": function () {
    	var actions, sequence, rawdata = [
            {x:4.5, y:3.5, z:0, bar:1, beat:1, p:1},
            {x:4, y:3.5, z:0, bar:1, beat:1, p:2},
            {x:5, y:3.5, z:0, bar:1, beat:1, p:3},
            {x:4.5, y:6, z:0, bar:1, beat:5, p:1},
            {x:4, y:1, z:0, bar:2, beat:1, p:2},
            {x:5, y:1, z:0, bar:2, beat:1, p:3},
    	];
        sequence = new Sequence(rawdata);
        actions = sequence.getActionsByTime(1, 1);

        buster.assert.equals(actions[1].getRawData().x, 4.5, "Person 1 starts in wrong x position");
        buster.assert.equals(actions[1].getRawData().y, 3.5, "Person 1 starts in wrong y position");
        buster.assert.equals(actions[2].getRawData().x, 4, "Person 2 starts in wrong x position");
        buster.assert.equals(actions[2].getRawData().y, 3.5, "Person 2 starts in wrong y position");
        buster.assert.equals(actions[3].getRawData().x, 5, "Person 3 starts in wrong x position");
        buster.assert.equals(actions[3].getRawData().y, 3.5, "Person 3 starts in wrong y position");



        actions = sequence.getActionsByTime(1, 5);

        buster.assert.equals(actions[1].getRawData().x, 4.5, "Person 1 moves x position");
        buster.assert.equals(actions[1].getRawData().y, 6, "Person 1 in wrong y position");
        buster.assert.equals(actions[2].getRawData().x, 4, "Person 2 moves x position");
        buster.assert.equals(actions[2].getRawData().y, 3.5, "Person 2 moves y position");
        buster.assert.equals(actions[3].getRawData().x, 5, "Person 3 moves x position");
        buster.assert.equals(actions[3].getRawData().y, 3.5, "Person 3 move y position");



        actions = sequence.getActionsByTime(2, 1);

        buster.assert.equals(actions[1].getRawData().x, 4.5, "Person 1 moves x position");
        buster.assert.equals(actions[1].getRawData().y, 6, "Person 1 moves y position");
        buster.assert.equals(actions[2].getRawData().x, 4, "Person 2 moves x position");
        buster.assert.equals(actions[2].getRawData().y, 1, "Person 2 in wrong y position");
        buster.assert.equals(actions[3].getRawData().x, 5, "Person 3 moves x position");
        buster.assert.equals(actions[3].getRawData().y, 1, "Person 3 in wrong y position");

    }
});