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
    children: null
  };

  componentWillMount() {
    this.gatewayRegistry.addContainer(this.props.name, this);
  }

  componentWillUnmount() {
    this.gatewayRegistry.removeContainer(this.props.name, this);
  }

  render() {
    const { component, tagName, unmountOnEmpty, ...attrs } = this.props;
    delete attrs.name;
    return unmountOnEmpty && !this.state.children
      ? null
      : React.createElement(component || tagName || 'div', attrs, this.state.children);
  }
}
