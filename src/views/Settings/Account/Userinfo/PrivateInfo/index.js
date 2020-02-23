import React from 'react';
import { Button } from 'reactstrap';
import download from 'downloadjs';
import nknWallet from 'nkn-wallet';
import propTypes from 'prop-types';
import { programHashStringToAddress, hexStringToProgramHash, publicKeyToSignatureRedeem } from 'nkn-wallet/lib/crypto/protocol';
import _ from 'lodash';

function PrivateInfo(props) {
  const { email, username, publicKeyWallet } = props;
  // const { programHashStringToAddress, hexStringToProgramHash, publicKeyToSignatureRedeem } = nknWallet;
  const nknAddr = _.flow([
    publicKeyToSignatureRedeem,
    hexStringToProgramHash,
    programHashStringToAddress
  ])(publicKeyWallet);

  const { seedUseRestore } = JSON.parse(localStorage.getItem(email)) || { seedUseRestore: '' };
  let walletFromSeed = '';
  let file = '';
  if (seedUseRestore) {
    walletFromSeed = nknWallet.restoreWalletBySeed(seedUseRestore, 'new-wallet-password');
    file = walletFromSeed.toJSON();
  }
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
          <p>{nknAddr}</p>
          <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
            <Button block color="dark" className="btn-pill" onClick={() => download(file, 'seed.txt', "text/plain")}>back up your wallet</Button>
          </div>
      </div>
    </>
  );
}

PrivateInfo.propTypes = {
  username: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
  publicKeyWallet: propTypes.string.isRequired,
}

export default PrivateInfo;
