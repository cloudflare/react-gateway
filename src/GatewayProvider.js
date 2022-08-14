import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GatewayContext from './GatewayContext';


function GatewayProvider({ children }) {
	const [_, setCurrentId] = useState(0);
	const [gateways, setGateways] = useState({});
	const [gatewaySorts, setGatewaysSorts] = useState({});
	const [containers, setContainer] = useState({});

	const addGateway = (destName, child, setGatewayId, sort) => {
		verifyDestNameValid(destName);
		verifySortValid(sort);

		setCurrentId(prevCurrentId => {
			const gatewayId = `${destName}##${prevCurrentId}`;
			setGatewayId(gatewayId);

			setGateways(prevGateways => ({
				...prevGateways,
				[gatewayId]: child
			}));

			setGatewaysSorts(prevGatewaySorts => ({
				...prevGatewaySorts,
				[gatewayId]: sort
			}));
			return prevCurrentId + 1;
		});

	};

	const removeGateway = (gatewayId) => {
		setGateways(removeByKey(gatewayId));
		const [destName] = getDestNameAndChildId(gatewayId);
		containers[destName] && containers[destName](
			getContainerChildren(destName)
		);
	};

	const updateGateway = (gatewayId, child) => {
		setGateways(prevGateways => ({
			...prevGateways,
			[gatewayId]: child
		}));
	};

	const addContainer = (name, setContainerChildren) => {
		verifyDestNameValid(name);
		setContainer(prevContainers => ({
			...prevContainers,
			[name]: setContainerChildren
		}));
	};

	const removeContainer = (name) => {
		setContainer(removeByKey(name));
	};

	const getContainerChildren = (name) => {
		return Object.keys(gateways)
			.map(gatewayId => {
				const [destName] = getDestNameAndChildId(gatewayId);
				if (destName != name) {
					return null;
				}
				return {
					sort: gatewaySorts[gatewayId],
					gateways: gateways[gatewayId],
				};
			})
			.sort((a, b) => {
				return getSortValue(a) - getSortValue(b);
			})
			.map(sortContext => {
				return sortContext && sortContext.gateways;
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

function removeByKey(keyToRemove) {
	return (removeFrom) => {
		let clone = Object.assign({}, removeFrom);
		delete clone[keyToRemove];
		return clone;
	};
}

function getDestNameAndChildId(gatewayId) {
	return gatewayId.split('##');
}

function verifyDestNameValid(destName) {
	if (destName.indexOf('##') != -1) {
		throw new Error('dest names should not have ##');
	}
}

function verifySortValid(sort) {
	if (sort && typeof sort !== 'number') {
		throw new Error('sort should be a number');
	}
}

function getSortValue(sortContext){
	if(!sortContext|| sortContext.sort === undefined) {
		return Number.MAX_VALUE;
	}
	return sortContext.sort;
};


export default GatewayProvider;
