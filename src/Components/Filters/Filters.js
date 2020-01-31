import React, { Component } from 'react';
import { Col, Button, Card } from 'react-bootstrap';
import { thisExpression } from '@babel/types';
import AddFilterButton from '../AddFilterButton/AddFilterButton';

class Filters extends Component {
    constructor(props) {
        super();
        this.state = {
            categories : []
        }
    }

    componentDidMount() {
        fetch('https://young-bayou-22235.herokuapp.com/getcategories')
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
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
                                                <AddFilterButton CategoryName={cat.name}/>
                                        </div>
                                    })}
                                </Card.Body>
                                </Card>
                                </Col>
        </div> );
    }
}
 
export default Filters;