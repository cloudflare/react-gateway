import { createContext } from 'react';
import GatewayRegistry from './GatewayRegistry';

const gatewayRegistry = new GatewayRegistry();
const GatewayContext = createContext(gatewayRegistry);

export {
	GatewayContext as default,
	gatewayRegistry,
};