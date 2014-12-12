var randomExt = require("../index.js");

describe('', function () {

    it('must generate random boolean value: ', function () {
        var boolean = randomExt.boolean();
        console.log("Random boolean:", boolean);
        expect(boolean).not.toBeUndefined();
    });

    it('must generate random integer between 2 and 10: ', function () {
        var integer = randomExt.integer(10, 2);
        console.log("Random integer:", integer);
        expect(integer).toBeLessThan(11);
        expect(integer).toBeGreaterThan(1);
    });

    it('must generate random integer array with 10 integers between 2 and 10: ', function () {
        var integerArray = randomExt.integerArray(10, 10, 2);
        console.log("Random integer array:", integerArray);
        expect(integerArray.length).toBe(10);
        for (var i = 0; i < integerArray.length; i++) {
            expect(integerArray[i]).toBeLessThan(11);
            expect(integerArray[i]).toBeGreaterThan(1);
        }
    });

    it('must generate random object: ', function () {
        var randomObject = randomExt.object({
            name: [randomExt.DATA_TYPE.STRING, 15, 5],
            age: [randomExt.DATA_TYPE.INTEGER, 100]
        });
        console.log("randomObject:", randomObject);
        expect(typeof randomObject.name).toBe("string");
    });

    it('must generate random object array: ', function () {
        var randomObjectArray = randomExt.objectArray(5, {
            name: [randomExt.DATA_TYPE.RESTRICTED_STRING, [randomExt.CHAR_TYPE.UPPERCASE, randomExt.CHAR_TYPE.LOWERCASE, randomExt.CHAR_TYPE.SPACE], 25, 10],
            age: [randomExt.DATA_TYPE.INTEGER, 120, 0]
        });
        console.log("randomObjectArray:", randomObjectArray);
        expect(randomObjectArray.length).toBe(5);
    });
});
