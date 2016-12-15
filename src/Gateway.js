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
    this.id = this.gatewayRegistry.register(this.props.into, this.props.children);
    this.renderIntoGatewayNode(this.props);
  }

  componentWillReceiveProps(props) {
    this.gatewayRegistry.clearChild(this.props.into, this.id);
    this.renderIntoGatewayNode(props);
  }

  componentWillUnmount() {
    this.gatewayRegistry.unregister(this.props.into, this.id);
  }

  renderIntoGatewayNode(props) {
    this.gatewayRegistry.addChild(this.props.into, this.id, props.children);
  }

  render() {
    return null;
  }
}
