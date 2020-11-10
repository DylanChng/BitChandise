const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { v1: uuidv1 } = require('uuid');

const Blockchain = require('./blockchain.js');
const blockchain = new Blockchain;

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//endpoint 1 - fetch entire blockchain
app.get('/blockchain', (req, res) => {
   res.send(blockchain);
});

//endpoint 2 - create transaction
app.post('/transaction', (req, res) => {
   const blockIndex = blockchain.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
   res.json({ note: 'Transaction will be added in block ' + blockIndex + '.'});
});

//endpoint 3 - mining a new block
app.get('/mine', (req, res) => {
    const lastBlock = blockchain.getLastBlock();
    const previousBlockHash = lastBlock['hash'];
    const currentBlockData = {
        transaction: blockchain.pendingTransactions, index: lastBlock['index'] + 1
   };
    //get nonce
    const nonce = blockchain.proofOfWork(previousBlockHash, currentBlockData);
    //hash the block of data
    const blockHash = blockchain.hashBlock(previousBlockHash, currentBlockData, nonce);
    //call the mining method 
    const newBlock = blockchain.createNewBlock(nonce, previousBlockHash, blockHash);

    res.json({
        note: "new block mined successfully",
        block: newBlock
    });
});

//listening port
app.listen(3000, () => {
    console.log('listening on port 3000...');
});
