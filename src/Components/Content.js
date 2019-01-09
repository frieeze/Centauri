import React, { Component } from 'react';
import General from './General/General';
import Database from './Database/Database';

class Content extends Component {
  render() {
    const { current } = this.props;
    return (
      <div>
        {(() => {
          switch (current.page) {
            case 'Général':
              return <General subpage={current.subpage} />;
            case 'Base de données':
              return <Database subpage={current.subpage} />;
            default:
              return <General subpage={current.subpage} />;
          }
        })()}
      </div>
    );
  }
}

export default Content;
