# random-ext (JavaScript Random Values Generator)

random-ext is a Node.js module that generates random boolean, integers, floats, strings (with or without predefined character sets), objects, arrays etc.

## Installation

```
npm install random-ext --save
```

## Usage

```javascript
var randomExt = require("random-ext");
```

## API Documentation

-   [random-ext (JavaScript Random Values Generator)](#random-ext-javascript-random-values-generator)
    -   [Installation](#installation)
    -   [Usage](#usage)
    -   [API Documentation](#api-documentation)
        -   [boolean()](#boolean)
        -   [booleanArray(length)](#booleanarraylength)
        -   [integer(max, min)](#integermax-min)
        -   [integerArray(length, max, min)](#integerarraylength-max-min)
        -   [float(limit, min)](#floatlimit-min)
        -   [floatArray(length, max, min)](#floatarraylength-max-min)
        -   [date(endDate, startDate)](#dateenddate-startdate)
        -   [dateArray(length, endDate, startDate)](#datearraylength-enddate-startdate)
        -   [string(maxLength, minLength)](#stringmaxlength-minlength)
        -   [stringArray(arrayLength, maxLength, minLength)](#stringarrayarraylength-maxlength-minlength)
        -   [restrictedString(charTypeArray, maxLength, minLength)](#restrictedstringchartypearray-maxlength-minlength)
        -   [restrictedStringArray(arrayLength, charTypeArray, maxLength, minLength)](#restrictedstringarrayarraylength-chartypearray-maxlength-minlength)
        -   [object(template)](#objecttemplate)
        -   [objectArray(length, template)](#objectarraylength-template)
        -   [stringPattern(pattern, variableDefinition)](#stringpatternpattern-variabledefinition)
        -   [stringPatternArray(length, pattern, variableDefinition)](#stringpatternarraylength-pattern-variabledefinition)
        -   [pick(array)](#pickarray)
        -   [shuffle(array)](#shufflearray)
        -   [subArray(array,length)](#subarrayarraylength)
        -   [subArray(array,length)](#subarrayarraylength)
        -   [color()](#color)
        -   [splitArray()](#splitArray)
        -   [CHAR_TYPE](#char_type)
            -   [Values](#values)
        -   [Object template](#object-template)

### boolean()

Generates random boolean.

```javascript
var randomBoolean = randomExt.boolean();
```

### booleanArray(length)

Generates random boolean array.

**Parameter**

-   length - Required. Number of elements in the array.

```javascript
var randomBooleanArray = randomExt.booleanArray(10);
```

### integer(max, min)

Generates random integer.

**Parameters**

-   max - Required. Maximum integer value.
-   min - Optional. Minimum integer value. Defaults to 0 if unspecified.

```javascript
var randomInteger = randomExt.integer(99, 10);
```

### integerArray(length, max, min)

Generates random integerArray.

**Parameters**

-   length - Required. Number of elements in the array.
-   max - Required. Maximum integer value.
-   min - Optional. Minimum integer value. Defaults to 0 if unspecified.

```javascript
var randomIntegerArray = randomExt.integerArray(12, 99, 10);
```

### float(limit, min)

Generates random floating point number.

**Parameters**

-   limit - Required. Floating point number's upper limit. Generated number is always below this value.
-   min - Optional. Minimum floating point number. Defaults to 0 if unspecified.

```javascript
var randomFloat = randomExt.float(10.523, 3.021);
```

### floatArray(length, max, min)

Generates random floating point numbers' array.

**Parameters**

-   length - Required. Number of elements in the array.
-   limit - Required. Floating point number's upper limit. Generated number is always below this value.
-   min - Optional. Minimum floating point number. Defaults to 0 if unspecified.

```javascript
var randomFloatArray = randomExt.floatArray(23, 100.23423, 0.4);
```

### date(endDate, startDate)

Generates random date.

**Parameters**

-   endDate - Required. Latest date to generate.
-   startDate - Optional. Earliest date to generate. Defaults to "01-Jan-1970 00:00:00 UTC" if unspecified.

```javascript
var randomDate = randomExt.date(new Date());
```

### dateArray(length, endDate, startDate)

Generates random date array.

**Parameters**

-   length - Required. Number of elements in the array.
-   endDate - Required. Latest date to generate.
-   startDate - Optional. Earliest date to generate. Defaults to "01-Jan-1970 00:00:00 UTC" if unspecified.

```javascript
var randomDateArray = randomExt.dateArray(3, new Date());
```

### string(maxLength, minLength)

Generates random string containing random Unicode character in the code range 32-127, i.e. alphabets, numbers, space and special characters.

**Parameters**

-   maxLength - Required. Maximum length of generated string.
-   minLength - Optional. Minimum length of generated string. Defaults to 0 if unspecified.

```javascript
// Generates random password
var randomPassword = randomExt.string(20, 10);
```

### stringArray(arrayLength, maxLength, minLength)

Generates random string array.

**Parameters**

-   length - Required. Number of elements in the array.
-   maxLength - Required. Maximum length of generated string.
-   minLength - Optional. Minimum length of generated string. Defaults to 0 if unspecified.

```javascript
var randomStringArray = randomExt.stringArray(10, 4, 2);
```

### restrictedString(charTypeArray, maxLength, minLength)

Generates random restrictedString.

**Parameters**

-   charTypeArray - Required. Array of character types (Refer [CHAR_TYPE](#CHAR_TYPE)) or string from which characters will be picked.
-   maxLength - Required. Maximum length of generated string.
-   minLength - Optional. Minimum length of generated string. Defaults to 0 if unspecified.

```javascript
// Generates random snake case variable name.
var randomSnakeCaseVariableName = randomExt.restrictedString(
    [randomExt.CHAR_TYPE.LOWERCASE, "_"],
    20,
    10
);
```

### restrictedStringArray(arrayLength, charTypeArray, maxLength, minLength)

Generates random restricted string array.

**Parameters**

-   length - Required. Number of elements in the array.
-   charTypeArray - Required. Array of character types. Refer [CHAR_TYPE](#CHAR_TYPE)
-   maxLength - Required. Maximum length of generated string.
-   minLength - Optional. Minimum length of generated string. Defaults to 0 if unspecified.

```javascript
// Generates 10 element array of strings containing lower case and special characters.
var randomRestrictedStringArray = randomExt.restrictedStringArray(
    10,
    [randomExt.CHAR_TYPE.LOWERCASE, randomExt.CHAR_TYPE.SPECIAL],
    10,
    5
);
```

### object(template)

Generates random object.

**Parameters**

-   template - Required. Template object to randomize. Refer [object template syntax](#template)

```javascript
var customerTemplate = {
    name: [randomExt.string, 10, 5],
    age: [randomExt.integer, 100],
};
var customerWithRandomPropertyValues = randomExt.object(customerTemplate);
```

### objectArray(length, template)

Generates random objectArray.

**Parameters**

-   length - Required. Number of elements in the array.
-   template - Required. Template object to randomize. Refer [object template syntax](#template)

```javascript
var randomObjectArray = randomExt.objectArray(10, {
    name: [randomExt.string, 10, 5],
    age: [randomExt.integer, 100],
});
```

### stringPattern(pattern, variableDefinition)

Generates random string that matches given pattern. This is the most powerful random string generator that can virtually mimic any data type or format.

**Parameters**

-   pattern - Required. Pattern containing variables and constants. Any pattern element that is not defined in variable definition is treated as constant.
-   variableDefinition - Required. Object to describe each variable. Variable definition syntax is same as object template syntax. But each property of variable definition describes a variable used in pattern. Refer [object template syntax](#template)

```javascript
// Generates random email
var randomEmail = randomExt.stringPattern("x@x.com", {
    x: [randomExt.restrictedString, [randomExt.CHAR_TYPE.LOWERCASE], 20, 1],
});

// Generates random GUID - approach 1
var randomGUIDApproach1 = randomExt.stringPattern("x-y-y-y-z", {
    x: [randomExt.restrictedString, [randomExt.CHAR_TYPE.HEX], 8, 8],
    y: [randomExt.restrictedString, [randomExt.CHAR_TYPE.HEX], 4, 4],
    z: [randomExt.restrictedString, [randomExt.CHAR_TYPE.HEX], 12, 12],
});

// Generates random GUID - approach 2
var randomGUIDApproach2 = randomExt.stringPattern("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", {
    x: [randomExt.restrictedString, [randomExt.CHAR_TYPE.HEX], 1, 1],
});
```

### stringPatternArray(length, pattern, variableDefinition)

Generates array of random string for given pattern.

**Parameters**

-   length - Required. Number of elements in the array.
-   pattern - Required. Pattern containing variables and fixed string which will be matched with variable definition to generate a random string.
-   variableDefinition - Required. Object to describe each variable. Variable definition syntax is same as object template syntax. But each property of variable definition describes a variable used in pattern. Refer [object template syntax](#template)

```javascript
// Generates random GUID
var pattern = "x-y-y-y-z";
var variableDefinition = {
    x: [randomExt.restrictedString, [randomExt.CHAR_TYPE.HEX], 8, 8],
    y: [randomExt.restrictedString, [randomExt.CHAR_TYPE.HEX], 4, 4],
    z: [randomExt.restrictedString, [randomExt.CHAR_TYPE.HEX], 12, 12],
};
var randomGUIDArray = randomExt.stringPatternArray(10, pattern, variableDefinition);
```

### pick(array)

Picks a random element from the given array.

**Parameters**

-   array - Required. Input array from which random element is picked.

```javascript
var inputArray = ["aaa", "bbb", "ccc"];
var randomPick = randomExt.pick(inputArray);
```

### subArray(array,length)

Creates a sub array of given length with random elements picked from original array.

**Parameters**

-   array - Required. Input Array.
-   length - Required. Length of resulting sub array.

```javascript
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var subArray = randomExt.subArray(array, 4);
console.log("New Array:", subArray);
```

### shuffle(array)

Shuffles an array.

**Parameters**

-   array - Required. Array to shuffle.

```javascript
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
randomExt.shuffle(array);
console.log("Shuffled array:", array);
```

### color()

Generates random HEX color code.

```javascript
var randomColor = randomExt.color();
```

### guid()

Generates RFC-4122 complaint GUID.

```javascript
var guid = randomExt.guid();
```

### CHAR_TYPE

Character type enum. Defines character types to be used in string generation.

##### Values

-   LOWERCASE - Lowercase alphabets.
-   UPPERCASE - Uppercase alphabets.
-   NUMERIC - Digits from 0 to 9.
-   SPECIAL - Special characters.
-   SPACE - Single space character. It doesn't include tab and newline.
-   HEX - Hexadecimal number (0-9 and a to f).

```javascript
var hexCharType = randomExt.CHAR_TYPE.HEX;
```

### Object template

Object template is required to generate random objects or random string based on patterns.

**Syntax**

```javascript
var templateObject = {
    property1: [<function reference>, <function args>],
    property2: [<function reference>, <function args>],
    property3: [<function reference>, <function args>],
    .....
}
```

**Example**

```javascript
var customerTemplate = {
    name: [randomExt.string, 10, 5],
    age: [randomExt.integer, 100],
};
```
