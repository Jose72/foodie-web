import React from 'react';
import './DeliveriesPage.css';
import { Table } from 'reactstrap';
import { DeliveryComm } from '../utils/DeliveryComm'
import { Link } from "react-router-dom";
import Modal from "reactstrap/es/Modal";

const deliveryModifyEmpty = {
    id: -1,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subscription: 'flat',
    reputation: 0,
    gratitudePoints: 0,
    balance: 0
};

class DeliveriesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            deliveryList: [],
            currentPageIndex: 1,
            query: '',
            lastQuery: this.query,
            showModifyDeliveryModal: false,
            deliveryModify: {
                id: -1,
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                subscription: '',
                reputation: 0,
                gratitudePoints: 0,
                balance: 0
            }
        };

        this.onSubmit =  this.onSubmit.bind(this);
        this.renderElement = this.renderElement.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
        this.onClickModify = this.onClickModify.bind(this);
        this.submitModifyDeliveryModal = this.submitModifyDeliveryModal.bind(this);
        this.onClickPrevious = this.onClickPrevious.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
    }

    //Search button
    onSubmit = (e) => {
        e.persist();
        e.preventDefault();
        //fetch query
        DeliveryComm.getDeliveries(this.state.currentPageIndex)
            .then((d) => {
                    console.log(d);
                    this.setState({deliveryList: d});
                }
            )
            .catch((t) => {alert(t)});
    };

    changeDeliveryModify = (e) => {
        e.persist();
        const { deliveryModify } = { ...this.state };
        const currentState = deliveryModify;
        const { name, value } = e.target;
        currentState[name] = value;
        this.setState({ deliveryModify: currentState });
    };

    //Change on form fields
    change = (e) => {
        e.persist();
        this.setState({[e.target.name]:  e.target.value});
    };

    //Next page of table
    onClickNext = (e) => {
        e.persist();
        e.preventDefault();
        DeliveryComm.getDeliveries(this.state.currentPageIndex+1)
            .then((u) => {
                    console.log(u);
                    this.setState({currentPageIndex: this.state.currentPageIndex+1});
                    this.setState({deliveryList: u});
                }
            )
            .catch((t) => {});
    };

    //Previous page of table
    onClickPrevious = (e) => {
        e.persist();
        e.preventDefault();
        if (this.state.currentPageIndex > 1) {
            DeliveryComm.getDeliveries(this.state.currentPageIndex - 1)
                .then((u) => {
                        console.log(u);
                        this.setState({currentPageIndex: this.state.currentPageIndex - 1});
                        this.setState({deliveryList: u});
                    }
                )
                .catch((t) => {alert(t)});
        }
    };


    //Delete Delivery
    onClickDelete(delivery, e){
        e.persist();
        e.preventDefault();
        DeliveryComm.deleteDelivery(delivery.id)
            .then(() => {
                DeliveryComm.getDeliveries(this.state.currentPageIndex)
                    .then((u) => {
                            console.log(u);
                            this.setState({deliveryList: u})
                        }
                    )
                    .catch((t) => {alert(t)});
            })
            .catch((t) => {alert(t)});
        console.log('Delete')
    };

    //Modify Delivery
    onClickModify(delivery, e){
        e.persist();
        e.preventDefault();
        this.setState({showModifyDeliveryModal: true, deliveryModify: delivery});
        console.log('Modify')

    };

    submitModifyDeliveryModal(){
        DeliveryComm.modifyDelivery(this.state.deliveryModify)
            .then((t) => {
                alert(t);
                this.setState({showModifyDeliveryModal: false, deliveryModify: deliveryModifyEmpty})
            })
            .catch((t) => {alert(t)});

    }

    cancelModifyDeliveryModal(){
        this.setState({showModifyDeliveryModal: false});
        this.setState({deliveryModify: deliveryModifyEmpty})
    }

    renderFields(){
        return (
            <tr className={'Table-header'}>
                <th style={{width: '10%'}}>Id</th>
                <th style={{width: '10%'}}>First Name</th>
                <th style={{width: '10%'}}>Last Name</th>
                <th style={{width: '10%'}}>Phone</th>
                <th style={{width: '10%'}}>Email</th>
                <th style={{width: '10%'}}>Subscription</th>
                <th style={{width: '10%'}}>Reputation</th>
                <th style={{width: '10%'}}>Gratitude Points</th>
                <th style={{width: '10%'}}>Balance</th>
                <th style={{width: '2%'}}></th>
                <th style={{width: '2%'}}></th>
            </tr>
        )
    }

    renderElement(delivery) {
        return (
            <tr className={'Table-content'} key={delivery.id}>
                <td>{delivery.id}</td>
                <td>{delivery.firstName}</td>
                <td>{delivery.lastName}</td>
                <td>{delivery.phone}</td>
                <td>{delivery.email}</td>
                <td>{delivery.subscription}</td>
                <td>{delivery.reputation}</td>
                <td>{delivery.gratitudePoints}</td>
                <td>{delivery.balance}</td>
                <td>
                    <button onClick={(e) => this.onClickDelete(delivery, e)}> Delete </button>
                </td>
                <td>
                    <button onClick={(e) => this.onClickModify(delivery, e)}> Modify </button>
                </td>
            </tr>
        )
    }

    render(){
        return (
            <div className={'DeliveryPage'}>
                <header className='DeliveryPage-header'>
                    <h5>
                        Delivery Menu
                    </h5>
                </header>
                <div className={'DeliveryPage-content'}>
                    <div className={'Add-Delivery-Button'}>
                        <Link className='Link' to='/deliveries/add'>
                            <button>Add Delivery</button>
                        </Link>
                    </div>
                    <Modal isOpen={this.state.showModifyDeliveryModal}>
                        <h1>Delivery Modification</h1>
                        <div className='ModifyDelivery-content'>
                            <form>
                                <label className='ModifyDelivery-label'>First Name</label>
                                <br/>
                                <input
                                    size='150%'
                                    name='firstName'
                                    //placeholder='Username'
                                    value={this.state.deliveryModify.firstName}
                                    onChange={e => this.changedeliveryModify(e)}
                                />
                                <br/>
                                <br/>
                                <label className={'ModifyDelivery-label'}>Last Name</label>
                                <br/>
                                <input
                                    name='lastName'
                                    //placeholder='Password'
                                    value={this.state.deliveryModify.lastName}
                                    onChange={e => this.changedeliveryModify(e)}
                                />
                                <br/>
                                <br/>
                                <label className={'ModifyDelivery-label'}>Email</label>
                                <br/>
                                <input
                                    name='email'
                                    //placeholder='Password'
                                    value={this.state.deliveryModify.email}
                                    onChange={e => this.changedeliveryModify(e)}
                                />
                                <br/>
                                <br/>
                                <label className={'ModifyDelivery-label'}>Phone</label>
                                <br/>
                                <input
                                    name='phone'
                                    //placeholder='Password'
                                    value={this.state.deliveryModify.phone}
                                    onChange={e => this.changedeliveryModify(e)}
                                />
                                <br/>
                                <br/>
                                <label className={'ModifyDelivery-label'}>Subscription</label>
                                <br/>
                                <select name='subscription' value={this.state.deliveryModify.subscription} onChange={e => this.changedeliveryModify(e)}>
                                    <option value='flat'>flat</option>
                                    <option value='premium'>premium</option>
                                </select>
                                <br/>
                                <br/>
                                <label className={'ModifyDelivery-label'}>Reputation</label>
                                <br/>
                                <input
                                    name='reputation'
                                    //placeholder='Password'
                                    value={this.state.deliveryModify.reputation}
                                    onChange={e => this.changedeliveryModify(e)}
                                />
                                <br/>
                                <br/>
                                <label className={'ModifyDelivery-label'}>Gratitude Points</label>
                                <br/>
                                <input
                                    name='gratitudePoints'
                                    //placeholder='Password'
                                    value={this.state.deliveryModify.gratitudePoints}
                                    onChange={e => this.changedeliveryModify(e)}
                                />
                                <br/>
                                <br/>
                            </form>
                        </div>
                        <p><button onClick={() => this.submitModifyDeliveryModal()}>Submit</button></p>
                        <p><button onClick={() => this.cancelModifyDeliveryModal()}>Cancel</button></p>
                    </Modal>
                    <div>
                        <form className='Delivery-search'>
                            <div>
                                <input className={'search-input-bar'}
                                       size='150%'
                                       name='query'
                                       placeholder=''
                                       value={this.state.query}
                                       onChange={e => this.change(e)}
                                />
                                <button onClick={(e) => this.onSubmit(e)}> Search </button>
                                <br/>
                                <br/>
                                <br/>
                            </div>
                        </form>
                        <Table className={'Table'}>
                            <thead>
                            {this.renderFields()}
                            </thead>
                            <tbody>
                            {this.state.deliveryList.map(this.renderElement)}
                            </tbody>
                        </Table>

                    </div>
                    <div className={'Button-page-move'}>
                        <button onClick={(e) => this.onClickPrevious(e)}> Prev </button>
                        <button onClick={(e) => this.onClickNext(e)}> Next </button>
                    </div>
                </div>
            </div>
        )
    }


    onClickCloseAddDeliveryModal(){
        this.setState({showDeliveryModal: false})
    }
}

export {DeliveriesPage};