import React from 'react';
import {UserApi} from '../services/UserApi'
import {Link} from "react-router-dom";
import {FoodieFooter, ImageDisplay, Loader, OptPanel} from "../components";
import queryString from 'query-string';
import ReactTable from "react-table";
import "react-table/react-table.css";
import '../styles/PageStyles.css'


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
            subscriptionMode: (q.subsMode === undefined) ? false : q.subsMode,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.onPageSizeChange = this.onPageSizeChange.bind(this);
        this.getTable = this.getTable.bind(this);
        this.onClickCancelSubscription  = this.onClickCancelSubscription.bind(this);
        this.onClickUpgradeSubscription  = this.onClickUpgradeSubscription.bind(this);
        this.setSubscriptionMode = this.setSubscriptionMode.bind(this);
    }

    componentDidMount() {
        let q = queryString.parse(this.props.location.search, {ignoreQueryPrefix: true});
        let pageIndex = q.p;
        let pageSize = q.pSize;
        if (pageSize === undefined || pageIndex === undefined || pageIndex < 1) {
            this.props.history.push({
                pathname: '/users',
                search: '?p=' + 1 + '&pSize=' + 10,
            });
            window.location.reload();
        } else {
            UserApi.getUsers(pageIndex, pageSize)
                .then((u) => {
                        this.setState({userList: u.items});
                        this.setState({totalItems: u.totalItems});
                        this.setState({page: pageIndex});
                        this.setState({pageSize: pageSize});
                        this.setState({pages: (Math.ceil(u.totalItems / pageSize))});
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
        //fetch query
        this.props.history.push({
            pathname: '/users',
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

    //Delete user
    onClickDelete(user){
        if(window.confirm('Delete user?')) {
            UserApi.deleteUser(user.user_id)
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

    setSubscriptionMode() {
        let q = queryString.parse(this.props.location.search, {ignoreQueryPrefix: true});
        if (q.subsMode === undefined) {
            this.props.history.push({
                pathname: '/users',
                search: '?p=' + this.state.page + '&pSize=' + this.state.pageSize + '&subsMode=true',
            });
            this.setState({subscriptionMode: true});
        } else {
            this.props.history.push({
                pathname: '/users',
                search: '?p=' + this.state.page + '&pSize=' + this.state.pageSize,
            });
            this.setState({subscriptionMode: false});
        }
    }
    
    onClickCancelSubscription(user){
        if(window.confirm('Cancel subscription?')) {
            UserApi.cancelSubscription(user.user_id)
                .then(() => {
                    window.location.reload();
                })
                .catch((t) => {
                    alert(t)
                });
        }
    }

    onClickUpgradeSubscription(user){
        if(window.confirm('Upgrade subscription?')) {
            UserApi.upgradeSubscription(user.user_id)
                .then(() => {
                    window.location.reload();
                })
                .catch((t) => {
                    alert(t)
                });
        }
    }

    getSubscriptionButton(user){
        if(user.suscripcion === 'premium'){
            return(
                <button onClick={() => this.onClickCancelSubscription(user)}>
                    Cancel </button>
            );
        }
        return(
            <button onClick={() => this.onClickUpgradeSubscription(user)}>
                Upgrade </button>
        );
    }

    getTable(){
        const u_s_columns = [
            {Header: "User Id", accessor: "user_id"},
            {Header: "Name", accessor: "name"},
            {Header: "Signup Date", accessor: "created_at"},
            {Header: "Subscription", accessor: "suscripcion"},
            {Header: "", Cell: row => {
                    return(
                        this.getSubscriptionButton(row.original)
                    )
                }}
        ];
        let cols = [
            {
                Header: "", Cell: row => {
                    return (ImageDisplay.renderPicture(row.original, "picture"))
                }
            },
            {Header: "User Id", accessor: "user_id"},
            {Header: "Name", accessor: "name"},
            {Header: "Phone", accessor: "phone_number"},
            {Header: "Email", accessor: "email"},
            {Header: "Long/Lat", Cell: row => {
                    return(
                        row.original.longitude + ',' +
                        row.original.latitude
                    )}
            },
            {Header: "Signup Date", accessor: "created_at"},
            {Header: "Subscription", accessor: "suscripcion"},
            {Header: "Favour Points", accessor: "favourPoints"},
            {Header: "Rating", accessor: "rating"},
            {
                Header: "", Cell: row => {
                    return (
                        <button onClick={() => this.onClickDelete(row.original)}> Delete </button>
                    )
                }
            },
            {
                Header: "", Cell: row => {
                    return (
                        <Link className='Link' to={`user/modify/${row.original.user_id}`}>
                            <button>Modify</button>
                        </Link>
                    )
                }
            },
            {
                Header: "", Cell: row => {
                    return (
                        <Link className='Link' to={`/orders?p=1&pSize=10&user_id=${row.original.user_id}`}>
                            <button>Orders</button>
                        </Link>
                    )
                }
            }
        ];
        if(this.state.subscriptionMode){
           cols = u_s_columns;
        }

        return(
            <div className={'Page-Table'}>
                <ReactTable
                    manual
                    page={parseInt(this.state.page, 10) - 1}
                    pageSize={this.state.pageSize}
                    data={this.state.userList}
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
                <header className={'Page-header'}>
                    <h5>
                        Users Page

                    </h5>
                </header>
                <div className={'Page-opt-panel'}>
                    <OptPanel/>
                </div>
                <div className={'Page-search-add'}>
                    <div className={'Page-search-add'}>
                        <div>
                            <input
                                className='Page-input'
                                type="checkbox"
                                defaultChecked={this.state.subscriptionMode}
                                onChange={this.setSubscriptionMode}
                                placeholder={'Subscription Mode'}
                            />
                            <label className={'Page-label'}>Subscription Mode</label>
                        </div>
                        <div>
                            <Link className='Link' to='/users/add'>
                                <button>Add User</button>
                            </Link>
                        </div>
                    </div>
                </div>

                {this.getTable()}
                <FoodieFooter/>
            </div>
        )
    }

}

export {UsersPage};