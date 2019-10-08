import React, { Component } from 'react';
import {Button, Form} from 'react-bootstrap';
import Loading from '../Loading/Loading';

 
class Register extends Component {
  constructor() {
    super()
    this.state = {
      registered: false,
      username: "",
      email: "",
      loading : true
    }
  }

    render() {
        return (    <div className={"cart-modal"}>
        <div className="cart-back">
            <div className="cart-title">
                <i className="fas fa-user fa-3x"></i>
                <h1 className="cart-title">Create an Account</h1>
                <Button variant="danger" onClick={()=> this.props.toggleModal("")}>X</Button>
            </div>
            <div className="cart-items">
            {this.state.loading ? 
            <div></div>
            :
            <div></div>
            }
            {!this.state.registered ? <div><Form>
      <Form.Group controlId="formBasicEmail">
      <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" onChange={(e) => {this.setState({username: e.target.value})}}/>
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e) => {this.setState({email: e.target.value})}}/>
        <Form.Text className="text-muted" style={{font: "white", fontSize:"19px"}} ref={"helpText"}>
          
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control ref={"password"} type="password" placeholder="Password" onChange={(e) => {this.setState({password: e.target.value})}}/>
      </Form.Group>
      <Button variant="danger" onClick={() => {
          console.log(this.state.username, this.state.email, this.refs.password.value)
          fetch("https://young-bayou-22235.herokuapp.com/register", {
            method : 'POST',
            headers: {
              'Content-Type' : 'application/json'
            },
            body : JSON.stringify({email: this.state.email, name: this.state.username, password: this.refs.password.value})
          })
          .then(res => res.json())
          .catch(err => {console.log(err, "ERROR LOG")})
          .then(data => {

          if(data==="User added to database") {
              console.log(JSON.stringify(data), "SUCCESS");
              this.setState({registered: true})
          }
          else if (data==="failed to add user to database") {
            console.log(JSON.stringify(data), "FAIL");
            this.refs.helpText.innerHTML = "Oops something went wrong, email already registered"
          }
          else {
            this.refs.helpText.innerHTML = "Oops something went wrong, unable to connect to server";
          }
          });
      }}>
        Register
      </Button>
    </Form></div> : <div>Registering Successfull, please log in</div>}
            </div>
                    
        </div>
    </div> );
    }
}
 
export default Register;