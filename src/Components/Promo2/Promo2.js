import React from 'react';
import './Promo2.css';


import cutout1 from '../../images/Cutout1.png';
import cutout2 from '../../images/Cutout2.png';
import cutout3 from '../../images/Cutout3.png';
import cutout4 from '../../images/Cutout4.png';

import {Col, Row, Container, Card, Button} from 'react-bootstrap';

const Promo = () => {
    return ( <div>

<Container>
    <Row style={{paddingTop:"20px"}}>
        <Col><img src={cutout1}/></Col>
    </Row>
    <Row style={{paddingTop:"20px"}}>
        <Col><img src={cutout2}/></Col>
        <Col><img src={cutout3}/></Col>
        <Col><img src={cutout4}/></Col>
    </Row>
</Container>
    </div> );
}
 
export default Promo;