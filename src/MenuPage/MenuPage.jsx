import React from 'react';
import { Route, Link, Redirect} from 'react-router-dom';

import './MenuPage.css';
import {Auth} from "../utils";


class MenuPage extends React.Component {

    onSubmit = () => {
        Auth.logout();
        this.props.history.push('/')
    };

    render(){
        return (
            <div className='Menu'>
                <header className='Menu-header'>
                    <h5>
                        Administrator Menu   
                    </h5>
                    <button className='Menu-button' onClick={() => this.onSubmit()}> Logout </button>
                </header>
                <div className='Menu-content'>
                    <Link className='Link' to="/users">Users</Link>
                    <Link className='Link' to="/deliveries">Deliveries</Link>
                </div>
            </div>
        )
    }
}

export {MenuPage};