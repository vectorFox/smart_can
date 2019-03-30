import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { firestoreConnect, getVal } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Container, Spinner} from 'reactstrap';

class Home extends Component {
  render() {
    const { stats } = this.props;
    const placeholder = [5]
    return (
        <Container className="Account text-center">
            <br/>
            <i class="fas fa-dumpster fa-10x text-center"></i>
            <h1 className="text-center display-4"> Welcome to Smart Can </h1>
            <p className='lead text-center'>Digital Waste Sorting & Analytics</p>
            <br/>
            <h3>Collection Stats<br/>
            {stats && stats.map(doc => {
              return (
                <div>
                  <small class="text-muted">{doc.recycleCount} Recyclables</small><br/>
                  <small class='text-muted'>{doc.trashCount} Non-Recyclables</small>
                </div>
                )
            })}
            {!stats && placeholder.map(empt => {
              return (
                <div>
                  <Spinner style={{ width: '2rem', height: '2rem' }} />
                </div>
              )
            })}
            </h3>
        </Container>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
      stats: state.firestore.ordered.global
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'global', limit: 1}
  ])
)(Home)