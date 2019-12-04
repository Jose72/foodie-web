import React from 'react';
import './Loader.css'
import loading_gif from './Loading_icon.gif'

class Loader extends React.Component{

    render(){
        return(
            <div className={"Loader"} >
                <img src={loading_gif}  alt={"loading"}/>
            </div>
        )
    }
}
export {Loader}