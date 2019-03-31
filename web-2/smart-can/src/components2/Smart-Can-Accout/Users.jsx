import React, { Component } from 'react';
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Users extends Component {
    render() {
    const { profile, auth } = this.props;
    if (!auth.uid) return <Redirect to='/login' />
    return (
        <div className="Account container">
          <Card body color="dark">
            <CardTitle><h1 className="text-center display-4">Stats</h1></CardTitle>
            <CardText className="text-center"><b>User:</b> {profile.firstName}</CardText>
            <Row>
              <Col className="text-center">
                <i class="fas fa-trash fa-3x"></i>
                <CardText><h1 className="text-center">23</h1></CardText>
              </Col>
              <Col className="text-center">
                <i class="fas fa-recycle fa-3x"></i>
                <CardText><h1 className="text-center">50</h1></CardText>
              </Col>
             
            </Row>
          </Card>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      auth: state.firebase.auth,
      profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(Users)