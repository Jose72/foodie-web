import React from 'react';
import logo from '../styles/logo192.png'

class ImageDisplay extends React.Component {
    constructor(props) {
        super(props);

    }

    static getImage(item, field) {
        if(item[field] === null){
            return logo;
        }
        return item[field];
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
