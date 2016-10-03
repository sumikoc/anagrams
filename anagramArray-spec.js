/**
 * Created by Sumiko on 9/24/2016.
 */
'use strict';
var expect = require('chai').expect;
var assert = require('assert');

var AnagramChecker = require('./anagramArray.js');

describe('BasicSetupTest', function() {
    it('should exist', function() {
        var BasicSetupTest = require('./anagramArray.js');
        expect(BasicSetupTest).to.not.be.undefined;
    });
});

/**
 What do I need to do:
 - count the occurences of each character in both strings
 - for each occurence, check
 - compare the results. if equal, return true.

 Am I An Anagram?
 An Anagram I Am!

 **/

describe('CountOccurences', function() {
    it('given a string, returns an array of 26, counting each letter occurrence', function() {

        var expected =
            [1,0,0,0,0,
            0,0,0,0,0,
            0,0,0,0,0,
            0,0,0,0,0,
            0,0,0,0,0,0];
        var actual = AnagramChecker.countOccurences("a");
        expect(actual).to.eql(expected);

        var expected =
            [1,2,0,0,0,
                0,0,0,0,0,
                0,0,0,0,0,
                0,0,0,0,0,
                0,0,0,0,0,0];
        var actual = AnagramChecker.countOccurences("bab");
        expect(actual).to.eql(expected);

        var expected =
            [1,2,0,0,0,
                0,0,0,0,0,
                0,0,0,0,0,
                0,0,0,0,0,
                0,0,0,1,1,1];
        var actual = AnagramChecker.countOccurences("bab xyz!!!");
        expect(actual).to.eql(expected);

        var expected =
            [1,2,1,1,1,
                0,0,0,0,0,
                0,0,0,0,0,
                0,0,0,0,0,
                0,0,0,0,0,0];
        var actual = AnagramChecker.countOccurences("bab CDE");
        expect(actual).to.eql(expected);

        var expected =
            [1,2,1,1,1,
                1,1,1,1,1,
                1,1,1,1,1,
                1,1,1,1,1,
                1,1,1,1,1,1];
        var actual = AnagramChecker.countOccurences("bab CDE (fg)hi!jkl{m}n0oPQ@rstu v+wx &y%z");
        expect(actual).to.eql(expected);
    });
});


/**
 * Rules:
 * Two strings are anagrams if they have the same ascii letters in them.
 * Upper and lowercase letters are treated as the same character.
 * All other characters are ignored, ex. whitespace, nonascii letters, numbers and punctuation.
 */

describe('compareArray', function () {
    it('given two arrays of numbers, returns true if each value in the arrays are the same', function() {

        var array1 =
            [1,2,1,1,1,
                1,1,1,1,1,
                1,1,1,1,1,
                1,1,1,1,1,
                1,1,1,1,1,1];

        var array2 =
            [1,2,1,1,1,
                1,1,1,1,1,
                1,1,1,1,1,
                1,1,1,1,1,
                1,1,1,1,1,1];

        assert(!AnagramChecker.arraysAreEqual("", array2), "empty");
        assert(AnagramChecker.arraysAreEqual(array1, array2), "equal arrays");

        var array3 =
            [1,2,1,1,1,
                1,1,1,1,1,
                1,1,1,1,1,
                1,1,1,1,1,1];
        assert(!AnagramChecker.arraysAreEqual(array1, array3), "unequal lengths");


    });
});


describe('AreWeAnagrams', function () {
    it('Given two strings, returns true if the strings are anagrams, otherwise false.', function () {
        assert(AnagramChecker.areAnagrams("check me", "check me"));         // the obvious
        assert(AnagramChecker.areAnagrams("check! me!", "check me"), "ignore punctuation");
        assert(AnagramChecker.areAnagrams("check me", "c h e c k      m e"), "ignore spaces");
        assert(AnagramChecker.areAnagrams("check me", "em kc ehc"), "ignore order");
        assert(AnagramChecker.areAnagrams("check me", "EmE kc hc"), "ignore capitals");
        assert(AnagramChecker.areAnagrams("che!9ck me", "EmE k034&*c hc"), "ignore numbers");
        assert(AnagramChecker.areAnagrams("The quick z z z z y y y y ",
                                            "z z z z y y y yThe quick."), "long strings");
        assert(AnagramChecker.areAnagrams("azzz zzz zzz zzz zzz zzz zzz", "azzz zzz zzz zzz zzz zzz zzz"), "length limit?");
        assert(AnagramChecker.areAnagrams("a", "a"), "a");
        assert(AnagramChecker.areAnagrams("ata", "at a"), "aa");
        assert(AnagramChecker.areAnagrams("ab", "ba"), "ab");
        assert(AnagramChecker.areAnagrams("abc", "cba"), "abc");
        assert(AnagramChecker.areAnagrams("abcd", "dcba"), "abcd");
        assert(AnagramChecker.areAnagrams("abcde", "edcba"), "abcde");

        assert(AnagramChecker.areAnagrams("klmnopqrstuvwxyz", "zyxwvutsrqponmlk"), "k whole alpha");
        assert(AnagramChecker.areAnagrams("defghijklmnopqrstuvwxyz", "zyxwvutsrqponmlkjihgfed"), "c whole alpha");
        assert(AnagramChecker.areAnagrams("cdefghijklmnopqrstuvwxyz", "zyxwvutsrqponmlkjihgfedc"), "b whole alpha");
        assert(AnagramChecker.areAnagrams("bcdefghijklmnopqrstuvwxyz", "zyxwvutsrqponmlkjihgfedcb"), "a whole alpha");
        assert(AnagramChecker.areAnagrams("abcdefghijklmnopqrstuvwxyz", "zyxwvutsrqponmlkjihgfedcba"), "whole alpha");

        // examples from web
        assert(AnagramChecker.areAnagrams("debit card", "Bad credit"), "web1");
        assert(AnagramChecker.areAnagrams("astronomer", "Moon starer"), "web2");
        assert(AnagramChecker.areAnagrams("punishment", "Nine thumps"), "web3");
        assert(AnagramChecker.areAnagrams("schoolmaster", "The Classroom"), "web4");

        // These are not anagrams
        assert(!AnagramChecker.areAnagrams("check me", "check")); // not all letters used
        assert(!AnagramChecker.areAnagrams("The quick brown fox jumped over the lazy dog.",
            "Waltz, bad nymph, for quick jigs vex."), "similar, not same");
    });

});