import nkn from 'nkn-client';
// const seed = localStorage.getItem('token').slice(0,64);
// const seedRpcServerAddr = process.argv[2];
// const logPrefix = process.argv[4] ? ('[' + process.argv[4] + '] ') : '';

function sendMsg(msg,other){
    let userClient = nkn({
        // neither of these are required, as shown in toClient below
        identifier: localStorage.getItem('email'),
        // seed: seed,
        // seedRpcServerAddr: seedRpcServerAddr,
    });

    let otherClient = nkn({
        identifier: other
    })

    userClient.on('connect', () => {
        try {
            userClient.send(`${other}.${otherClient.key.publicKey}`,msg);
        } catch (e) {
            console.error(e);
        }
    });

    userClient.on('message',(src,payload,payloadType)=>{
        try {
            // msghh = payload;
        }catch(e){
            console.log(e)
        }
    })

}

export { sendMsg}