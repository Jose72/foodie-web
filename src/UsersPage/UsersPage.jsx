import React from 'react';
import './UsersPage.css';
import { Table } from 'reactstrap';


class UsersPage extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            userList: [],
            query: {
                firstName: '',
                lastName: '',
                email: '',
                phone: ''
            }
        };


    }

    //Search button
    onSubmit = (e) => {
        e.persist();
        e.preventDefault();
        console.log(this.state);
        this.setState({userList: [{id: 1, firstName: 'Jonh', lastName: 'Cart', email: 'JCARt@gamil.com', phone: 44443334},
            {id: 2, firstName: 'Mira', lastName: 'Smith', email: 'MirSmi@gamil.com', phone: 45654222},
            {id: 3, firstName: 'Kal', lastName: 'Santht', email: 'KSant@gamil.com', phone: 67634354}]})

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
    onClickDelete = (e) => {
        e.persist();
        e.preventDefault();


    };

    //Modify user
    onClickModify = (e) => {
        e.persist();
        e.preventDefault();


    };

    renderFields(){
        return (
            <tr className={'Table-header'}>
                <th style={{width: '10%'}}> Id</th>
                <th style={{width: '10%'}}>First Name</th>
                <th style={{width: '10%'}}>Last Name</th>
                <th style={{width: '10%'}}>Phone</th>
                <th style={{width: '10%'}}>Email</th>
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
                <td><button onClick={(e) => this.onClickDelete(e)}> Delete </button></td>
                <td><button onClick={(e) => this.onClickModify(e)}> Modify </button></td>
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
                    <form>
                        <div className='User-search'>
                            <form>
                            <input
                                size='150%'
                                name='firstName'
                                placeholder='First Name'
                                value={this.state.firstName}
                                onChange={this.change}
                                //onChange={e => this.change(e)}
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
}

export {UsersPage};