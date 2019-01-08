import React, { Component } from 'react';
import Categories from './Categories';
import Carousel from './Carousel';
import Conditions from './Conditions';

class General extends Component {
  render() {
    const { subpage } = this.props;
    return (
      <div>
        {(function() {
          switch (subpage) {
            case 0:
              return <Categories />;
            case 1:
              return <Carousel />;
            case 2:
              return <Conditions />;
            default:
              return <Categories />;
          }
        })()}
      </div>
    );
  }
}

export default General;
