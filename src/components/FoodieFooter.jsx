import React from 'react';
import '../styles/PageStyles.css'

class FoodieFooter extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <footer className='Page-footer'>
                <p>
                    <small>&copy; Copyright 2019. Foodie Inc.</small>
                </p>
            </footer>
        )
    }
}
 export {FoodieFooter}
