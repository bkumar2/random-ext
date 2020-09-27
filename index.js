/*!
 * random-ext
 * https://github.com/bkumar2/random-ext.git
 *
 * Copyright 2014 Bipul Kumar
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function _array(length, elementFunction, args) {
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

function boolean() {
  return Math.random() < 0.5;
}

function booleanArray(length) {
  return _array(length, boolean);
}

function float(limit, min) {
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

function floatArray(length, limit, min) {
  return _array(length, float, [limit, min]);
}

function integer(max, min) {
  if (max != null) {
    if (min != null) {
      if (max < min) {
        throw "max [" + max + "] is less than min [" + min + "]";
      }
      return Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
      return Math.floor(Math.random() * (max + 1));
    }
  } else {
    throw "max is required.";
  }
}

function integerArray(length, max, min) {
  return _array(length, integer, [max, min]);
}

function _normalizeRanges(ranges) {
  if (randomExt.DEBUG) {
    console.log("Normalizing ranges:", ranges);
  }
  ranges.sort(function(a, b) {
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

function _integerFromRanges(ranges) {
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

function _integerArrayFromRanges(length, ranges) {
  var numberArray = [];
  if (length != null && ranges != null) {
    for (var i = 0; i < length; ++i) {
      numberArray[i] = _integerFromRanges(ranges);
    }
  } else {
    throw "length and ranges is required.";
  }
  return numberArray;
}

function _stringFromRanges(maxLength, minLength, ranges) {
  var dString = "";
  var length = integer(maxLength, minLength);
  var unicodeNumbers = _integerArrayFromRanges(length, ranges);
  dString = String.fromCharCode.apply(this, unicodeNumbers);
  return dString;
}

function date(endDate, startDate) {
  if (endDate == null) {
    throw "end date is required.";
  }
  var endDateTime = endDate.getTime();
  var startDateTime = startDate != null ? startDate.getTime() : 0;
  return new Date(integer(endDateTime, startDateTime));
}

function dateArray(length, endDate, startDate) {
  return _array(length, date, [endDate, startDate]);
}

function string(maxLength, minLength) {
  if (randomExt.DEBUG) {
    console.log("string maxLength:", maxLength, " minLength:",
      minLength);
  }
  return _stringFromRanges(maxLength, minLength, [
    [32, 126]
  ]);
}

function stringArray(arrayLength, stringMaxLength, stringMinLength) {
  return _array(arrayLength, string, [stringMaxLength,
    stringMinLength
  ]);
}

function restrictedString(content, maxLength, minLength) {
  var ranges = [];
  for (var i = 0; i < content.length; ++i) {
    var contentType = content[i];
    switch (contentType) {
      case randomExt.CHAR_TYPE.SPECIAL:
        ranges = ranges.concat([
          [33, 47],
          [58, 64],
          [91, 96],
          [123, 126]
        ]);
        break;
      case randomExt.CHAR_TYPE.SPACE:
        ranges = ranges.concat([
          [32, 32]
        ]);
        break;
      case randomExt.CHAR_TYPE.NUMERIC:
        ranges = ranges.concat([
          [48, 57]
        ]);
        break;
      case randomExt.CHAR_TYPE.UPPERCASE:
        ranges = ranges.concat([
          [65, 90]
        ]);
        break;
      case randomExt.CHAR_TYPE.LOWERCASE:
        ranges = ranges.concat([
          [97, 122]
        ]);
        break;
      case randomExt.CHAR_TYPE.HEX:
        ranges = ranges.concat([
          [48, 57],
          [97, 104]
        ]);
        break;
      default:
        if (typeof contentType === "string") {
          for (var j = 0; j < contentType.length; ++j) {
            ranges = ranges.concat([
              [contentType.charCodeAt(j),
                contentType.charCodeAt(j)
              ]
            ]);
          }
        }
    }
  }
  return _stringFromRanges(maxLength, minLength, ranges);
}

function restrictedStringArray(arrayLength, content, stringMaxLength,
  stringMinLength) {
  return _array(arrayLength, restrictedString, [content,
    stringMaxLength, stringMinLength
  ]);
}

function _fromDescriptor(randomDescriptor) {
  var randomValue = null;
  if (randomDescriptor == null || !randomDescriptor.shift ||
    randomDescriptor.length <= 0 ||
    typeof randomDescriptor[0] !== "function") {
    randomValue = randomDescriptor;
  } else {
    var randomFunction = randomDescriptor[0];
    if (randomDescriptor.length > 1) {
      var propertyValueArgs = randomDescriptor.slice(1,
        randomDescriptor.length);
      randomValue = randomFunction.apply(this, propertyValueArgs);
    } else {
      randomValue = randomFunction();
    }
  }
  return randomValue;
}

function object(template) {
  if (randomExt.DEBUG) {
    console.log("object template:", template);
  }
  var newObject = {};
  var properties = Object.getOwnPropertyNames(template);
  for (var i = 0; i < properties.length; ++i) {
    var property = properties[i];
    var randomDescriptor = template[property];
    newObject[property] = _fromDescriptor(randomDescriptor);
  }
  return newObject;
}

function objectArray(length, template) {
  return _array(length, object, [template]);
}

function stringPattern(pattern, variableDefinition) {
  var stringPattern = pattern;
  var properties = Object.getOwnPropertyNames(variableDefinition);
  var replacedStringArray = new Array();
  for (var i = 0; i < stringPattern.length; ++i) {
    if (variableDefinition.hasOwnProperty(stringPattern[i])) {
      replacedStringArray[i] = _fromDescriptor(variableDefinition[stringPattern[i]]);
    } else {
      replacedStringArray[i] = stringPattern[i];
    }
  }
  return replacedStringArray.join("");
}

function stringPatternArray(length, pattern, variableDefinition) {
  return _array(length, stringPattern, [pattern,
    variableDefinition
  ]);
}

function pick(array) {
  if (array == null) {
    throw "input array is null or undefined.";
  }
  return array[integer(array.length - 1)];
}

function shuffle(array) {
  if (array == null) {
    throw "input array is null or undefined.";
  }
  for (var i = 0; i < array.length; ++i) {
    var randomIndex = integer(array.length - 1);
    var temp = array[randomIndex];
    array[randomIndex] = array[i];
    array[i] = temp;
  }
}

function subArray(array, length) {
  // validation
  if (array == null) {
    throw "input array is null or undefined.";
  } else if (length == null) {
    throw "input length is null or undefined.";
  } else if (array.length < length) {
    throw "input length [" + length + "] must not exceed array length [" + array.length + "]";
  }
  // logic
  var copiedArray = array.slice();
  shuffle(copiedArray);
  return copiedArray.slice(0, length);
}

function color() {
  return '#'.concat((Math.random() * 0xFFFFFF << 0).toString(16));
}

var randomExt = {
  boolean: boolean,
  booleanArray: booleanArray,
  integer: integer,
  integerArray: integerArray,
  float: float,
  floatArray: floatArray,
  date: date,
  dateArray: dateArray,
  string: string,
  stringArray: stringArray,
  restrictedString: restrictedString,
  restrictedStringArray: restrictedStringArray,
  object: object,
  objectArray: objectArray,
  stringPattern: stringPattern,
  stringPatternArray: stringPatternArray,
  pick: pick,
  shuffle: shuffle,
  subArray: subArray,
  color: color,
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
