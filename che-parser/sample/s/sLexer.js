// Generated from s.antlr4 by ANTLR 4.5
// jshint ignore: start
var antlr4 = require('antlr4/index');


var serializedATN = ["\3\u0430\ud6d1\u8206\uad2d\u4417\uaef1\u8d80\uaadd",
    "\2\5\23\b\1\4\2\t\2\4\3\t\3\4\4\t\4\3\2\3\2\3\2\3\3\3\3\3\3\3\3\3\3",
    "\3\4\3\4\2\2\5\3\3\5\4\7\5\3\2\2\22\2\3\3\2\2\2\2\5\3\2\2\2\2\7\3\2",
    "\2\2\3\t\3\2\2\2\5\f\3\2\2\2\7\21\3\2\2\2\t\n\7\63\2\2\n\13\7\63\2\2",
    "\13\4\3\2\2\2\f\r\7\63\2\2\r\16\7\62\2\2\16\17\7\62\2\2\17\20\7\63\2",
    "\2\20\6\3\2\2\2\21\22\7\62\2\2\22\b\3\2\2\2\3\2\2"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

function sLexer(input) {
	antlr4.Lexer.call(this, input);
    this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
    return this;
}

sLexer.prototype = Object.create(antlr4.Lexer.prototype);
sLexer.prototype.constructor = sLexer;

sLexer.EOF = antlr4.Token.EOF;
sLexer.T__0 = 1;
sLexer.T__1 = 2;
sLexer.T__2 = 3;


sLexer.modeNames = [ "DEFAULT_MODE" ];

sLexer.literalNames = [ 'null', "'11'", "'1001'", "'0'" ];

sLexer.symbolicNames = [  ];

sLexer.ruleNames = [ "T__0", "T__1", "T__2" ];

sLexer.grammarFileName = "s.antlr4";



exports.sLexer = sLexer;

