import React from 'react';
import PropTypes from 'prop-types';
import {GatewayContext} from './GatewayProvider';
import {GatewayRegistry} from './GatewayRegistry';

class GatewayImpl extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    gatewayRegistry: PropTypes.instanceOf(GatewayRegistry).isRequired
  };

  componentDidMount() {
    this.id = this.props.gatewayRegistry.register(
      this.props.into,
      this.props.children
    );
    this.renderIntoGatewayNode(this.props);
  }

  componentDidUpdate(props) {
    this.props.gatewayRegistry.clearChild(this.props.into, this.id);
    this.renderIntoGatewayNode(props);
  }

  componentWillUnmount() {
    this.props.gatewayRegistry.unregister(this.props.into, this.id);
  }

  renderIntoGatewayNode(props) {
    this.props.gatewayRegistry.addChild(this.props.into, this.id, props.children);
  }

  render() {
    return null;
  }
}

export default (props) => {
  return (
    <GatewayContext.Consumer>
      {({ gatewayRegistry }) => (
        <GatewayImpl gatewayRegistry={gatewayRegistry} {...props} />
      )}
    </GatewayContext.Consumer>
  );
};
