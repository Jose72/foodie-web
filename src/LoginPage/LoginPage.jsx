import React from 'react';
import { Auth } from '../services/Authentication'
import './LoginPage.css';
import {FoodieFooter} from "../components";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            hidePassword: true};

        this.handleChangeChk = this.handleChangeChk.bind(this)
    }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  onSubmit = (e) => {
      e.persist();
      e.preventDefault();
      if(this.validateForm()) {
          Auth.login(this.state.username, this.state.password)
              .then(() => {
                  window.location.reload()
              })
              .catch((t) => {
                  alert(t)
              })
      } else {
          alert('Empty User or Password')
      }
  };

  change = (e) => {
      e.persist();
      this.setState({[e.target.name]:  e.target.value})
  };

  handleChangeChk(){
      this.setState({hidePassword: !this.state.hidePassword})
  }

  render(){
    return (
      <div className='Login'>
        <form>
            <label className='Login-label'>Username</label>
            <br/>
            <input
                className={'Login-input'}
                name='username'
                value={this.state.username} 
                onChange={e => this.change(e)} 
            />
            <br/>
            <br/>
            <br/>
            <label className={'Login-label'}>Password</label>
            <br/>
            <div className={'password-container'}>
                <input
                    className={'Login-input'}
                    name={'password'}
                    type={this.state.hidePassword ? "password" : "text"}
                    value={this.state.password}
                    onChange={e => this.change(e)}
                />
                <br/>
                <br/>
                <div className={'password-show'}>
                    <input
                        type="checkbox"
                        defaultChecked={!this.state.hidePassword}
                        onChange={this.handleChangeChk}
                        placeholder={'Show'}
                    />
                    <br/>
                    <br/>
                    <label className={'Login-label'}>Show</label>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <button onClick={(e) => this.onSubmit(e)}> Sign In </button>
        </form>
          <FoodieFooter/>
      </div>
    )
    
  }
}

export {LoginPage}