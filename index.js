var fs = require('fs');
var Web3 = require('web3')

// Provider 就是要链接的区块链网络，我们测试部署没有在主链上，这里来链接本地
var testProvider = "ws://127.0.0.1:8545"
var web3 = new Web3(testProvider)

var config
// Solidity 编译合约后形成的json文件
var OutputPath = "./transfer_test/build/contracts/CIVIL3.json"

try {
    const data = fs.readFileSync(OutputPath, 'utf-8');
    config = JSON.parse(data)
    //console.log(config.abi)
} catch (err) {
    console.log(`Error : ${err}`);
}


// 调用web3实例链接的网络
var accounts = await web3.eth.getAccounts()

// TODO: 改成你的合约地址
var ContractAddress = "0x5369b82F18a409aC6a98C1C7ceC6F864a9815c3e";
var Owner = accounts[0];

// 使用生成的abi与合约地址新建实例
var CIVIL3 = new web3.eth.Contract(config.abi, ContractAddress, { from: Owner });


// 封装的一些函数, 在调用合约时需要 `await` modifier
// 如果产生交易的需要send(), 只 "get" 的需要call()
async function MT(addr, numberstr) {
    CIVIL3.methods.mint(addr, numberstr).send({ from: Owner });
}
async function BalanceOf(addr) {
    return CIVIL3.methods.balanceOf(addr).call()
}
async function TF(from, to, ammount) {
    CIVIL3.methods.transfer(to, ammount).send({ from: from })
}
