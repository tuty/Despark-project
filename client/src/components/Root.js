import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router';

import routes from '../routes';

export default class Root extends Component {
  render() {
    const { history } = this.props;
    return (
        <Router history={history} routes={routes} />
    );
  }
}

Root.propTypes = {
  history: PropTypes.object.isRequired
};
