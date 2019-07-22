// import React,{PureComponent} from 'react';
// import HOCFactoryFactory from './WrapAuth';

// const auth = false;
// class Wallet extends PureComponent{
//     render(){
//         return(
//             <div>
//                 {this.props.children}
//             </div>
//         )
//     }
// }

// export default HOCFactoryFactory(auth)(Wallet);

import React,{useState,useEffect} from 'react';

function Example(){
    const [count,setCount] = useState(0);

    useEffect(()=>{
        document.title = `you click ${count} times`
    })

    return(
        <div>you {count}
            <p onClick={()=>setCount(count+1)}>xxxxxxxx</p>
        </div>
    )
}

export default Example;
