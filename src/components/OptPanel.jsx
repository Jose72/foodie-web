import React from 'react';
import '../styles/PageStyles.css'
import {Link} from "react-router-dom";
import {Auth} from "../services";
import Dropdown from "reactstrap/es/Dropdown";
import Button from "reactstrap/es/Button";
import ButtonGroup from "reactstrap/es/ButtonGroup";


class OptPanel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        };

        this.onClickMainMenu = this.onClickMainMenu.bind(this)
        this.onCloseMenu = this.onCloseMenu.bind(this);
    }

    onClickLogout(){
        Auth.logout();
        window.location.reload();
    }

    onClickMainMenu(){
        this.props.history.push({
            pathname: '/menu',
        });
        window.location.reload();
    }

    onCloseMenu(){
        this.setState({anchorEl:null});
    }


    render(){
        return(
            <div className="btn-group">
                <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                    Action
                </button>
                <div className="dropdown-menu">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">Separated link</a>
                </div>
            </div>
        )
    }
}
export {OptPanel}