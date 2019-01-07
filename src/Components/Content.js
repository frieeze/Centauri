import React, { Component } from 'react';
import PropTypes from 'prop-types';
import General from './General';

class Content extends Component {
  render() {
    return (
      <div>
        <General subpage={this.props.current.subpage} />
      </div>
    );
  }
}

export default Content;
