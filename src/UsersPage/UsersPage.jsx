import React from 'react';
import './UsersPage.css';


class UsersPage extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            listUsersDisplay: [],
            query: {
                firstName: '',
                lastName: '',
                email: '',
                phone: ''
            }
        };
    }

    onSubmit = (e) => {
        e.persist();
        e.preventDefault();
        console.log(this.state)
    };

    change = (e) => {
        e.persist();
        this.setState({[e.target.name]:  e.target.value})
    };

    render(){
        return (
            <div>
                <form>
                <input
                    size='150%'
                    name='firstName' 
                    placeholder='First Name' 
                    value={this.state.query.firstName}
                    onChange={e => this.change(e)} 
                />
                <input
                    size='150%'
                    name='lastName' 
                    placeholder='Last Name' 
                    value={this.state.query.lastName}
                    onChange={e => this.change(e)} 
                />
                <input
                    size='150%'
                    name='phone' 
                    placeholder='Phone Number' 
                    value={this.state.query.phone} 
                    onChange={e => this.change(e)} 
                />
                <input
                    size='150%'
                    name='email' 
                    placeholder='Email' 
                    value={this.state.query.email} 
                    onChange={e => this.change(e)} 
                />
                </form>
                <br/>
                <button onClick={(e) => this.onSubmit(e)}> Search </button>
            </div>
        )
    }
}

export {UsersPage};