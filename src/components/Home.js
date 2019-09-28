import React from 'react';
import CurrentUser from './CurrentUser';
import '../containers/DefaultLayout';
import DefaultLayout from '../containers/DefaultLayout';
import Login from '../views/Pages/Login0waf';

export default ()=>{
    return(
        <CurrentUser>
            {currentUser=>{
                return currentUser? <DefaultLayout /> : <Login/>
            }}
        </CurrentUser>
        // <DefaultLayout />
    )
}