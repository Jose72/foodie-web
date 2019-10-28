import React from 'react';
import './UsersPage.css';
import { Table } from 'reactstrap';
import { UserComm } from '../utils/UserComm'
import { Link } from "react-router-dom";
import Modal from "reactstrap/es/Modal";
import { UsersSort } from "./UserSort";

const userModifyEmpty = {
    id: -1,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subscription: 'flat',
    reputation: 0,
    gratitudePoints: 0
};

class UsersPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userList: [],
            currentPageIndex: 1,
            query: '',
            lastQuery: this.query,
            showModifyUserModal: false,
            userModify: {
                id: -1,
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                subscription: '',
                reputation: 0,
                gratitudePoints: 0
            }
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.renderTableElement = this.renderTableElement.bind(this);
        this.renderTable = this.renderTable.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
        this.onClickModify = this.onClickModify.bind(this);
        this.submitModifyUserModal = this.submitModifyUserModal.bind(this);
        this.onClickPrevious = this.onClickPrevious.bind(this);
        this.onClickNext = this.onClickNext.bind(this);

    }

    //Search button
    onSubmit = (e) => {
        e.persist();
        e.preventDefault();
        //fetch query
        UserComm.getUsers(this.state.currentPageIndex)
            .then((u) => {
                console.log(u);
                this.setState({userList: u});
                }
            )
            .catch((t) => {alert(t)});
    };

    changeUserModify = (e) => {
        e.persist();
        const { userModify } = { ...this.state };
        const currentState = userModify;
        const { name, value } = e.target;
        currentState[name] = value;
        this.setState({ userModify: currentState });
    };

    //Change on form fields
    change = (e) => {
        e.persist();
        this.setState({[e.target.name]:  e.target.value});
    };

    //Next page of table
    onClickNext = (e) => {
        e.persist();
        e.preventDefault();
        UserComm.getUsers(this.state.currentPageIndex+1)
            .then((u) => {
                    console.log(u);
                    this.setState({currentPageIndex: this.state.currentPageIndex+1});
                    this.setState({userList: u});
                }
            )
            .catch((t) => {});
    };

    //Previous page of table
    onClickPrevious = (e) => {
        e.persist();
        e.preventDefault();
        if (this.state.currentPageIndex > 1) {
            UserComm.getUsers(this.state.currentPageIndex - 1)
                .then((u) => {
                        console.log(u);
                        this.setState({currentPageIndex: this.state.currentPageIndex - 1});
                        this.setState({userList: u});
                    }
                )
                .catch((t) => {alert(t)});
        }
    };


    //Delete user
    onClickDelete(user, e){
        e.persist();
        e.preventDefault();
        UserComm.deleteUser(user.id)
            .then(() => {
                UserComm.getUsers(this.state.currentPageIndex)
                    .then((u) => {
                            console.log(u);
                            this.setState({userList: u})
                        }
                    )
                    .catch((t) => {alert(t)});
            })
            .catch((t) => {alert(t)});
        console.log('Delete')
    };

    //Modify user
    onClickModify(user, e){
        e.persist();
        e.preventDefault();
        this.setState({showModifyUserModal: true, userModify: user});
        console.log('Modify')

    };

    submitModifyUserModal(){
        UserComm.modifyUser(this.state.userModify)
            .then((t) => {
                alert(t);
                this.setState({showModifyUserModal: false, userModify: userModifyEmpty})
            })
            .catch((t) => {alert(t)});

    };


    cancelModifyUserModal(){
        this.setState({showModifyUserModal: false});
        this.setState({userModify: userModifyEmpty})
    }

    //Table display
    renderTableFields(){
        return (
            <tr className={'Table-header'}>
                <th style={{width: '10%'}}>Id</th>
                <th style={{width: '10%'}}>First Name</th>
                <th style={{width: '10%'}}>Last Name</th>
                <th style={{width: '10%'}}>Phone</th>
                <th style={{width: '10%'}}>Email</th>
                <th style={{width: '10%'}}>Subscription</th>
                <th style={{width: '10%'}}>Reputation</th>
                <th style={{width: '10%'}}>Gratitude Points</th>
            </tr>
        )
    }

    renderTableElement(user) {
        return (
            <tr className={'Table-content'} key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.subscription}</td>
                <td>{user.reputation}</td>
                <td>{user.gratitudePoints}</td>
                <td>
                    <button onClick={(e) => this.onClickDelete(user, e)}> Delete </button>
                </td>
                <td>
                    <button onClick={(e) => this.onClickModify(user, e)}> Modify </button>
                </td>
                <td>
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
                <div>
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
            <div className={'UserPage'}>
                <header className='UserPage-header'>
                    <h5>
                        User Menu
                    </h5>
                </header>
                <div className={'UserPage-content'}>
                    <Modal isOpen={this.state.showModifyUserModal}>
                        <h1>User Modification</h1>
                        <div className='ModifyUser-content'>
                            <form>
                                <label className='ModifyUser-label'>First Name</label>
                                <br/>
                                <input
                                    size='150%'
                                    name='firstName'
                                    //placeholder='Username'
                                    value={this.state.userModify.firstName}
                                    onChange={e => this.changeUserModify(e)}
                                />
                                <br/>
                                <br/>
                                <label className={'ModifyUser-label'}>Last Name</label>
                                <br/>
                                <input
                                    name='lastName'
                                    //placeholder='Password'
                                    value={this.state.userModify.lastName}
                                    onChange={e => this.changeUserModify(e)}
                                />
                                <br/>
                                <br/>
                                <label className={'ModifyUser-label'}>Email</label>
                                <br/>
                                <input
                                    name='email'
                                    //placeholder='Password'
                                    value={this.state.userModify.email}
                                    onChange={e => this.changeUserModify(e)}
                                />
                                <br/>
                                <br/>
                                <label className={'ModifyUser-label'}>Phone</label>
                                <br/>
                                <input
                                    name='phone'
                                    //placeholder='Password'
                                    value={this.state.userModify.phone}
                                    onChange={e => this.changeUserModify(e)}
                                />
                                <br/>
                                <br/>
                                <label className={'ModifyUser-label'}>Subscription</label>
                                <br/>
                                <select name='subscription' value={this.state.userModify.subscription} onChange={e => this.changeUserModify(e)}>
                                    <option value='flat'>flat</option>
                                    <option value='premium'>premium</option>
                                </select>
                                <br/>
                                <br/>
                                <label className={'ModifyUser-label'}>Reputation</label>
                                <br/>
                                <input
                                    name='reputation'
                                    //placeholder='Password'
                                    value={this.state.userModify.reputation}
                                    onChange={e => this.changeUserModify(e)}
                                />
                                <br/>
                                <br/>
                                <label className={'ModifyUser-label'}>Gratitude Points</label>
                                <br/>
                                <input
                                    name='gratitudePoints'
                                    //placeholder='Password'
                                    value={this.state.userModify.gratitudePoints}
                                    onChange={e => this.changeUserModify(e)}
                                />
                                <br/>
                                <br/>
                            </form>
                        </div>
                        <p><button onClick={() => this.submitModifyUserModal()}>Submit</button></p>
                        <p><button onClick={() => this.cancelModifyUserModal()}>Cancel</button></p>
                    </Modal>
                    <div className={'search-add'}>
                        <div className={'Search-User-Bar'}>
                            <input className={'search-input-bar'}
                                size='150%'
                                name='query'
                                placeholder=''
                                value={this.state.query}
                                onChange={e => this.change(e)}
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


    onClickCloseAddUserModal(){
        this.setState({showUserModal: false})
    }
}

export {UsersPage};