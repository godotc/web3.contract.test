# 部署合约与转账测试

## 当前目录结构

``` tree
.
├── contracts // 合约目录
├── migrations // 部署脚本
├── package.json
├── package-lock.json
├── READEME.md
├── test // 测试脚本目录
└── truffle-config.js // truffle 配置文件
```

## 1. 环境搭建

### 1. 克隆我的玩具仓库到本地并进入测试目录

```sh
git clone https://github.com/godotc/toys.git
cd toys/sol/transfer_test
```

### 2. 安装依赖项目

> requirment: nodejs, npm  
> 可能在安装与使用truffle都需要root权限(不是root用户的话)

- 安装全局的测试网络与框架  

```sh
sudo npm i -g ganache 
sudo npm i -g truffle
```

- 安装合约依赖项(web3,openzeppelin)

```sh
sudo npm i -g web3
npm i -openzeppelin
```

- 安装solc

```sh
pip install solc-select
solc-select install 0.8.17
solc use 0.8.17
```

- 启动 ganache 测试网络(另开一个终端)

- **此时会生成10个账户的公钥与密钥 ,我们需要记录第一个(是部署合约的地址), 或者几个，将他导入MetaMask做测试**

```sh
ganache 
---
...
0xxafasdfagdaqr0134134151
0x12413251351631613
...
```

## 2. 部署与测试

- 配置文件位于`truffle-config.js`

```sh
# 进入 truffle interactive console
$ truffle console

> compile # 编译
> migrate # 部署
> test # 测试(详见test目录下)
```

## 3. 交互式测试

- truffle console下其实就是一个js的终端
- 已经被注入了truffle, web3等依赖可以直接使用

```javascript
> let contracts = artifact.require('CIVIL3')
> let accounts = await web3.eth.getAccounts()
    
// 查看获取的数据
> accounts
> contracts

// 进行操作
...
```

## 4. 自行测试合约交互

```sh
node
```

```js
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

// 使用从编译json文件中读取的abi与合约地址新建实例
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
```
