import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';

class Googlesignin extends Component {
    state = { 
        }

        getGoogleAuthLink = () => {
            console.log("hi")
            
     }
    render() { 
        return ( 
            <Nav.Link><div className="navbar-select"><i className="fas fa-user" onClick={()=> this.getGoogleAuthLink()} >Google Drive</i></div></Nav.Link>
         );
    }
}
 
export default Googlesignin;