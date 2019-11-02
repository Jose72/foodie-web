import React from "react";
import {DeliveryApi} from "../services";
import {Link} from "react-router-dom";
import './DeliveryModify.css';

class DeliveryModify extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            deliveryId: props.match.params.id,
            delivery: {},
        };
    }

    componentDidMount() {
        DeliveryApi.getDelivery(this.state.deliveryId)
            .then((u) => {
                this.setState({delivery: u})
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
        DeliveryApi.modifyDelivery(this.state.delivery)
            .then(() => {
                alert('Delivery Updated Successfully');
            })
            .catch((r) => {
                alert(r)
            });

    }

    render(){
        return(
            <div className={'ModifyDelivery'}>
                <div>
                    <header className='ModifyDelivery-header'>
                        <h5>
                            Modify Delivery {this.state.delivery.id}
                        </h5>
                    </header>
                </div>

                <div className='ModifyDelivery-content'>
                    <form>
                        <div className={'ModifyDelivery-input-group'}>
                            <label className='ModifyDelivery-label'>First Name</label>
                            <input className='ModifyDelivery-input'
                                   size='150%'
                                   name='firstName'
                                //placeholder='Deliveryname'
                                   value={this.state.delivery.firstName}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'ModifyDelivery-input-group'}>
                            <label className={'ModifyDelivery-label'}>Last Name</label>
                            <input className='ModifyDelivery-input'
                                   name='lastName'
                                   value={this.state.delivery.lastName}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'ModifyDelivery-input-group'}>
                            <label className={'ModifyDelivery-label'}>Email</label>
                            <input className='ModifyDelivery-input'
                                   name='email'
                                   value={this.state.delivery.email}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'ModifyDelivery-input-group'} >
                            <label className={'ModifyDelivery-label'}>Phone</label>
                            <input className='ModifyDelivery-input'
                                   name='phone'
                                   value={this.state.delivery.phone}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'ModifyDelivery-input-group'}>
                            <label className={'ModifyDelivery-label'}>Subscription</label>
                            <select className='ModifyDelivery-input' name='subscription' value={this.state.subscription} onChange={e => this.change(e)}>
                                <option value='flat'>flat</option>
                                <option value='premium'>premium</option>
                            </select>
                            <br/>
                            <br/>
                        </div>
                        <div className={'ModifyDelivery-input-group'} >
                            <label className={'ModifyDelivery-label'}>Gratitude Points</label>
                            <input className='ModifyDelivery-input'
                                   name='gratitudePoints'

                                   value={this.state.delivery.gratitudePoints}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'ModifyDelivery-input-group'} >
                            <label className={'ModifyDelivery-label'}>Reputation</label>
                            <input className='ModifyDelivery-input'
                                   name='reputation'
                                   value={this.state.delivery.reputation}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'ModifyDelivery-input-group'} >
                            <label className={'ModifyDelivery-label'}>Balance</label>
                            <input className='ModifyDelivery-input'
                                   name='reputation'
                                   value={this.state.delivery.balance}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>

                        <div className={'ModifyDelivery-buttons'}>
                            <button onClick={(e) => this.onSubmit(e)}> Modify </button>
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

export {DeliveryModify};