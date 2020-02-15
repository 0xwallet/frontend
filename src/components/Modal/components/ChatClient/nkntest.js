// import nknWallet  from 'nkn-wallet';
const nknWallet = require('nkn-wallet');

const wallet = nknWallet.newWallet('password');

console.log(wallet.address, wallet.getSeed(), wallet.toJSON(), '-----------', wallet.getPublicKey());

// const walletFromSeed = nknWallet.restoreWalletBySeed(wallet.getSeed(), 'new-wallet-password');

// console.log(walletFromSeed.address, walletFromSeed.getSeed(), walletFromSeed.toJSON())
// const nkn = require('nkn-client');

// const client = nkn({
//   identifier: 'any string',
//   seed: '2bc5501d131696429264eb7286c44a29dd44dd66834d9471bd8b0eb875a1edb0',
// });

// console.log(client.key.seed, client.key.privateKey, client.key.publicKey, client.addr);