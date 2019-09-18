import React from 'react';
import { Route, Link, Redirect} from 'react-router-dom';

import './HomePage.css';

class HomePage extends React.Component {
    render(){
        return (
            <div className='Home'>
                <header className='Home-header'>
                    <h5>
                        Foodie Web   
                    </h5>
                </header>
                <div className='Home-content'>
                    <Link className='Link' to="/login">Login</Link>
                    <p>
                    </p>
                </div>
                <footer className='Home-footer'>
                    <p>
                        <small>&copy; Copyright 2019. Foodie Inc.</small>
                    </p>
                </footer>
            </div>
        )
    }
}

export {HomePage};