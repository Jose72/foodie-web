import React from 'react';
import {DisplayTable} from "../components";
import { UserApi } from '../services/UserApi'
import { Link } from "react-router-dom";
import queryString from 'query-string';
import  '../styles/PageStyles.css'

const user_fields = ['picture', 'id', 'firstName','lastName', 'phone', 'email', 'subscription', 'reputation',
    'gratitudePoints'];

const user_headers = ['Picture', 'Id', 'First Name','Last Name', 'Phone', 'Email', 'Subscription', 'Reputation',
    'Gratitude Points'];

class UsersPage extends React.Component {
    constructor(props) {
        super(props);

        let q = queryString.parse(this.props.location.search, {ignoreQueryPrefix: true});
        this.state = {
            userList: [],
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
                pathname: '/users',
            });
            this.setState({currentPageIndex: 1});
            this.setState({pageSize: 10});
        } else {
            UserApi.getUsers(pageIndex, pageSize)
                .then((u) => {
                        console.log(u);
                        this.setState({userList: u.items});
                        this.setState({totalItems: u.totalItems});
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
        //fetch query
        this.props.history.push({
            pathname: '/users',
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
                pathname: '/users',
                search: '?' + 'p=' + (parseInt(this.state.currentPageIndex, 10) + 1).toString() + '&' + 'pSize=' + this.state.pageSize,
            });
            window.location.reload();
        }
    };

    //Previous page of table
    onClickPrevious = (e) => {
        e.persist();
        e.preventDefault();
        if(parseInt(this.state.currentPageIndex, 10) <= 1){
        } else {
            console.log(this.state.currentPageIndex, this.state.pageSize);
            this.props.history.push({
                pathname: '/users',
                search: '?' + 'p=' + (parseInt(this.state.currentPageIndex, 10) - 1).toString() + '&' + 'pSize=' + this.state.pageSize,
            });
            window.location.reload();
        }
    };

    //Change on form fields
    change = (e) => {
        e.persist();
        this.setState({[e.target.name]:  e.target.value});
    };

    //Delete user
    onClickDelete(user, e){
        e.persist();
        e.preventDefault();
        if(window.confirm('Delete user?')) {
            UserApi.deleteUser(user.id)
                .then(() => {
                    UserApi.getUsers(this.state.currentPageIndex)
                        .then((u) => {
                                console.log(u);
                                this.setState({userList: u});
                                window.location.reload();
                            }
                        )
                        .catch((t) => {
                            alert(t)
                        });
                })
                .catch((t) => {
                    alert(t)
                });
            console.log('Delete')
        }
    };

    renderTable(){
        if(this.state.userList.length > 0) {
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
                        headers={user_headers}
                        fields={user_fields}
                        itemList={this.state.userList}
                        route={'user'}
                        onClickDelete={this.onClickDelete}
                        buttons={[{text:'Orders', key: 'orders', route:'/orders?p=1&pSize=10&userId='}]}
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
                        User Menu
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
                        <div className={'Add-User-Button'}>
                            <Link className='Link' to='/users/add'>
                                <button>Add User</button>
                            </Link>
                        </div>
                    </div>

                    {this.renderTable()}

                </div>
            </div>
        )
    }

}

export {UsersPage};