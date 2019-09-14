import React from 'react';
import './LoginPage.css';

class LoginPage extends React.Component {
  state = {
    username: '',
    password: ''
  };

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  onSubmit = (e) => {
      e.persist()
      e.preventDefault()
      if (this.validateForm()){

      }
      console.log(this.state)
  }

  change = (e) => {
      e.persist();
      this.setState({[e.target.name]:  e.target.value})
  }

  render(){
    return (
      <div className='Login'>
        <form>
            <input
                size='150%'
                name='username' 
                placeholder='Username' 
                value={this.state.username} 
                onChange={e => this.change(e)} 
            />
            <br/>
            <br/>
            <br/>
            <input 
                name='password' 
                placeholder='Password' 
                value={this.state.pasword} 
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