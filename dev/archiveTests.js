//testing purposes

const Blockchain = require('./blockchain');

//test the hash 
const previousBlockHash = '87765DA6CCF0668238C1D27C35692E11';
const currentBlockData  = [{
    amount: 10, 
    sender: 'B4CEE9C0E5CD571',
    recipient: '3A3F6E462D48E9',
},{
    amount: 20, 
    sender: 'B4CEE9C0E5CD999',
    recipient: '3A3F6E462D48F1',
},{
    amount: 30, 
    sender: 'B4CEE9C0E5CD888',
    recipient: '3A3F6E462D4810',
}]

const nonce = 100;

const bitcoin = new Blockchain();
//call the has method 
bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);







//test createNewBlock
bitcoin.createNewBlock(789457,'OIUIEDJETH8754DHKD','78SHNEG45DER56');
//sample transaction
bitcoin.createNewTransaction(100,'ALEXHT845SJ5TKCJ2','JENN5BG5DF6HT8NG9');
//transaction will be in this following block (mining)
bitcoin.createNewBlock(548764,'AKMC875E6S1RS9','WPLS214R7T6SJ3G2');
//three new transactions
bitcoin.createNewTransaction(50,'ALEXHT845SJ5TKCJ2','JENN5BG5DF6HT8NG9');
bitcoin.createNewTransaction(200,'ALEXHT845SJ5TKCJ2','JENN5BG5DF6HT8NG9');
bitcoin.createNewTransaction(300,'ALEXHT845SJ5TKCJ2','JENN5BG5DF6HT8NG9');

bitcoin.createNewBlock(99999,'AKMC875E6S1R10','WPLS214R7T6SJ3G3');

console.log(bitcoin.chain[2]);



//sample test codes 
//archives 
//testing purposes

const Blockchain = require('./blockchain');

//test the hash 
const previousBlockHash = '87765DA6CCF0668238C1D27C35692E11';
const currentBlockData  = [{
    amount: 10, 
    sender: 'B4CEE9C0E5CD571',
    recipient: '3A3F6E462D48E9',
},{
    amount: 20, 
    sender: 'B4CEE9C0E5CD999',
    recipient: '3A3F6E462D48F1',
},{
    amount: 30, 
    sender: 'B4CEE9C0E5CD888',
    recipient: '3A3F6E462D4810',
}]

//const nonce = 100;

const bitcoin = new Blockchain();
//call the hash method 
//bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

//console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce));

//test proof of work
//console.log(bitcoin.proofOfWork(previousBlockHash, currentBlockData));

console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, 7215));












//previous test codes

//bitcoin.createNewBlock(2222,'CCC123','DDD123');
//bitcoin.createNewBlock(3333,'EEE123','FFF123');