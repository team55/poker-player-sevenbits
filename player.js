
module.exports = {

  VERSION: "bet_strategy_by_score",

  bet_request: function(game_state) {
    //return 50;
    //return bet_plus_blind(game_state, 2);
    return bet_strategy_by_score(game_state);
  },

  showdown: function(game_state) {
    console.log(game_state);
  }
};

function bet_plus_blind(game_state, blinds) {
  var maxBet = game_state.small_blind * 2;
  game_state.players.forEach(function (p) {
    maxBet = Math.max(p.bet, maxBet);
  });
  return maxBet + game_state.small_blind * blinds - maxBet % game_state.small_blind;
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
    score = RANK_SCORE[our_cards[0]['rank']] * RANK_SCORE[our_cards[1]['rank']];
    if (score > 50) {
      return 100000;
    } else {
      return 0;
    }
  } catch (e) {
    return 0;
  }
}
