Start = Phrase

Phrase =
	_ w:Words c:Code p:Phrase { return w.concat(c).concat(p) }
    / w:Words { return w }
    / ""

Words = _? group:(Word _)+ { return group[0].concat(group[1]) }

Word = ch:[A-Za-z0-9]+ { return ch.join('') }

Code = "```code```"
_ "whitespace"
  = ch:[ \t\n\r]* { return ch.join('') }