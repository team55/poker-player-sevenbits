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
      fs.writeFile(game_state.game_id + '.' + game_state.round + '.game_state.json', JSON.stringify(game_state, null, 2), function (err) {
        //pass;
      });
    } catch (e) {
      //pass;
    }
  },

  score_cards: score_cards

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
    score = score_cards(our_cards[0], our_cards[1]);
    return calculate_allowed_bet(game_state, sevenbits_bot, score, players);
  } catch (e) {
    console.log(e);
    return 0;
  }
}

function players_count(players){
    players_q = 0;
    for(i = 0; i < players.length; i ++){
        if (players[i]['status'] != 'out'){
            players_q ++;
        }
    }
    return players_q;
}

function score_cards(card1, card2) {
  var suit_match = card1.suit == card2.suit;
  var rank1 = RANK_SCORE[card1['rank']];
  var rank2 = RANK_SCORE[card2['rank']];
  var rank;
  if (RANK_SCORE[card2['rank']] > RANK_SCORE[card1['rank']]) {
    rank = [rank2, rank1];
  } else {
    rank = [rank1, rank2];
  }
  var score;
  if ((rank[0] == rank[1] && rank[0] >= 8) || (rank[0] == 13 && rank[1] >= 11)) {
    score = 5;
  } else if ((rank[0] == 13 && rank[1] >= 9) ||(rank[0] == 13 && suit_match) || (rank[0] == rank[1])) {
    score = 4;
  } else if (suit_match && rank[0] >= 9 && rank[1] >= 8 ) {
    score = 3;
  } else if ((rank[0] >= 10 && rank[1] >= 9) || (suit_match && rank[0] >= 12 && rank[1] >= 3)) {
    score = 2;
  } else if (suit_match && rank[0] >= 5 && rank[1] >= 4) {
    score = 1;
  } else {
    score = 0;
  }

  return score;
}

function calculate_allowed_bet(game_state, our_player, cards_score, players) {
  var suggested_bet = bet_plus_blind(game_state, 3);
  var our_stack = our_player.stack;
  var pot = game_state.pot;
  var num_of_players = players_count(players);
  var adjust = Math.round(Math.random());
  if (num_of_players - cards_score - adjust > 1) {
    return 0;
  } else {
    return suggested_bet;
  }
}
