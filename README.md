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
* [`float(limit, min)`] (#float)
* [`floatArray(length, limit, min)`] (#floatArray)
* [`string(maxLength, minLength)`] (#string)
* [`stringArray(arrayLength, maxLength, minLength)`] (#stringArray)
* [`restrictedString(charTypeArray, maxLength, minLength)`] (#restrictedString)
* [`restrictedStringArray(arrayLength, charTypeArray, maxLength, minLength)`] (#restrictedStringArray)
* [`object(template)`] (#object)
* [`objectArray(length, template)`] (#objectArray)
* [`stringPattern(pattern, variableDefinition)`] (#stringPattern)
* [`stringPatternArray(length, pattern,variableDefinition)`] (#stringPatternArray)

<a name="boolean"/>
### boolean()
Generates random boolean.
```
var randomBoolean = randomExt.boolean();
```

<a name="booleanArray"/>
### booleanArray(length)

Generates random boolean array.
##### Parameter
* length - Required. Number of elements in the array.
```
var randomBooleanArray = randomExt.booleanArray(10);
```

<a name="integer"/>
### integer(max, min)

Generates random integer.
##### Parameters
* max - Required. Maximum integer value.
* min - Optional. Minimum integer value. Defaults to 0 if unspecified.

```
var randomInteger = randomExt.integer(99, 10);
```

<a name="integerArray"/>
### integerArray(length, max, min)

Generates random integerArray.
##### Parameters
* length - Required. Number of elements in the array.
* max - Required. Maximum integer value.
* min - Optional. Minimum integer value. Defaults to 0 if unspecified.

```
var randomIntegerArray = randomExt.integerArray(length, max, min);
```

<a name="float"/>
### float(limit, min)

Generates random floating point number.
##### Parameters
* limit - Required. Floating point number's upper limit. Generated number is always below this value.
* min - Optional. Minimum floating point number. Defaults to 0 if unspecified.

```
var randomFloat = randomExt.float(10.523, 3.021);
```

<a name="floatArray"/>
### floatArray(length, max, min)

Generates random floating point numbers' array.
##### Parameters
* length - Required. Number of elements in the array.
* limit - Required. Floating point number's upper limit. Generated number is always below this value.
* min - Optional. Minimum floating point number. Defaults to 0 if unspecified.

```
var randomFloatArray = randomExt.floatArray(23, 100.23423, 0.4);
```

<a name="string"/>
### string(maxLength, minLength)

Generates random string containing random Unicode character in the code range 32-127, i.e. alphabets, numbers, space and special characters.
##### Parameters
* maxLength - Required. Maximum length of generated string.
* minLength - Optional. Minimum length of generated string. Defaults to 0 if unspecified.

```
var randomString = randomExt.string(10, 5);
```

<a name="stringArray"/>
### stringArray(arrayLength, maxLength, minLength)

Generates random string array.
##### Parameters
* length - Required. Number of elements in the array.
* maxLength - Required. Maximum length of generated string.
* minLength - Optional. Minimum length of generated string. Defaults to 0 if unspecified.

```
var randomStringArray = randomExt.stringArray(10, 4, 2);
```

<a name="restrictedString"/>
### restrictedString(charTypeArray, maxLength, minLength)

Generates random restrictedString.
##### Parameters
* charTypeArray - Required. Array of character types.
* maxLength - Required. Maximum length of generated string.
* minLength - Optional. Minimum length of generated string. Defaults to 0 if unspecified.

```
// Generates string containing lower case and special characters.
var randomRestrictedString = randomExt.restrictedString([randomExt.CHAR_TYPE.LOWERCASE, randomExt.CHAR_TYPE.SPECIAL], 10, 5);
```

<a name="restrictedStringArray"/>
### restrictedStringArray(arrayLength, charTypeArray, maxLength, minLength)

Generates random restricted string array.
##### Parameters
* length - Required. Number of elements in the array.
* charTypeArray - Required. Array of character types.
* maxLength - Required. Maximum length of generated string.
* minLength - Optional. Minimum length of generated string. Defaults to 0 if unspecified.

```
// Generates 10 element array of strings containing lower case and special characters.
var randomRestrictedStringArray = randomExt.restrictedStringArray(10, [randomExt.CHAR_TYPE.LOWERCASE, randomExt.CHAR_TYPE.SPECIAL], 10, 5);
```

<a name="object"/>
### object(template)

Generates random object.
##### Parameter
* template - Required. Template object to randomize.

```
var randomObject = randomExt.object({
    name: [randomExt.DATA_TYPE.STRING, 10, 5],
    age: [randomExt.DATA_TYPE.INTEGER, 100],
});
```

<a name="objectArray"/>
### objectArray(length, template)

Generates random objectArray.
##### Parameters
* length - Required. Number of elements in the array.
* template - Required. Template object to randomize.

```
var randomObjectArray = randomExt.objectArray(10,{
    name: [randomExt.DATA_TYPE.STRING, 10, 5],
    age: [randomExt.DATA_TYPE.INTEGER, 100],
});
```

<a name="stringPattern"/>
### stringPattern(pattern, variableDefinition)

Generates random string that matches given pattern. This is the most powerful random string generator that can virtually mimic any type.
##### Parameters
* pattern - Required. Pattern containing variables and fixed string which will be matched with variable definition to generate a random string.
* variableDefinition - Required. Object to describe each variable.

```
// Generates random GUID
var randomGUIDApproach1 = randomExt.stringPattern("x-y-y-y-z",{
    x: [randomExt.DATA_TYPE.RESTRICTED_STRING, [randomExt.CHAR_TYPE.HEX], 8, 8],
    y: [randomExt.DATA_TYPE.RESTRICTED_STRING, [randomExt.CHAR_TYPE.HEX], 4, 4],
    z: [randomExt.DATA_TYPE.RESTRICTED_STRING, [randomExt.CHAR_TYPE.HEX], 12, 12]
});
var randomGUIDApproach2 = randomExt.stringPattern("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",{
    x: [randomExt.DATA_TYPE.RESTRICTED_STRING, [randomExt.CHAR_TYPE.HEX], 1, 1]
});
```

<a name="stringPatternArray"/>
### stringPatternArray(length, pattern, variableDefinition)

Generates array of random string for given pattern.
##### Parameters
* length - Required. Number of elements in the array.
* pattern - Required. Pattern containing variables and fixed string which will be matched with variable definition to generate a random string.
* variableDefinition - Required. Object to describe each variable.

```
// Generates random GUID
var randomGUIDArray = randomExt.stringPatternArray(10, "x-y-y-y-z",{
    x: [randomExt.DATA_TYPE.RESTRICTED_STRING, [randomExt.CHAR_TYPE.HEX], 8, 8],
    y: [randomExt.DATA_TYPE.RESTRICTED_STRING, [randomExt.CHAR_TYPE.HEX], 4, 4],
    z: [randomExt.DATA_TYPE.RESTRICTED_STRING, [randomExt.CHAR_TYPE.HEX], 12, 12]
});
```

