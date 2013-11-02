var buster = require("buster");

// The unit under test
var Sequence = require("../sequence.js");

buster.testCase("beats", {
    "Test getting points by time": function () {
    	var points, sequence, rawdata = [
            {x:4.5, y:3.5, z:0, bar:1, beat:1, p:1},
            {x:4, y:3.5, z:0, bar:1, beat:1, p:2},
            {x:5, y:3.5, z:0, bar:1, beat:1, p:3},
            {x:4.5, y:6, z:0, bar:1, beat:5, p:1},
            {x:4, y:1, z:0, bar:2, beat:1, p:2},
            {x:5, y:1, z:0, bar:2, beat:1, p:3},
    	];
        sequence = new Sequence(rawdata);
        points = sequence.getPointsByTime(1, 1);
        buster.assert.equals(points.length, 3, "Wrong number of points returned by getPointsByTime")

        // Sort points by person so they're in a predictable order
        points.sort(function (a,b) {a.p - b.p});

        buster.assert.equals(points[0].x, 4.5, "Person 1 starts in wrong x position");
        buster.assert.equals(points[0].y, 3.5, "Person 1 starts in wrong y position");
        buster.assert.equals(points[1].x, 4, "Person 2 starts in wrong x position");
        buster.assert.equals(points[1].y, 3.5, "Person 2 starts in wrong y position");
        buster.assert.equals(points[2].x, 5, "Person 3 starts in wrong x position");
        buster.assert.equals(points[2].y, 3.5, "Person 3 starts in wrong y position");



        points = sequence.getPointsByTime(1, 5);
        buster.assert.equals(points.length, 3, "Wrong number of points returned by getPointsByTime")

        // Sort points by person so they're in a predictable order
        points.sort(function (a,b) {a.p - b.p});

        buster.assert.equals(points[0].x, 4.5, "Person 1 moves x position");
        buster.assert.equals(points[0].y, 6, "Person 1 in wrong y position");
        buster.assert.equals(points[1].x, 4, "Person 2 moves x position");
        buster.assert.equals(points[1].y, 3.5, "Person 2 moves y position");
        buster.assert.equals(points[2].x, 5, "Person 3 moves x position");
        buster.assert.equals(points[2].y, 3.5, "Person 3 move y position");



        points = sequence.getPointsByTime(2, 1);
        buster.assert.equals(points.length, 3, "Wrong number of points returned by getPointsByTime")

        // Sort points by person so they're in a predictable order
        points.sort(function (a,b) {a.p - b.p});

        buster.assert.equals(points[0].x, 4.5, "Person 1 moves x position");
        buster.assert.equals(points[0].y, 6, "Person 1 moves y position");
        buster.assert.equals(points[1].x, 4, "Person 2 moves x position");
        buster.assert.equals(points[1].y, 1, "Person 2 in wrong y position");
        buster.assert.equals(points[2].x, 5, "Person 3 moves x position");
        buster.assert.equals(points[2].y, 1, "Person 3 in wrong y position");
    }
});