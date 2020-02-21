import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GatewayContext from './GatewayContext';

function GatewayProvider({ children }) {
	const [_, setCurrentId] = useState(0);
	const [gateways, setGateways] = useState({});
	const [__, setContainer] = useState({});

	const addGateway = (destName, child, setGatewayId) => {
		verifyDestNameValid(destName);

		setCurrentId(prevCurrentId => {
			const gatewayId = `${destName}##${prevCurrentId}`;
			setGateways(prevGateways => ({
				...prevGateways,
				[gatewayId]: child
			}));
			setGatewayId(gatewayId);
			return prevCurrentId + 1;
		});
	};

	const removeGateway = () => { };
	const updateGateway = (gatewayId, child) => {
		setGateways(prevGateways => ({
			...prevGateways,
			[gatewayId]: child
		}));
	};
	const addContainer = (name, setContainerChildren) => {
		setContainer(prevContainers => ({
			...prevContainers,
			[name]: setContainerChildren
		}));
	};

	const removeContainer = (name) => {
		setContainer(prevContainers => ({
			...prevContainers,
			[name]: undefined
		}));
	};

	const getContainerChildren = (name) => {
		return Object.keys(gateways)
			.map(gatewayId => {
				const [destName] = getDestNameAndChildId(gatewayId);
				if (destName != name) {
					return null;
				}
				return gateways[gatewayId];
			});
	};

	const setState = {
		addGateway,
		removeGateway,
		updateGateway,
		addContainer,
		removeContainer,
		getContainerChildren,
	};

	return (
		<GatewayContext.Provider value={setState}>
			{children}
		</GatewayContext.Provider>
	);
}

GatewayProvider.propTypes = {
	children: PropTypes.element,
};

function getDestNameAndChildId(gatewayId) {
	return gatewayId.split('##');
}

function verifyDestNameValid(destName) {
	if (destName.indexOf('##') != -1) {
		throw new Error('into should not have ##');
	}
}

export default GatewayProvider;