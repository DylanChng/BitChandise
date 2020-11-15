//Blockchain for BitChandise
//import sha256 
const sha256 = require('sha256');
const POWhash = "0000";
const currentNodeUrl = process.argv[3];

function Blockchain() {
  //blockchain data here
  this.chain = [];
  //temporary blocks will be held here
  this.pendingTransactions = [];
  //Current node URL
  this.currentNodeUrl = currentNodeUrl; 
  //Nodes in the network
  this.networkNodes = []; 
  //genesis block
  this.createNewBlock(777777, 'Bitchandise', 'genesis block');
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

Blockchain.prototype.createNewItem = function(itemId,itemName,description, location, status, comment, expiryDate, collectionDate){
  const newTransaction = {
      itemId: itemId,
      itemName: itemName,
      description: description,
      location: location,
      status: status,
      comment: comment,
      expiryDate: expiryDate,
      collectionDate: collectionDate
  }
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

//proof of work (POW)
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

Blockchain.prototype.checkValid = function(){
  for(let i = 1; i < this.chain.length; i++) {
    const currentBlock = this.chain[i];
    const previousBlock = this.chain[i - 1];

    /*
    if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
    }
    */

    if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
    }
  }

  return true;
}

//export
module.exports = Blockchain;
