import React from 'react';
import GatewayRegistry from './GatewayRegistry';
import {deprecated} from 'react-prop-types';

export default class GatewayDest extends React.Component {
  static contextTypes = {
    gatewayRegistry: React.PropTypes.instanceOf(GatewayRegistry).isRequired
  };

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    tagName: deprecated(React.PropTypes.string, 'Use "component" instead.'),
    component: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.func
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
