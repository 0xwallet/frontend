import React,{ useState } from 'react';
import { Input,Label } from 'reactstrap';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag'; 
import { useMutation } from '@apollo/react-hooks';
import crypto from 'crypto';
import Identicon from 'identicon.js';
import './index.scss';

let hash = crypto.createHash('md5');
const useremail = localStorage.getItem('email') || '';
hash.update(useremail); // 传入用户名
let imgData = new Identicon(hash.digest('hex')).toString()
let imgUrl = 'data:image/png;base64,'+imgData // 这就是头像的base64码;

const LAUNCHES_QUERY = gql`
query me{
    me{
        avatar,
        email,
        username
    }
}
`;

export default () => {
    // const [img,setImg] = useState(imgUrl);
    // get avatar
    const { loading, error, data } = useQuery(LAUNCHES_QUERY);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    const { avatar } = data.me;
    const renderAvatar = avatar || imgUrl;

    function changepic(e) {
        // document.querySelector('.avatarimg').style.backgroundImage = `url(${getObjectURL(e.target.files[0])})`;
        // setImg(getObjectURL(e.target.files[0]));
        console.log(getObjectURL(e.target.files[0]), 'getObjectURL(e.target.files[0])');
        var file = e.target.files[0];
        var reader = new  FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (ev) {
            console.log( ev.target.result, ' ev.target.result');
            // $("#backimg").attr("src", ev.target.result);
            document.querySelector("#avatar").setAttribute("src", ev.target.result);
        }
    }

    return(
        <div className="setting_avatar">
            <div className="avatarimg">
                <img src={renderAvatar} alt="avatar" id="avatar"></img>
            </div>
            <div>
                <form id="advForm">
                    <Input type="file" id="fileavatar" className="avatarinput"
                    accept="image/png, image/jpeg, image/gif, image/jpg"
                    onChange={changepic} name="avatar" />
                    <Label htmlFor="fileavatar" className="avatarlabel">Edit avatar</Label>
                </form>
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


