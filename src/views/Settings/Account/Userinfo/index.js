import React from 'react';
import {Card,CardBody,CardHeader} from 'reactstrap';
import propTypes from 'prop-types';
import { Query } from 'react-apollo';

import gql from 'graphql-tag'; 
import Avatar from './Avatar';
// import Detail from './Detail';
import Locking from './Detail/Components/Locking';
import Addr from './Addr';
import PrivateInfo from './PrivateInfo';

const LAUNCHES_QUERY = gql`
query me{
    me{
        avatar,
        email,
        username,
        wallets{
            id,
            info{
                publicKey,
                identifier
            },
            tags,
        }
    }
}
`;

function UserInfo(props) {
    const { auth, onAuth, onVerify } = props;
    return (
        <Query query={LAUNCHES_QUERY}>
          {
              ({ loading, error, data }) => {
                  if (error) return 'error';
                  if (loading) return 'loading';
                  const { username, email, wallets } = data.me;
                  let address = '';
                  let publicKeyWallet = '';
                  if (wallets.length > 0) {
                    const { publicKey, identifier } = wallets.filter(v => v.tags[0] === 'MESSAGE')[0].info;
                    address = `${identifier}.${publicKey}`;
                    publicKeyWallet = publicKey;
                  }
                  const avatarProps = {
                      username,
                  };
                  const privateProps = {
                      email,
                      username,
                      publicKeyWallet,
                  };
                  const addr = {
                      address,
                      email,
                      username
                  };
                  return (
                    <Card>
                        <CardHeader>Profile
                            <Locking onAuth={onAuth} onVerify={onVerify} auth={auth}/>
                        </CardHeader>
                        <CardBody>
                            <Avatar {...avatarProps} />
                            <Addr {...addr} />
                            <PrivateInfo {...privateProps} />
                            {/* <Detail auth={auth}/> */}
                        </CardBody>
                    </Card>
                  ); 
              }
          }
        </Query>
    );
}

UserInfo.propTypes = {
    auth: propTypes.bool.isRequired,
    onAuth: propTypes.func.isRequired,
    onVerify: propTypes.func.isRequired,
}

export default UserInfo;
