import React, { Component } from 'react';
import {Card, Button, Form, Col} from 'react-bootstrap';

class Addproduct extends Component {
    constructor(props) {
        super();
        this.state = {
            productSentError : false,
            productSent : false,
            productName : "",
            productPrice : "",
            productAmount : "",
            productImage : null,
            productData : new FormData(),
            categories : [],
            colors: ["Red", "Black", "Brown", "Yellow", "Pink", "Blue", "Green", "Orange", "White"],
            tastes: ["Sour", "Fruity", "Chocolate", "Liquorice"],
            shapes: ["Ball", "Animal", "Cylinder", "Skull", "Bottle", "Brick", "Ring"],
            manufacturer: ["Panda", "Fazer"]
        }
    }


    componentDidMount() { // http://localhost:3000/
      fetch('https://young-bayou-22235.herokuapp.com/getcategories', {
        method:"get"
      })
      .then(res => res.json())
      .then(data => {
        const categories = this.state.categories;
          console.log(data)
          data.map(cat => {
            categories.push(cat);
          })
          this.setState({ categories })
      })
    }


    updateProductData = (valueToUpdate, value) => {
      const productData = this.state.productData;
      console.log(this.state.productAmount, this.state.productPrice, this.state.productName)
      if (!this.state.productData.has(valueToUpdate)) {
        productData.append(valueToUpdate, value)
      }
      
      this.setState({productData});
      //console.log(productData);
      //console.log(tok);
    }

    SendProduct = () => { // 'Enctype':"Multipart/Form-Data", 'Authorization' : `Bearer ${token}`,
      const productData = this.state.productData;
      productData.append('name', this.state.productName);
      productData.append('amount', this.state.productAmount);
      productData.append('price', this.state.productPrice);
      productData.append('productImage', this.state.productImage);
      console.log("product adding") //"https://young-bayou-22235.herokuapp.com/signin"
      for (var pair of this.state.productData.entries()) {
        console.log(pair[0] + " : " + pair[1]); 
     }
      const token = localStorage.getItem('token');
        // http://localhost:3000/ https://young-bayou-22235.herokuapp.com/addproduct
      fetch('https://young-bayou-22235.herokuapp.com/addproduct', {
        headers : {
          'Authorization' : `Bearer ${token}`
        },
        body: productData,
        method:"post"
      })
      .then(data => {
        console.log(data, "DATA OF THE RESPONSE")
        if (data.status === 400) {
          this.setState({ productSent : true})
        }
        else if (data.status === 401) {
          alert("unauthorized access, please sign in");
        }
        else {
          this.setState({ productSentError: true })
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
                            <Button onClick={() => {this.SendProduct()}} variant="danger">Save Product</Button>
                            </div>
					        <h1 className="cart-title">Add Product</h1>
                            <Button variant="danger" onClick={()=> this.props.toggleModal("")}>X</Button>
                        </div>

                        {this.state.productSent ? <div className="cart-items">Product saved succesfully</div> : <div className="cart-items">
                        <Form>
                        <Form.Group controlId="formBasicEmail">
      <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter product name" onChange={(e) => {this.setState({productName : e.currentTarget.value})}}/>
        <Form.Label>Amount</Form.Label>
        <Form.Control type="number" placeholder="Enter Amount" onChange={(e) => {this.setState({productAmount : e.currentTarget.value})}}/>
        <Form.Label>€ price</Form.Label>
        <Form.Control type="number" min="0" step="0.10" max="99" onChange={(e) => {this.setState({productPrice : e.currentTarget.value})}}/>

      </Form.Group>
      <Form.Group as={Col} controlId="formGridState">
      {this.state.categories.map(fil => {
        return (<div>
          <Form.Label>{fil.name}</Form.Label>
          <Form.Control as="select" onChange={(e)=> {this.updateProductData(fil.name, e.currentTarget.value)}}>
        <option>{"Pick "} {fil.name}</option>
        {fil.items.map(i => {
          return <option key={i}>{i}</option>
        })}
      </Form.Control>
        </div>)
      })}
      <div className="form-group">
    <label for="exampleFormControlFile1">Add image</label>
    <input type="file" className="form-control-file" id="exampleFormControlFile1" onChange={(e) => {this.setState({productImage : e.currentTarget.files[0]})}}/>
  </div>
    </Form.Group>
    </Form>
                        </div>}
                                
                    </div>
                    </div>
        );
    }
}
 
export default Addproduct;