import React from 'react';
import {
  Gateway,
  GatewayDest,
  GatewayProvider
} from '../src/index';

class Application extends React.Component {
  render() {
    return (
      <div>
        <h1>React Gateway Universal Example</h1>
        <div className="container">
          <Gateway into="one">
            <div className="item">Item 1</div>
          </Gateway>
          <Gateway into="two">
            <div className="item">Item 2</div>
          </Gateway>
          <Gateway into="one">
            <div className="item">Item 3</div>
          </Gateway>
          <div className="item">Item 4</div>
        </div>
        <GatewayDest name="one" tagName="section" className="hello"/>
        <GatewayDest name="two"/>
      </div>
    );
  }
}

export default class Root extends React.Component {
  render() {
    return (
      <GatewayProvider>
        <Application/>
      </GatewayProvider>
    );
  }
}
