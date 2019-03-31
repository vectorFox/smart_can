import React, { Component } from 'react';
import { Container, Media, Row, Col } from 'reactstrap';
import LA from '../../assets/LosAngeles.jpg';
import './about.css'

class About extends Component {
  render() {
    return (
      <div className="about-smart-can">
        <br></br>
        <Container>
          <h1 className="text-center"> About Smart Can </h1>
          <p className='lead text-center'>Smart, Sustainable Waste Management </p>
          <Row>
            <Col sm="10" md={{ size: 8, offset: 2 }}>
              <br/>
              <Media center>
                <img className='special_image' src={LA} />
              </Media>
              <br/>
              <p>
                Based out of beautiful Los Angeles, <b>Smart Can</b> is a new way to throw away. 
                Our bins separate waste into recyclable and non-recyclable materials and reward users for their involvement. 
                For each CRV-eligible bottle deposited, users earn points which can be spent on a variety of rewards. 
                Don't feel like carrying your drink can back home to redeem it? Leave it with us!
              </p>
              <p>
                Together we can make waste collection smart, sustainable, and rewarding to all.
              </p>
              
            </Col>
          </Row>
         

        </Container>
      </div>
    );
  }
}

export default About;