import React from 'react';
import {Link} from "react-router-dom";
import {ShopApi} from "../services";

import '../styles/PageStyles.css';

class ShopAdd extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            name: '',
            address: '',
            phone: '',
            description: '',
            longitude: '',
            latitude: '',
            photoURL: '',
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
        ShopApi.addShop(this.state)
            .then(() => {
                alert('Shop Added Successfully');
                console.log("Shop Added");
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
                            Add New Shop
                        </h5>
                    </header>
                </div>

                <div className='Page-content'>
                    <form>
                        <div className={'Page-input-group'}>
                            <label className='Page-label'>Id</label>
                            <input className='Page-input'
                                   size='150%'
                                   name='id'
                                //placeholder='Username'
                                   value={this.state.id}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'}>
                            <label className='Page-label'>Name</label>
                            <input className='Page-input'
                                   size='150%'
                                   name='name'
                                //placeholder='Username'
                                   value={this.state.name}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'}>
                            <label className={'Page-label'}>Address</label>
                            <input className='Page-input'
                                   name='address'
                                   value={this.state.address}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'}>
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
                            <label className={'Page-label'}>Description</label>
                            <input className='Page-input'
                                   name='description'
                                   value={this.state.description}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'}>
                            <label className={'Page-label'}>Latitude</label>
                            <input className='Page-input'
                                   name='latitude'
                                   value={this.state.latitude}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'}>
                            <label className={'Page-label'}>Longitude</label>
                            <input className='Page-input'
                                   name='longitude'
                                   value={this.state.longitude}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'}>
                            <label className={'Page-label'}>Picture</label>
                            <input className='Page-input'
                                   name='photoURL'
                                   value={this.state.photoURL}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-buttons'}>
                            <button onClick={(e) => this.onSubmit(e)}> Add </button>
                            {" "}
                            <Link className='Link' to='/shops/'>
                                <button>Cancel</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export {ShopAdd};