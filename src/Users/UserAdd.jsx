import React from 'react';
import {Link} from "react-router-dom";
import{UserApi} from "../services";
import  '../styles/PageStyles.css'

class UserAdd extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            password: '',
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
        UserApi.addUser(this.state)
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
            <div className={'Page'}>
                <div className='Page-header'>
                    <header>
                        <h5>
                            Add New User
                        </h5>
                    </header>
                </div>
                <div className='Page-content'>
                    <form>
                        <div className={'Page-input-group'}>
                            <label className='Page-label'>First Name</label>
                            <input className='Page-input'
                                size='150%'
                                name='firstName'
                                //placeholder='Username'
                                value={this.state.firstName}
                                onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'}>
                            <label className={'Page-label'}>Last Name</label>
                            <input className='Page-input'
                                name='lastName'
                                //placeholder='Password'
                                value={this.state.lastName}
                                onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'}>
                            <label className={'Page-label'}>Password</label>
                            <input className='Page-input'
                                   name='password'
                                   value={this.state.password}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'}>
                            <label className={'Page-label'}>Email</label>
                            <input className='Page-input'
                                name='email'
                                value={this.state.email}
                                onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'} >
                            <label className={'Page-label'}>Phone</label>
                            <input className='Page-input'
                                name='phone'
                                value={this.state.phone}
                                onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'}>
                            <label className={'Page-label'}>Subscription</label>
                            <select className='Page-input' name='subscription' value={this.state.subscription} onChange={e => this.change(e)}>
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