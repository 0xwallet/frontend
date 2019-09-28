const nknWallet = require('nkn-wallet');
const nkn = require('nkn-multiclient');
const token = 'SFMyNTY.g3QAAAACZAAEZGF0YXQAAAABZAACaWRhDGQABnNpZ25lZG4GAJq97mttAQ.PMWFEbUUVBe6St7P3YU-hZWqt_TxeGyuYXntXAZwcRI';
const seedarr = token.split('.');
const seed = seedarr[0].substr(0,6) + seedarr[1];
const wallet = nknWallet.restoreWalletBySeed(seed, seedarr[2]);

nknWallet.configure({
    rpcAddr: 'https://owaf.io',
});

const client = nkn({
    identifier: 'any string',
    seed: wallet.getSeed(),
    seedRpcServerAddr: 'https://owaf.io',
});

wallet.subscribe('d-chat77', 100, 'any string')
  .then(function(data) {
    client.on('connect', () => {
        console.log('Connection opened.');
        client.publish('d-chat77', 'hello 我是范德萨范德萨发点对00999999多是撒发生的法', { txPool: true });
        client.on('message', (src, payload, payloadType, encrypt) => {
            console.log( 'src' + src + payloadType + 'Receive', encrypt ? 'encrypted' : 'unencrypted',  'message', '"' + payload + '"','from', src, 'afterms');
            // Send a text response
            return 'Well received!';
        });
    });
    console.log(data,'success');
  }).catch(function(error) {
    console.log('Subscribe fail:', error);
  });





