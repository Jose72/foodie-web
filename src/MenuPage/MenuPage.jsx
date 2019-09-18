import React from 'react';
import { Route, Link, Redirect} from 'react-router-dom';

import './MenuPage.css';
import {Auth} from "../utils";


class MenuPage extends React.Component {

    onSubmit = (e) => {
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
                </header>
                <div className='Menu-content'>
                    <Link className='Link' to="/users">Users</Link>
                </div>
                <div className='Menu-button'>
                    <button onClick={(e) => this.onSubmit(e)}> Logout </button>
                </div>
            </div>
        )
    }
}

export {MenuPage};