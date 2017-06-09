var antlr4 = require('antlr4');
var CharStreams = require('antlr4/CharStreams').CharStreams;

var sLexer = require('./sLexer');
var sParser = require('./sParser');

var input = "11"
var chars = CharStreams.fromString(input);
var lexer = new sLexer.sLexer(chars);
var tokens  = new antlr4.CommonTokenStream(lexer);
var parser = new sParser.sParser(tokens);
parser.buildParseTrees = true;
var tree = parser.num();