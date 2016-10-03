/**
 * Created by Sumiko on 9/24/2016.
 */

/**
 * Here's the gist of the algorithm:
 * Count the occurances of each letter in the string.
 * Store the counts in an array.
 * Compare the arrays for each string.
 * Anagrams will have the same letter counts.
 *
 * Ignores: upper/lowercase, whitespace, non-ascii characters, numbers, punctuation, special characters
 */
var AnagramChecker;
AnagramChecker = {

    countOccurences: function(string1) {
        var countArray = [0,0,0,0,0,
                            0,0,0,0,0,
                            0,0,0,0,0,
                            0,0,0,0,0,
                            0,0,0,0,0,0];
        var length = string1.length;
        var c;
        var index;
        for (var i=0; i < length; i++) {
            c = string1.charAt(i);
            index = this.getCountIndex(c);
            if (index >= 0) {
                countArray[index]++;
            }
        }
        return countArray;
    },

    /* If a lowercase letter, return value of index
     otherwise, return -1
     */
    getCountIndex: function(inputChar) {
        var c = inputChar.toLowerCase();
        var asciiVal = c.charCodeAt(0);

        // if it's a letter -  97-122
        if (asciiVal >= 97 && asciiVal <=122) {
            return asciiVal-97;
        }

        return -1;
    },

    /* If the arrays are the same length and each value is equivalent, the arrays are equal.
     */
    arraysAreEqual: function(array1, array2) {
        if (!array1 || !array2)
            return false;

        if (array1.length != array2.length)
            return false;

        for (var i = 0; i < array1.length; i++)          {
            if (array1[i] != array2[i]) {
                return false;
            }
        }
        return true;
    },

    areAnagrams: function(string1, string2) {
        var countArrayStr1 = AnagramChecker.countOccurences(string1);
        var countArrayStr2 = AnagramChecker.countOccurences(string2);

        // compare
        return this.arraysAreEqual(countArrayStr1, countArrayStr2);
    }

};

function validateForm() {
    var string1 = document.forms["anagramCandidates"]["string1"].value;
    var string2 = document.forms["anagramCandidates"]["string2"].value;

    if (!string1 || !string2) {
        return false;
    }

    if (AnagramChecker.areAnagrams(string1, string2)) {
        return true;
    } else
        return false;
}

/**
 * Test-Driven Development:
 * I need this line when I run my tests in anagramArray-spec.js using Mocha.
 */
//module.exports = AnagramChecker;