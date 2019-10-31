import React from 'react';
import './DeliveriesPage.css';
import { Table } from 'reactstrap';
import { DeliveryApi } from '../services/DeliveryApi'
import { Link } from "react-router-dom";

class DeliveriesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            deliveryList: [],
            currentPageIndex: 1,
            pageSize: 10,
            query: '',
            lastQuery: this.query,

        };

        this.onSubmit =  this.onSubmit.bind(this);
        this.renderElement = this.renderElement.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
        this.onClickModify = this.onClickModify.bind(this);
        this.onClickPrevious = this.onClickPrevious.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
    }

    //Search button
    onSubmit = (e) => {
        e.persist();
        e.preventDefault();
        //fetch query
        DeliveryApi.getDeliveries(this.state.currentPageIndex, this.state.pageSize)
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
        DeliveryApi.getDeliveries(this.state.currentPageIndex+1)
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
            DeliveryApi.getDeliveries(this.state.currentPageIndex - 1)
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
        DeliveryApi.deleteDelivery(delivery.id)
            .then(() => {
                DeliveryApi.getDeliveries(this.state.currentPageIndex)
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
        console.log('Modify')

    };

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
}

export {DeliveriesPage};