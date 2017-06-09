start = group

lpar = '('
rpar = ')'
nothing = ''

group = lpar rest / lpar group rpar / ''
rest = ')' group / ')'

