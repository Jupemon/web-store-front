import React, { Component } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import AddFilterButton from '../AddFilterButton/AddFilterButton';
import '../Products/Products.css';

class AddCategory extends Component {
    constructor(props) {
        super();
        this.state = {
            categorySent : false,
            itemsToBeAdded : [],
            title : "title"
        }
    }

    addFilterButton = (filt) => {
        if (!this.state.itemsToBeAdded.includes(filt) && filt.length > 0 && filt !== "+Add") {
            console.log("filter button added")
            const itemsToBeAdded = this.state.itemsToBeAdded;
            itemsToBeAdded.push(filt);
            this.setState({itemsToBeAdded}, () => {console.log(this.state.itemsToBeAdded)});
        }
        else {
            console.log("nothign added")
        }

    }
    sentCategory = () => {
        const {itemsToBeAdded, title} = this.state

        const body = {name : title.toLowerCase().replace(" ", "_"), items : itemsToBeAdded};
        const token = localStorage.getItem('token');
            //http://localhost:3000/addcategory
        fetch("https://young-bayou-22235.herokuapp.com/addcategory", {
            method : 'POST',
            headers: {
              'Authorization' : `Bearer ${token}`,
              'Content-Type' : 'application/json'
            },
            body : JSON.stringify(body)
          })
          .then(res => {
              if (res.status === 401) {
                  alert("unauthorized access, ")
              }
          })
          .then(data => {
              console.log(data)
          })
    }
    render() { 
        return (
            <div className="cart-modal">
            <div className="cart-back">
                        <div className="cart-title">
                            <i style={{marginRight:"15px"}} className="fas fa-shopping-cart fa-3x"></i>
                            <div style={{}}>
                            <Button onClick={() => {this.sentCategory()}} variant="danger">Save Product</Button>
                            </div>
					        <h1 className="cart-title">Add Category</h1>
                            <Button variant="danger" onClick={()=> this.props.toggleModal("")}>X</Button>
                        </div>

                        {this.state.categorySent ? <div className="cart-items">Category saved succesfully</div> : <div className="cart-items">
                        <Form style={{float:"right"}}>
                        <Form.Group controlId="formBasicEmail">
      <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter category name" onChange={(e) => {this.setState({title : e.currentTarget.value})}}/>
        </Form.Group>
        </Form>
        <Card style={{ width: '12rem', height: "300px", float:"left"}}>
                                <Card.Body style={{boxShadow:"2.5px 1px 2px 1px rgba(0, 0, 0, 0.15)"}}>

                                        <div><Card.Title>{this.state.title}</Card.Title>
                                            {this.state.itemsToBeAdded.map(item => {
                                                return <div className="purple-button"><Button>{item}</Button></div>
                                            })}
                                            <AddFilterButton addFilterButton={this.addFilterButton}/>
                                        </div>
        
                                </Card.Body>
                                </Card>
                        </div>}
                                
                    </div>
                    </div>
        );
    }
}
 
export default AddCategory;