import React from 'react';
import logo from '../styles/logo192.png'
import axios from 'axios'

class ImageDisplay extends React.Component {
    constructor(props) {
        super(props);

    }

    static validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
    }

    static getImage(item, field) {
        if(item[field] === null || !this.validURL(item[field])){
            return logo;
        }
        return item[field]
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
