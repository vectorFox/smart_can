import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

class Home extends Component {
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/login' />
    return (
        <div className="Account">
            <h1 className="text-center"> Welcome to Smart Can ? </h1>
        </div>
    );
  }
}

export default Home;