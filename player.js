var fs = require('fs');

module.exports = {

  VERSION: "Crazy All In Bot",

  bet_request: function(game_state) {
    //return 50;
    //return bet_plus_blind(game_state, 2);
    return bet_strategy_by_score(game_state);
  },

  showdown: function(game_state) {
    try {
      fs.writeFile(game_state.game_id + '.game_state.json', JSON.stringify(game_state, null, 2), function (err) {
        //pass;
      });
    } catch (e) {
      //pass;
    }
  }

};

function bet_plus_blind(game_state, blinds) {
  var maxBet = game_state.small_blind * 2;
  game_state.players.forEach(function (p) {
    maxBet = Math.max(p.bet, maxBet);
  });
  return maxBet + game_state.small_blind * blinds * 3;
}

RANK_SCORE = {
  "2": 1,
  "3": 2,
  "4": 3,
  "5": 4,
  "6": 5,
  "7": 6,
  "8": 7,
  "9": 8,
  "10": 9,
  "J": 10,
  "Q": 11,
  "K": 12,
  "A": 13
};

function bet_strategy_by_score(game_state) {
  try {
    players = game_state.players;
    sevenbits_bot = players.filter(function (player) {
      return player.name == 'sevenbits';
    })[0];
    our_cards = sevenbits_bot.hole_cards;
    score = score_cards(our_cards[0], our_cards[1]);
    if (score > 50) {
      return calculate_allowed_bet(game_state, sevenbits_bot, score);
    } else {
      return 0;
    }
  } catch (e) {
    console.log(e);
    return 0;
  }
}

function score_cards(card1, card2) {
  score = RANK_SCORE[card1['rank']] * RANK_SCORE[card2['rank']];
  if (card1['rank'] == card2['rank']) {
    score = Math.max(score, 100);
  }
  if (card1['rank'] == "A" || card2['rank'] == "A") {
    score = Math.max(score, 100);
  }
  return score;
}

function calculate_allowed_bet(game_state, our_player, cards_score) {
  suggested_bet = bet_plus_blind(game_state, 2);
  our_stack = our_player.stack;
  pot = game_state.pot;
  if ((((suggested_bet/our_stack) - (cards_score / 169)) > 0.05) && (pot < our_stack * 0.66)) {
    return 0;
  } else {
    return suggested_bet;
  }
}
