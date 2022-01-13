const numeral = require('numeral');

export const numeralize = (number: number | string) => numeral(Number(number)).format('0,0');
