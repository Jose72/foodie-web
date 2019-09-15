import React from 'react';
import { Route, Link, Redirect} from 'react-router-dom';

import './MenuPage.css';


class MenuPage extends React.Component {


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
            </div>
        )
    }
}

export {MenuPage};