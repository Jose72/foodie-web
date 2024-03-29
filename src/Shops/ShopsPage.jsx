import React from 'react';
import {ShopApi} from "../services";
import { Link } from "react-router-dom";
import {FoodieFooter, Loader, OptPanel} from "../components";
import {ImageDisplay} from "../components"
import queryString from 'query-string';
import ReactTable from "react-table";
import "react-table/react-table.css";
import  '../styles/PageStyles.css'

class ShopsPage extends React.Component {
    constructor(props) {
        super(props);

        let q = queryString.parse(this.props.location.search, {ignoreQueryPrefix: true});
        this.state = {
            shopList: [],
            page: q.p,
            pageSize: q.pSize,
            totalItems: 0,
            query: '',
            pages: -1,
            isLoading: true,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.onPageSizeChange = this.onPageSizeChange.bind(this);

    }

    componentDidMount() {
        let q = queryString.parse(this.props.location.search, {ignoreQueryPrefix: true});
        let pageIndex = q.p;
        let pageSize = q.pSize;
        if (pageSize === undefined || pageIndex === undefined) {
            this.props.history.push({
                pathname: '/shops',
                search: '?p=' + 1 + '&pSize=' + 10,
            });
            window.location.reload();
        } else {
            ShopApi.getShops(pageIndex, pageSize)
                .then((d) => {
                        this.setState({shopList: d.items});
                        this.setState({totalItems: d.totalItems});
                        this.setState({page: pageIndex});
                        this.setState({pageSize: pageSize});
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
            pathname: '/shops',
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

    //Delete Shop
    onClickDelete(shop){
        if(window.confirm('Delete shop?')) {
            ShopApi.deleteShop(shop.id)
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
                pathname: '/shops',
                search: new URLSearchParams(q).toString(),
            });
            window.location.reload();
        }
    }

    onPageSizeChange(pageSize){
        let q = queryString.parse(this.props.location.search, {ignoreQueryPrefix: true});
        q.pSize = pageSize;
        this.props.history.push({
            pathname: '/shops',
            search: new URLSearchParams(q).toString(),
        });
        window.location.reload();
    }

    render(){
        if (this.state.isLoading) return <Loader />;
        const s_columns = [
            {Header: "", Cell: row => {
                    return(ImageDisplay.renderPicture(row.original, "photoUrl"))
                }},
            {Header: "Shop Id", accessor: "id"},
            {Header: "Name", accessor: "name"},
            {Header: "Address", accessor: "address"},
            {Header: "Long/Lat", Cell: row => {
                    return(
                        row.original.longitude + ',' +
                        row.original.latitude
                    )}
            },
            {Header: "Description", accessor: "description"},
            {Header: "Rating", accessor: "rating"},
            {Header: "", Cell: row => {
                    return(
                        <button onClick={() => this.onClickDelete(row.original)}> Delete </button>
                    )
                }},
            {Header: "", Cell: row => {
                    return(
                        <Link className='Link' to={`/shop/modify/${row.original.id}`}>
                            <button>Modify</button>
                        </Link>
                    )
                }},
            {Header: "", Cell: row => {
                    return(
                        <Link className='Link' to={`/orders?p=1&pSize=10&shop_id=${row.original.id}`}>
                            <button>Orders</button>
                        </Link>
                    )
                }},
            {Header: "", Cell: row => {
                    return(
                        <Link className='Link' to={`/shop/${row.original.id}/menu?p=1&pSize=10`}>
                            <button>Menu</button>
                        </Link>
                    )
                }}
        ];
        return (
            <div className={'Page'}>
                <header className='Page-header'>
                    <h5>
                        Shop Menu
                    </h5>
                </header>
                <div className={'Page-opt-panel'}>
                    <OptPanel/>
                </div>
                <div className={'Page-search-add'}>
                    <Link className='Link' to='/shops/add'>
                        <button>Add Shop</button>
                    </Link>
                </div>
                <div className={'Page-Table'}>
                    <ReactTable
                        manual
                        page={parseInt(this.state.page, 10) - 1}
                        pageSize={this.state.pageSize}
                        data={this.state.shopList}
                        pages={this.state.pages}
                        columns={s_columns}
                        onPageChange={this.onPageChange}
                        onPageSizeChange={this.onPageSizeChange}
                        showPagination={true}
                    />
                </div>
                <FoodieFooter/>
            </div>
        )
    }
}

export {ShopsPage};