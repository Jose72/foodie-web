import React from "react";
import {DeliveryApi} from "../services";
import {Link} from "react-router-dom";
import '../styles/PageStyles.css'
import {FoodieFooter, Loader} from "../components";
import {deliveryModifyValidate, invalidMessage} from "../utils";

class DeliveryModify extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            deliveryId: props.match.params.id,
            delivery: {},
            isLoading: true,
        };
    }

    componentDidMount() {
        DeliveryApi.getDelivery(this.state.deliveryId)
            .then((u) => {
                this.setState({delivery: u});
                this.setState({isLoading: false});
            })
            .catch((t) => {
                alert(t);
            })
    }

    update = (e) => {
        e.persist();
        let dummy = this.state.delivery;
        dummy[e.target.name] = e.target.value;
        this.setState({delivery: dummy})
    };


    onSubmit(e){
        e.persist();
        e.preventDefault();
        if(deliveryModifyValidate(this.state.delivery)) {
            DeliveryApi.modifyDelivery(this.state.delivery)
                .then(() => {
                    alert('Delivery Updated Successfully');
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
                            Modify Delivery {this.state.deliveryId}
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
                                   value={this.state.delivery.name}
                                   onChange={e => this.update(e)}
                                   autoComplete="off"
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'}>
                            <label className={'Page-label'}>Email</label>
                            <input className='Page-input'
                                   name='email'
                                   value={this.state.delivery.email}
                                   onChange={e => this.update(e)}
                                   autoComplete="off"
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'} >
                            <label className={'Page-label'}>Phone</label>
                            <input className='Page-input'
                                   name='phone_number'
                                   value={this.state.delivery.phone_number}
                                   onChange={e => this.update(e)}
                                   autoComplete="off"
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'} >
                            <label className={'Page-label'}>Rating</label>
                            <input className='Page-input'
                                   name='rating'
                                   value={this.state.delivery.rating}
                                   onChange={e => this.update(e)}
                                   autoComplete="off"
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'} >
                            <label className={'Page-label'}>Balance</label>
                            <input className='Page-input'
                                   name='balance'
                                   value={this.state.delivery.balance}
                                   onChange={e => this.update(e)}
                                   autoComplete="off"
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'} >
                            <label className={'Page-label'}>Favour Points</label>
                            <input className='Page-input'
                                   name='favourPoints'
                                   value={this.state.delivery.favourPoints}
                                   onChange={e => this.update(e)}
                                   autoComplete="off"
                            />
                            <br/>
                            <br/>
                        </div>
                        <br/>
                        <br/>
                        <div className={'Page-buttons'}>
                            <button onClick={(e) => this.onSubmit(e)}> Modify </button>
                            {" "}
                            <button onClick={(e) => this.onClickCancel(e)}>Cancel</button>
                        </div>
                        <br/>
                        <br/>
                    </form>
                </div>
                <FoodieFooter />
            </div>
        )
    }
}

export {DeliveryModify};