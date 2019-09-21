import React from 'react';
import './UsersPage.css';


class UsersPage extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
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
        fetch()
    };

    change = (e) => {
        e.persist();
        this.setState({[e.target.name]:  e.target.value})
    };

    render(){
        return (
            <div className={'UserPage'}>
                <header className='UserPage-header'>
                    <h5>
                        User Menu
                    </h5>
                </header>
                <form>
                    <div className=''>
                        <form>
                        <input
                            size='150%'
                            name='firstName'
                            placeholder='First Name'
                            value={this.state.firstName}
                            onChange={this.change}
                            //onChange={e => this.change(e)}
                        />
                        <input
                            size='150%'
                            name='lastName'
                            placeholder='Last Name'
                            value={this.state.lastName}
                            onChange={e => this.change(e)}
                        />
                        <input
                            size='150%'
                            name='phone'
                            placeholder='Phone Number'
                            value={this.state.phone}
                            onChange={e => this.change(e)}
                        />
                        <input
                            size='150%'
                            name='email'
                            placeholder='Email'
                            value={this.state.email}
                            onChange={e => this.change(e)}
                        />
                        </form>
                        <br/>
                        <button onClick={(e) => this.onSubmit(e)}> Search </button>
                    </div>
                </form>
            </div>
        )
    }
}

export {UsersPage};