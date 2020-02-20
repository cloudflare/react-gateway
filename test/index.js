import React from 'react';
import { create, act } from 'react-test-renderer';
import ReactDOMServer from 'react-dom/server';
import {
  Gateway,
  GatewayDest,
  GatewayProvider,
  GatewayRegistry
} from '../src/index.js';

describe('Gateway', function () {
  it('should render Gateway in GatewayDest', function () {
    let rendered;
    act(() => {
      rendered = create(
        <GatewayProvider>
          <div>
            <section>
              <Gateway into="foo">
                Hello World
            </Gateway>
            </section>
            <GatewayDest name="foo" />
          </div>
        </GatewayProvider>
      );
    });
    expect(rendered).toMatchSnapshot();
  });

  it('should be able to customize the GatewayDest element', function () {
    let rendered;

    act(() => {
      rendered = create(
        <GatewayProvider>
          <GatewayDest component="section" className="elf" id="striped" name="foo" />
        </GatewayProvider>,
      );
    })
    expect(rendered).toMatchSnapshot();
  });

  it('should be able to customize the GatewayDest with custom components', function () {
    function Child(props) {
      return <h1 id={props.id}>{props.children}</h1>;
    }
    let rendered;
    act(() => {
      rendered = create(
        <GatewayProvider>
          <GatewayDest component={Child} id="test" name="foo" />
        </GatewayProvider>
      );
    });
    expect(rendered).toMatchSnapshot();
  });

  it('should render into the correct GatewayDest', function () {
    let rendered;
    act(() => {
      rendered = create(
        <GatewayProvider>
          <div>
            <Gateway into="foo">One</Gateway>
            <Gateway into="bar">Two</Gateway>
            <GatewayDest name="bar" />
            <GatewayDest name="foo" />
          </div>
        </GatewayProvider>
      );
    });
    expect(rendered).toMatchSnapshot();
  });

  it('should render multiple children into a single GatewayDest', function () {
    let rendered;
    act(() => {
      rendered = create(
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
            <GatewayDest name="foo" />
          </div>
        </GatewayProvider>
      );
    });
    expect(rendered).toMatchSnapshot();
  });
});

describe('GatewayDest', function () {
  it('should render div w/ className and component', function () {
    class Application extends React.Component {
      render() {
        return (
          <GatewayProvider>
            <div>
              <GatewayDest name="dest" className="something" component="span" />
            </div>
          </GatewayProvider>
        );
      }
    }
    const rendered = create(
      <Application />
    );
    expect(rendered).toMatchSnapshot();
  });

  it('should not render when no Gateways are registered and "unmountOnEmpty" is set ', function () {
    class Application extends React.Component {
      render() {
        return (
          <GatewayProvider>
            <div>
              <GatewayDest name="dest" unmountOnEmpty />
            </div>
          </GatewayProvider>
        );
      }
    }
    const rendered = create(
      <Application />
    );
    expect(rendered).toMatchSnapshot();
  });

  it('should render when there are Gateways are registered and "unmountOnEmpty" is set ', function () {
    class Application extends React.Component {
      render() {
        return (
          <GatewayProvider>
            <div>
              <Gateway into="dest">hello</Gateway>
              <GatewayDest name="dest" unmountOnEmpty />
            </div>
          </GatewayProvider>
        );
      }
    }
    const rendered = create(
      <Application />
    );
    expect(rendered).toMatchSnapshot();
  });
});

describe('GatewayRegistry', function () {
  describe('register', function () {
    it('should return a gateway id', function () {
      const gatewayRegistry = new GatewayRegistry();
      expect(gatewayRegistry.register('test', <span />)).toEqual('test_0');
    });

    it('should increment intrernal ids', function () {
      const gatewayRegistry = new GatewayRegistry();
      gatewayRegistry.register('test', <span />);
      gatewayRegistry.register('test', <span />);
      expect(gatewayRegistry._currentId).toEqual(2);
    });
  });
});
