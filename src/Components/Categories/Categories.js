import React from 'react';
import colors from '../../images/colors.png';
import present from '../../images/present.png';
import various from '../../images/various.PNG';
import {Col, Row, Card, Container} from 'react-bootstrap';
import './Categories.css'

const Categories = (props) => {
    return ( <div>
    <Container>
            <Row style={{paddingTop:"20px"}}>
        <Col>
            <Card style={{ width: '18rem' }}>
                <div className="outer">
                <div className="overlay">
                    <p>Hello world</p>
                </div>
                <Card.Img variant="top" src={colors}/>
                </div>
                <Card.Body>
                    <Card.Title>Colors</Card.Title>
                    <Card.Text>
                        Filter Candy by color
                    </Card.Text>
                    <ul style={{float:"left", width:"50%", paddingLeft:"0px"}}>
                        <li onClick={() => props.selectFromProducts("Black")}>Black</li>
                        <li onClick={() => props.selectFromProducts("White")}>White</li>
                        <li onClick={() => props.selectFromProducts("Red")}>Red</li>
                        <li onClick={() => props.selectFromProducts("Pink")}>Pink</li>
                        <li onClick={() => props.selectFromProducts("Yellow")}>Yellow</li>
                    </ul>
                    <ul style={{float:"right", width:"50%", paddingLeft:"0px"}}>
                        <li onClick={() => props.selectFromProducts("Green")}>Green</li>
                        <li onClick={() => props.selectFromProducts("Orange")}>Orange</li>
                        <li onClick={() => props.selectFromProducts("Brown")}>Brown</li>
                        <li onClick={() => props.selectFromProducts("Blue")}>Blue</li>
                    </ul>
                </Card.Body>
        </Card>
    </Col>
    <Col>
            <Card style={{ width: '18rem' }}>
                <div className="outer">
                <div className="overlay">
                    <p>Hello world</p>
                </div>
                <Card.Img variant="top" src={various} />
                </div>
                <Card.Body>
                <Card.Title>Taste</Card.Title>
                    <Card.Text>
                        Filter Candy by taste
                    </Card.Text>
                    <ul style={{float:"left", width:"50%", paddingLeft:"0px"}}>
                        <li>Sour</li>
                        <li>Liquorice</li>
                        <li>Chocolate</li>
                        <li>Fruity</li>
                    </ul>
                    <ul style={{float:"right", width:"50%", paddingLeft:"0px"}}>
                        <li onClick={() => props.selectFromProducts("Green")}>Green</li>
                        <li onClick={() => props.selectFromProducts("Orange")}>Orange</li>
                        <li onClick={() => props.selectFromProducts("Brown")}>Brown</li>
                        <li onClick={() => props.selectFromProducts("Blue")}>Blue</li>
                    </ul>
                </Card.Body>
        </Card>
    </Col>
    <Col>
            <Card style={{ width: '18rem' }}>
            <div className="outer">
                <div className="overlay">
                    <p>Hello world</p>
                </div>
                <Card.Img variant="top" src={present} />
                </div>
                <Card.Body>
                    <Card.Title>Shape</Card.Title>
                    <Card.Text>
                        Filter candies by shape
                    </Card.Text>
                    <ul style={{float:"left", width:"50%", paddingLeft:"0px"}}>
                        <li>Ball</li>
                        <li>Ring</li>
                        <li>Bottle</li>
                        <li>Pink</li>
                    </ul>
                    <ul style={{float:"right", width:"50%", paddingLeft:"0px"}}>
                        <li>Animal</li>
                        <li>Skull</li>
                        <li>Brick</li>
                        <li>Cylinder</li>
                    </ul>
                </Card.Body>
        </Card>
    </Col>
    
</Row>
</Container>
    </div> );
}
 
export default Categories