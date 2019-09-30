import React from 'react';
import {Link} from "react-router-dom";
import {UserComm} from "../utils";

import './UserAdd.css';

class UserAdd extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            subscription: '',
            };

            this.onSubmit = this.onSubmit.bind(this);
        }

    change = (e) => {
        e.persist();
        this.setState({[e.target.name]:  e.target.value})
    };


    onSubmit(e){
        e.persist();
        e.preventDefault();
        UserComm.addUser(this.state)
            .then(() => {
                alert('User Added Successfully');
                console.log("User Added");
            })
            .catch((r) => {
                alert(r)
            });

    }

    render(){
        return(
            <div className='AddUser-content'>
                <form>
                    <label className='AddUser-label'>First Name</label>
                    <br/>
                    <input
                        size='150%'
                        name='firstName'
                        //placeholder='Username'
                        value={this.state.firstName}
                        onChange={e => this.change(e)}
                    />
                    <br/>
                    <br/>
                    <br/>
                    <label className={'AddUser-label'}>Last Name</label>
                    <br/>
                    <input
                        name='lastName'
                        //placeholder='Password'
                        value={this.state.lastName}
                        onChange={e => this.change(e)}
                    />
                    <br/>
                    <br/>
                    <br/>
                    <label className={'AddUser-label'}>Email</label>
                    <br/>
                    <input
                        name='email'
                        //placeholder='Password'
                        value={this.state.email}
                        onChange={e => this.change(e)}
                    />
                    <br/>
                    <br/>
                    <br/>
                    <label className={'AddUser-label'}>Phone</label>
                    <br/>
                    <input
                        name='phone'
                        //placeholder='Password'
                        value={this.state.phone}
                        onChange={e => this.change(e)}
                    />
                    <br/>
                    <br/>
                    <br/>
                    <label className={'AddUser-label'}>Subscription</label>
                    <br/>
                    <input
                        name='subscription'
                        //placeholder='Password'
                        value={this.state.subscription}
                        onChange={e => this.change(e)}
                    />
                    <br/>
                    <br/>
                    <br/>
                    <button onClick={(e) => this.onSubmit(e)}> Add </button>
                </form>
            </div>
        )
    }
}

export {UserAdd};