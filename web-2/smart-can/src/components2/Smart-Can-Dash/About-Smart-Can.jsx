import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';
import LA from '../../assets/LosAngeles.jpg';

class About extends Component {
  render() {
    return (
      <div className="about-smart-can">
        <br></br>
        <div className="container">
          <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
        <CardBody>
          <CardTitle><h1 className="text-center"> What is Smart Can ? </h1></CardTitle>
        </CardBody>
        <CardBody>
          <CardText>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Doloribus optio molestias delectus saepe eos, corrupti animi amet 
              doloremque culpa quis voluptatibus tenetur ipsum necessitatibus
               excepturi vel natus perferendis esse? Suscipit.
            </CardText>
            <CardImg top width="100%" src={ LA } alt="Card image cap" />
        </CardBody>
      </Card>
        </div>
      </div>
    );
  }
}

export default About;