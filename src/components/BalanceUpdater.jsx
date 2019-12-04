import React from 'react';
import  '../styles/PageStyles.css'

class BalanceUpdater extends  React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.user.id,
            balance: 0,
        };

        this.balanceChange = this.balanceChange.bind(this);

    }

    change = (e) => {
        e.persist();
        this.setState({[e.target.name]:  e.target.value})
    };

    balanceChange(){
        if(parseFloat(this.props.user.balance) + parseFloat(this.state.balance) >= 0){
            console.log(parseFloat(this.props.user.balance) + parseFloat(this.state.balance));
            this.props.balanceChange(this.props.user, parseFloat(this.props.user.balance) + parseFloat(this.state.balance));
        }
    }

    render(){
        return(
            <div>
                <input style={{alignContent:'center'}}
                       name='balance'
                       value={this.state.balance}
                       onChange={e => this.change(e)}
                />
                <button onClick={this.balanceChange}> Add </button>
            </div>
        )
    }
}

export {BalanceUpdater}