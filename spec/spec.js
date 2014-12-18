/*!
 * random-ext
 * https://github.com/bkumar2/random-ext.git
 *
 * Copyright 2014 Bipul Kumar
 * Released under the Apache License 2.0
 */
var randomExt = require("../index.js");

describe('', function () {

    it('must generate random boolean value: ', function () {
        var boolean = randomExt.boolean();
        console.log("Random boolean:", boolean);
        expect(boolean).not.toBeUndefined();
    });

    it('must generate random boolean array: ', function () {
        var randomBooleanArray = randomExt.booleanArray(10);
        console.log("Random boolean array:", randomBooleanArray);
        expect(randomBooleanArray).not.toBeUndefined();
        expect(randomBooleanArray.length).toBe(10);
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

    it('must generate random float between 9.9 and 10.1: ', function () {
        var randomFloat = randomExt.float(10.1, 9.9);
        console.log("Random float:", randomFloat);
        expect(randomFloat).toBeLessThan(10.1);
        expect(randomFloat).toBeGreaterThan(9.89);
    });

    it('must generate random float array : ', function () {
        var randomFloatArray = randomExt.floatArray(3, 100.23423, 0.4);
        console.log("Random float array:", randomFloatArray);
        expect(randomFloatArray.length).toBe(3);
        for (var i = 0; i < randomFloatArray.length; i++) {
            expect(randomFloatArray[i]).toBeLessThan(100.23423);
            expect(randomFloatArray[i]).toBeGreaterThan(0.4);
        }
    });

    it('must generate random String : ', function () {
        var randomString = randomExt.string(10, 5);
        console.log("Random string:", randomString);
        expect(typeof randomString).toBe("string");
        expect(randomString.length).toBeLessThan(11);
        expect(randomString.length).toBeGreaterThan(4);
    });

    it('must generate random string array : ', function () {
        var randomStringArray = randomExt.stringArray(6, 4, 2);
        console.log("Random string array:", randomStringArray);
        expect(randomStringArray.length).toBe(6);
        for (var i = 0; i < randomStringArray.length; i++) {
            expect(randomStringArray[i].length).toBeLessThan(5);
            expect(randomStringArray[i].length).toBeGreaterThan(1);
        }
    });

    it('must generate random object: ', function () {
        var randomObject = randomExt.object({
            name: [randomExt.string, 10, 5],
            age: [randomExt.integer, 100]
        });
        console.log("randomObject:", randomObject);
        expect(typeof randomObject.name).toBe("string");
    });

    it('must generate random object array: ', function () {
        var randomObjectArray = randomExt.objectArray(4, {
            name: [randomExt.string, 10, 5],
            age: [randomExt.integer, 100]
        });
        console.log("randomObjectArray:", randomObjectArray);
        expect(randomObjectArray.length).toBe(4);
    });

    it('must generate random string pattern: ', function () {
        var randomStringPattern = randomExt.stringPattern("x@x.com", {
            x: [randomExt.restrictedString, [randomExt.CHAR_TYPE.LOWERCASE], 10, 6]
        });
        console.log("randomStringPatternArray:", randomStringPattern);
        expect(randomStringPattern.indexOf("@")).toBeGreaterThan(5);
        expect(randomStringPattern.indexOf(".com")).toBeGreaterThan(12);
    });

    it('must generate random string pattern array: ', function () {
        var randomStringPatternArray = randomExt.stringPatternArray(5, "Xy Xy", {
            X: [randomExt.restrictedString, [randomExt.CHAR_TYPE.UPPERCASE], 1, 1],
            y: [randomExt.restrictedString, [randomExt.CHAR_TYPE.LOWERCASE], 20]
        });
        console.log("randomStringPatternArray:", randomStringPatternArray);
        expect(randomStringPatternArray.length).toBe(5);
    });

    it('must pick a random item from an array: ', function () {
        var inputArray = ["aaa", "bbb", "ccc"];
        var randomPick = randomExt.pick(inputArray);
        console.log("input array:", inputArray, " randomPick:", randomPick);
        expect(typeof randomPick).toBe("string");
    });
});
