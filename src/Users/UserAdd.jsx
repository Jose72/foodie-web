import React from 'react';
import {Link} from "react-router-dom";
import{UserApi} from "../services";
import  '../styles/PageStyles.css'
import {invalidMessage, userAddValidate} from "../utils";

class UserAdd extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            password: '',
            email: '',
            phone_number: '',
            suscripcion: 'flat',
            picture: '',
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
        if (userAddValidate(this.state)) {
            UserApi.addUser(this.state)
                .then(() => {
                    alert('User Added Successfully');
                    console.log("User Added");

                })
                .catch((r) => {
                    alert(r)
                });
        } else {
            alert(invalidMessage);
        }
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
                            <label className='Page-label'>Name</label>
                            <input className='Page-input'
                                    type="text"
                                    name='name'
                                    value={this.state.name}
                                    onChange={e => this.change(e)}
                                    autoComplete="off"
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'}>
                            <label className={'Page-label'}>Password</label>
                            <input className='Page-input'
                                   type="text"
                                   name='password'
                                   value={this.state.password}
                                   onChange={e => this.change(e)}
                                   autoComplete="off"
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'}>
                            <label className={'Page-label'}>Email</label>
                            <input className='Page-input'
                                   type="text"
                                   name='email'
                                   value={this.state.email}
                                   onChange={e => this.change(e)}
                                   autoComplete="off"
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'} >
                            <label className={'Page-label'}>Phone</label>
                            <input className='Page-input'
                                    name='phone_number'
                                    value={this.state.phone_number}
                                    onChange={e => this.change(e)}
                                    autoComplete="off"
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'}>
                            <label className={'Page-label'}>suscripcion</label>
                            <select className='Page-input'
                                    name='suscripcion'
                                    value={this.state.suscripcion}
                                    onChange={e => this.change(e)}
                            >
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