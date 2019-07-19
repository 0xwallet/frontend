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
        default : return state
    }
}

const rootRudecer = combineReducers({
    login,
    upgrade,
    updatetheme
})

export default rootRudecer