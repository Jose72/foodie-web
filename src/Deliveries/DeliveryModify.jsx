import React from "react";
import {DeliveryApi} from "../services";
import {Link} from "react-router-dom";
import '../styles/PageStyles.css'

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

    onClickCancel(e){
        e.persist();
        e.preventDefault();
        this.props.history.goBack();
    }

    render(){
        return(
            <div className={'Page'}>
                <div>
                    <header className='Page-header'>
                        <h5>
                            Modify Delivery {this.state.delivery.id}
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
                                //placeholder='Deliveryname'
                                   value={this.state.delivery.firstName}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'}>
                            <label className={'Page-label'}>Last Name</label>
                            <input className='Page-input'
                                   name='lastName'
                                   value={this.state.delivery.lastName}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'}>
                            <label className={'Page-label'}>Email</label>
                            <input className='Page-input'
                                   name='email'
                                   value={this.state.delivery.email}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'} >
                            <label className={'Page-label'}>Phone</label>
                            <input className='Page-input'
                                   name='phone'
                                   value={this.state.delivery.phone}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'} >
                            <label className={'Page-label'}>Gratitude Points</label>
                            <input className='Page-input'
                                   name='gratitudePoints'

                                   value={this.state.delivery.gratitudePoints}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'} >
                            <label className={'Page-label'}>Reputation</label>
                            <input className='Page-input'
                                   name='reputation'
                                   value={this.state.delivery.reputation}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'} >
                            <label className={'Page-label'}>Balance</label>
                            <input className='Page-input'
                                   name='reputation'
                                   value={this.state.delivery.balance}
                                   onChange={e => this.change(e)}
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
            </div>
        )
    }
}

export {DeliveryModify};