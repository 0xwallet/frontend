import React,{useState} from 'react';
import './index.scss';

export default ()=>{
    const formlist = [
        {id:'Username',value:'no set',type:'text',disable: true},
        {id:'Card Number',value:'8888',type:'text',disable: true},
        {id:'Channel Nickname',value:'laoli',type:'text',disable: true},
        {id:'Gender',value:'',type:'text',disable: true},
        {id:'Region',value:'',type:'text',disable: true},
    ]

    const privatelist = [
        {id:'Name',value:'',type:'text',disable: true},
        {id:'Date of Birth',value:'',type:'text',disable: true},
    ]
    const [ list, setFormList ] = useState(formlist);
    const [ nolist, setNolist ] = useState(privatelist);

    // function submitpublic(e){
    //     e.preventDefault();
    //     // 用表单来初始化
    //     var form = document.getElementById("publicform");
    //     var formData = new FormData(form);
    //     console.log(formData.get('Username'))
    // }

    function handleEdit(id){
        const newlist = list.map(v=>{
            if(v.id === id){
                v.disable = false
            }
            return {...v}
        });

        const nolist1 = nolist.map(v=>{
            if(v.id === id){
                v.disable = false
            }
            return {...v}
        });

        setFormList(newlist);
        setNolist(nolist1)
    }

    function watchValue(e,id){
      
        const newlist = list.map(v=>{
            if(v.id === id){
                v.value = e.target.value
            }
            return {...v}
        });

        setFormList(newlist)
    }

    function watchPrivateValue(e,id){
        const newlist = nolist.map(v=>{
            if(v.id === id){
                v.value = e.target.value
            }
            return {...v}
        });

        setNolist(newlist)
    }

    return(
        <div className="detail">
            <header className="title">Public info</header>
            <form id="publicform">
                {
                    list.map((v,idx)=>{
                        return(
                            <section key={idx}>
                                <label htmlFor={v.id}>{v.id}:</label>
                                <input type={v.type} id={v.id} name={v.id} onChange={(e)=>watchValue(e,v.id)} value={v.value} autoComplete="off" disabled={v.disable}></input>
                                <span className="edit" onClick={()=>handleEdit(v.id)}>Edit</span>
                            </section>
                        )
                    })
                }
            </form>
            <header className="title">Non-pulic info</header>
            <form>
            {
                    nolist.map((v,idx)=>{
                        return(
                            <section key={idx}>
                                <label htmlFor={v.id}>{v.id}:</label>
                                <input type={v.type} id={v.id} disabled={v.disable} onChange={(e)=>watchPrivateValue(e,v.id)} value={v.value} autoComplete="off"></input>
                                <span className="edit" onClick={()=>handleEdit(v.id)}>Edit</span>
                            </section>
                        )
                    })
                }
            </form>
        </div>
    )
}