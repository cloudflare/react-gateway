import React from 'react';
import PropTypes from 'prop-types';
import GatewayContext from './GatewayContext';
import GatewayRegistry from './GatewayRegistry';

function GatewayProvider({ children }) {
	return (
		<GatewayContext.Provider value={new GatewayRegistry()}>
			{children}
		</GatewayContext.Provider>
	)
}

GatewayProvider.propTypes = {
	children: PropTypes.element,

}

export default GatewayProvider;