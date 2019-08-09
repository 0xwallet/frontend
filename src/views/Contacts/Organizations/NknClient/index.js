import React from 'react';
import nknClient from 'nkn-client';

const client = nknClient({
    identifier: 'any string',
});

console.log(client.key.seed, client.key.privateKey, client.key.publicKey);

export default class NknClient extends React.PureComponent{

    render(){
        return(
            <div>
                hello nknClient
            </div>
        )
    }
}