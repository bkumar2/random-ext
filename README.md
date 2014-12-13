# random-ext (Random Extension)

random-ext is a Node.js module that generates random boolean, integers, floats, strings (with or without predefined character sets), objects, arrays etc.

## Installation

```
npm install random-ext --save
```

## Usage

```
var randomExt = require('random-ext');
```

## Documentation

* `boolean()`
* `booleanArray(length)`
* `integer(max, min)`
* `integerArray(length, max, min)`
* `float(max, min)`
* `floatArray(length, max, min)`
* `string(maxLength, minLength)`
* `stringArray(arrayLength, maxLength, minLength)`
* `restrictedString(charTypeArray, maxLength, minLength)`
* `restrictedStringArray(arrayLength, charTypeArray, maxLength, minLength)`
* `object(template)`
* `objectArray(length, template)`

## <a name="boolean"/> boolean()
Generates random boolean.
```
var randomBoolean = randomExt.boolean();
```

