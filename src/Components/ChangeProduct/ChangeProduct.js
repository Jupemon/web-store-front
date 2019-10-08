import React, { Component } from 'react';
import {Card, Button, Form, Col} from 'react-bootstrap';

class ChangeProduct extends Component {
  constructor(props) {
    super();
    this.state = {
        productChanged : false,
        productName : "",
        productPrice : "",
        productAmount : "",
        productImage : null,
        productData : new FormData(),
        colors: ["Red", "Black", "Brown", "Yellow", "Pink", "Blue", "Green", "Orange", "White"],
        tastes: ["Sour", "Fruity", "Chocolate", "Liquorice"],
        shapes: ["Ball", "Animal", "Cylinder", "Skull", "Bottle", "Brick", "Ring"],
        manufacturer: ["Panda", "Fazer"]
    }
}

componentDidMount(props) {
  console.log(this.props.selectedProduct.amount)
  console.log(this.props.selectedProduct.price)
  console.log(this.props.selectedProduct.manufacturer)
  console.log(this.props.selectedProduct.taste)
  console.log(this.props.selectedProduct.shape)
  console.log(this.props.selectedProduct.color)

  //this.updateProductData("color", valueToUpdate)
}

updateProductData = (valueToUpdate, value) => {
  const productData = this.state.productData;

  productData.set(valueToUpdate, value)

  this.setState({productData});
  //console.log(productData);
  //console.log(tok);
}

sendUpdatedProduct = () => {
  const productData = this.state.productData;
  if (this.state.productName.length > 0) {
    productData.append('name', this.state.productName);
  }
  if (this.state.productPrice.length > 0) {
    productData.append('price', this.state.productPrice);
  }
  if (this.state.productAmount.length > 0) {
    productData.append('amount', this.state.productAmount);
  }
  const token = localStorage.getItem('token'); //updateproduct/${this.props.selectedProduct.productid}
      fetch(`http://localhost:3000/updateproduct/${this.props.selectedProduct.productid}`, {
        headers : {
          'Authorization' : `Bearer ${token}`
        },
        body: productData,
        method:"PATCH"
      }).then(resp => {
        if (resp.status === 200) {
          this.props.getProducts()
          this.setState({productChanged : true})
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
                            <Button onClick={() => {this.sendUpdatedProduct()}} variant="danger">Save Changes</Button>
                            </div>
					        <h1 className="cart-title">Edit Product</h1>
                            <Button variant="danger" onClick={()=> this.props.toggleModal("")}>X</Button>
                        </div>
                        <div className="cart-items">
                        { this.state.productChanged ? <div>Product Changed</div> :
                        <Form>
                        <Form.Group controlId="formBasicEmail">
      <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter product name" defaultValue={this.props.selectedProduct.name} onChange={(e) => {this.setState({productName : e.currentTarget.value})}}/>
        <Form.Label>Amount</Form.Label>
        <Form.Control type="number" placeholder="Enter Amount"  defaultValue={this.props.selectedProduct.amount} onChange={(e) => {this.setState({productAmount : e.currentTarget.value})}}/>
        <Form.Label>€ price</Form.Label>
        <Form.Control type="number" min="0" step="0.10" max="99"  defaultValue={this.props.selectedProduct.price} onChange={(e) => {this.setState({productPrice : e.currentTarget.value})}}/>

      </Form.Group>
      <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Color</Form.Label>
      <Form.Control defaultValue={this.props.selectedProduct.color} as="select" onChange={(e)=> {this.updateProductData("color", e.currentTarget.value)}}>
        <option>Pick color</option>
        {this.state.colors.map(i => {
          return <option key={i}>{i}</option>
        })}
      </Form.Control>
      <Form.Label>Taste</Form.Label>
      <Form.Control defaultValue={this.props.selectedProduct.taste} as="select" onChange={(e)=> {this.updateProductData("taste", e.currentTarget.value)}}>
        <option>Pick taste</option>
        {this.state.tastes.map(i => {
          return <option key={i}>{i}</option>
        })}
      </Form.Control>
      <Form.Label>Shape</Form.Label>
      <Form.Control defaultValue={this.props.selectedProduct.shape} as="select" onChange={(e)=> {this.updateProductData("shape", e.currentTarget.value)}}>
        <option>Pick shape</option>
        {this.state.shapes.map(i => {
          return <option key={i}>{i}</option>
        })}
      </Form.Control>
      <Form.Label>Manufacturer</Form.Label>
      <Form.Control defaultValue={this.props.selectedProduct.manufacturer} as="select" onChange={(e)=> {this.updateProductData("manufacturer", e.currentTarget.value)}}>
        <option>Pick manufacturer</option>
        {this.state.manufacturer.map(i => {
          return <option key={i}>{i}</option>
        })}
      </Form.Control>
    </Form.Group>
    </Form>}
                        </div>
                                
                    </div>
                    </div>
        );
    }
}
 
export default ChangeProduct;