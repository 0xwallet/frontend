import React from 'react';
import { Button } from 'reactstrap';
import download from 'downloadjs';
import nknWallet from 'nkn-wallet';

function PrivateInfo(props) {
  const { email, username } = props;
  const { walletAddr, seedUseRestore } = JSON.parse(localStorage.getItem(email));
  const walletFromSeed = nknWallet.restoreWalletBySeed(seedUseRestore, 'new-wallet-password');
  const arr = [
    { label: 'Email', value: email, verified: true },
    { label: 'Country', value: 'China', verified: true },
    { label: 'Passport', value: 'G301222', verified: true }
  ]

  const arrPublic = [
    { label: 'Name', value: username },
    { label: 'Bio', value: 'i like owaf'},
  ]

  return (
    <>
      <div style={{ paddingTop: '10px', borderBottom: '1px solid #c8ced3', display: 'flex' }}>
        {
          arr.map((v, i) => (
            <div key={i} style={{ flex: 1 }}>
              <p>{v.label}</p>
              <p>{v.value}</p>
              <p style={{ display: 'flex', alignItems: 'center' }}>
                <span> <i className="cui-check icons" style={{ color: '#4dbd74' }}></i> </span><span>verified</span>
              </p>
            </div>
          ))
        }
      </div>
      <div style={{ paddingTop: '10px', borderBottom: '1px solid #c8ced3', display: 'flex' }}>
        {
            arrPublic.map((v, i) => (
              <div key={i} style={{ flex: 1 }}>
                <p> <i className="cui-pencil icons"></i> {v.label}</p>
                <p>{v.value}</p>
              </div>
            ))
          }
      </div>
      <div style={{ paddingTop: '15px', position: 'relative' }}>
          <div>NKN ID</div>
          <p>{walletAddr}</p>
          <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
            <Button block color="dark" className="btn-pill" onClick={() => download(walletFromSeed.toJSON(), 'seed.txt', "text/plain")}>back up your wallet</Button>
          </div>
      </div>
    </>
  );
}

export default PrivateInfo;
