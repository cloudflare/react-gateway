import React, {
  useContext,
  useLayoutEffect,
  useEffect,
  useState
} from 'react';
import PropTypes from 'prop-types';
import GatewayContext from './GatewayContext';

function Gateway({ into, children, sort }) {
  const [gatewayId, setGatewayId] = useState(null);
  const { addGateway, removeGateway, updateGateway } = useContext(GatewayContext);

  useEffect(() => {
    let gatewayId;
    const onSetGatewayId = (gatewayIdParam) => {
      gatewayId = gatewayIdParam;
      setGatewayId(gatewayIdParam);
    };
    addGateway(into, children, onSetGatewayId, sort);
    return () => {
      removeGateway(gatewayId);
    };
  }, []);

  useEffect(() => {
    if (!gatewayId) { return; }
    updateGateway(gatewayId, children);
  }, [gatewayId, children]);

  return null;
}

Gateway.propTypes = {
  into: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default Gateway;
