import React from 'react';
import './Loader.css'
import loading_gif from './Loading_icon.gif'
import Spinner from "reactstrap/lib/Spinner";

class Loader extends React.Component{
    constructor(props) {
        super(props);
    }


    render(){
        return(
            <div className={"Loader"} >
                <img src={loading_gif}  alt={"loading"}/>
            </div>
        )
    }
}
export {Loader}