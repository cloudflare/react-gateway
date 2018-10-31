import React from 'react';
import PropTypes from 'prop-types';
import GatewayRegistry from './GatewayRegistry';

export let GatewayContext = React.createContext(null);


export default class GatewayProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node,	
  };

  gatewayRegistry = new GatewayRegistry();

  render() {
    return <GatewayContext.Provider value={{ gatewayRegistry: this.gatewayRegistry }}>{this.props.children}</GatewayContext.Provider>;
  }
}
