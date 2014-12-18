# random-ext (JavaScript Random Extension)

random-ext is a Node.js module that generates random boolean, integers, floats, strings (with or without predefined character sets), objects, arrays etc.

## Installation

```
npm install random-ext --save
```

## Usage

```javascript
var randomExt = require('random-ext');
```

## API Documentation

* [`boolean()`](#boolean)
* [`booleanArray(length)`](#booleanArray)
* [`integer(max, min)`](#integer)
* [`integerArray(length, max, min)`](#integerArray)
* [`float(limit, min)`](#float)
* [`floatArray(length, limit, min)`](#floatArray)
* [`string(maxLength, minLength)`](#string)
* [`stringArray(arrayLength, maxLength, minLength)`](#stringArray)
* [`restrictedString(charTypeArray, maxLength, minLength)`](#restrictedString)
* [`restrictedStringArray(arrayLength, charTypeArray, maxLength, minLength)`](#restrictedStringArray)
* [`object(template)`](#object)
* [`objectArray(length, template)`](#objectArray)
* [`stringPattern(pattern, variableDefinition)`](#stringPattern)
* [`stringPatternArray(length, pattern, variableDefinition)`](#stringPatternArray)
* [`pick(array)`](#pick)
* [`CHAR_TYPE`](#CHAR_TYPE)

<a name="boolean"/>
### boolean()
Generates random boolean.

```javascript
var randomBoolean = randomExt.boolean();
```

<a name="booleanArray"/>
### booleanArray(length)

Generates random boolean array.
##### Parameter
* length - Required. Number of elements in the array.

```javascript
var randomBooleanArray = randomExt.booleanArray(10);
```

<a name="integer"/>
### integer(max, min)

Generates random integer.
##### Parameters
* max - Required. Maximum integer value.
* min - Optional. Minimum integer value. Defaults to 0 if unspecified.

```javascript
var randomInteger = randomExt.integer(99, 10);
```

<a name="integerArray"/>
### integerArray(length, max, min)

Generates random integerArray.
##### Parameters
* length - Required. Number of elements in the array.
* max - Required. Maximum integer value.
* min - Optional. Minimum integer value. Defaults to 0 if unspecified.

```javascript
var randomIntegerArray = randomExt.integerArray(12, 99, 10);
```

<a name="float"/>
### float(limit, min)

Generates random floating point number.
##### Parameters
* limit - Required. Floating point number's upper limit. Generated number is always below this value.
* min - Optional. Minimum floating point number. Defaults to 0 if unspecified.

```javascript
var randomFloat = randomExt.float(10.523, 3.021);
```

<a name="floatArray"/>
### floatArray(length, max, min)

Generates random floating point numbers' array.
##### Parameters
* length - Required. Number of elements in the array.
* limit - Required. Floating point number's upper limit. Generated number is always below this value.
* min - Optional. Minimum floating point number. Defaults to 0 if unspecified.

```javascript
var randomFloatArray = randomExt.floatArray(23, 100.23423, 0.4);
```

<a name="string"/>
### string(maxLength, minLength)

Generates random string containing random Unicode character in the code range 32-127, i.e. alphabets, numbers, space and special characters.
##### Parameters
* maxLength - Required. Maximum length of generated string.
* minLength - Optional. Minimum length of generated string. Defaults to 0 if unspecified.

```javascript
// Generates random password
var randomPassword = randomExt.string(20, 10);
```

<a name="stringArray"/>
### stringArray(arrayLength, maxLength, minLength)

Generates random string array.
##### Parameters
* length - Required. Number of elements in the array.
* maxLength - Required. Maximum length of generated string.
* minLength - Optional. Minimum length of generated string. Defaults to 0 if unspecified.

```javascript
var randomStringArray = randomExt.stringArray(10, 4, 2);
```

<a name="restrictedString"/>
### restrictedString(charTypeArray, maxLength, minLength)

Generates random restrictedString.
##### Parameters
* charTypeArray - Required. Array of character types (Refer [CHAR_TYPE](#CHAR_TYPE)) or string from which characters will be picked.
* maxLength - Required. Maximum length of generated string.
* minLength - Optional. Minimum length of generated string. Defaults to 0 if unspecified.

```javascript
// Generates random snake case variable name.
var randomSnakeCaseVariableName = randomExt.restrictedString(
    [randomExt.CHAR_TYPE.LOWERCASE,"_"], 20, 10);
```

<a name="restrictedStringArray"/>
### restrictedStringArray(arrayLength, charTypeArray, maxLength, minLength)

Generates random restricted string array.
##### Parameters
* length - Required. Number of elements in the array.
* charTypeArray - Required. Array of character types. Refer [CHAR_TYPE](#CHAR_TYPE)
* maxLength - Required. Maximum length of generated string.
* minLength - Optional. Minimum length of generated string. Defaults to 0 if unspecified.

```javascript
// Generates 10 element array of strings containing lower case and special characters.
var randomRestrictedStringArray = randomExt.restrictedStringArray(10,
    [randomExt.CHAR_TYPE.LOWERCASE, randomExt.CHAR_TYPE.SPECIAL], 10, 5);
```

<a name="object"/>
### object(template)

Generates random object.
##### Parameter
* template - Required. Template object to randomize. Refer [object template syntax](#template)

##### Example

```javascript
var customerTemplate = {
    name: [randomExt.string, 10, 5],
    age: [randomExt.integer, 100]
};
var customerWithRandomPropertyValues = randomExt.object(customerTemplate);
```

<a name="objectArray"/>
### objectArray(length, template)

Generates random objectArray.
##### Parameters
* length - Required. Number of elements in the array.
* template - Required. Template object to randomize. Refer [object template syntax](#template)

```javascript
var randomObjectArray = randomExt.objectArray(10,{
    name: [randomExt.string, 10, 5],
    age: [randomExt.integer, 100]
});
```

<a name="stringPattern"/>
### stringPattern(pattern, variableDefinition)

Generates random string that matches given pattern. This is the most powerful random string generator that can virtually mimic any data type or format.
##### Parameters
* pattern - Required. Pattern containing variables and constants. Any pattern element that is not defined in variable definition is treated as constant.
* variableDefinition - Required. Object to describe each variable. Variable definition syntax is same as object template syntax. But each property of variable definition describes a variable used in pattern. Refer [object template syntax](#template)

```javascript
// Generates random email
var randomEmail = randomExt.stringPattern("x@x.com", {
    x: [randomExt.restrictedString, [randomExt.CHAR_TYPE.LOWERCASE], 20, 1]
});

// Generates random GUID - approach 1
var randomGUIDApproach1 = randomExt.stringPattern("x-y-y-y-z",{
    x: [randomExt.restrictedString, [randomExt.CHAR_TYPE.HEX], 8, 8],
    y: [randomExt.restrictedString, [randomExt.CHAR_TYPE.HEX], 4, 4],
    z: [randomExt.restrictedString, [randomExt.CHAR_TYPE.HEX], 12, 12]
});

// Generates random GUID - approach 2
var randomGUIDApproach2 = randomExt.stringPattern("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",{
    x: [randomExt.restrictedString, [randomExt.CHAR_TYPE.HEX], 1, 1]
});
```

<a name="stringPatternArray"/>
### stringPatternArray(length, pattern, variableDefinition)

Generates array of random string for given pattern.
##### Parameters
* length - Required. Number of elements in the array.
* pattern - Required. Pattern containing variables and fixed string which will be matched with variable definition to generate a random string.
* variableDefinition - Required. Object to describe each variable. Variable definition syntax is same as object template syntax. But each property of variable definition describes a variable used in pattern. Refer [object template syntax](#template)

```javascript
// Generates random GUID
var pattern = "x-y-y-y-z";
var variableDefinition = {
    x: [randomExt.restrictedString, [randomExt.CHAR_TYPE.HEX], 8, 8],
    y: [randomExt.restrictedString, [randomExt.CHAR_TYPE.HEX], 4, 4],
    z: [randomExt.restrictedString, [randomExt.CHAR_TYPE.HEX], 12, 12]
};
var randomGUIDArray = randomExt.stringPatternArray(10, pattern, variableDefinition);
```

<a name="pick"/>
### pick(array)

Picks a random element from the given array.

##### Parameters
* array - Required. Input array from which random element is picked.

```javascript
var inputArray = ["aaa", "bbb", "ccc"];
var randomPick = randomExt.pick(inputArray);
```

<a name="CHAR_TYPE"/>
### CHAR_TYPE

Character type enum. Defines character types to be used in string generation.

##### Values
* LOWERCASE - Lowercase alphabets.
* UPPERCASE - Uppercase alphabets.
* NUMERIC - Digits from 0 to 9.
* SPECIAL - Special characters.
* SPACE - Single space character. It doesn't include tab and newline.
* HEX - Hexadecimal number (0-9 and a to f).

```javascript
var hexCharType = randomExt.CHAR_TYPE.HEX;
```

<a name="template"/>
### Object template

Object template is required to generate random objects or random string based on patterns.

##### Syntax

```javascript
var templateObject = {
    property1: [<function reference>, <function args>],
    property2: [<function reference>, <function args>],
    property3: [<function reference>, <function args>],
    .....
}
```

##### Example

```javascript
var customerTemplate = {
    name: [randomExt.string, 10, 5],
    age: [randomExt.integer, 100]
};
```

