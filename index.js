/*!
 * random-ext
 * https://github.com/bkumar2/random-ext.git
 *
 * Copyright 2014 Bipul Kumar
 * Released under the Apache License 2.0
 */
function _generateArray(length, elementFunction, args) {
    var array = [];
    if (length != null) {
        for (var i = 0; i < length; ++i) {
            array[i] = elementFunction.apply(this, args);
        }
    } else {
        throw "length is required.";
    }
    return array;
}

function generateBoolean() {
    return Math.random() < 0.5;
}

function generateBooleanArray(length) {
    return _generateArray(length, generateBoolean);
}

function generateFloat(limit, min) {
    if (limit != null) {
        if (min != null) {
            return (Math.random() * (limit - min)) + min;
        } else {
            return Math.random() * limit;
        }
    } else {
        throw "max is required.";
    }
}

function generateFloatArray(length, limit, min) {
    return _generateArray(length, generateFloat, [limit, min]);
}

function generateInteger(max, min) {
    if (max != null) {
        if (min != null) {
            if (max < min) {
                throw "max [" + max + "] is less than min [" + min
                "]";
            }
            return Math.floor(Math.random() * (max - min + 1)) + min;
        } else {
            return Math.floor(Math.random() * (max + 1));
        }
    } else {
        throw "max is required.";
    }
}

function generateIntegerArray(length, max, min) {
    return _generateArray(length, generateInteger, [max, min]);
}

function _normalizeRanges(ranges) {
    if (randomExt.DEBUG) {
        console.log("Normalizing ranges:", ranges);
    }
    ranges.sort(function (a, b) {
        return a[0] - b[0];
    });
    if (randomExt.DEBUG) {
        console.log("sorted ranges:", ranges);
    }
    for (var i = 0; i < ranges.length - 1; ++i) {
        for (var j = i + 1; j < ranges.length; ++j) {
            // remove right contained
            if (ranges[i][1] >= ranges[j][1]) {
                ranges.splice(j, 1);
                j--;
            } else
            // fix overlap
            if (ranges[i][1] >= ranges[j][0]) {
                ranges[j][0] = ranges[i][1] + 1;
            }
            if (randomExt.DEBUG) {
                console.log("iteration (" + i + "," + j + "):", ranges);
            }
        }
    }
    if (randomExt.DEBUG) {
        console.log("Normalized ranges:", ranges);
    }
}

function _generateIntegerFromRanges(ranges) {
    _normalizeRanges(ranges);
    if (ranges != null) {
        var span = 0;
        for (var i = 0; i < ranges.length; ++i) {
            span += (ranges[i][1] - ranges[i][0] + 1);
        }
        var randomNumber = Math.floor(Math.random() * span);
        for (var i = 0; i < ranges.length; ++i) {
            randomNumber += ranges[i][0];
            if (randomNumber <= ranges[i][1]) {
                break;
            } else {
                randomNumber -= (ranges[i][1] + 1);
            }
        }
        return randomNumber;
    } else {
        throw "ranges is required.";
    }
}

function _generateIntegerArrayFromRanges(length, ranges) {
    var numberArray = [];
    if (length != null && ranges != null) {
        for (var i = 0; i < length; ++i) {
            numberArray[i] = _generateIntegerFromRanges(ranges);
        }
    } else {
        throw "length and ranges is required.";
    }
    return numberArray;
}

function _generateStringFromRanges(maxLength, minLength, ranges) {
    var generatedString = "";
    var length = generateInteger(maxLength, minLength);
    var unicodeNumbers = _generateIntegerArrayFromRanges(length, ranges);
    generatedString = String.fromCharCode.apply(this, unicodeNumbers);
    return generatedString;
}

function generateDate(endDate, startDate) {
    if (endDate == null) {
        throw "end date is required.";
    }
    var endDateTime = endDate.getTime();
    var startDateTime = startDate != null ? startDate.getTime() : 0;
    return new Date(generateInteger(endDateTime, startDateTime));
}

function generateDateArray(length, endDate, startDate) {
    return _generateArray(length, generateDate, [endDate, startDate]);
}

function generateString(maxLength, minLength) {
    if (randomExt.DEBUG) {
        console.log("generateString maxLength:", maxLength, " minLength:", minLength);
    }
    return _generateStringFromRanges(maxLength, minLength, [[32, 126]]);
}

function generateStringArray(arrayLength, stringMaxLength, stringMinLength) {
    return _generateArray(arrayLength, generateString, [stringMaxLength, stringMinLength]);
}

