import React from 'react';
// import { Row, Col , FormGroup, Label, Input } from 'reactstrap';
// import { useQuery } from '@apollo/react-hooks';
// import gql from 'graphql-tag'; 
// import { Mutation } from 'react-apollo';
// import { useMutation } from '@apollo/react-hooks';
import './index.scss';
// import { Query } from 'react-apollo';

// const LAUNCHES_QUERY = gql`
//   query LaunchesQuery {
//     user{
//         settings{
//         account{
//           userInfo{
//             userName,
//             required_factor,
//             cardNumber,
//             channelNickname,
//             gender,
//             region,
//             name,
//             dateOfBirth
//           }
//         }
//       }
//     }
//   }
// `;

// function Dogs(props) {
//       const { loading, error, data } = useQuery(LAUNCHES_QUERY,{
//         pollInterval: 500
//       });
//       const { auth } = props;
//       if (loading) return 'Loading...';
//       if (error) return `Error! ${error.message}`;
//       const {
//         userName,
//         cardNumber,
//         channelNickname,
//         gender,
//         region,
//         name,
//         dateOfBirth
//       } = data.user.settings.account.userInfo;

//       let newtree = {
//         userName,
//         cardNumber,
//         channelNickname,
//         gender,
//         region,
//       }

//       let newtreeprivate = {
//         name,
//         dateOfBirth
//       }
//     return (
//             <div className="detail">
//                 <header className="title">Public info</header>
//                 {
//                     Object.keys(newtree).map((v,i)=>{
//                         return(
//                             <Row key={i}>
//                                 <Col xs="12">
//                                     <FormGroup>
//                                         <Label htmlFor={v}>{v}</Label>
//                                         <Input type="text" id={v} placeholder="Enter your userName" required
//                                         disabled={!auth}
//                                         defaultValue={newtree[v]}
//                                         />
//                                     </FormGroup>
//                                 </Col>
//                             </Row>
//                         )
//                     })
//                 }
//                 <header className="title">Non-public info</header>

//                 {
//                     Object.keys(newtreeprivate).map((v,i)=>{
//                         return(
//                             <Row key={i}>
//                                 <Col xs="12">
//                                     <FormGroup>
//                                         <Label htmlFor={v}>{v}</Label>
//                                         <Input type="text" id={v} placeholder="Enter your userName" required
//                                         disabled={!auth}
//                                         defaultValue={newtreeprivate[v]}
//                                         />
//                                     </FormGroup>
//                                 </Col>
//                             </Row>
//                         )
//                     })
//                 }
//             </div>
//   )
// }

export default ()=><div>rebase...</div>


