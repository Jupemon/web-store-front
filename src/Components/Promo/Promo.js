import React from 'react';
import './Promo.css';


import cutout1 from '../../images/Cutout1.png';
import cutout2 from '../../images/Cutout2.png';
import cutout3 from '../../images/Cutout3.png';
import promo1 from '../../images/promo1.png';
import promo2 from '../../images/promo2.png';
import promo3 from '../../images/promo3.png';

import {Col, Row, Container, Card, Button} from 'react-bootstrap';

const Promo = () => {
    return ( <div>

<Container>
    <Row style={{paddingTop:"70px"}}>  
        <Col><img alt="promotial1" src={promo1} className="zoom"/></Col>
    </Row>
    <Row style={{paddingTop:"20px"}}>
        <Col><img alt="promotial2" src={promo2} className="zoom"/></Col>
        <Col><img alt="promotial2" src={promo3} className="zoom"/></Col>
    </Row>
</Container>
    </div> );
}
 
export default Promo;