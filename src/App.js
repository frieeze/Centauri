import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import General from './Components/General';
import Home from './Components/Home';
import Database from './Components/Database';

import { getProfile } from './actions/profileActions';
import { connect } from 'react-redux';

class App extends Component {
  state = {
    currentPage: 'home'
  };
  changeCurrentPage = newPage => {
    this.setState({ currentPage: newPage });
  };

  render() {
    const { isLogged } = this.props;

    const loggedPages = currentPage => {
      switch (currentPage) {
        case 'home':
          return <Home />;
        case 'general':
          return <General />;
        case 'database':
          return <Database />;
        default:
          return <Home />;
      }
    };

    return (
      <div className="App">
        {isLogged ? (
          <div>
            <Navbar changeCurrentPage={this.changeCurrentPage} />
            {loggedPages(this.state.currentPage)}
          </div>
        ) : (
          <Login />
        )}
      </div>
    );
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
