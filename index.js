'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
  displayName: 'ReactGateway',

  propTypes: {
    className: React.PropTypes.string,
    children: React.PropTypes.element.isRequired
  },

  componentDidMount: function() {
    this.gatewayNode = document.createElement('div');
    if (this.props.className) this.gatewayNode.className = this.props.className;
    document.body.appendChild(this.gatewayNode);
    this.renderIntoGatewayNode(this.props);
  },

  componentWillReceiveProps: function(props) {
    this.renderIntoGatewayNode(props);
  },

  componentWillUnmount: function() {
    ReactDOM.unmountComponentAtNode(this.gatewayNode);
    document.body.removeChild(this.gatewayNode);
    delete this.gatewayNode;
  },

  renderIntoGatewayNode: function(props) {
    delete props.ref;
    ReactDOM.unstable_renderSubtreeIntoContainer(this, props.children, this.gatewayNode);
  },

  render: function() {
    return null;
  }
});
