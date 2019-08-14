import React,{useState} from 'react';
import { Input,Label } from 'reactstrap';
import './index.scss';

import crypto from 'crypto'
import Identicon from 'identicon.js'

let hash = crypto.createHash('md5');
const useremail = localStorage.getItem('email') || '';
hash.update(useremail); // 传入用户名
let imgData = new Identicon(hash.digest('hex')).toString()
let imgUrl = 'data:image/png;base64,'+imgData // 这就是头像的base64码;

export default ()=>{
    const [img,setImg] = useState(imgUrl)

    function changepic(e) {
        // document.querySelector('.avatarimg').style.backgroundImage = `url(${getObjectURL(e.target.files[0])})`;
        setImg(getObjectURL(e.target.files[0]))
    }

    return(
        <div className="avatar">
            <div className="avatarimg">
                <img src={img} alt="avatar" id="avatar"></img>
            </div>
            <div>
                <Input type="file" id="fileavatar" className="avatarinput"
                accept="image/png, image/jpeg, image/gif, image/jpg"
                onChange={changepic}/>
                <Label htmlFor="fileavatar" className="avatarlabel">Edit avatar</Label>
            </div>
        </div>
    )
}

function getObjectURL(file) {
    var url = null ;
    if (window.createObjectURL !== undefined) { // basic
        url = window.createObjectURL(file) ;
    } else if (window.URL!== undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!== undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}


