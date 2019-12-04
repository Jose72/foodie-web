import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/PageStyles.css';
import {Auth} from "../services";
import {FoodieFooter} from "../components";


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
                    <button onClick={this.onSubmit}>Logout</button>
                </header>
                <div className={'Page-content'}>
                        <Link className='Link' to="/users?p=1&pSize=10">Users</Link>
                        <Link className='Link' to="/deliveries?p=1&pSize=10">Deliveries</Link>
                        <Link className='Link' to="/statistics">Statistics</Link>
                        <Link className='Link' to="/shops?p=1&pSize=10">Shops</Link>
                </div>
                <FoodieFooter/>
            </div>
        )
    }
}

export {MenuPage};
