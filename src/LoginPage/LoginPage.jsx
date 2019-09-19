import React from 'react';
import { Auth } from '../utils/Authentication'
import { Redirect, Router} from 'react-router-dom';

import './LoginPage.css';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '' };
    }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  onSubmit = (e) => {
      e.persist();
      e.preventDefault();

      Auth.login(this.state.username, this.state.password)
          .then(t => {window.location.reload()
          })
  };

  change = (e) => {
      e.persist();
      this.setState({[e.target.name]:  e.target.value})
  };

  render(){
    return (
      <div className='Login'>
        <form>
            <label className='Login-label'>Username</label>
            <br/>
            <input
                size='150%'
                name='username' 
                //placeholder='Username'
                value={this.state.username} 
                onChange={e => this.change(e)} 
            />
            <br/>
            <br/>
            <br/>
            <label className='Login-label'>Password</label>
            <br/>
            <input 
                name='password' 
                //placeholder='Password'
                value={this.state.password}
                onChange={e => this.change(e)} 
            />
            <br/>
            <br/>
            <br/>
            <button onClick={(e) => this.onSubmit(e)}> Sign In </button>
        </form>
      </div>
    )
    
  }
}

export {LoginPage}