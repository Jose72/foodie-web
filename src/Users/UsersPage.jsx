import React from 'react';
import './UsersPage.css';
import { Table } from 'reactstrap';
import { UserApi } from '../services/UserApi'
import { Link } from "react-router-dom";
import queryString from 'query-string';


class UsersPage extends React.Component {
    constructor(props) {
        super(props);

        let q = queryString.parse(this.props.location.search, {ignoreQueryPrefix: true});
        this.state = {
            userList: [],
            currentPageIndex: q.p,
            pageSize: q.pSize,
            query: '',
            lastQuery: this.query,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.renderTableElement = this.renderTableElement.bind(this);
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
        if (pageSize === undefined || pageIndex === undefined) {
            this.props.history.push({
                pathname: '/users',
            });
            this.setState({currentPageIndex: 1});
            this.setState({pageSize: 10});
        } else {
            UserApi.getUsers(pageIndex, pageSize)
                .then((u) => {
                        console.log(u);
                        this.setState({userList: u});
                        this.setState({currentPageIndex: pageIndex});
                        this.setState({pageSize: pageSize});
                    }
                )
                .catch((t) => {
                    alert(t);
                });
        }
    }

    componentWillReceiveProps(nextProps) {
        let q = queryString.parse(nextProps.location.search, {ignoreQueryPrefix: true});
        let pageIndex = q.p;
        let pageSize = q.pSize;
        if(this.state.currentPageIndex !== pageIndex || this.state.pageSize !== pageSize) {
            UserApi.getUsers(pageIndex, pageSize)
                .then((u) => {
                        console.log(pageIndex, pageSize);
                        console.log(u);
                        this.setState({userList: u});
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
        console.log(this.state.currentPageIndex, this.state.pageSize);
        this.props.history.push({
            pathname: '/users',
            search: '?' + 'p=' + (parseInt(this.state.currentPageIndex, 10) + 1).toString() + '&' + 'pSize=' + this.state.pageSize,
        });
        window.location.reload();
    };

    //Previous page of table
    onClickPrevious = (e) => {
        e.persist();
        e.preventDefault();
        if(parseInt(parseInt(this.state.currentPageIndex, 10) === 1)){
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
        UserApi.deleteUser(user.id)
            .then(() => {
                UserApi.getUsers(this.state.currentPageIndex)
                    .then((u) => {
                            console.log(u);
                            this.setState({userList: u});
                            window.location.reload();
                        }
                    )
                    .catch((t) => {alert(t)});
            })
            .catch((t) => {alert(t)});
        console.log('Delete')
    };

    //Table display
    renderTableFields(){
        return (
            <tr className={'Table-header'}>
                <th className={'Table-field'} style={{width: '10%'}}>Id</th>
                <th className={'Table-field'} style={{width: '10%'}}>First Name</th>
                <th className={'Table-field'} style={{width: '10%'}}>Last Name</th>
                <th className={'Table-field'} style={{width: '10%'}}>Phone</th>
                <th className={'Table-field'} style={{width: '10%'}}>Email</th>
                <th className={'Table-field'} style={{width: '10%'}}>Subscription</th>
                <th className={'Table-field'} style={{width: '10%'}}>Reputation</th>
                <th className={'Table-field'} style={{width: '10%'}}>Gratitude Points</th>
            </tr>
        )
    }

    renderTableElement(user) {
        return (
            <tr className={'Table-content'} key={user.id}>
                <td className={'Table-row'}>{user.id}</td>
                <td className={'Table-row'}>{user.firstName}</td>
                <td className={'Table-row'}>{user.lastName}</td>
                <td className={'Table-row'}>{user.phone}</td>
                <td className={'Table-row'}>{user.email}</td>
                <td className={'Table-row'}>{user.subscription}</td>
                <td className={'Table-row'}>{user.reputation}</td>
                <td className={'Table-row'}>{user.gratitudePoints}</td>
                <td className={'Table-row'}>
                    <button onClick={(e) => this.onClickDelete(user, e)}> Delete </button>
                </td>
                <td className={'Table-row'}>
                    <Link className='Link' to={`/user/modify/${user.id}`}>
                        <button>Modify User</button>
                    </Link>
                </td>
                <td className={'Table-row'}>
                    <Link className='Link' to={`/user/${user.id}`}>
                        <button>View</button>
                    </Link>
                </td>
            </tr>
        )
    }

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
                        <div className={'Table-button-page-move-top'}>
                            <button onClick={(e) => this.onClickPrevious(e)}> Prev </button>
                            <button onClick={(e) => this.onClickNext(e)}> Next </button>
                        </div>
                    </div>
                    <Table className={'Table'}>
                        <thead>
                        {this.renderTableFields()}
                        </thead>
                        <tbody>
                        {this.state.userList.map(this.renderTableElement)}
                        </tbody>
                    </Table>
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
            <div className={'UsersPage'}>
                <header className='UsersPage-header'>
                    <h5>
                        User Menu
                    </h5>
                </header>
                <div className={'UsersPage-content'}>
                    <div className={'search-add'}>
                        <div className={'Search-User-Bar'}>
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