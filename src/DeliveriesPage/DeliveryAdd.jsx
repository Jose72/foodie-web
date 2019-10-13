import React from 'react';
import {Link} from "react-router-dom";
import {DeliveryComm} from "../utils";

import './DeliveryAdd.css';

class DeliveryAdd extends React.Component{
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
        DeliveryComm.addDelivery(this.state)
            .then(() => {
                alert('Delivery Added Successfully');
                console.log("Delivery Added");
            })
            .catch((r) => {
                alert(r)
            });

    }

    render(){
        return(
            <div className={'AddDelivery'}>
                <div>
                    <header className='AddDelivery-header'>
                        <h5>
                            Add New Delivery
                        </h5>
                    </header>
                </div>

                <div className='AddDelivery-content'>
                    <form>
                        <div className={'AddDelivery-input-group'}>
                            <label className='AddDelivery-label'>First Name</label>
                            <input className='AddDelivery-input'
                                   size='150%'
                                   name='firstName'
                                //placeholder='Username'
                                   value={this.state.firstName}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'AddDelivery-input-group'}>
                            <label className={'AddDelivery-label'}>Last Name</label>
                            <input className='AddDelivery-input'
                                   name='lastName'
                                //placeholder='Password'
                                   value={this.state.lastName}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'AddDelivery-input-group'}>
                            <label className={'AddDelivery-label'}>Email</label>
                            <input className='AddDelivery-input'
                                   name='email'
                                   value={this.state.email}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'AddDelivery-input-group'} >
                            <label className={'AddDelivery-label'}>Phone</label>
                            <input className='AddDelivery-input'
                                   name='phone'
                                   value={this.state.phone}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'AddDelivery-input-group'}>
                            <label className={'AddDelivery-label'}>Subscription</label>
                            <select className='AddDelivery-input' name='subscription' value={this.state.subscription} onChange={e => this.change(e)}>
                                <option value='flat'>flat</option>
                                <option value='premium'>premium</option>
                            </select>
                            <br/>
                            <br/>
                        </div>
                        <div className={'AddDelivery-buttons'}>
                            <button onClick={(e) => this.onSubmit(e)}> Add </button>
                            {" "}
                            <Link className='Link' to='/deliveries/'>
                                <button>Cancel</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export {DeliveryAdd};