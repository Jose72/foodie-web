import React from "react";
import {UserApi} from "../services";
import  '../styles/PageStyles.css'
import {FoodieFooter, Loader} from "../components";
import {userModifyValidate} from '../utils/Validator'
import {invalidMessage} from "../utils";

class UserModify extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            userId: props.match.params.id,
            user: {},
            isLoading: true,
        };
    }

    componentDidMount() {
        UserApi.getUser(this.state.userId)
            .then((u) => {
                this.setState({user: u});
                this.setState({isLoading: false});
            })
            .catch((t) => {
                alert(t);
                this.props.history.push({
                    pathname: '/users',
                    search: '?p=' + 1 + '&pSize=' + 10,
                });
                window.location.reload();
            })
    }

    update = (e) => {
        e.persist();
        let dummy = this.state.user;
        dummy[e.target.name] = e.target.value;
        this.setState({user: dummy})
    };

    change = (e) => {
        e.persist();
        this.setState({[e.target.name]:  e.target.value})
    };


    onSubmit(e){
        e.persist();
        e.preventDefault();
        if(userModifyValidate(this.state.user)){
            UserApi.modifyUser(this.state.user)
                .then(() => {
                    alert('User Updated Successfully');
                })
                .catch((r) => {
                    alert(r)
                });
        } else {
            alert(invalidMessage);
        }

    }

    onClickCancel(e){
        e.persist();
        e.preventDefault();
        this.props.history.goBack();
    }

    render(){
        if (this.state.isLoading) return <Loader />;
        return(
            <div className={'Page'}>
                <div>
                    <header className='Page-header'>
                        <h5>
                            Modify User {this.state.user.id}
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
                                   value={this.state.user.name}
                                   onChange={e => this.update(e)}
                                   autoComplete="off"
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'}>
                            <label className={'Page-label'}>Email</label>
                            <input className='Page-input'
                                   type="email"
                                   name='email'
                                   value={this.state.user.email}
                                   onChange={e => this.update(e)}
                                   autoComplete="off"
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'} >
                            <label className={'Page-label'}>Phone</label>
                            <input className='Page-input'
                                   type="phone"
                                   name='phone_number'
                                   value={this.state.user.phone_number}
                                   onChange={e => this.update(e)}
                                   autoComplete="off"
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'}>
                            <label className={'Page-label'}>Subscription</label>
                            <select className='Page-input'
                                    name='suscripcion'
                                    value={this.state.user.suscripcion}
                                    onChange={e => this.update(e)}>
                                <option value='flat'>flat</option>
                                <option value='premium'>premium</option>
                            </select>
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'} >
                            <label className={'Page-label'}>Favour Points</label>
                            <input className='Page-input'
                                   name='favourPoints'
                                   value={this.state.user.favourPoints}
                                   onChange={e => this.update(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'} >
                            <label className={'Page-label'}>Rating</label>
                            <input className='Page-input'
                                   name='rating'
                                   value={this.state.user.rating}
                                   onChange={e => this.update(e)}
                            />
                            <br/>
                            <br/>
                        </div>

                        <div className={'Page-buttons'}>
                            <button onClick={(e) => this.onSubmit(e)}> Modify </button>
                            {" "}
                            <button onClick={(e) => this.onClickCancel(e)}>Cancel</button>
                        </div>
                    </form>
                </div>
                <FoodieFooter/>
            </div>
        )
    }
}

export {UserModify};