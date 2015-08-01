
module.exports = {

  VERSION: "Crazy Bot",

  bet_request: function(game_state) {
    return bet_plus_blind(game_state, 2);
  },

  showdown: function(game_state) {

  }
};

function bet_plus_blind(game_state, blinds) {
  var maxBet = game_state.small_blind * 2;
  game_state.players.forEach(function (p) {
    maxBet = Math.max(p.bet, maxBet);
  });
  return maxBet + game_state.small_blind * blinds - maxBet % game_state.small_blind;
}
