import React from 'react';
import { Route, Link, Redirect} from 'react-router-dom';
import queryString from "query-string";
import {OrderApi} from "../services";
import {DisplayTable} from "../components";
import {OrdersTable} from "../components/OrdersTable";
import ReactTable from "react-table";
import "react-table/react-table.css";

const order_fields = ['id', 'shopId', 'userId','deliveryId', 'state'];

const order_headers = ['Id', 'Shop Id', 'User Id','Delivery Id', 'State'];


class OrdersPage extends React.Component{
    constructor(props) {
        super(props);

        let q = queryString.parse(this.props.location.search, {ignoreQueryPrefix: true});

        this.state = {
            orderList: [],
            page: q.p,
            pageSize: q.pSize,
            totalItems: 0,
            query: '',
            pages: -1,
            isLoading: true,
        };

        this.onPageChange = this.onPageChange.bind(this);
        this.onPageSizeChange = this.onPageSizeChange.bind(this);

    }

    componentDidMount() {
        let q = queryString.parse(this.props.location.search, {ignoreQueryPrefix: true});
        let uid = q.userId;
        let did = q.deliveryId;
        let pageIndex = q.p;
        let pageSize = q.pSize;
        console.log(q);
        if (pageSize === undefined || pageIndex === undefined || pageIndex < 1) {
            this.props.history.push({
                pathname: '/orders',
            });
        } else {
            OrderApi.getOrders(pageIndex, pageSize, uid, did)
                .then((r) => {
                        console.log(r);
                        this.setState({orderList: r.items});
                        this.setState({totalItems: r.totalItems});
                        this.setState({page: pageIndex});
                        this.setState({pageSize: pageSize});
                        this.setState({pages: (Math.ceil(r.totalItems / pageSize))});
                        console.log(this.state.pages);
                    }
                )
                .catch((t) => {
                    alert(t);
                });
        }
    }

    //Change on form fields
    change = (e) => {
        e.persist();
        this.setState({[e.target.name]:  e.target.value});
    };

    onPageChange(page){
        page++;
        console.log("Page change to ",page);
        if(page <= this.state.pages && page >= 1) {
            let q = queryString.parse(this.props.location.search, {ignoreQueryPrefix: true});
            q.p = page;
            this.props.history.push({
                pathname: '/orders',
                search: new URLSearchParams(q).toString(),
            });
            window.location.reload();
        }
    }

    onPageSizeChange(pageSize){
        let q = queryString.parse(this.props.location.search, {ignoreQueryPrefix: true});
        q.pSize = pageSize;
        this.props.history.push({
            pathname: '/orders',
            search: new URLSearchParams(q).toString(),
        });
        window.location.reload();
    }

    render(){
        const o_columns = [{Header: "Order Id", accessor: "id"},
            {Header: "User Id", accessor: "userId"},
            {Header: "Delivery Id", accessor: "deliveryId"},
            {Header: "Shop Id", accessor: "shopId"},
            {Header: "Status", accessor: "status"}];
        return (
            <div className={'Page'}>
                <header className={'Page-header'}>
                    <h5>
                        Order Menu
                    </h5>
                </header>
                <div className={'Page-Table'}>
                    <ReactTable
                        manual
                        page={parseInt(this.state.page, 10) - 1}
                        pageSize={this.state.pageSize}
                        data={this.state.orderList}
                        pages={this.state.pages}
                        columns={o_columns}
                        onPageChange={this.onPageChange}
                        onPageSizeChange={this.onPageSizeChange}
                    />

                </div>
            </div>
        )
    }
}

export {OrdersPage}