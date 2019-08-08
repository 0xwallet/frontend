import { combineReducers } from 'redux';

function login(state = {info : false,sendAgain : false,tologin : false},action){
    switch(action.type){
        case 'login' : return {...state,info : action.payload.info};
        case 'sendAgain' : return {...state,sendAgain : action.payload.sendAgain};
        case 'tologin' : return {...state,tologin : action.payload.tologin};
        default : return state
    }
}

function upgrade(state={auth : false},action){
    switch(action.type){
        case 'upgrade' : return {...state,auth : action.payload.auth};
        default : return state
    }
}

function updatetheme(state={theme : 'light'},action){
    switch(action.type){
        case 'updatetheme': return {...state,theme: action.payload.theme};
        case 'CHANGE_NAME': return state;
        default : return state
    }
}

function account(state={register:false},action){
    switch(action.type){
        case 'register' : return {...state,register:action.payload.info};
        default: return state;
    }
}

function webauthnlogin(state={webauthnlogin: false},action){
    switch(action.type){
        case 'webauthnlogin': return {...state,webauthnlogin: action.payload.info};
        default: return state;
    }
}
// 控制是否渲染verify code框
function codelogin(state={sendcode: false,errcode: false,register: false},action){
    switch(action.type){
        case 'sendcode': return {...state,sendcode:action.payload.info,register:{...state,register:action.payload.register}};
        case 'isregister': return {...state,sendcode:action.payload.info};
        case 'errcode' : return {...state,errcode: action.payload.info};

        default: return state;
    }
}

const rootRudecer = combineReducers({
    login,
    upgrade,
    updatetheme,
    account,
    webauthnlogin,
    codelogin
})

export default rootRudecer