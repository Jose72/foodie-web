import React from 'react';
import './UsersPage.css';
import { Table } from 'reactstrap';
import { UserComm } from '../utils/UserComm'
import {Link} from "react-router-dom";


class UsersPage extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            userList: [],
            maxUsersPerPage: 50,
            currentPageIndex: 1,
            query: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                subscription: '',
            },
            lastQuery: this.query,
            showAddUserModal: false
        };

        this.onSubmit =  this.onSubmit.bind(this);
        this.renderElement = this.renderElement.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
        this.onClickModify = this.onClickModify.bind(this);
        this.onClickCloseAddUserModal = this.onClickCloseAddUserModal.bind(this);
    }

    //Search button
    onSubmit = (e) => {
        e.persist();
        e.preventDefault();
        //fetch query
        UserComm.getUsers(this.state.maxUsersPerPage, this.state.currentPageIndex)
            .then((u) => {
                console.log(u);
                this.setState({userList: u});
                }
            )
            .catch((t) => {alert(t)});
    };

    //Change on form fields
    change = (e) => {
        e.persist();
        this.setState({[e.target.name]:  e.target.value})
    };

    //Next page of table
    onClickNext = (e) => {
        e.persist();
        e.preventDefault();

    };

    //Previous page of table
    onClickPrevious = (e) => {
        e.persist();
        e.preventDefault();


    };


    //Delete user
    onClickDelete(user, e){
        e.persist();
        e.preventDefault();
        UserComm.deleteUser(user.id)
            .then(() => {
                UserComm.getUsers(this.state.maxUsersPerPage, this.state.currentPageIndex)
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
        console.log('Modify')

    };

    renderFields(){
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
                <th style={{width: '2%'}}></th>
                <th style={{width: '2%'}}></th>
            </tr>
        )
    }


    renderElement(user) {
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
                    <button onClick={(e) => this.onClickDelete(user, e)}> Modify </button>
                </td>
            </tr>
        )
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
                    <Link className='Link' to='/users/add'>Add User</Link>
                    <form>
                        <div className='User-search'>
                            <form>
                            <input
                                size='150%'
                                name='firstName'
                                placeholder='First Name'
                                value={this.state.firstName}
                                onChange={e => this.change(e)}
                            />
                            <input
                                size='150%'
                                name='lastName'
                                placeholder='Last Name'
                                value={this.state.lastName}
                                onChange={e => this.change(e)}
                            />
                            <input
                                size='150%'
                                name='phone'
                                placeholder='Phone Number'
                                value={this.state.phone}
                                onChange={e => this.change(e)}
                            />
                            <input
                                size='150%'
                                name='email'
                                placeholder='Email'
                                value={this.state.email}
                                onChange={e => this.change(e)}
                            />
                            </form>
                            <br/>
                            <button onClick={(e) => this.onSubmit(e)}> Search </button>
                            <br/>
                            <br/>
                            <br/>
                        </div>
                    </form>
                    <Table className={'Table'}>
                        <thead>
                            {this.renderFields()}
                        </thead>
                        <tbody>
                            {this.state.userList.map(this.renderElement)}
                        </tbody>
                    </Table>

                </div>
            </div>
        )
    }


    onClickCloseAddUserModal(){
        this.setState({showUserModal: false})
    }
}

export {UsersPage};