import React from 'react';
import './UserPage.css';
import { Table } from 'reactstrap';
import { UserComm } from '../utils/UserComm'
import logo from './logo192.png'


class UserPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: props.match.params.id,
            user: {},
            completeOrdersList: []
        };
    }

    componentDidMount() {
        UserComm.getUser(this.state.userId)
            .then((u) => {
                this.setState({user: u})
            })
            .catch((t) => {

            })
        //TODO: get orders
    }

    renderFields(){
        return (
            <tr className={'Table-header'}>
                <th style={{width: '10%'}}>Id</th>
            </tr>
        )
    }

    renderElement(order) {
        return (
            <tr className={'Table-content'} key={order.id}>
                <td>{order.id}</td>
            </tr>
        )
    }

    getImage() {
        if(this.state.user.pictureURL === null){
            return logo;
        }
        return this.state.user.pictureURL;
    }

    render() {
        return(
            <div className={'UserPage'}>
                <header className='UserPage-header'>
                    <h5>
                        User Page - Id N°{this.state.userId}
                    </h5>
                </header>
                <div className={'UserPage-content'}>
                    <div className={'UserPage-info-container-display'}>
                        <div className={'UserPage-info-display'}>
                            <img
                                src={this.getImage()}
                                alt={'picture'}/>
                        </div>
                        <div className={'UserPage-info-display'}>
                            <label className={'UserPage-label'}>Name</label>
                            <br/>
                            {this.state.user.firstName} {this.state.user.lastName}
                            <br/>
                            <br/>
                            <label className={'UserPage-label'}>Email</label>
                            <br/>
                            {this.state.user.email}
                            <br/>
                            <br/>
                            <label className={'UserPage-label'}>Phone</label>
                            <br/>
                            {this.state.user.phone}
                        </div>
                        <div className={'UserPage-info-display'}>
                            <label className={'UserPage-label'}>Reputation</label>
                            <br/>
                            {this.state.user.reputation}
                            <br/>
                            <br/>
                            <label className={'UserPage-label'}>Subscription</label>
                            <br/>
                            {this.state.user.subscription}
                            <br/>
                            <br/>
                            <label className={'UserPage-label'}>Gratitude Points</label>
                            <br/>
                            {this.state.user.gratitudePoints}
                        </div>
                    </div>
                    <div>
                        <br/>
                        <br/>
                        Orders
                        <Table className={'Table'}>
                            <thead>
                                {this.renderFields()}
                            </thead>
                            <tbody>
                                {this.state.completeOrdersList.map(this.renderElement)}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        )
    }
}

export {UserPage};