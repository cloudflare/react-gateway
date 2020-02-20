import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import GatewayContext from './GatewayContext';

function GatewayDest({ name, component, unmountOnEmpty, ...attrs }) {
  const gatewayRegistry = useContext(GatewayContext);
  const [children, setChildren] = useState(null)

  useEffect(() => {
    gatewayRegistry.addContainer(name, setChildren)
    return () => {
      gatewayRegistry.removeContainer(name)
    }
  }, []);

  return unmountOnEmpty && !children
    ? null
    : React.createElement(component || 'div', attrs, children);
}

GatewayDest.propTypes = {
  name: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  unmountOnEmpty: PropTypes.bool
}

export default GatewayDest;
