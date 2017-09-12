var shiftBy = function (value, offset) {
  return Array.from(value).map(function (letter) {
    var newLetter = letter.charCodeAt() + offset;
    return String.fromCharCode(newLetter);
  }).join('').toString();
};

console.log(shiftBy('bicycle', 3));  //
console.log(shiftBy('dke{eng', -3)); //

var sha1 = require('sha1');
//
console.log(sha1('bicycle')); //
//
var md5 = require('md5');
//
console.log(md5('bicycle')); //