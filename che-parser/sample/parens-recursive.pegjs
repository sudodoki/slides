start = group

lpar = '('
rpar = ')'
nothing = ''

group = 
    lpar group rpar
    / group group
    / ''