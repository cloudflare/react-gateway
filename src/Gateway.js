import React, {
  useContext,
  useLayoutEffect,
  useEffect,
  useState
} from 'react';
import PropTypes from 'prop-types';
import GatewayContext from './GatewayContext';

function Gateway({ into, children }) {
  const [gatewayId, setGatewayId] = useState(null)
  const gatewayRegistry = useContext(GatewayContext);

  useEffect(() => {
    setGatewayId(
      gatewayRegistry.register(into, children)
    );
    return () => {
      gatewayRegistry.unregister(into, gatewayId);
    }
  }, []);

  useEffect(() => {
    if (gatewayId) {
      gatewayRegistry.addChild(into, gatewayId, children);
    }
  }, [gatewayId])

  useEffect(() => {
    return () => {
      gatewayRegistry.clearChild(into, gatewayId)
      gatewayRegistry.addChild(into, gatewayId, children);
    }
  }, [into, children]);

  return null;
}

Gateway.propTypes = {
  into: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default Gateway;
