/*!
 * random-ext
 * https://github.com/bkumar2/random-ext.git
 *
 * Copyright 2014 Bipul Kumar
 * Released under the Apache License 2.0
 */
var randomExt = require("./index.js");
var expect = require('chai').expect;

var randomBoolean = randomExt.boolean();
expect(randomBoolean).not.to.be.an('undefined');

var randomBooleanArray = randomExt.booleanArray(10);
expect(randomBooleanArray).not.to.be.an('undefined');
expect(randomBooleanArray.length).to.equal(10);

var integer = randomExt.integer(10, 2);
expect(integer).to.be.below(11);
expect(integer).to.be.above(1);

var integerArray = randomExt.integerArray(10, 10, 2);
expect(integerArray.length).to.equal(10);
for (var i = 0; i < integerArray.length; i++) {
  expect(integer).to.be.below(11);
  expect(integer).to.be.above(1);
}

var randomFloat = randomExt.float(10.1, 9.9);
expect(randomFloat).to.be.below(10.1);
expect(randomFloat).to.be.above(9.89);

var randomFloatArray = randomExt.floatArray(3, 100.23423, 0.4);
expect(randomFloatArray.length).to.equal(3);
for (var i = 0; i < randomFloatArray.length; i++) {
  expect(randomFloatArray[i]).to.be.below(100.23423);
  expect(randomFloatArray[i]).to.be.above(0.4);
}

var randomDate = randomExt.date(new Date());
expect(randomDate).to.be.below(new Date());

var randomDateArray = randomExt.dateArray(3, new Date());
expect(randomDateArray.length).to.equal(3);
for (var i = 0; i < randomDateArray.length; i++) {
  expect(randomDateArray[i]).to.be.below(new Date());
}

var randomString = randomExt.string(10, 5);
expect(typeof randomString).to.be.a("string");
expect(randomString.length).to.be.below(11);
expect(randomString.length).to.be.above(4);

var randomStringArray = randomExt.stringArray(6, 4, 2);
expect(randomStringArray.length).to.equal(6);
for (var i = 0; i < randomStringArray.length; i++) {
  expect(randomStringArray[i].length).to.be.below(5);
  expect(randomStringArray[i].length).to.be.above(1);
}

var randomSnakeCaseVariableName = randomExt.restrictedString(
  [randomExt.CHAR_TYPE.LOWERCASE, "_"], 20, 10);
expect(typeof randomSnakeCaseVariableName).to.be.a("string");
expect(randomSnakeCaseVariableName.length).to.be.below(21);
expect(randomSnakeCaseVariableName.length).to.be.above(9);

var randomObject = randomExt.object({
  name: [randomExt.restrictedString, [randomExt.CHAR_TYPE.LOWERCASE], 10, 5],
  gender: [randomExt.pick, ["Male", "Female"]],
  type: "Customer",
  age: [randomExt.integer, 100]
});
expect(typeof randomObject.name).to.be.a("string");

var randomObjectArray = randomExt.objectArray(4, {
  name: [randomExt.string, 10, 5],
  age: [randomExt.integer, 100]
});
expect(randomObjectArray.length).to.equal(4);

var randomStringPattern = randomExt.stringPattern("x@x.com", {
  x: [randomExt.restrictedString, [randomExt.CHAR_TYPE.LOWERCASE], 10, 6]
});
expect(randomStringPattern.indexOf("@")).to.be.above(5);
expect(randomStringPattern.indexOf(".com")).to.be.above(12);

var randomStringPatternArray = randomExt.stringPatternArray(5, "Xy Xy", {
  X: [randomExt.restrictedString, [randomExt.CHAR_TYPE.UPPERCASE], 1, 1],
  y: [randomExt.restrictedString, [randomExt.CHAR_TYPE.LOWERCASE], 20]
});
expect(randomStringPatternArray.length).to.equal(5);

var inputArray = ["aaa", "bbb", "ccc"];
var randomPick = randomExt.pick(inputArray);
expect(typeof randomPick).to.be.a("string");

var array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
randomExt.shuffle(array);
expect(array.length).to.equal(9);

var array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var subArray = randomExt.subArray(array, 4);
expect(subArray.length).to.equal(4);

var randomColor = randomExt.color();
expect(typeof randomColor).to.be.a("string");
expect(randomColor.indexOf("#")).to.equal(0);
expect(randomColor.length).to.equal(7);