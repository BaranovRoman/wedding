import Typograf from 'typograf';

const typograf = new Typograf({ locale: ['ru', 'en-US'] });

export const tp = (str: string) => typograf.execute(str);
