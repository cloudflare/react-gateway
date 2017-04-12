import React from 'react';
import PropTypes from 'prop-types';
import GatewayRegistry from './GatewayRegistry';
import {deprecated} from 'react-prop-types';

export default class GatewayDest extends React.Component {
  static contextTypes = {
    gatewayRegistry: PropTypes.instanceOf(GatewayRegistry).isRequired
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    tagName: deprecated(PropTypes.string, 'Use "component" instead.'),
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ])
  };

  constructor(props, context) {
    super(props, context);
    this.gatewayRegistry = context.gatewayRegistry;
  }

  state = {
    child: null
  };

  componentWillMount() {
    this.gatewayRegistry.addContainer(this.props.name, this);
  }

  componentWillUnmount() {
    this.gatewayRegistry.removeContainer(this.props.name, this);
  }

  render() {
    const { component, tagName, ...attrs } = this.props;
    delete attrs.name;
    return React.createElement(component || tagName || 'div', attrs, this.state.children);
  }
}
