import React from 'react';
import PropTypes from 'prop-types';
import GatewayRegistry from './GatewayRegistry';

export default class GatewayProvider extends React.Component {
  static childContextTypes = {
    gatewayRegistry: PropTypes.instanceOf(GatewayRegistry).isRequired
  };

  getChildContext() {
    return {
      gatewayRegistry: this.gatewayRegistry
    };
  }

  static propTypes = {
    children: PropTypes.element,
  };

  constructor(props, context) {
    super(props, context);
    this.gatewayRegistry = new GatewayRegistry();
  }

  render() {
    return this.props.children;
  }
}
