import React from 'react';
import CurrentUser from './CurrentUser';
import '../containers/DefaultLayout';
import DefaultLayout from '../containers/DefaultLayout';
import Login from '../views/Pages/Login0waf';

function Home() {
    return (
        <CurrentUser>
            {currentUser => {
                return currentUser? <DefaultLayout currentuser={currentUser} /> : <Login/>
            }}
        </CurrentUser>
    );
}

export default Home;
