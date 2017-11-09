import React from 'react';
import PropTypes from 'prop-types';
import GatewayRegistry from './GatewayRegistry';

export default class Gateway extends React.Component {
  static contextTypes = {
    gatewayRegistry: PropTypes.instanceOf(GatewayRegistry).isRequired
  };

  static propTypes = {
    into: PropTypes.string.isRequired,
    children: PropTypes.node
  };

  constructor(props, context) {
    super(props, context);
    this.gatewayRegistry = context.gatewayRegistry;
  }

  componentWillMount() {
    this.id = this.gatewayRegistry.register(
      this.props.into,
      this.props.children
    );
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
