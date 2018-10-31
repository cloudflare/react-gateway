import React from 'react';
import {GatewayContext} from './GatewayProvider';
import {GatewayRegistry} from './GatewayRegistry';
import PropTypes from 'prop-types';
import {deprecated} from 'react-prop-types';

class GatewayDestImpl extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    tagName: deprecated(PropTypes.string, 'Use "component" instead.'),
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]),
    gatewayRegistry: PropTypes.instanceOf(GatewayRegistry).isRequired
  };

  state = {
    children: null
  };

  componentDidMount() {
    this.props.gatewayRegistry.addContainer(this.props.name, this);
  }

  componentWillUnmount() {
    this.props.gatewayRegistry.removeContainer(this.props.name, this);
  }

  render() {
    const { component, tagName, gatewayRegistry, ...attrs } = this.props;
    delete attrs.name;
    return React.createElement(component || tagName || 'div', attrs, this.state.children);
  }
}

export default (props) => {
  return (
    <GatewayContext.Consumer>
      {({ gatewayRegistry }) => (
        <GatewayDestImpl gatewayRegistry={gatewayRegistry} {...props} />
      )}
    </GatewayContext.Consumer>
  );
};
