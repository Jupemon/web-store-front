import React, { Component } from 'react'; 
import {Button, Form} from 'react-bootstrap';
import './Account.css';

class Account extends Component {
    constructor(props) {
        super();
        this.state = {
            changeAccountDetails : false,
            deleteAccount : false,
            accountDeleted: false
        }
    }


    changeProfile = (data) => {
      fetch(`https://young-bayou-22235.herokuapp.com/changeprofile/${data.id}`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({email: this.refs.changingEmail.value, name: this.refs.changingUsername.value})
      })
      .then(res => res.json())
      .then(data => {
        if (data === "data changed") {
          console.log("data changed succesfully, log in with your new credentials");
          this.props.logOut();
        }
        else if (data==="dublicate username or email exists") {
          console.log("dub exists");
        }
        else {
          console.log("id not found")
        }
      })
    }

    DeleteAccount = () => {
      console.log(this.refs.confirmationPassword.value)
      fetch("https://young-bayou-22235.herokuapp.com/unregister", {
        method : 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({email: this.props.account.email, name: this.props.account.username, password: this.refs.confirmationPassword.value})
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

            </div> : <div><p>{this.props.account.username}</p>
            <hr />
            <p>{this.props.account.email}</p></div>}
            </div>
            <h2 style={{paddingTop:"25px"}}>Change account details</h2>
            <Form>
            <Form.Group controlId="accountBasicPassword">
    <Form.Label>New Username</Form.Label>
    <Form.Control type="text" placeholder={this.props.account.username} ref={"changingUsername"}/>
  </Form.Group>
  <Form.Group controlId="accountBasicEmail">
    <Form.Label>New Email</Form.Label>
    <Form.Control type="email" placeholder={this.props.account.email} ref={"changingEmail"}/>
    <Form.Text className="text-muted">
    aopraerobaer
    </Form.Text>
  </Form.Group>
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