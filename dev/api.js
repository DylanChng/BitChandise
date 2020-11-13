//Express backend server
const express = require('express');
const app = express();

//Node dependencies
const bodyParser = require('body-parser');
const { v1: uuidv1 } = require('uuid');
const rp = require("request-promise");

//Blockchain related constants
const Blockchain = require('./blockchain.js');
const bitchandise = new Blockchain;

//http://localhost:3001/blockchain - npm run node_1
//http://localhost:3002/blockchain - npm run node_2
//http://localhost:3003/blockchain - npm run node_3
//http://localhost:3004/blockchain - npm run node_4
//http://localhost:3005/blockchain - npm run node_5


//Blockchain port
const port = process.argv[2];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//endpoint 1 - fetch entire blockchain
app.get('/blockchain', (req, res) => {
   res.send(bitchandise);
});

//endpoint 2 - create transaction
app.post('/transaction', (req, res) => {
   const blockIndex = bitchandise.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
   res.json({ note: 'Transaction will be added in block ' + blockIndex + '.'});
});

//endpoint 3 - mining a new block
app.get('/mine', (req, res) => {
    const lastBlock = bitchandise.getLastBlock();
    const previousBlockHash = lastBlock['hash'];
    const currentBlockData = {
        transaction: bitchandise.pendingTransactions, index: lastBlock['index'] + 1
   };
    //get nonce
    const nonce = bitchandise.proofOfWork(previousBlockHash, currentBlockData);
    //hash the block of data
    const blockHash = bitchandise.hashBlock(previousBlockHash, currentBlockData, nonce);
    //call the mining method 
    const newBlock = bitchandise.createNewBlock(nonce, previousBlockHash, blockHash);

    res.json({
        note: "new block mined successfully",
        block: newBlock
    });

    /* Reward system
        const nodeAddress = uuidv1().split("-").join("");
        console.log(nodeAddress);
        bitchandise.createNewTransaction(12.5,"00",nodeAddress) //reward
    */
});

//register new node and broadcast to other nodes
app.post('/register-and-broadcast-node', (req,res) =>{
    const newNodeUrl = req.body.newNodeUrl;
    const notCurrentNode = bitchandise.currentNodeUrl !== newNodeUrl;
    if(bitchandise.networkNodes.indexOf(newNodeUrl) == -1 && notCurrentNode)
        bitchandise.networkNodes.push(newNodeUrl);
    else if(!notCurrentNode){
        res.json({
            note: "New node is the current node"
        })
        return;
    }else{
        res.json({
            note: "Node is already part of the network"
        })
        return;
    }
    
    const regNodesPromises = [];
    bitchandise.networkNodes.forEach(networkNodesUrl => {
        const requestOptions = {
            uri: networkNodesUrl + "/register-node",
            method: "POST",
            body: { 
                newNodeUrl: newNodeUrl,
                chain: bitchandise.chain
            },
            json: true
        }
        //rp(requestOptions)
        regNodesPromises.push(rp(requestOptions));
        console.log(rp(requestOptions));
    })
    
    
    Promise.all(regNodesPromises)
        .then(data => {
            const bulkRegisterOptions = {
                uri: newNodeUrl + "/register-nodes-bulk",
                method: "POST",
                body: {
                    allNetworkNodes: [...bitchandise.networkNodes,bitchandise.currentNodeUrl]
                },
                json: true
            }

            return rp(bulkRegisterOptions).then(data => {
                res.json({
                    note: "New Node registered with network successfully"
                })
        })
                
        });
    
    
    
});

//register node
app.post('/register-node', (req,res) =>{
    const newNodeUrl = req.body.newNodeUrl;
    const nodeNotAlreadyPresent = bitchandise.networkNodes.indexOf(newNodeUrl) == -1;
    const notCurrentNode = bitchandise.currentNodeUrl !== newNodeUrl;
    if(nodeNotAlreadyPresent && notCurrentNode)
        bitchandise.networkNodes.push(newNodeUrl);
    else if(!notCurrentNode){
        res.json({
            note: "New node is the current node"
        })
        return;
    }else{
        res.json({
            note: "Node is already part of the network"
        })
        return;
    }
    
    res.json({note: "New node registered successfully. "})
});

app.post('/register-nodes-bulk',(req,res) =>{
    const allNetworkNodes = req.body.allNetworkNodes;

    allNetworkNodes.forEach(networkNodesUrl => {
        const nodeNotAlreadyPresent = bitchandise.networkNodes.indexOf(networkNodesUrl) == -1;
        const notCurrentNode = bitchandise.currentNodeUrl !== networkNodesUrl;
        if(nodeNotAlreadyPresent && notCurrentNode)
            bitchandise.networkNodes.push(networkNodesUrl)
    })
    
    res.json({
        note: "Bulk registration successfull"
    })
})

app.listen(port, () =>{
    console.log(`listening on port ${port}...`);
});