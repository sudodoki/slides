Start = Number
Sign = "-" / "+"
Digit = [0-9]
Integer = Digit Integer / Digit
FLOAT = Sign? Integer? "."? Integer?
Number = FLOAT / Integer