function generateRestrictedString(content, maxLength, minLength) {
    var ranges = [];
    for (var i = 0; i < content.length; ++i) {
        var contentType = content[i];
        switch (contentType) {
            case randomExt.CHAR_TYPE.SPECIAL:
                ranges = ranges.concat([[33, 47], [58, 64], [91, 96], [123, 126]]);
                break;
            case randomExt.CHAR_TYPE.SPACE:
                ranges = ranges.concat([[32, 32]]);
                break;
            case randomExt.CHAR_TYPE.NUMERIC:
                ranges = ranges.concat([[48, 57]]);
                break;
            case randomExt.CHAR_TYPE.UPPERCASE:
                ranges = ranges.concat([[65, 90]]);
                break;
            case randomExt.CHAR_TYPE.LOWERCASE:
                ranges = ranges.concat([[97, 122]]);
                break;
            case randomExt.CHAR_TYPE.HEX:
                ranges = ranges.concat([[48, 57], [97, 104]]);
                break;
            default :
                if (typeof contentType === "string") {
                    for (var j = 0; j < contentType.length; ++j) {
                        ranges = ranges.concat([[contentType.charCodeAt(j), contentType.charCodeAt(j)]]);
                    }
                }
        }
    }
    return _generateStringFromRanges(maxLength, minLength, ranges);
}

function generateRestrictedStringArray(arrayLength, content, stringMaxLength, stringMinLength) {
    return _generateArray(arrayLength, generateRestrictedString, [content, stringMaxLength, stringMinLength]);
}

function _generateFromDescriptor(randomDescriptor) {
    var randomValue = null;
    if (randomDescriptor == null || !randomDescriptor.shift || randomDescriptor.length <= 0 || typeof randomDescriptor[0] !== "function") {
        randomValue = randomDescriptor;
    } else {
        var randomFunction = randomDescriptor[0];
        if (randomDescriptor.length > 1) {
            var propertyValueArgs = randomDescriptor.slice(1, randomDescriptor.length);
            randomValue = randomFunction.apply(this, propertyValueArgs);
        } else {
            randomValue = randomFunction();
        }
    }
    return randomValue;
}

function generateObject(template) {
    if (randomExt.DEBUG) {
        console.log("generateObject template:", template);
    }
    var newObject = {};
    var properties = Object.getOwnPropertyNames(template);
    for (var i = 0; i < properties.length; ++i) {
        var property = properties[i];
        var randomDescriptor = template[property];
        newObject[property] = _generateFromDescriptor(randomDescriptor);
    }
    return newObject;
}

function generateObjectArray(length, template) {
    return _generateArray(length, generateObject, [template]);
}

function generateStringPattern(pattern, variableDefinition) {
    var stringPattern = pattern;
    var properties = Object.getOwnPropertyNames(variableDefinition);
    var replacedStringArray = new Array();
    for (var i = 0; i < stringPattern.length; ++i) {
        if (variableDefinition.hasOwnProperty(stringPattern[i])) {
            replacedStringArray[i] = _generateFromDescriptor(variableDefinition[stringPattern[i]]);
        } else {
            replacedStringArray[i] = stringPattern[i];
        }
    }
    return replacedStringArray.join("");
}

function generateStringPatternArray(length, pattern, variableDefinition) {
    return _generateArray(length, generateStringPattern, [pattern, variableDefinition]);
}

function pick(array) {
    if (array == null) {
        throw "input array is null or undefined.";
    }
    return array[generateInteger(array.length - 1)];
}

function shuffle(array) {
    if (array == null) {
        throw "input array is null or undefined.";
    }
    for (var i = 0; i < array.length; ++i) {
        var randomIndex = generateInteger(array.length - 1);
        var temp = array[randomIndex];
        array[randomIndex] = array[i];
        array[i] = temp;
    }
}

var randomExt = {
    boolean: generateBoolean,
    booleanArray: generateBooleanArray,
    integer: generateInteger,
    integerArray: generateIntegerArray,
    float: generateFloat,
    floatArray: generateFloatArray,
    date: generateDate,
    dateArray: generateDateArray,
    string: generateString,
    stringArray: generateStringArray,
    restrictedString: generateRestrictedString,
    restrictedStringArray: generateRestrictedStringArray,
    object: generateObject,
    objectArray: generateObjectArray,
    stringPattern: generateStringPattern,
    stringPatternArray: generateStringPatternArray,
    pick: pick,
    shuffle: shuffle,
    CHAR_TYPE: {
        LOWERCASE: 0,
        UPPERCASE: 1,
        NUMERIC: 2,
        SPECIAL: 3,
        SPACE: 4,
        HEX: 5
    },
    DEBUG: false
};

module.exports = randomExt;
