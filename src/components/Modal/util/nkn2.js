import nkn from 'nkn-multiclient';
import nknWallet from 'nkn-wallet';
// import { log, genChatID } from 'Approot/misc/util';
import rpcCall from 'nkn-client/lib/rpc';

// TODO should move nkn stuff into a worker?


const log = (...args) => {
	if (localStorage.getItem('debug')) {
		console.log('d-chat:', args);
	}
};

const FEE = 0.00000001; // 1 satoshi
const FORBLOCKS = 50000;
const SEED_ADDRESSES = [
	'http://mainnet-seed-0001.nkn.org:30003',
	'http://mainnet-seed-0002.nkn.org:30003',
	'http://mainnet-seed-0003.nkn.org:30003',
	'http://mainnet-seed-0004.nkn.org:30003',
	'http://mainnet-seed-0005.nkn.org:30003',
	'http://mainnet-seed-0006.nkn.org:30003',
	'http://mainnet-seed-0007.nkn.org:30003',
	'http://mainnet-seed-0008.nkn.org:30003',
	'http://mainnet-seed-0009.nkn.org:30003',
	'http://mainnet-seed-0010.nkn.org:30003',
	'http://mainnet-seed-0011.nkn.org:30003',
	'http://mainnet-seed-0012.nkn.org:30003',
	'http://mainnet-seed-0013.nkn.org:30003',
	'http://mainnet-seed-0014.nkn.org:30003',
	'http://mainnet-seed-0015.nkn.org:30003',
	'http://mainnet-seed-0016.nkn.org:30003',
	'http://mainnet-seed-0017.nkn.org:30003',
	'http://mainnet-seed-0018.nkn.org:30003',
	'http://mainnet-seed-0019.nkn.org:30003',
	'http://mainnet-seed-0020.nkn.org:30003',
	'http://mainnet-seed-0021.nkn.org:30003',
	'http://mainnet-seed-0022.nkn.org:30003',
	'http://mainnet-seed-0023.nkn.org:30003',
	'http://mainnet-seed-0024.nkn.org:30003',
	'http://mainnet-seed-0025.nkn.org:30003',
	'http://mainnet-seed-0026.nkn.org:30003',
	'http://mainnet-seed-0027.nkn.org:30003',
	'http://mainnet-seed-0028.nkn.org:30003',
	'http://mainnet-seed-0029.nkn.org:30003',
	'http://mainnet-seed-0030.nkn.org:30003',
	'http://mainnet-seed-0031.nkn.org:30003',
	'http://mainnet-seed-0032.nkn.org:30003',
	'http://mainnet-seed-0033.nkn.org:30003',
	'http://mainnet-seed-0034.nkn.org:30003',
	'http://mainnet-seed-0035.nkn.org:30003',
	'http://mainnet-seed-0036.nkn.org:30003',
	'http://mainnet-seed-0037.nkn.org:30003',
	'http://mainnet-seed-0038.nkn.org:30003',
	'http://mainnet-seed-0039.nkn.org:30003',
	'http://mainnet-seed-0040.nkn.org:30003',
	'http://mainnet-seed-0041.nkn.org:30003',
	'http://mainnet-seed-0042.nkn.org:30003',
	'http://mainnet-seed-0043.nkn.org:30003',
	'http://mainnet-seed-0044.nkn.org:30003',
];
const getRandomSeed = () =>
	SEED_ADDRESSES[Math.floor(Math.random() * SEED_ADDRESSES.length)];

nknWallet.configure({
	rpcAddr: getRandomSeed(),
});

/**
 * Couple of helpers for nkn module.
 */
class NKN extends nkn {
	constructor({ wallet, username }) {
		// TODO : connection fail here will majorly break things.
		super({
			originalClient: true,
			identifier: username? username.trim() : undefined,
			seed: wallet.getSeed(),
			seedRpcServerAddr: getRandomSeed(),
			msgHoldingSeconds: 3999999999,
		});

		this.wallet = wallet;
		this.on('message', log);
	}

	subscribe = async topic => {
		// const topicID = genChatID(topic);

		// TODO check only once per session?
		const subInfo = this.defaultClient.getSubscription(topic, this.addr);
		const latestBlockHeight = rpcCall(
			this.defaultClient.options.seedRpcServerAddr,
			'getlatestblockheight',
		);

		return Promise.all([subInfo, latestBlockHeight]).then(
			([info, blockHeight]) => {
				if (info.expiresAt - blockHeight > 5000) {
					return Promise.reject('Too soon.');
				}

				log(
					'Subscribing to',
					topic,
					'aka',
					// genChatID(topic),
					'with fee',
					FEE,
					'NKN',
				);
				return this.wallet.subscribe(topic, FORBLOCKS, this.identifier, '', {
					fee: FEE,
				});
			},
		);
	};

	publishMessage = async (topic, message, options = { txPool: true }) => {
		log('Publishing message', message, 'to', topic, 'aka');
		try {
			const x = this.publish(topic, JSON.stringify(message), options);
			log('publish', x);
			return x;
		} catch (e) {
			console.error('Error when publishing', e);
			throw e;
		}
	};

	sendMessage = async (to, message, options = {}) => {
		log('Sending private message', message, 'to', to);
		try {
			const x = this.send(to, JSON.stringify(message), options);
			log('send', x);
			return x;
		} catch (e) {
			console.error('Error when sending', e);
			throw e;
		}
	};

	getSubs = (
		topic,
		options = {
			offset: 0,
			limit: 1000,
			meta: false,
			txPool: true,
		},
	) => {
		return this.defaultClient.getSubscribers(topic, options);
	};
}

export default NKN;
