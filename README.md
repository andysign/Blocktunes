# Blocktunes
A blockchain platform for consuming and creating digital objects (mainly music)

# Dependencies

* Need to have a good env like `Ubuntu`

* Apart from the Ethereum client

* It is important to have `node v6.3.1` or grater

* With `npm 3.10.3` or grater

* And finally `Truffle v2.1.1` or grater from http://truffleframework.com/

# Compile and run

Open `truffle.js` and eventually if needed change the settings for your node:

```
"rpc": {
    "host": "localhost",
    "port": 8545
}
```

Then Compile

`truffle compile`

Now to get the address of the smart contract run

`truffle migrate`

Then finally for the html and all the front end run

`truffle build`
