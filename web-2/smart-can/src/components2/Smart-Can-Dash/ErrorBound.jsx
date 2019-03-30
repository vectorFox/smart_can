import React, { Component } from 'react';
import { Card, CardLink, CardText } from 'reactstrap';

class ErrorPg extends Component {
  render() {
    return (
      <div className="error-url container">
        <Card body inverse color="danger">
        <CardText> <h1>Incorrect URL! Please nagivate back to the home page. </h1></CardText>
        <CardLink href="/"><h3>Return to Home Page.</h3></CardLink>
        </Card>
      </div>
    );
  }
}

export default ErrorPg;