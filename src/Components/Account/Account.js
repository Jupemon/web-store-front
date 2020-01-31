import React, { Component } from 'react'; 
import {Button, Form} from 'react-bootstrap';
import './Account.css';

class Account extends Component {
    constructor(props) {
        super();
        this.state = {
            changeAccountDetails : true,
            deleteAccount : false,
            accountDeleted: false,
            changeUsername : true,
            changeEmail : true,
            changePassword : true,

            name : "",
            email : "",
            password : ""
        }
    }


    changeProfile = (data) => {
      const body = {};
      if (!this.state.changeUsername && this.state.name.length > 0) {
        body.name = this.state.name
      }
      if (!this.state.changeEmail && this.state.email.length > 0) {
        body.email = this.state.email
      }
      if (!this.state.changePassword && this.state.password.length > 0) {
        body.password = this.state.password
      }
      console.log(data.id, "USER ID")
      console.log(body, "BODY TO BE SENT")
        //http://localhost:3000/changeprofile/
      fetch(`https://young-bayou-22235.herokuapp.com/${data.id}`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(body)
      })
      .then(res => {
        if (res.status===200) {
          res.json()
          .then(data => {
            console.log(data)
            this.setState({datachanged : true})
          })
        }
        else if (res.status === 403) {
          alert("email already exists")
        }
        else if (res.status === 400)
        alert("something went wrong")
      })
    }

    DeleteAccount = () => {
      console.log(this.refs.confirmationPassword.value)
      fetch("https://young-bayou-22235.herokuapp.com/unregister", {
        method : 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({email: this.props.account.email, name: this.props.account.name, password: this.refs.confirmationPassword.value})
      })
      .then(res => res.json())
      .then(data => {
        console.log(data, "response here")
        if (data === "failed to delete user from database") {
          console.log("account doesnt exist")
        }
        else if (data === 'Hash doesnt match') {
          alert("incorrect password");
        }
        else if (data === 'User deleted from database') {
          alert('user deleted');
          this.props.logOut();
          
        }
      })
    }

    render() {
        return (    <div className={"cart-modal"}>
        {console.log(this.props.account.name)}
        <div className="cart-back">
            <div className="cart-title">
                <i className="fas fa-user fa-3x"></i>
                <h1 className="cart-title">Your Account</h1>
                <Button variant="danger" onClick={()=> this.props.toggleModal("")}>X</Button>
            </div>
            <div className="cart-items">
            <div style={{margin:"10px"}}>
                {this.state.deleteAccount ? <div className="delete-account-box"><input ref={"confirmationPassword"}/><p className="confirm-text">type password and <a onClick={()=> this.DeleteAccount()}>Confirm</a></p></div>: <Button onClick={() => {this.setState({deleteAccount:true})}}>Deactivate account</Button>}
                <Button variant="danger" onClick={()=> {this.props.logOut()}} style={{float:"right"}}>Log out</Button>
            </div>
            
            <div className="account-info">
            {this.state.changeAccountDetails ? <div>

            </div> : <div><p>{this.props.account.name}</p>
            <hr />
            <p>{this.props.account.email}</p></div>}
            </div>
            <h2 style={{paddingTop:"25px"}}>Change account details</h2>
            <Form>
            {this.state.changeEmail ? <div className="change-info-button"><Button onClick={() =>{this.setState({changeEmail : !this.state.changeEmail})}}>Change Email</Button></div> : 
            <div>
    <Form.Label>New Email</Form.Label>
    <Form.Control type="text" placeholder={this.props.account.name} onChange={(e) => {this.setState({email : e.currentTarget.value})}}/>
    </div>    
            }
            {this.state.changeUsername ? <div className="change-info-button"><Button onClick={() => {this.setState({changeUsername : !this.state.changeUsername})}}>Change Username</Button></div> : 
            <div>
    <Form.Label>New Username</Form.Label>
    <Form.Control type="text" placeholder={this.props.account.name} onChange={(e) => {this.setState({name : e.currentTarget.value})}}/>
    </div>}
    {/*this.state.changePassword ? <div className="change-info-button"><Button onClick={() => {this.setState({changePassword : !this.state.changePassword})}}>Change Password</Button></div> : 
            <div>
    <Form.Label>New Password</Form.Label>
    <Form.Control type="text" placeholder={this.props.account.name} onChange={(e) => {this.setState({password : e.currentTarget.value})}}/>
    </div>    
            */}
  <Button variant="danger" onClick={() => {this.changeProfile(this.props.account)}}>
    Save Changes
  </Button>
</Form>
            </div>
                    
        </div>
    </div> );
    }
   
}
 
export default Account;