import React from 'react';
import './Cart.css';
import {Card, Button, Form} from 'react-bootstrap';

const Cart = (props) => {
    return ( <div className={"cart-modal"}>
    {console.log(props.calculateSum())}
					<div className="cart-back">
                        <div className="cart-title">
                            <i style={{marginRight:"15px"}} className="fas fa-shopping-cart fa-3x"></i>
                            <div style={{}}>
                            <p>Total cost : {props.calculateSum()}€</p>
                            <Button variant="danger">Checkout</Button>
                            </div>
					        <h1 className="cart-title">Your Cart</h1>
                            <Button variant="danger" onClick={()=> props.toggleModal("")}>X</Button>
                        </div>
                        <div className="cart-items">
                        {props.cart.map(item => 
                            <div style={{position:"relative"}}>
                                <Card style={{marginBottom:"20px", width: '12rem'}} key={item.ID}>
                                <div className="outer">
                                <div className="overlay" onClick={(e) => {props.removeFromCart(e, item)}}>
                                <i style={{paddingTop:"50px", color:"white"}} className="fas fa-cart-arrow-down fa-4x"><p style={{fontSize:"15px"}}>Remove from cart</p></i>
                                </div>
                                <Card.Img variant="top" src={`https://young-bayou-22235.herokuapp.com/image/${item.ID}`}/>
                                </div>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>{item.price}€ {"/100g"}</Card.Text>
                                </Card>
                                <div className="Card-info">
                                    <p>Amount</p>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <div className="amount">
                                            <Form.Control type="number" min="0"  max="99" onChange={(e) => {props.calculateItemCost(e.target.value, item.ID, item.price)}}/>
                                        </div>
                                    </Form.Group>
                                    <p>Cost</p>
                                    <p>{props.getItemAmounts(item.ID, "amount")}00g = {props.getItemAmounts(item.ID, "price")}€</p>
                                </div>
                            </div>)}
                        </div>
                                
                    </div>
    </div> );
}
 
export default Cart;