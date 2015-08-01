#!/usr/bin/env node
var reporter = require('nodeunit').reporters.default;
reporter.run(['score_cards_test.js']);
