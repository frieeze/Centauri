import React, { Component } from 'react';
import General from './General/General';
import Database from './Database/Database';
import Stats from './Stats/Stats';
import Home from './Home/Home';

class Content extends Component {
  render() {
    const { current } = this.props;
    return (
      <div>
        {(() => {
          switch (current.page) {
            case 'Accueil':
              return <Home />;
            case 'Général':
              return <General subpage={current.subpage} />;
            case 'Base de données':
              return <Database subpage={current.subpage} />;
            case 'Analytics':
              return <Stats subpage={current.subpage} />;
            default:
              return <General subpage={current.subpage} />;
          }
        })()}
      </div>
    );
  }
}

export default Content;
