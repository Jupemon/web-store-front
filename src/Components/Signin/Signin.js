import React, { Component } from 'react';
import {Button, Form} from 'react-bootstrap';

class Signin extends Component { 

  constructor(props) {
    super();
    this.state = {
      loggedIn: false
    }
  } /*
  fetch("http://localhost:3000/addproduct", { 
    mode: 'no-cors',
    method: "POST",
    body: this.state.productData,
  })
  .then(res => res.json())
    .then( data => {
      console.log(data)
    })*/
  handleSignIn = () => {
    console.log("signin") //"https://young-bayou-22235.herokuapp.com/signin"
    fetch("http://localhost:3000/signin", {
            method : 'POST',
            headers: {
              'Content-Type' : 'application/json'
            },
            body : JSON.stringify({email: this.refs.email.value, password: this.refs.password.value, owner:true })
          })
          .then(res => res.json())
          .then(data => {
            console.log(typeof data);
            console.log(data)
            localStorage.setItem('token', data.token);
          if (data==="Fail") {
              this.refs.helptext.innerHTML = "Oops something went wrong, incorrect credentials";
              
          }
          else if (typeof data === "object"){
            console.log("successfull")
            localStorage.getItem('user') ? console.log("localstorage user already exists")
            : localStorage.setItem('user', JSON.stringify(data));
            this.setState({loggedIn : true}); // makes sure component is re-rendered so that signed in div is rendered
            this.props.logIn(data)
          }
          else {
            console.log()
          }
        });
  }

  render() {
    return (    <div className={"cart-modal"}>
    <div className="cart-back">
        <div className="cart-title">
            <i className="fas fa-user fa-3x"></i>
            <h1 className="cart-title">Sign in</h1>
            <Button variant="danger" onClick={()=> this.props.toggleModal("")}>X</Button>
        </div>
        <div className="cart-items">
        {this.state.loggedIn ? <div>
          <p>Log in successfull</p>
        </div> : <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" ref={"email"}  defaultValue={"owner@gmail.com"}/>
    <Form.Text className="text-muted" ref={"helptext"}>
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" ref={"password"} defaultValue={"owner"}/>
  </Form.Group>
  <Form.Group controlId="formBasicChecbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="danger" onClick={() => {
    this.handleSignIn()
  }}>
    Sign In
  </Button>
</Form>}
        </div>
                
    </div>
</div> );
  }
}

export default Signin;