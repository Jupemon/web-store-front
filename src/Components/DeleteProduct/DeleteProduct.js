import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import './DeleteProduct.css'

/*
                        <Card style={{ width: '12rem' }} key={this.props.selectedProduct.productid}>
                        <Card.Img variant="top" style={{width:"190px", height:"190px"}} src={`http://localhost:3000/image/${this.props.selectedProduct.productid}`}/>
                        <Card.Title>{this.props.selectedProduct.name}</Card.Title>
                        <Card.Text>{this.props.selectedProduct.price}</Card.Text>
                        </Card>console.log(this.props.selectedProduct)
*/
class DeleteProduct extends Component {
    constructor(props) {
        super();
        this.state = { 
            productDeleted : false
         }
    }

    sendDeleteProduct = () => {
        console.log("product deleted")
        const token = localStorage.getItem('token');
        // localhost
        fetch(`https://young-bayou-22235.herokuapp.com/deleteproduct/${this.props.selectedProduct.productid}`, {
        headers : {
          'Authorization' : `Bearer ${token}`
        },
        method:"post"
      }).then(resp => {
        if (resp.status === 200) {
          this.props.GetProducts()
          this.setState({productDeleted : true})
        }
        else if (resp.status === 401) {
          alert("unauthorized access, please sign in")
        }
      })
        
    }
    render() {
        return (
            <div className="cart-modal">
            <div className="cart-back">
                        <div className="cart-title">
                            <i style={{marginRight:"15px"}} className="fas fa-shopping-cart fa-3x"></i>
                            <div style={{}}>
                            </div>
                            <h1 className="cart-title">Delete Product</h1>
                            <Button variant="danger" onClick={()=> this.props.toggleModal("")}>X</Button>
                        </div>
                        <div className="cart-items">
                        { this.state.productDeleted ? <div>Product Deleted</div> :
                        <Card style={{ width: '12rem' }} key={this.props.selectedProduct.productid}>
                        <Card.Img variant="top" style={{width:"190px", height:"190px"}} src={`https://young-bayou-22235.herokuapp.com/image/${this.props.selectedProduct.productid}`}/>
                        <Card.Title>{this.props.selectedProduct.name}</Card.Title>
                        <Card.Text>{this.props.selectedProduct.price}</Card.Text>
                        <div className="delete-confirmation" style={{}}>Are you sure you want to delete this product?
                        <Button onClick={() => {this.sendDeleteProduct()}} variant="danger" className="delete-confirmation-button">Confirm</Button>
                        </div>
                        </Card>}
                        </div>
                                
                    </div>
                    </div>
        );
    }
}
 
export default DeleteProduct;
