# random-ext (JavaScript Random Extension)

random-ext is a Node.js module that generates random boolean, integers, floats, strings (with or without predefined character sets), objects, arrays etc.

## Installation

```
npm install random-ext --save
```

## Usage

```
var randomExt = require('random-ext');
```

## API Documentation

* [`boolean()`](#boolean)
* [`booleanArray(length)`] (#booleanArray)
* [`integer(max, min)`] (#integer)
* [`integerArray(length, max, min)`] (#integerArray)
* [`float(max, min)`] (#float)
* [`floatArray(length, max, min)`] (#floatArray)
* [`string(maxLength, minLength)`] (#string)
* [`stringArray(arrayLength, maxLength, minLength)`] (#stringArray)
* [`restrictedString(charTypeArray, maxLength, minLength)`] (#restrictedString)
* [`restrictedStringArray(arrayLength, charTypeArray, maxLength, minLength)`] (#restrictedStringArray)
* [`object(template)`] (#object)
* [`objectArray(length, template)`] (#objectArray)

### <a name="boolean"/> boolean()
Generates random boolean.
```
var randomBoolean = randomExt.boolean();
```
### <a name="booleanArray"/> booleanArray(length)

Generates random boolean array.
Parameter | Required | Description
--------- | -------- | -----------
length | Yes | Number of elements in the array.
```
var randomBooleanArray = randomExt.booleanArray(length);
```
### <a name="integer"/> integer(max, min)

Generates random integer.
```
var randomInteger = randomExt.integer(max, min);
```
### <a name="integerArray"/> integerArray(length, max, min)

Generates random integerArray.
```
var randomIntegerArray = randomExt.integerArray(length, max, min);
```
### <a name="float"/> float(max, min)

Generates random float.
```
var randomFloat = randomExt.float(max, min);
```
### <a name="floatArray"/> floatArray(length, max, min)

Generates random floatArray.
```
var randomFloatArray = randomExt.floatArray(length, max, min);
```
### <a name="string"/> string(maxLength, minLength)

Generates random string.
```
var randomString = randomExt.string(maxLength, minLength);
```
### <a name="stringArray"/> stringArray(arrayLength, maxLength, minLength)

Generates random stringArray.
```
var randomStringArray = randomExt.stringArray(arrayLength, maxLength, minLength);
```
### <a name="restrictedString"/> restrictedString(charTypeArray, maxLength, minLength)

Generates random restrictedString.
```
var randomRestrictedString = randomExt.restrictedString(charTypeArray, maxLength, minLength);
```
### <a name="restrictedStringArray"/> restrictedStringArray(arrayLength, charTypeArray, maxLength, minLength)

Generates random restrictedStringArray.
```
var randomRestrictedStringArray = randomExt.restrictedStringArray(arrayLength, charTypeArray, maxLength, minLength);
```
### <a name="object"/> object(template)

Generates random object.
```
var randomObject = randomExt.object(template);
```
### <a name="objectArray"/> objectArray(length, template)

Generates random objectArray.
```
var randomObjectArray = randomExt.objectArray(length, template);
```

