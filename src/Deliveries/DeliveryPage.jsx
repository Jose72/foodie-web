import React from 'react';
import './DeliveryPage.css';
import { Table } from 'reactstrap';
import { DeliveryApi } from '../services/DeliveryApi'
import logo from './logo192.png'


class DeliveryPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            deliveryId: props.match.params.id,
            delivery: {},
            currentOrder: null,
            completeOrdersList: []
        };
    }

    componentDidMount() {
        DeliveryApi.getDelivery(this.state.deliveryId)
            .then((u) => {
                this.setState({delivery: u})
            })
            .catch((t) => {

            })
        //TODO: get orders
    }

    renderFieldsCompleted(){
        return (
            <tr className={'Table-header'}>
                <th style={{width: '10%'}}>Id</th>
                <th style={{width: '10%'}}>Client Id</th>
                <th style={{width: '10%'}}>Food Place</th>
                <th style={{width: '10%'}}>Food</th>
                <th style={{width: '10%'}}>Order time</th>
                <th style={{width: '10%'}}>Delivery time</th>
                <th style={{width: '10%'}}>Delivered at</th>
                <th style={{width: '10%'}}>Price</th>
                <th style={{width: '10%'}}>Payed with</th>
            </tr>
        )
    }

    renderFieldsCurrent(){
        return (
            <tr className={'Table-header'}>
                <th style={{width: '10%'}}>Id</th>
                <th style={{width: '10%'}}>Client Id</th>
                <th style={{width: '10%'}}>Food Place</th>
                <th style={{width: '10%'}}>Food</th>
                <th style={{width: '10%'}}>Date</th>
                <th style={{width: '10%'}}>Price</th>
                <th style={{width: '10%'}}>Payed with</th>
            </tr>
        )
    }

    renderElementCompleted(order) {
        return (
            <tr className={'Table-content'} key={order.id}>
                <td>{order.id}</td>
            </tr>
        )
    }

    renderElementCurrent(order) {
        return (
            <tr className={'Table-content'} key={order.id}>
                <td>{order.id}</td>
            </tr>
        )
    }

    getImage() {
        if(this.state.delivery.pictureURL === null){
            return logo;
        }
        return this.state.delivery.pictureURL;
    }

    getCompletedOrdersTable() {
        if (this.state.completeOrdersList.length > 0){
            return(
                <div>
                    Complete Orders
                    <Table className={'Table'}>
                        <thead>
                        {this.renderFieldsCompleted()}
                        </thead>
                        <tbody>
                        {this.state.completeOrdersList.map(this.renderElementCompleted)}
                        </tbody>
                    </Table>
                </div>
            )
        }
    }

    getCurrentOrdersTable() {
        if (this.state.currentOrder !== null){
            return(
                <div>
                    Current Order
                    <Table className={'Table'}>
                        <thead>
                        {this.renderFieldsCurrent()}
                        </thead>
                        <tbody>
                        {this.state.currentOrder.map(this.renderElementCurrent)}
                        </tbody>
                    </Table>
                </div>
            )
        }
    }

    render() {
        return(
            <div className={'DeliveryPage'}>
                <header className='DeliveryPage-header'>
                    <h5>
                        Delivery Page - Id N°{this.state.deliveryId}
                    </h5>
                </header>
                <div className={'DeliveryPage-content'}>
                    <div className={'DeliveryPage-info-container-display'}>
                        <div className={'DeliveryPage-info-display'}>
                            <img
                                src={this.getImage()}
                                alt={'picture'}/>
                        </div>
                        <div className={'DeliveryPage-info-display'}>
                            <label className={'DeliveryPage-label'}>Name</label>
                            <br/>
                            {this.state.delivery.firstName} {this.state.delivery.lastName}
                            <br/>
                            <br/>
                            <label className={'DeliveryPage-label'}>Email</label>
                            <br/>
                            {this.state.delivery.email}
                            <br/>
                            <br/>
                            <label className={'DeliveryPage-label'}>Phone</label>
                            <br/>
                            {this.state.delivery.phone}
                        </div>
                        <div className={'DeliveryPage-info-display'}>
                            <label className={'DeliveryPage-label'}>Reputation</label>
                            <br/>
                            {this.state.delivery.reputation}
                            <br/>
                            <br/>
                            <label className={'DeliveryPage-label'}>Subscription</label>
                            <br/>
                            {this.state.delivery.subscription}
                            <br/>
                            <br/>
                            <label className={'DeliveryPage-label'}>Gratitude Points</label>
                            <br/>
                            {this.state.delivery.gratitudePoints}
                            <br/>
                            <br/>
                            <label className={'DeliveryPage-label'}>Balance</label>
                            <br/>
                            {this.state.delivery.balance}
                        </div>
                    </div>
                    <div className={'Tables'}>
                        <br/>
                        <br/>
                        {this.getCurrentOrdersTable()}
                        {this.getCompletedOrdersTable()}
                    </div>
                </div>
            </div>
        )
    }

}

export {DeliveryPage};