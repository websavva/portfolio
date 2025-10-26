import acceptLanguage from 'accept-language';

acceptLanguage.languages(['ru', 'en']);

console.log(acceptLanguage.get('en-US;q=0.9,ru-KZ;q=0.8,sv'));
/*

'en-US'

*/