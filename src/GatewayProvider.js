import React from 'react';
import GatewayRegistry from './GatewayRegistry';

export default class GatewayProvider extends React.Component {
  static childContextTypes = {
    gatewayRegistry: React.PropTypes.instanceOf(GatewayRegistry).isRequired
  };

  getChildContext() {
    return {
      gatewayRegistry: this.gatewayRegistry
    };
  }

  static propTypes = {
    children: React.PropTypes.element,
  };

  constructor(props, context) {
    super(props, context);
    this.gatewayRegistry = new GatewayRegistry();
  }

  render() {
    return this.props.children;
  }
}
