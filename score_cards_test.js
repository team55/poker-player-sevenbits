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
    test.done();
};
