var score_cards = require("./player").score_cards;

//5: 99+
//4: AT+
//3: K9s+...
//2: KT+
//1: 96s+
//0: остальные

exports.testFiveScore = function(test){
    test.equal(score_cards({
            "rank": "9",
            "suit": "spades"
        }, {
            "rank": "9",
            "suit": "hearts"
        }), 5);
    test.equal(score_cards({
            "rank": "J",
            "suit": "spades"
        }, {
            "rank": "J",
            "suit": "hearts"
        }), 5);
    test.equal(score_cards({
        "rank": "A",
        "suit": "spades"
    }, {
        "rank": "Q",
        "suit": "hearts"
    }), 5);
    test.done();
};

exports.testFourScore = function(test){
    test.equal(score_cards({
        "rank": "6",
        "suit": "spades"
    }, {
        "rank": "6",
        "suit": "hearts"
    }), 4);
    test.equal(score_cards({
        "rank": "2",
        "suit": "spades"
    }, {
        "rank": "2",
        "suit": "hearts"
    }), 4);
    test.equal(score_cards({
        "rank": "A",
        "suit": "spades"
    }, {
        "rank": "10",
        "suit": "spades"
    }), 4);
    test.equal(score_cards({
        "rank": "A",
        "suit": "spades"
    }, {
        "rank": "2",
        "suit": "spades"
    }), 4);
    test.equal(score_cards({
        "rank": "A",
        "suit": "spades"
    }, {
        "rank": "10",
        "suit": "hearts"
    }), 4);
    test.done();
};

exports.testThreeScore = function(test){
    test.equal(score_cards({
        "rank": "A",
        "suit": "spades"
    }, {
        "rank": "2",
        "suit": "hearts"
    }), 3);
    test.equal(score_cards({
        "rank": "K",
        "suit": "spades"
    }, {
        "rank": "9",
        "suit": "hearts"
    }), 3);
    test.equal(score_cards({
        "rank": "Q",
        "suit": "spades"
    }, {
        "rank": "9",
        "suit": "spades"
    }), 3);
    test.equal(score_cards({
        "rank": "J",
        "suit": "spades"
    }, {
        "rank": "9",
        "suit": "spades"
    }), 3);
    test.equal(score_cards({
        "rank": "10",
        "suit": "spades"
    }, {
        "rank": "9",
        "suit": "spades"
    }), 3);
    test.done();
};

exports.testTwoScore = function(test) {
    test.equal(score_cards({
        "rank": "K",
        "suit": "spades"
    }, {
        "rank": "4",
        "suit": "spades"
    }), 2);
    test.equal(score_cards({
        "rank": "Q",
        "suit": "spades"
    }, {
        "rank": "8",
        "suit": "spades"
    }), 2);
    test.equal(score_cards({
        "rank": "J",
        "suit": "spades"
    }, {
        "rank": "8",
        "suit": "spades"
    }), 2);
    test.equal(score_cards({
        "rank": "10",
        "suit": "spades"
    }, {
        "rank": "9",
        "suit": "spades"
    }), 2);
    test.equal(score_cards({
        "rank": "9",
        "suit": "spades"
    }, {
        "rank": "8",
        "suit": "spades"
    }), 2);
    test.equal(score_cards({
        "rank": "K",
        "suit": "spades"
    }, {
        "rank": "10",
        "suit": "hearts"
    }), 2);
    test.equal(score_cards({
        "rank": "Q",
        "suit": "spades"
    }, {
        "rank": "10",
        "suit": "hearts"
    }), 2);
    test.equal(score_cards({
        "rank": "J",
        "suit": "spades"
    }, {
        "rank": "10",
        "suit": "hearts"
    }), 2);
    test.done();
};

exports.testOneScore = function(test){
    test.equal(score_cards({
        "rank": "Q",
        "suit": "spades"
    }, {
        "rank": "6",
        "suit": "spades"
    }), 1);
    test.equal(score_cards({
        "rank": "9",
        "suit": "spades"
    }, {
        "rank": "6",
        "suit": "spades"
    }), 1);
    test.equal(score_cards({
        "rank": "8",
        "suit": "spades"
    }, {
        "rank": "6",
        "suit": "spades"
    }), 1);
    test.equal(score_cards({
        "rank": "7",
        "suit": "spades"
    }, {
        "rank": "5",
        "suit": "spades"
    }), 1);
    test.equal(score_cards({
        "rank": "6",
        "suit": "spades"
    }, {
        "rank": "5",
        "suit": "spades"
    }), 1);
    test.done();
};

