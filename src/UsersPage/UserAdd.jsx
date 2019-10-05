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
            subscription: 'flat',
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
            <div className={'AddUser'}>
                <div>
                    <header className='AddUser-header'>
                        <h5>
                            Add New User
                        </h5>
                    </header>
                </div>

                <div className='AddUser-content'>
                    <form>
                        <div className={'AddUser-input-group'}>
                            <label className='AddUser-label'>First Name</label>
                            <input className='AddUser-input'
                                size='150%'
                                name='firstName'
                                //placeholder='Username'
                                value={this.state.firstName}
                                onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'AddUser-input-group'}>
                            <label className={'AddUser-label'}>Last Name</label>
                            <input className='AddUser-input'
                                name='lastName'
                                //placeholder='Password'
                                value={this.state.lastName}
                                onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'AddUser-input-group'}>
                            <label className={'AddUser-label'}>Email</label>
                            <input className='AddUser-input'
                                name='email'
                                value={this.state.email}
                                onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'AddUser-input-group'} >
                            <label className={'AddUser-label'}>Phone</label>
                            <input className='AddUser-input'
                                name='phone'
                                value={this.state.phone}
                                onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'AddUser-input-group'}>
                            <label className={'AddUser-label'}>Subscription</label>
                            <select className='AddUser-input' name='subscription' value={this.state.subscription} onChange={e => this.change(e)}>
                                <option value='flat'>flat</option>
                                <option value='premium'>premium</option>
                            </select>
                            <br/>
                            <br/>
                        </div>
                        <div className={'AddUser-buttons'}>
                            <button onClick={(e) => this.onSubmit(e)}> Add </button>
                            {" "}
                            <Link className='Link' to='/users/'>
                                <button>Cancel</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export {UserAdd};