import React from 'react';
import '../styles/PageStyles.css';
import { Table } from 'reactstrap';
import { ShopApi } from '../services/ShopApi'
import logo from './logo192.png'


class ShopPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shopId: props.match.params.id,
            shop: {},
            currentOrder: null,
            completeOrdersList: []
        };
    }

    componentDidMount() {
        ShopApi.getShop(this.state.shopId)
            .then((u) => {
                this.setState({shop: u})
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
                <th style={{width: '10%'}}>Shop time</th>
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
        if(this.state.shop.pictureURL === null){
            return logo;
        }
        return this.state.shop.pictureURL;
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
            <div className={'ShopPage'}>
                <header className='ShopPage-header'>
                    <h5>
                        Shop Page - Id N°{this.state.shopId}
                    </h5>
                </header>
                <div className={'ShopPage-content'}>
                    <div className={'ShopPage-info-container-display'}>
                        <div className={'ShopPage-info-display'}>
                            <img
                                src={this.getImage()}
                                alt={'picture'}/>
                        </div>
                        <div className={'ShopPage-info-display'}>
                            <label className={'ShopPage-label'}>Name</label>
                            <br/>
                            {this.state.shop.firstName} {this.state.shop.lastName}
                            <br/>
                            <br/>
                            <label className={'ShopPage-label'}>Email</label>
                            <br/>
                            {this.state.shop.email}
                            <br/>
                            <br/>
                            <label className={'ShopPage-label'}>Phone</label>
                            <br/>
                            {this.state.shop.phone}
                        </div>
                        <div className={'ShopPage-info-display'}>
                            <label className={'ShopPage-label'}>Reputation</label>
                            <br/>
                            {this.state.shop.reputation}
                            <br/>
                            <br/>
                            <label className={'ShopPage-label'}>Subscription</label>
                            <br/>
                            {this.state.shop.subscription}
                            <br/>
                            <br/>
                            <label className={'ShopPage-label'}>Gratitude Points</label>
                            <br/>
                            {this.state.shop.gratitudePoints}
                            <br/>
                            <br/>
                            <label className={'ShopPage-label'}>Balance</label>
                            <br/>
                            {this.state.shop.balance}
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

export {ShopPage};