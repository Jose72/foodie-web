import React from 'react';
import {Link} from "react-router-dom";
import {DeliveryApi} from "../services";
import '../styles/PageStyles.css'

class DeliveryAdd extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            password: '',
            email: '',
            phone_number: '',
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
        DeliveryApi.addDelivery(this.state)
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
            <div className={'Page'}>
                <div>
                    <header className='Page-header'>
                        <h5>
                            Add New Delivery
                        </h5>
                    </header>
                </div>

                <div className='Page-content'>
                    <form>
                        <div className={'Page-input-group'}>
                            <label className='Page-label'>Name</label>
                            <input className='Page-input'
                                   size='150%'
                                   name='name'
                                   value={this.state.name}
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
                                   name='phone_number'
                                   value={this.state.phone_number}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-buttons'}>
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