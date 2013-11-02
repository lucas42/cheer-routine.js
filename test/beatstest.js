var buster = require("buster");

// The unit under test
var beats = require("../beats.js");

buster.testCase("beats", {
    "Test normalisation": function () {
    	var cases = [
    		{
    			bar: 1,
    			beat: 5,
    			time: 1.5
    		},
    		{
    			bar: 2,
    			beat: 3,
    			time: 2.25
    		},
    		{
    			bar: 0,
    			beat: 1,
    			time: 0
    		},
    		{
    			bar: 5,
    			beat: 7,
    			time: 5.75
    		}
    	];
    	var i = 0, l=cases.length;
    	for (; i<l; i++) {
    		var c = cases[i];
	        var actualtime = beats.normalise(c.bar, c.beat);
	        buster.assert.equals(actualtime, c.time, "Incorrect normalisation");
	        var actual = beats.denormalise(actualtime);
	        buster.assert.equals(actual.bar, c.bar, "Incorrect denormalisation of bar numbers");
	        buster.assert.equals(actual.beat, c.beat, "Incorrect denormalisation of beat numbers");
	    }
    }
});