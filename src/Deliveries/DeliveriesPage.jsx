import React from 'react';
import { DeliveryApi } from '../services/DeliveryApi'
import { Link } from "react-router-dom";
import {BalanceUpdater, FoodieFooter, Loader, OptPanel} from "../components";
import {ImageDisplay} from "../components"
import queryString from 'query-string';
import ReactTable from "react-table";
import "react-table/react-table.css";
import  '../styles/PageStyles.css'

class DeliveriesPage extends React.Component {
    constructor(props) {
        super(props);

        let q = queryString.parse(this.props.location.search, {ignoreQueryPrefix: true});
        this.state = {
            deliveryList: [],
            page: q.p,
            pageSize: q.pSize,
            totalItems: 0,
            query: '',
            pages: -1,
            isLoading: true,
            balanceMode: (q.balMode === undefined) ? false : q.balMode,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.onPageSizeChange = this.onPageSizeChange.bind(this);
        this.getTable = this.getTable.bind(this);
        this.onClickBalanceAdd  = this.onClickBalanceAdd.bind(this);
        this.setBalanceMode = this.setBalanceMode.bind(this);
    }

    componentDidMount() {
        let q = queryString.parse(this.props.location.search, {ignoreQueryPrefix: true});
        let pageIndex = q.p;
        let pageSize = q.pSize;
        console.log(q);
        if (pageSize === undefined || pageIndex === undefined || pageIndex < 1) {
            this.props.history.push({
                pathname: '/deliveries',
                search: '?p=' + 1 + '&pSize=' + 10,
            });
            window.location.reload();
        } else {
            DeliveryApi.getDeliveries(pageIndex, pageSize)
                .then((d) => {
                        console.log(d);
                        this.setState({deliveryList: d.items});
                        this.setState({totalItems: d.totalItems});
                        this.setState({page: pageIndex});
                        this.setState({pageSize: pageSize});
                        this.setState({balancesAdd: d.items.map(i => ({id: i.user_id, balanceAdd: 0}))});
                        this.setState({pages: (Math.ceil(d.totalItems / pageSize))});
                        this.setState({isLoading: false});
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
            search: '?p=' + this.state.page + '&pSize=' + this.state.pageSize,
        });
        window.location.reload();
    };

    //Enter key on search bar
    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onSubmit(e);
        }
    };

    //Change on form fields
    change = (e) => {
        e.persist();
        this.setState({[e.target.name]:  e.target.value});
    };
    
    //Delete Delivery
    onClickDelete(delivery){
        if(window.confirm('Delete user?')) {
            console.log(delivery);
            DeliveryApi.deleteDelivery(delivery.user_id)
                .then(() => {
                    window.location.reload();
                })
                .catch((t) => {
                    alert(t)
                });
        }
    };

    onPageChange(page){
        page++;
        if(page <= this.state.pages && page >= 1) {
            let q = queryString.parse(this.props.location.search, {ignoreQueryPrefix: true});
            q.p = page;
            this.props.history.push({
                pathname: '/deliveries',
                search: new URLSearchParams(q).toString(),
            });
            window.location.reload();
        }
    }

    onPageSizeChange(pageSize){
        let q = queryString.parse(this.props.location.search, {ignoreQueryPrefix: true});
        q.pSize = pageSize;
        this.props.history.push({
            pathname: '/deliveries',
            search: new URLSearchParams(q).toString(),
        });
        window.location.reload();
    }

    setBalanceMode() {
        let q = queryString.parse(this.props.location.search, {ignoreQueryPrefix: true});
        if (q.balMode === undefined) {
            this.props.history.push({
                pathname: '/deliveries',
                search: '?p=' + this.state.page + '&pSize=' + this.state.pageSize + '&balMode=true',
            });
            this.setState({balanceMode: true});
        } else {
            this.props.history.push({
                pathname: '/deliveries',
                search: '?p=' + this.state.page + '&pSize=' + this.state.pageSize,
            });
            this.setState({balanceMode: false});
        }
    }

    onClickBalanceAdd(user, balance){
        DeliveryApi.balanceAdd(user, balance)
            .then(() => {
                window.location.reload();
            })
            .catch((t) => {
                alert(t)
            });

    }

    getTable(){
        const d_b_columns = [
            {Header: "Delivery Id", accessor: "user_id"},
            {Header: "Name", accessor: "name"},
            {Header: "Balance", accessor: "balance"},
            {Header: "", Cell: row => {
                    return(
                        <BalanceUpdater
                            user={row.original}
                            balanceChange={this.onClickBalanceAdd}
                        />
                    )
                }},
        ];
        let cols = [
            {Header: "", Cell: row => {
                    return(ImageDisplay.renderPicture(row.original, "picture"))
                }},
            {Header: "Delivery Id", accessor: "user_id"},
            {Header: "Name", accessor: "name"},
            {Header: "Phone_number", accessor: "phone_number"},
            {Header: "Email", accessor: "email"},
            {Header: "Signup Date", accessor: "created_at"},
            {Header: "Balance", accessor: "balance"},
            {Header: "Rating", accessor: "rating"},
            {Header: "Favour Points", accessor: "favourPoints"},
            {Header: "", Cell: row => {
                    return(
                        <button onClick={() => this.onClickDelete(row.original)}> Delete </button>
                    )
                }},
            {Header: "", Cell: row => {
                    return(
                        <Link className='Link' to={`delivery/modify/${row.original.user_id}`}>
                            <button>Modify</button>
                        </Link>
                    )
                }},
            {Header: "", Cell: row => {
                    return(
                        <Link className='Link' to={`/orders?p=1&pSize=10&delivery_id=${row.original.user_id}`}>
                            <button>Orders</button>
                        </Link>
                    )
                }}
        ];
        if(this.state.balanceMode){
            cols = d_b_columns;
        }

        return(
            <div className={'Page-Table'}>
                <ReactTable
                    manual
                    page={parseInt(this.state.page, 10) - 1}
                    pageSize={this.state.pageSize}
                    data={this.state.deliveryList}
                    pages={this.state.pages}
                    columns={cols}
                    onPageChange={this.onPageChange}
                    onPageSizeChange={this.onPageSizeChange}
                    showPagination={true}
                />
            </div>
        );

    }

    render(){
        if (this.state.isLoading) return <Loader />;
        return (
            <div className={'Page'}>
                <header className='Page-header'>
                    <h5>
                        Delivery Menu
                    </h5>
                </header>
                <div className={'Page-opt-panel'}>
                    <OptPanel/>
                </div>
                <div className={'Page-search-add'}>
                    <div>
                        <input
                            className='Page-input'
                            type="checkbox"
                            defaultChecked={this.state.balanceMode}
                            onChange={this.setBalanceMode}
                            placeholder={'Balance Mode'}
                        />
                        <label className={'Page-label'}>Balance Mode</label>
                    </div>
                    <div className={'Page-search-add'}>
                        <Link className='Link' to='/deliveries/add'>
                            <button>Add Delivery</button>
                        </Link>
                    </div>
                </div>
                {this.getTable()}
                <FoodieFooter/>
            </div>
        )
    }
}

export {DeliveriesPage};