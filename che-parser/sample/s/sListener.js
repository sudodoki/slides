// Generated from s.antlr4 by ANTLR 4.5
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by sParser.
function sListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

sListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
sListener.prototype.constructor = sListener;

// Enter a parse tree produced by sParser#num.
sListener.prototype.enterNum = function(ctx) {
};

// Exit a parse tree produced by sParser#num.
sListener.prototype.exitNum = function(ctx) {
};



exports.sListener = sListener;