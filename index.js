const Web3 = require("web3");
var Tx = require('ethereumjs-tx');
const addr = process.env.ETHER_ADDR;
const privateKey = process.env.PRIVATE_KEY;
const gasLimit = 3000000;
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETHER_URL))
var nonce= web3.eth.getTransactionCount(

exports.handler =  function(event, context, callback) {
	web3.eth.getBalance(addr, function(err, result) {
		if(result>0){
			var rawTx = {
				"nonce": web3.utils.toHex(nonce), 
				"gasPrice:": web3.eth.gasPrice,
				"gasLimit": web3.utils.toHex(gasLimit),
				"to": process.env.WALLET,
				"value": result,
				"chainId": 1 
			}	
			var tx = new Tx(rawTx);
			tx.sign(privateKey);
			var serializedTx = tx.serialize();
			web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
				.on('receipt', console.log);
		}
	});	
}
