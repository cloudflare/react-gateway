import {expect} from 'chai';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {
  Gateway,
  GatewayDest,
  GatewayProvider,
  GatewayRegistry
} from '../src/index.js';

function render(jsx) {
  return ReactDOMServer.renderToStaticMarkup(jsx);
}

function assertEqual(actual, expected) {
  expect(render(actual)).to.equal(render(expected));
}

describe('Gateway', function() {
  it('should render Gateway in GatewayDest', function() {
    assertEqual(
      <GatewayProvider>
        <div>
          <section>
            <Gateway into="foo">
              Hello World
            </Gateway>
          </section>
          <GatewayDest name="foo"/>
        </div>
      </GatewayProvider>,
      // should equal
      <div>
        <section/>
        <div>Hello World</div>
      </div>
    );
  });

  it('should be able to customize the GatewayDest element', function() {
    assertEqual(
      <GatewayProvider>
        <GatewayDest component="section" className="elf" id="striped" name="foo"/>
      </GatewayProvider>,
      // should equal
      <section className="elf" id="striped"/>
    );
  });

  it('should be able to customize the GatewayDest with custom components', function() {
    function Child(props) {
      return <h1 id={props.id}>{props.children}</h1>;
    }

    assertEqual(
      <GatewayProvider>
        <GatewayDest component={Child} id="test" name="foo"/>
      </GatewayProvider>,
      // should equal
      <Child id="test"/>
    );
  });

  it('should render into the correct GatewayDest', function() {
    assertEqual(
      <GatewayProvider>
        <div>
          <Gateway into="foo">One</Gateway>
          <Gateway into="bar">Two</Gateway>
          <GatewayDest name="bar"/>
          <GatewayDest name="foo"/>
        </div>
      </GatewayProvider>,
      // should equal
      <div>
        <div>Two</div>
        <div>One</div>
      </div>
    );
  });

  it('should render multiple children into a single GatewayDest', function() {
    assertEqual(
      <GatewayProvider>
        <div>
          <section>
            <Gateway into="foo">
              <div>One</div>
            </Gateway>
            <div>
              <Gateway into="foo">
                <div>Two</div>
              </Gateway>
            </div>
            <Gateway into="foo">
              <div>Three</div>
            </Gateway>
          </section>
          <GatewayDest name="foo"/>
        </div>
      </GatewayProvider>,
      // should equal
      <div>
        <section>
          <div />
        </section>
        <div>
          <div>One</div>
          <div>Two</div>
          <div>Three</div>
        </div>
      </div>
    );
  });

  it('should pass context', function() {
    class Child extends React.Component {
      static contextTypes = {
        textContent: React.PropTypes.string.isRequired
      };

      constructor(props, context) {
        super(props, context);
        this.textContent = context.textContent;
      }

      render() {
        return (
          <Gateway into="dest">
            <span>{this.textContent}</span>
          </Gateway>
        );
      }
    }

    class Parent extends React.Component {
      static childContextTypes = {
        textContent: React.PropTypes.string.isRequired
      };

      getChildContext() {
        return {
          textContent: 'Hello from context'
        };
      }

      render() {
        return <Child/>;
      }
    }

    class Application extends React.Component {
      render() {
        return (
          <GatewayProvider>
            <div>
              <Parent/>
              <GatewayDest name="dest"/>
            </div>
          </GatewayProvider>
        );
      }
    }

    assertEqual(
      <Application/>,
      // should equal
      <div>
        <div>
          <span>Hello from context</span>
        </div>
      </div>
    );
  });
});

describe('GatewayRegistry', function() {
  describe('register', function () {
    it('should return a gateway id', function () {
      const gatewayRegistry = new GatewayRegistry();
      expect(gatewayRegistry.register('test', <span />)).to.equal('test_0');
    });

    it('should increment intrernal ids', function () {
      const gatewayRegistry = new GatewayRegistry();
      gatewayRegistry.register('test', <span />);
      gatewayRegistry.register('test', <span />);
      expect(gatewayRegistry._currentId).to.equal(2);
    });
  });
});
