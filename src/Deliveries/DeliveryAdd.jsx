import React from 'react';
import {Link} from "react-router-dom";
import {DeliveryApi} from "../services";
import '../styles/PageStyles.css'
import {deliveryAddValidate, validURL, invalidMessage} from "../utils";
import logo from './logo192.png'

class DeliveryAdd extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            password: '',
            email: '',
            phone_number: '',
            picture: 'https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg',
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.getPicture = this.getPicture.bind(this);
    }

    change = (e) => {
        e.persist();
        this.setState({[e.target.name]:  e.target.value})
    };


    onSubmit(e){
        e.persist();
        e.preventDefault();
        if(deliveryAddValidate(this.state)){
            DeliveryApi.addDelivery(this.state)
                .then(() => {
                    alert('Delivery Added Successfully');
                    console.log("Delivery Added");
                })
                .catch((r) => {
                    alert(r)
                });
        } else {
            alert(invalidMessage);
        }
    }

    getPicture(){
        if(validURL(this.state.picture)){
            return this.state.picture
        } else {
            return logo
        }
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
                    <img src={this.getPicture()} alt={''} width={200} height={200}/>
                    <form>
                        <div className={'Page-input-group'}>
                            <label className='Page-label'>Picture</label>
                            <input className='Page-input'
                                   name='picture'
                                   value={this.state.picture}
                                   onChange={e => this.change(e)}
                                   autoComplete="off"
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'}>
                            <label className='Page-label'>Name</label>
                            <input className='Page-input'
                                   type='text'
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
                                   type='text'
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
                                   type='text'
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
                                   type='text'
                                   name='phone_number'
                                   value={this.state.phone_number}
                                   onChange={e => this.change(e)}
                                   autoComplete="off"
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