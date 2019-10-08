import React, { Component } from 'react';
import logo from '../../images/logo.png'
import { Navbar, Nav} from 'react-bootstrap';


class Navigation extends Component {
    state = {  }
    render() { 
        return ( <div style={{paddingBottom:"90px"}}>
            <Navbar bg="light" expand="lg" fixed="top">
  <Navbar.Brand onClick={() => this.props.changeRoute("main")} href="#home"><img alt="promotial" src={logo} style={{height:"50px", width:"auto"}}/></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    <Nav.Link href="#account"><div className="navbar-select"><i className="fas fa-user" onClick={()=> this.props.toggleModal("account")} >Account</i></div></Nav.Link>
    <Nav.Link href="#account"><div className="navbar-select"><i className="fas fa-user" onClick={()=> this.props.toggleModal("addproduct")} >Add Product</i></div></Nav.Link>
    <Nav.Link href="#account"><div className="navbar-select"><i className="fas fa-user" onClick={()=> this.props.toggleModal("addcategory")} >Add Category</i></div></Nav.Link>
    <Nav.Link href="#account"><div className="navbar-select"><i className="fas fa-user" onClick={()=> this.props.toggleModal("addproduct")} >View Orders</i></div></Nav.Link>
      <Nav.Link href="#account"><div className="navbar-select"><i className="fas fa-candy-cane" onClick={() => this.props.changeRoute("products")} >View Products</i></div></Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
        </div> );
    }
}
 
export default Navigation;