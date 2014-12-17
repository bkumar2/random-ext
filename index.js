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

function generateNumber(max, min) {
    if (max != null) {
        if (min != null) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        } else {
            return Math.floor(Math.random() * (max + 1));
        }
    } else {
        throw "max is required.";
    }
}

function generateNumberArray(length, max, min) {
    return _generateArray(length, generateNumber, [max, min]);
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

function _generateNumberFromRanges(ranges) {
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

function _generateNumberArrayFromRanges(length, ranges) {
    var numberArray = [];
    if (length != null && ranges != null) {
        for (var i = 0; i < length; ++i) {
            numberArray[i] = _generateNumberFromRanges(ranges);
        }
    } else {
        throw "length and ranges is required.";
    }
    return numberArray;
}

function _generateStringFromRanges(maxLength, minLength, ranges) {
    var generatedString = "";
    var length = 0;
    if (maxLength != null) {
        if (minLength != null) {
            length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
        } else {
            length = Math.floor(Math.random() * (maxLength + 1));
        }
    } else {
        throw "maxLength is required.";
    }
    var unicodeNumbers = _generateNumberArrayFromRanges(length, ranges);
    generatedString = String.fromCharCode.apply(this, unicodeNumbers);
    return generatedString;
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
    var dataType = randomDescriptor[0];
    var propertyValueArgs = randomDescriptor.slice(1, randomDescriptor.length);
    switch (dataType) {
        case randomExt.DATA_TYPE.BOOLEAN:
            randomValue = generateBoolean();
            break;
        case randomExt.DATA_TYPE.BOOLEAN_ARRAY:
            randomValue = generateBooleanArray.apply(this, propertyValueArgs);
            break;
        case randomExt.DATA_TYPE.INTEGER:
            randomValue = generateNumber.apply(this, propertyValueArgs);
            break;
        case randomExt.DATA_TYPE.INTEGER_ARRAY:
            randomValue = generateNumberArray.apply(this, propertyValueArgs);
            break;
        case randomExt.DATA_TYPE.FLOAT:
            randomValue = generateFloat.apply(this, propertyValueArgs);
            break;
        case randomExt.DATA_TYPE.FLOAT_ARRAY:
            randomValue = generateFloatArray.apply(this, propertyValueArgs);
            break;
        case randomExt.DATA_TYPE.RESTRICTED_STRING:
            randomValue = generateRestrictedString.apply(this, propertyValueArgs);
            break;
        case randomExt.DATA_TYPE.RESTRICTED_STRING_ARRAY:
            randomValue = generateRestrictedStringArray.apply(this, propertyValueArgs);
            break;
        case randomExt.DATA_TYPE.STRING:
            randomValue = generateString.apply(this, propertyValueArgs);
            break;
        case randomExt.DATA_TYPE.STRING_ARRAY:
            randomValue = generateStringArray.apply(this, propertyValueArgs);
            break;
        case randomExt.DATA_TYPE.STRING_PATTERN:
            randomValue = generateStringPattern.apply(this, propertyValueArgs);
            break;
        case randomExt.DATA_TYPE.STRING_PATTERN_ARRAY:
            randomValue = generateStringPatternArray.apply(this, propertyValueArgs);
            break;
        default :
            throw "Data Type " + dataType + " not supported.";
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

var randomExt = {
    boolean: generateBoolean,
    booleanArray: generateBooleanArray,
    integer: generateNumber,
    integerArray: generateNumberArray,
    float: generateFloat,
    floatArray: generateFloatArray,
    string: generateString,
    stringArray: generateStringArray,
    restrictedString: generateRestrictedString,
    restrictedStringArray: generateRestrictedStringArray,
    object: generateObject,
    objectArray: generateObjectArray,
    stringPattern: generateStringPattern,
    stringPatternArray: generateStringPatternArray,
    CHAR_TYPE: {
        LOWERCASE: 0,
        UPPERCASE: 1,
        NUMERIC: 2,
        SPECIAL: 3,
        SPACE: 4,
        HEX: 5
    },
    DATA_TYPE: {
        BOOLEAN: 0,
        BOOLEAN_ARRAY: 1,
        INTEGER: 2,
        INTEGER_ARRAY: 3,
        FLOAT: 4,
        FLOAT_ARRAY: 5,
        STRING: 6,
        STRING_ARRAY: 7,
        RESTRICTED_STRING: 8,
        RESTRICTED_STRING_ARRAY: 9,
        STRING_PATTERN: 10,
        STRING_PATTERN_ARRAY: 11
    },
    DEBUG: false
};

module.exports = randomExt;
