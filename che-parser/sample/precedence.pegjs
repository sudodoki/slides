// level2 * /
// level1 + -
start = level1
level1 =
    level2 ([+-] level2)+
    / level2
level2 =
    level0 ([*/] level0)+
    / level0
level0 = number / "(" level1 ")"
number = [0-9]+