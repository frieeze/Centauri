import React, { Component } from 'react';
import Login from './Components/Login';
import PaperBase from './Components/PaperBase';

import { getProfile } from './actions/profileActions';
import { connect } from 'react-redux';

class App extends Component {
  state = {
    currentPage: 'general'
  };

  render() {
    const { isLogged } = this.props;

    return <div className="App">{isLogged ? <PaperBase /> : <Login />}</div>;
  }
}

const mapStateToProps = state => ({
  isLogged: state.profile.isLogged
});

export default connect(
  mapStateToProps,
  {
    getProfile
  }
)(App);
