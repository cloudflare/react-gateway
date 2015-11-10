'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var ExecutionEnvironment = require('exenv');

var SafeHTMLElement = ExecutionEnvironment.canUseDOM ? window.HTMLElement : {};

module.exports = React.createClass({
  displayName: 'ReactGateway',

  propTypes: {
    to: React.PropTypes.instanceOf(SafeHTMLElement),
    className: React.PropTypes.string,
    children: React.PropTypes.element.isRequired
  },

  getDefaultProps: function() {
    return {
      to: document.body
    };
  },

  componentDidMount: function() {
    this.gatewayNode = document.createElement('div');
    if (this.props.className) this.gatewayNode.className = this.props.className;
    this.props.to.appendChild(this.gatewayNode);
    this.renderIntoGatewayNode(this.props);
  },

  componentWillReceiveProps: function(props) {
    this.renderIntoGatewayNode(props);
  },

  componentWillUnmount: function() {
    ReactDOM.unmountComponentAtNode(this.gatewayNode);
    this.props.to.removeChild(this.gatewayNode);
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
