//Blockchain for BitChandise
//import sha256 
const sha256 = require('sha256');
const POWhash = "0000";

function Blockchain() {
  //meat of blockchain
  this.chain = [];
  //temporary blocks will be held here
  this.pendingTransactions = [];
  //genesis block
  this.createNewBlock(100, '0', '0');
}

//Creating a new block from mining method
Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash) {
  const newBlock = {
    index: this.chain.length + 1,
    timestamp: Date.now(),
    //New transactions to be placed into a block (pending transactions)
    transactions: this.pendingTransactions,
    nonce: nonce,
    hash: hash,
    previousBlockHash: previousBlockHash,
  };
  //emptied the array upon creation of a new block
  this.pendingTransactions = [];
  //push the block into the Blockchain chain
  this.chain.push(newBlock);
  return newBlock;
}

//Get the lastest block in the blockchain method
Blockchain.prototype.getLastBlock = function(){
  return this.chain[this.chain.length - 1];
}

//Creatinng a new transaction method
Blockchain.prototype.createNewTransaction = function(amount, sender, recipient){
 const newTransaction = {
   amount: amount, 
   sender: sender,
   recipient: recipient,
 };
 this.pendingTransactions.push(newTransaction);
 return this.getLastBlock()['index'] + 1;
}

//hashing data method 
Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce){
  //convert params to string 
  const dataAsString = 
  previousBlockHash + nonce.toString()
   + JSON.stringify(currentBlockData);
  const hash = sha256(dataAsString);

  return hash;
}

//proof of work POW
Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData){
  let nonce = 0; 
  let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
  while(hash.substring(0,4) !== POWhash){
    nonce ++;
    hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    //console.log(hash);
  }

  return nonce;
}

//export
module.exports = Blockchain;
