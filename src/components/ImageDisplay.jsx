import React from 'react';
import logo from '../styles/logo192.png'
import axios from 'axios'

class ImageDisplay extends React.Component {
    constructor(props) {
        super(props);

    }

    static getImage(item, field) {
        return logo;
        if(item[field] === null && item[field] === ''){
            return logo;
        }
        axios.get(item[field])
            .then((p) =>{
                return p;
            })
            .catch((e) => {
                return logo;
            });
    }

    static renderPicture(item, field){
        if(typeof item[field] !== undefined){
            return(
                <img
                    src={this.getImage(item, field)}
                    alt={'picture'}
                    width={'100px'}
                    height={'100px'}
                />
            )
        }
    }
}

export {ImageDisplay}
