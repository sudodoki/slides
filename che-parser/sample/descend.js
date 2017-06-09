let result;
let curIndex;
const isSign = (c) => ['+', '-'].includes(c)
const isDigit = (c) => '0123456789'.split('').includes(c);
const digit = (input) => {
    const curChar = input[curIndex];
    if (isDigit(curChar)) {
        result.push(['digit', curChar]);
        curIndex += 1;
    } else {
        throw new SyntaxError(`Expected digit but got ${curChar || 'nothing'}`);
    }
}
const sign = (input) => {
    const curChar = input[curIndex];
    if (isSign(curChar)) {
        result.push(['sign', curChar]);
        curIndex += 1;
    } else {
        throw new SyntaxError(`Expected sign but got ${curChar || 'nothing'}`);
    }
}
const term = (input) => {
    result.push(['term'])
    const peek = input[curIndex + 1];
    digit(input);
    if (!peek) {
        return
    } else {
        sign(input);
        term(input);
        return
    }
}

const descend = (input) => {
    curIndex = 0;
    result = [];
    term(input);
    return result;
}
let input = "2+3-4";
try {
    console.log('parsing ', input);
    console.log('parsed: ', JSON.stringify(descend(input))) // parsed:  [["term"],["digit","2"],["sign","+"],["term"],["digit","3"],["sign","-"],["term"],["digit","4"]]
} catch (e) {
    console.log('error parsing ', e);
}

input = "2";
try {
    console.log('parsing ', input);
    console.log('parsed: ', JSON.stringify(descend(input))) // error parsing  SyntaxError: Expected digit but got nothing
} catch (e) {
    console.log('error parsing ', e);
}
