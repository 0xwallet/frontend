import { call, put, takeEvery } from 'redux-saga';


function* learnsage(action){
    try{
        const user = yield call('https://api_hhe',action);
        yield put({
            type : 'user_succ'
        })
    }catch(e){
        yield put({
            type : "user_error"
        })
    }
}