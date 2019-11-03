import React from 'react';
import { Route, Link, Redirect} from 'react-router-dom';
import '../styles/PageStyles.css';
import {Auth} from "../utils";


class MenuPage extends React.Component {

    onSubmit = () => {
        Auth.logout();
        this.props.history.push('/')
    };

    render(){
        return (
            <div className={'Page'}>
                <header className={'Page-header'}>
                    <h5>
                        Administrator Menu
                    </h5>
                    <button className={'Page-button'} onClick={() => this.onSubmit()}> Logout </button>
                </header>
                <div className={'Page-content'}>
                        <Link className='Link' to="/users">Users</Link>
                        <Link className='Link' to="/deliveries">Deliveries</Link>
                        <Link className='Link' to="/statistics">Statistics</Link>
                </div>
                <footer className={'Page-footer'}>
                    Foodie
                </footer>
            </div>
        )
    }
}

export {MenuPage};
