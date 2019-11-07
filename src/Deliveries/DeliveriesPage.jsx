import React from 'react';
import {DisplayTable} from "../components";
import { DeliveryApi } from '../services/DeliveryApi'
import { Link } from "react-router-dom";
import queryString from 'query-string';
import '../styles/PageStyles.css'

const delivery_fields = ['id', 'firstName','lastName', 'phone', 'email', 'reputation',
    'gratitudePoints', 'balance'];

const delivery_headers = ['Id', 'First Name','Last Name', 'Phone', 'Email', 'Reputation',
    'Gratitude Points', 'Balance'];

class DeliveriesPage extends React.Component {
    constructor(props) {
        super(props);

        let q = queryString.parse(this.props.location.search, {ignoreQueryPrefix: true});
        this.state = {
            deliveryList: [],
            currentPageIndex: q.p,
            pageSize: q.pSize,
            totalItems: 0,
            query: '',
            lastQuery: this.query,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.renderTable = this.renderTable.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
        this.onClickPrevious = this.onClickPrevious.bind(this);
        this.onClickNext = this.onClickNext.bind(this);

    }

    componentDidMount() {
        let q = queryString.parse(this.props.location.search, {ignoreQueryPrefix: true});
        let pageIndex = q.p;
        let pageSize = q.pSize;
        console.log(q);
        if (pageSize === undefined || pageIndex === undefined || pageIndex < 1) {
            this.props.history.push({
                pathname: '/deliveries',
            });
            this.setState({currentPageIndex: 1});
            this.setState({pageSize: 10});
        } else {
            DeliveryApi.getDeliveries(pageIndex, pageSize)
                .then((d) => {
                        console.log(d);
                        this.setState({deliveryList: d.items});
                        this.setState({totalItems: d.totalItems});
                        this.setState({currentPageIndex: pageIndex});
                        this.setState({pageSize: pageSize});
                    }
                )
                .catch((t) => {
                    alert(t);
                });
        }
    }

    //Search button
    onSubmit = (e) => {
        e.persist();
        e.preventDefault();
        this.props.history.push({
            pathname: '/deliveries',
            search: '?' + 'p=' + this.state.currentPageIndex + '&' + 'pSize=' + this.state.pageSize,
        });
        window.location.reload();
    };

    //Enter key on search bar
    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onSubmit(e);
        }
    };

    //Next page of table
    onClickNext = (e) => {
        e.persist();
        e.preventDefault();
        if (parseInt(this.state.currentPageIndex, 10) * parseInt(this.state.pageSize, 10) < parseInt(this.state.totalItems, 10)){
            console.log(this.state.currentPageIndex, this.state.pageSize);
            this.props.history.push({
                pathname: '/deliveries',
                search: '?' + 'p=' + (parseInt(this.state.currentPageIndex, 10) + 1).toString() + '&' + 'pSize=' + this.state.pageSize,
            });
            window.location.reload();
        }
    };


    //Change on form fields
    change = (e) => {
        e.persist();
        this.setState({[e.target.name]:  e.target.value});
    };

    //Previous page of table
    onClickPrevious = (e) => {
        e.persist();
        e.preventDefault();
        if(parseInt(this.state.currentPageIndex, 10) <= 1){
        } else {
            console.log(this.state.currentPageIndex, this.state.pageSize);
            this.props.history.push({
                pathname: '/deliveries',
                search: '?' + 'p=' + (parseInt(this.state.currentPageIndex, 10) - 1).toString() + '&' + 'pSize=' + this.state.pageSize,
            });
            window.location.reload();
        }
    };

    //Delete Delivery
    onClickDelete(delivery, e){
        e.persist();
        e.preventDefault();
        DeliveryApi.deleteDelivery(delivery.id)
            .then(() => {
                DeliveryApi.getDeliveries(this.state.currentPageIndex, this.state.pageSize)
                    .then((d) => {
                            console.log(d);
                            this.setState({deliveryList: d});
                            window.location.reload();
                        }
                    )
                    .catch((t) => {alert(t)});
            })
            .catch((t) => {alert(t)});
        console.log('Delete')
    };

    renderTable(){
        if(this.state.deliveryList.length > 0) {
            return(
                <div className={'Table'}>
                    <div className={'Table-panel'} >
                        <div className={'Table-entries'}>
                            <label className={'Table-entries-size-label'}>Entries</label>
                            <select className='Table-entries-size-input' name='pageSize' value={this.state.pageSize} onChange={e => this.change(e)}>
                                <option value='5'>5</option>
                                <option value='10'>10</option>
                                <option value='25'>25</option>
                                <option value='50'>50</option>
                            </select>
                        </div>
                    </div>
                    <DisplayTable
                        headers={delivery_headers}
                        fields={delivery_fields}
                        itemList={this.state.deliveryList}
                        route={'delivery'}
                        onClickDelete={this.onClickDelete}
                    >
                    </DisplayTable>
                    <div className={'Button-page-move'}>
                        <button onClick={(e) => this.onClickPrevious(e)}> Prev </button>
                        <button onClick={(e) => this.onClickNext(e)}> Next </button>
                    </div>
                </div>
            )
        }
    }

    render(){
        return (
            <div className={'Page'}>
                <header className='Page-header'>
                    <h5>
                        Delivery Menu
                    </h5>
                </header>
                <div className={'Page-content'}>
                    <div className={'Page-search-add'}>
                        <div className={'Page-search-bar'}>
                            <input className={'search-input-bar'}
                                   onKeyPress={(e) => this.onKeyPress(e)}
                                   name='query'
                                   placeholder=''
                                   value={this.state.query}
                                   onChange={(e) => this.change(e)}
                            />
                            <button onClick={(e) => this.onSubmit(e)}> Search </button>
                            <br/>
                            <br/>
                            <br/>
                        </div>
                        <div className={'Add-Delivery-Button'}>
                            <Link className='Link' to='/deliveries/add'>
                                <button>Add Delivery</button>
                            </Link>
                        </div>
                    </div>

                    {this.renderTable()}

                </div>
            </div>
        )
    }
}

export {DeliveriesPage};