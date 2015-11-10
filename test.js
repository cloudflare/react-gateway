'use strict';

var expect = require('chai').expect;
var React = require('react');
var ReactDOM = require('react-dom');
var d = React.createElement;

var ReactGateway = require('./');

describe('ReactGateway', function() {
  beforeEach(function() {
    this.root = document.createElement('div');
    document.body.appendChild(this.root);
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(this.root);
    document.body.removeChild(this.root);
    delete this.root;
  });

  it('should not render anything inside itself', function() {
    var dom = d(ReactGateway, null, d('div'));
    var instance = ReactDOM.render(dom, this.root);
    expect(ReactDOM.findDOMNode(instance)).to.be.null;
  });

  it('should create a new element expose it as `gatewayNode`', function() {
    var dom = d(ReactGateway, null, d('div'));
    var instance = ReactDOM.render(dom, this.root);
    expect(instance).to.have.property('gatewayNode');
    expect(instance.gatewayNode).to.be.instanceOf(Element);
  });

  it('should create a new element and append it to `document.body`', function() {
    var dom = d(ReactGateway, null, d('h1', null, 'Hello world'));
    var instance = ReactDOM.render(dom, this.root);
    var child = instance.gatewayNode.children[0];
    expect(child.tagName).to.equal('H1');
    expect(child.textContent).to.equal('Hello world');
    expect(instance.gatewayNode.parentNode).to.equal(document.body);
  });

  it('should update with new props', function() {
    var dom = d(ReactGateway, null, d('div'));
    var instance = ReactDOM.render(dom, this.root);
    instance.componentWillReceiveProps({ children: d('span') });
    var child = instance.gatewayNode.children[0];
    expect(child).to.have.property('tagName', 'SPAN');
  });

  it('should cleanup after itself', function() {
    var dom = d(ReactGateway, null, d('div'));
    var instance = ReactDOM.render(dom, this.root);
    var gatewayNode = instance.gatewayNode;
    ReactDOM.unmountComponentAtNode(this.root);
    expect(instance).not.to.have.property('gatewayNode');
    expect(gatewayNode.parentNode).to.equal(null);
  });

  it('should be able to specify a `to` node', function() {
    var toNode = document.createElement('div');
    document.body.appendChild(toNode);
    var dom = d(ReactGateway, { to: toNode }, d('div'));
    var instance = ReactDOM.render(dom, this.root);
    expect(instance.gatewayNode.parentNode).to.equal(toNode);
    ReactDOM.unmountComponentAtNode(this.root);
    document.body.removeChild(toNode);
  });
});
