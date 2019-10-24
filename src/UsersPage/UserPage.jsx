import React from 'react';
import './UserPage.css';
import { Table } from 'reactstrap';
import { UserComm } from '../utils/UserComm'
import logo from './logo192.png'


class UserPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: props.match.params.id,
            user: {},
            currentOrdersList: [],
            canceledOrdersList: [],
            completeOrdersList: []
        };
    }

    componentDidMount() {
        UserComm.getUser(this.state.userId)
            .then((u) => {
                this.setState({user: u})
            })
            .catch((t) => {

            })
        //TODO: get orders
    }

    renderFieldsCompleted(){
        return (
            <tr className={'Table-header'}>
                <th style={{width: '10%'}}>Id</th>
                <th style={{width: '10%'}}>Delivery Id</th>
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
                <th style={{width: '10%'}}>Delivery Id</th>
                <th style={{width: '10%'}}>Food Place</th>
                <th style={{width: '10%'}}>Food</th>
                <th style={{width: '10%'}}>Date</th>
                <th style={{width: '10%'}}>Price</th>
                <th style={{width: '10%'}}>Payed with</th>
            </tr>
        )
    }

    renderFieldsCanceled(){
        return (
            <tr className={'Table-header'}>
                <th style={{width: '10%'}}>Id</th>
                <th style={{width: '10%'}}>Food Place</th>
                <th style={{width: '10%'}}>Food</th>
                <th style={{width: '10%'}}>Order time</th>
                <th style={{width: '10%'}}>Deliver at</th>
                <th style={{width: '10%'}}>Price</th>
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

    renderElementCanceled(order) {
        return (
            <tr className={'Table-content'} key={order.id}>
                <td>{order.id}</td>
            </tr>
        )
    }

    getImage() {
        if(this.state.user.pictureURL === null){
            return logo;
        }
        return this.state.user.pictureURL;
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
        if (this.state.currentOrdersList.length > 0){
            return(
                <div>
                    Current Orders
                    <Table className={'Table'}>
                        <thead>
                        {this.renderFieldsCurrent()}
                        </thead>
                        <tbody>
                        {this.state.currentOrdersList.map(this.renderElementCurrent)}
                        </tbody>
                    </Table>
                </div>
            )
        }
    }

    getCanceledOrdersTable() {
        if (this.state.canceledOrdersList.length > 0){
            return(
                <div>
                    Complete Orders
                    <Table className={'Table'}>
                        <thead>
                        {this.renderFieldsCanceled()}
                        </thead>
                        <tbody>
                        {this.state.canceledOrdersList.map(this.renderElementCanceled)}
                        </tbody>
                    </Table>
                </div>
            )
        }
    }

    render() {
        return(
            <div className={'UserPage'}>
                <header className='UserPage-header'>
                    <h5>
                        User Page - Id N°{this.state.userId}
                    </h5>
                </header>
                <div className={'UserPage-content'}>
                    <div className={'UserPage-info-container-display'}>
                        <div className={'UserPage-info-display'}>
                            <img
                                src={this.getImage()}
                                alt={'picture'}/>
                        </div>
                        <div className={'UserPage-info-display'}>
                            <label className={'UserPage-label'}>Name</label>
                            <br/>
                            {this.state.user.firstName} {this.state.user.lastName}
                            <br/>
                            <br/>
                            <label className={'UserPage-label'}>Email</label>
                            <br/>
                            {this.state.user.email}
                            <br/>
                            <br/>
                            <label className={'UserPage-label'}>Phone</label>
                            <br/>
                            {this.state.user.phone}
                        </div>
                        <div className={'UserPage-info-display'}>
                            <label className={'UserPage-label'}>Reputation</label>
                            <br/>
                            {this.state.user.reputation}
                            <br/>
                            <br/>
                            <label className={'UserPage-label'}>Subscription</label>
                            <br/>
                            {this.state.user.subscription}
                            <br/>
                            <br/>
                            <label className={'UserPage-label'}>Gratitude Points</label>
                            <br/>
                            {this.state.user.gratitudePoints}
                        </div>
                    </div>
                    <div className={'Tables'}>
                        <br/>
                        <br/>
                        {this.getCurrentOrdersTable()}
                        {this.getCanceledOrdersTable()}
                        {this.getCompletedOrdersTable()}
                    </div>
                </div>
            </div>
        )
    }

}

export {UserPage};