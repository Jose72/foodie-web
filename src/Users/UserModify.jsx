import React from "react";
import {UserApi} from "../services";
import {Link} from "react-router-dom";
import './UserModify.css';

class UserModify extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            userId: props.match.params.id,
            user: {},
        };
    }

    componentDidMount() {
        UserApi.getUser(this.state.userId)
            .then((u) => {
                this.setState({user: u})
            })
            .catch((t) => {
                alert(t);
            })
    }

    change = (e) => {
        e.persist();
        this.setState({[e.target.name]:  e.target.value})
    };


    onSubmit(e){
        e.persist();
        e.preventDefault();
        UserApi.modifyUser(this.state.user)
            .then(() => {
                alert('User Updated Successfully');
            })
            .catch((r) => {
                alert(r)
            });

    }

    render(){
        return(
            <div className={'ModifyUser'}>
                <div>
                    <header className='ModifyUser-header'>
                        <h5>
                            Modify User {this.state.user.id}
                        </h5>
                    </header>
                </div>

                <div className='ModifyUser-content'>
                    <form>
                        <div className={'ModifyUser-input-group'}>
                            <label className='ModifyUser-label'>First Name</label>
                            <input className='ModifyUser-input'
                                   size='150%'
                                   name='firstName'
                                //placeholder='Username'
                                   value={this.state.user.firstName}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'ModifyUser-input-group'}>
                            <label className={'ModifyUser-label'}>Last Name</label>
                            <input className='ModifyUser-input'
                                   name='lastName'
                                   value={this.state.user.lastName}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'ModifyUser-input-group'}>
                            <label className={'ModifyUser-label'}>Email</label>
                            <input className='ModifyUser-input'
                                   name='email'
                                   value={this.state.user.email}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'ModifyUser-input-group'} >
                            <label className={'ModifyUser-label'}>Phone</label>
                            <input className='ModifyUser-input'
                                   name='phone'
                                   value={this.state.user.phone}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'ModifyUser-input-group'}>
                            <label className={'ModifyUser-label'}>Subscription</label>
                            <select className='ModifyUser-input' name='subscription' value={this.state.subscription} onChange={e => this.change(e)}>
                                <option value='flat'>flat</option>
                                <option value='premium'>premium</option>
                            </select>
                            <br/>
                            <br/>
                        </div>
                        <div className={'ModifyUser-input-group'} >
                            <label className={'ModifyUser-label'}>Gratitude Points</label>
                            <input className='ModifyUser-input'
                                   name='gratitudePoints'

                                   value={this.state.user.gratitudePoints}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'ModifyUser-input-group'} >
                            <label className={'ModifyUser-label'}>Reputation</label>
                            <input className='ModifyUser-input'
                                   name='reputation'
                                   value={this.state.user.reputation}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>

                        <div className={'ModifyUser-buttons'}>
                            <button onClick={(e) => this.onSubmit(e)}> Modify </button>
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

export {UserModify};