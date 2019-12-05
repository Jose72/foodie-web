import React from 'react';
import queryString from "query-string";
import {OrderApi} from "../services";
import {FoodieFooter, Loader, OptPanel} from "../components";
import ReactTable from "react-table";
import "react-table/react-table.css";

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
        let uid = q.user_id;
        let did = q.delivery_id;
        let sid = q.shop_id;
        let pageIndex = q.p;
        let pageSize = q.pSize;
        console.log(q);
        if (pageSize === undefined || pageIndex === undefined || pageIndex < 1) {
            this.props.history.push({
                pathname: '/orders',
            });
        } else {
            OrderApi.getOrders(pageIndex, pageSize, uid, did, sid)
                .then((r) => {
                        console.log(r);
                        this.setState({orderList: r.items});
                        this.setState({totalItems: r.totalItems});
                        this.setState({page: pageIndex});
                        this.setState({pageSize: pageSize});
                        this.setState({pages: (Math.ceil(r.totalItems / pageSize))});
                        this.setState({isLoading: false});
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
        if (this.state.isLoading) return <Loader />;
        const o_columns = [
            {Header: "Order Id", accessor: "order_id"},
            {Header: "Status", accessor: "state"},
            {Header: "Shop Id", accessor: "shop_id"},
            {Header: "User Id", accessor: "user_id"},
            {Header: "Price", accessor: "price"},
            {Header: "Created at", accessor: "created_at"},
            {Header: "Delivery Id", accessor: "delivery_id"}
            ];

        const p_columns = [
            {Header: "Product Id", accessor: "product_id"},
            {Header: "Name", accessor: "name"},
            {Header: "Price", accessor: "price"},
            {Header: "Units", accessor: "units"},
        ];
        return (
            <div className={'Page'}>
                <header className={'Page-header'}>
                    <h5>
                        Order Page
                    </h5>
                </header>
                <div className={'Page-opt-panel'}>
                    <OptPanel/>
                </div>
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
                        SubComponent={(row) => {
                            if(row.original.products.length > 0){
                                return (
                                        <div>
                                            <ReactTable
                                                data={row.original.products}
                                                columns={p_columns}
                                                defaultPageSize={row.original.products.length}
                                                showPagination={false}
                                            />
                                        </div>
                                )
                            }
                        }}
                    />

                </div>
                <FoodieFooter/>
            </div>
        )
    }
}

export {OrdersPage}