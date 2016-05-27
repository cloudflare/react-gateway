import React from 'react';
import GatewayRegistry from './GatewayRegistry';

export default class Gateway extends React.Component {
  static contextTypes = {
    gatewayRegistry: React.PropTypes.instanceOf(GatewayRegistry).isRequired
  };

  static propTypes = {
    into: React.PropTypes.string.isRequired,
    children: React.PropTypes.oneOfType([
      React.PropTypes.element,
      React.PropTypes.string
    ])
  };

  constructor(props, context) {
    super(props, context);
    this.gatewayRegistry = context.gatewayRegistry;
  }

  componentWillMount() {
    this.renderIntoGatewayNode(this.props);
  }

  componentWillReceiveProps(props) {
    this.gatewayRegistry.clearChild(this.props.into);
    this.renderIntoGatewayNode(props);
  }

  componentWillUnmount() {
    this.gatewayRegistry.removeChild(this.props.into);
  }

  renderIntoGatewayNode(props) {
    this.gatewayRegistry.addChild(this.props.into, props.children);
  }

  render() {
    return null;
  }
}
