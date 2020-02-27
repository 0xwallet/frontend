import React, { useState } from 'react';
import { Input,Label } from 'reactstrap';
import propTypes from 'prop-types';
// import gql from 'graphql-tag'; 
import crypto from 'crypto';
import Identicon from 'identicon.js';
import url from './us.jpg';
import './index.scss';

let hash = crypto.createHash('md5');
const useremail = localStorage.getItem('email') || '';
hash.update(useremail); // 传入用户名
let imgData = new Identicon(hash.digest('hex')).toString()
let imgUrl = 'data:image/png;base64,'+imgData // 这就是头像的base64码;

// const LAUNCHES_QUERY = gql`
// query me{
//     me{
//         avatar,
//         email,
//         username
//     }
// }
// `;

function Avatar(props){
    const [img,setImg] = useState(imgUrl);
    const { username } = props;
    /* get avatar
    const { loading, error, data } = useQuery(LAUNCHES_QUERY);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    const { avatar } = data.me;
    const renderAvatar = avatar || imgUrl; */

    function changepic(e) {
        setImg(getObjectURL(e.target.files[0]));
        /* 图片转base64传给服务器
        var file = e.target.files[0];
        var reader = new  FileReader();
        reader.readAsDataURL(file);
        // $("img").attr("data-file",file[i])改为$("img").data("data-file",file[i])
        reader.onload = function (ev) {
            console.log( ev.target.result, ' ev.target.result');
            document.querySelector("#avatar").setAttribute("src", ev.target.result);
        } */
    }

    return(
        <>
            <div className="setting_avatar">
                <div style={{ borderBottom: '1px solid #c8ced3', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <form id="advForm">
                        <Input type="file" id="fileavatar" className="avatarinput"
                        accept="image/png, image/jpeg, image/gif, image/jpg"
                        onChange={changepic} name="avatar" style={{ display: 'none' }}/>
                        <Label htmlFor="fileavatar" className="avatarlabel">
                            <div className="avatarimg">
                                <img src={img} alt="avatar" id="avatar"></img>
                            </div>
                        </Label>
                        {/* <span style={{ paddingLeft: '10px', color: '#2f353a', fontSize: '18px' }}>{username}</span> */}
                    </form>
                </div>
            </div>
            <div style={{ borderBottom: '1px solid #c8ced3', width: '100%', padding: '10px 0' }}>
                <img src={url} alt="avatar" id="avatar" style={{ height: '30px', width: '30px', borderRadius: '15px' }}></img>
                <span style={{ paddingLeft: '5px' }}>1BSV = 256USD</span>
            </div>
        </>
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

Avatar.propTypes = {
    username: propTypes.string.isRequired,
}

export default Avatar;
