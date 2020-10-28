//testing purposes

const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();

//three new transactions
bitcoin.createNewTransaction(50,'ALEXHT845SJ5TKCJ2','JENN5BG5DF6HT8NG9');
bitcoin.createNewTransaction(200,'ALEXHT845SJ5TKCJ2','JENN5BG5DF6HT8NG9');
bitcoin.createNewTransaction(300,'ALEXHT845SJ5TKCJ2','JENN5BG5DF6HT8NG9');
console.log(bitcoin);