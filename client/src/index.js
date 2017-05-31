/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import Root from './components/Root';
import './styles/styles.scss'; //  Webpack will run the associated loader and plug this into the page.
require('./favicon.ico'); // Tell webpack to load favicon.ico

render(
  <AppContainer>
    <Root history={browserHistory} />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NewRoot = require('./components/Root').default;
    render(
      <AppContainer>
        <NewRoot history={browserHistory} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
