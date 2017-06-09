// Generated from s.antlr4 by ANTLR 4.5
// jshint ignore: start
var antlr4 = require('antlr4/index');
var sListener = require('./sListener').sListener;
var grammarFileName = "s.antlr4";

var serializedATN = ["\3\u0430\ud6d1\u8206\uad2d\u4417\uaef1\u8d80\uaadd",
    "\3\5\23\4\2\t\2\3\2\3\2\3\2\5\2\b\n\2\3\2\3\2\3\2\3\2\7\2\16\n\2\f\2",
    "\16\2\21\13\2\3\2\2\3\2\3\2\2\2\24\2\7\3\2\2\2\4\5\b\2\1\2\5\b\7\3\2",
    "\2\6\b\7\4\2\2\7\4\3\2\2\2\7\6\3\2\2\2\b\17\3\2\2\2\t\n\f\3\2\2\n\16",
    "\5\2\2\4\13\f\f\4\2\2\f\16\7\5\2\2\r\t\3\2\2\2\r\13\3\2\2\2\16\21\3",
    "\2\2\2\17\r\3\2\2\2\17\20\3\2\2\2\20\3\3\2\2\2\21\17\3\2\2\2\5\7\r\17"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ 'null', "'11'", "'1001'", "'0'" ];

var symbolicNames = [  ];

var ruleNames =  [ "num" ];

function sParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

sParser.prototype = Object.create(antlr4.Parser.prototype);
sParser.prototype.constructor = sParser;

Object.defineProperty(sParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

sParser.EOF = antlr4.Token.EOF;
sParser.T__0 = 1;
sParser.T__1 = 2;
sParser.T__2 = 3;

sParser.RULE_num = 0;

function NumContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = sParser.RULE_num;
    return this;
}

NumContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
NumContext.prototype.constructor = NumContext;

NumContext.prototype.num = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(NumContext);
    } else {
        return this.getTypedRuleContext(NumContext,i);
    }
};

NumContext.prototype.enterRule = function(listener) {
    if(listener instanceof sListener ) {
        listener.enterNum(this);
	}
};

NumContext.prototype.exitRule = function(listener) {
    if(listener instanceof sListener ) {
        listener.exitNum(this);
	}
};



sParser.prototype.num = function(_p) {
	if(_p===undefined) {
	    _p = 0;
	}
    var _parentctx = this._ctx;
    var _parentState = this.state;
    var localctx = new NumContext(this, this._ctx, _parentState);
    var _prevctx = localctx;
    var _startState = 0;
    this.enterRecursionRule(localctx, 0, sParser.RULE_num, _p);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 5;
        switch(this._input.LA(1)) {
        case sParser.T__0:
            this.state = 3;
            this.match(sParser.T__0);
            break;
        case sParser.T__1:
            this.state = 4;
            this.match(sParser.T__1);
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 13;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,2,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 11;
                var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new NumContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, sParser.RULE_num);
                    this.state = 7;
                    if (!( this.precpred(this._ctx, 1))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                    }
                    this.state = 8;
                    this.num(2);
                    break;

                case 2:
                    localctx = new NumContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, sParser.RULE_num);
                    this.state = 9;
                    if (!( this.precpred(this._ctx, 2))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
                    }
                    this.state = 10;
                    this.match(sParser.T__2);
                    break;

                } 
            }
            this.state = 15;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,2,this._ctx);
        }

    } catch( error) {
        if(error instanceof antlr4.error.RecognitionException) {
	        localctx.exception = error;
	        this._errHandler.reportError(this, error);
	        this._errHandler.recover(this, error);
	    } else {
	    	throw error;
	    }
    } finally {
        this.unrollRecursionContexts(_parentctx)
    }
    return localctx;
};


sParser.prototype.sempred = function(localctx, ruleIndex, predIndex) {
	switch(ruleIndex) {
	case 0:
			return this.num_sempred(localctx, predIndex);
    default:
        throw "No predicate with index:" + ruleIndex;
   }
};

sParser.prototype.num_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 0:
			return this.precpred(this._ctx, 1);
		case 1:
			return this.precpred(this._ctx, 2);
		default:
			throw "No predicate with index:" + predIndex;
	}
};


exports.sParser = sParser;
