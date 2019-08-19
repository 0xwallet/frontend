import React,{Fragment, PureComponent} from 'react';
import { Row, Col , FormGroup, Label, Input} from 'reactstrap';
import { Query } from 'react-apollo';
import gql from 'graphql-tag'; 
import { useMutation } from '@apollo/react-hooks';
import './index.scss';

const ADD_TODO = gql`
   mutation AddTodo($userName: String!){
    addcount(userName: $userName){
      userName
    }
   }
`;

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    user{
        settings{
        account{
          userInfo{
            userName,
            required_factor,
            cardNumber,
            channelNickname,
            gender,
            region,
            name,
            dateOfBirth
          }
        }
      }
    }
  }
`;

export default class detail extends PureComponent{
    render(){
        const { auth } = this.props;
        return(
            <Fragment>
            <Query query={LAUNCHES_QUERY} pollInterval={100}
  notifyOnNetworkStatusChange>
                {
                    ({ loading, error, data })=>{
                        if(data.user !== undefined ){
                            const {
                                userName,
                                cardNumber,
                                channelNickname,
                                gender,
                                region,
                                name,
                                dateOfBirth
                            } = data.user.settings.account.userInfo;

                            let newtree = {
                                userName,
                                cardNumber,
                                channelNickname,
                                gender,
                                region,
                            }

                            let newtreeprivate = {
                                name,
                                dateOfBirth
                            }


                            return(
                                <div className="detail">
                                    <header className="title">Public info</header>
                                    {
                                        Object.keys(newtree).map((v,i)=>{
                                            return(
                                                <Row key={i}>
                                                    <Col xs="12">
                                                        <FormGroup>
                                                            <Label htmlFor={v}>{v}</Label>
                                                            <Input type="text" id={v} placeholder="Enter your userName" required
                                                            disabled={!auth}
                                                            defaultValue={newtree[v]}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            )
                                        })
                                    }
                                    <header className="title">Non-public info</header>

                                    {
                                        Object.keys(newtreeprivate).map((v,i)=>{
                                            return(
                                                <Row key={i}>
                                                    <Col xs="12">
                                                        <FormGroup>
                                                            <Label htmlFor={v}>{v}</Label>
                                                            <Input type="text" id={v} placeholder="Enter your userName" required
                                                            disabled={!auth}
                                                            defaultValue={newtreeprivate[v]}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            )
                                        })
                                    }
                                    <AddTodo />
                                </div>
                            )
                        }else{
                            return (null)
                        }
                    }
                }
            </Query>
        </Fragment>    
        )
    }
}
// {
//     update(cache, { data: { addTodo } }) {
//       const { todos } = cache.readQuery({ query: LAUNCHES_QUERY });
//       console.log(todos,'todos')
//       cache.writeQuery({
//         query: LAUNCHES_QUERY,
//         // data: { data: todos.concat([addTodo]) },
//       });
//     }
//  }
function AddTodo() {
    let input;
    const [addTodo, { data }] = useMutation(ADD_TODO,
        );
  
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            addTodo({ variables: { userName: input.value } });
            input.value = '';
          }}
        >
          <input
            ref={node => {
              input = node;
            }}
          />
          <button type="submit">Add Todo</button>
        </form>
      </div>
    );
  }