import React from 'react';
import '../styles/PageStyles.css'
import {Link} from "react-router-dom";
import {Auth} from "../services";


class OptPanel extends React.Component{
    constructor(props) {
        super(props);
    }

    onClickLogout(){
        Auth.logout();
        window.location.reload();
    }

    render(){
        return(
            <div>
                <Link to={'/menu'}>
                    <button> Main Menu </button>
                </Link>
                <button onClick={this.onClickLogout}> Logout </button>
                <br/>
            </div>
        )
    }
}
export {OptPanel}