import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Container, Spinner} from 'reactstrap';
import { Redirect } from 'react-router-dom'

class Scanner extends Component {
  render() {
    const { auth, stats } = this.props;
    if (!this.props.auth.uid) return <Redirect to='/' />;
    console.log(auth)
    return (
        <div className="Account">
            {stats && stats.map(doc => {
              if (doc.activeCode) {
                return (
                  <Container className='text-center'>
                    <h4 className='display-4'>Code has been detected.</h4>
                    <p className='lead'>Please place items on dock.</p>
                  </Container>
                )
              }
              else {
                const qrURL = 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=' + 
                               auth.uid;
                return (
                  <Container className='text-center'>
                    <p className='lead'>Scan at any participating bin.</p>
                    <img src={qrURL} alt="Generating QR Code"/>
                  </Container>
                )
              }
            })}
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
      auth: state.firebase.auth,
      stats: state.firestore.ordered.global
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'global', limit: 1}
  ])
)(Scanner)