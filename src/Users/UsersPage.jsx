import React from 'react';
import { UserApi } from '../services/UserApi'
import { Link } from "react-router-dom";
import {FoodieFooter} from "../components";
import {ImageDisplay} from "../components"
import queryString from 'query-string';
import ReactTable from "react-table";
import "react-table/react-table.css";
import  '../styles/PageStyles.css'

class UsersPage extends React.Component {
    constructor(props) {
        super(props);

        let q = queryString.parse(this.props.location.search, {ignoreQueryPrefix: true});
        this.state = {
            userList: [],
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
        console.log(q);
        if (pageSize === undefined || pageIndex === undefined || pageIndex < 1) {
            this.props.history.push({
                pathname: '/users',
            });
            this.setState({page: 1});
            this.setState({pageSize: 10});
        } else {
            UserApi.getUsers(pageIndex, pageSize)
                .then((u) => {
                        console.log(u);
                        this.setState({userList: u.items});
                        this.setState({totalItems: u.totalItems});
                        this.setState({page: pageIndex});
                        this.setState({pageSize: pageSize});
                        this.setState({pages: (Math.ceil(u.totalItems / pageSize))});
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
        //fetch query
        this.props.history.push({
            pathname: '/users',
            search: '?' + 'p=' + this.state.page + '&' + 'pSize=' + this.state.pageSize,
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

    //Delete user
    onClickDelete(user){
        if(window.confirm('Delete user?')) {
            console.log(user);
            UserApi.deleteUser(user.id)
                .then(() => {
                    window.location.reload();
                })
                .catch((t) => {
                    alert(t)
                });
            console.log('Delete')
        }
    };

    onPageChange(page){
        page++;
        if(page <= this.state.pages && page >= 1) {
            let q = queryString.parse(this.props.location.search, {ignoreQueryPrefix: true});
            q.p = page;
            this.props.history.push({
                pathname: '/users',
                search: new URLSearchParams(q).toString(),
            });
            window.location.reload();
        }
    }

    onPageSizeChange(pageSize){
        let q = queryString.parse(this.props.location.search, {ignoreQueryPrefix: true});
        q.pSize = pageSize;
        this.props.history.push({
            pathname: '/users',
            search: new URLSearchParams(q).toString(),
        });
        window.location.reload();
    }

    render(){
        const u_columns = [
            {Header: "", Cell: row => {
                return(ImageDisplay.renderPicture(row.original, "picture"))
                }},
            {Header: "User Id", accessor: "id"},
            {Header: "First Name", accessor: "firstName"},
            {Header: "Last Name", accessor: "lastName"},
            {Header: "Phone", accessor: "phone"},
            {Header: "Email", accessor: "subscription"},
            {Header: "Signup Date", accessor: "signUpDate"},
            {Header: "Reputation", accessor: "reputation"},
            {Header: "", Cell: row => {
                return(
                    <button onClick={() => this.onClickDelete(row.original)}> Delete </button>
                    )
                }},
            {Header: "", Cell: row => {
                    return(
                        <Link className='Link' to={`user/modify/${row.original.id}`}>
                            <button>Modify</button>
                        </Link>
                    )
                }},
            {Header: "", Cell: row => {
                    return(
                        <Link className='Link' to={`/orders?p=1&pSize=10&userId=${row.original.id}`}>
                            <button>Orders</button>
                        </Link>
                    )
                }}
        ];
        return (
            <div className={'Page'}>
                <header className={'Page-header'}>
                    <h5>
                        Users Page
                    </h5>
                </header>
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
                    </div>
                    <div className={'Page-add-button-container'}>
                        <Link className='Link' to='/users/add'>
                            <button>Add Delivery</button>
                        </Link>
                    </div>
                </div>
                <div className={'Page-Table'}>
                    <ReactTable
                        manual
                        page={parseInt(this.state.page, 10) - 1}
                        pageSize={this.state.pageSize}
                        data={this.state.userList}
                        pages={this.state.pages}
                        columns={u_columns}
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

export {UsersPage};