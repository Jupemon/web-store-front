import React, { Component } from 'react';
import { Col, Button, Card } from 'react-bootstrap';
import { thisExpression } from '@babel/types';

class Filters extends Component {
    constructor(props) {
        super();
        this.state = {
            categories : []
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/getcategories')
        .then(resp => resp.json())
        .then(data => {
            this.setState({categories : data})
        })
    }

    addNewFilter = () => {
        console.log("filter added")
    }

    render() { 
        return ( <div>
                                            <Col md="4">
                                <Card style={{ width: '12rem' }}>
                                <Card.Body style={{boxShadow:"2.5px 1px 2px 1px rgba(0, 0, 0, 0.15)"}}>

                                    {this.state.categories.map(cat => {
                                        return <div><Card.Title>{cat.name}</Card.Title> 
                                                {cat.items.map(item => {
                                                    return <div className="purple-button"><Button variant="primary" onClick={(e) => {this.props.handleFilterProducts(e, item, cat.name)}}>{item}</Button></div>
                                                })}
                                                <div className="purple-button"><Button variant="primary" onClick={(e) => {this.addNewFilter(e, "Bottle", "shape")}}>+Add</Button></div>
                                        </div>
                                    })}
                                </Card.Body>
                                </Card>
                                </Col>
        </div> );
    }
}
 
export default Filters;