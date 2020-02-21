import React, { useContext, useState } from 'react';
import { create, act } from 'react-test-renderer';
import ReactDOMServer from 'react-dom/server';
import {
  Gateway,
  GatewayDest,
  GatewayProvider,
  GatewayRegistry,
} from '../src/index.js';
import GatewayContext from '../src/GatewayContext';

const withExposedSetState = (Component) => {
  let setState;
  let setSetState = (setStateParam) => {
    setState = setStateParam;
  };
  return {
    setState: (state) => {
      setState(state);
    },
    Component: (props) => <Component setSetState={setSetState} {...props} />
  };
};

describe('Gateway', function () {
  it('throws on invalid dest name', function () {
    const throwingRender = () => {
      act(() => {
        create(
          <GatewayProvider>
            <div>
              <GatewayDest name="invaid##" />
              <Gateway into="invaid##" />
            </div>
          </GatewayProvider>
        );
      });
    };
    expect(throwingRender).toThrow('dest names should not have ##');
  });

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
    });
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

  it('should update Gateway child', async function () {
    let rendered;
    const { Component, setState } = withExposedSetState(({ setSetState }) => {
      const [{ text, showChild }, setState] = useState({ text: 'Hello world', showChild: true });
      setSetState(setState);
      return (
        <GatewayProvider>
          <div>
            {showChild && <Gateway into="dest">{text}</Gateway>}
            <GatewayDest name="dest" />
          </div>
        </GatewayProvider>
      );
    });

    act(() => {
      rendered = create(<Component />);
    });
    expect(rendered).toMatchSnapshot();

    act(() => {
      setState({ text: 'world', showChild: true });
    });
    expect(rendered).toMatchSnapshot();

    act(() => {
      setState({ showChild: false });
    });
    expect(rendered).toMatchSnapshot();
  });
});

describe('GatewayDest', function () {
  it('should render div w/ className and component', function () {
    const { Component, setState } = withExposedSetState(({ setSetState }) => {
      const [shouldShow, setState] = useState(true);
      setSetState(setState);
      return (
        <GatewayProvider>
          <div>
            {shouldShow && <GatewayDest name="dest" className="something" component="span" />}
          </div>
        </GatewayProvider>
      );
    });
    let rendered;
    act(() => {
      rendered = create(<Component />);
    });
    expect(rendered).toMatchSnapshot();

    act(() => {
      setState(false);
    });
    expect(rendered).toMatchSnapshot();
  });

  it('throws on invalid dest name', function () {
    const throwingRender = () => {
      act(() => {
        create(
          <GatewayProvider>
            <GatewayDest name="invalid##" />
          </GatewayProvider>
        );
      });
    };
    expect(throwingRender).toThrow('dest names should not have ##');
  });

  describe('prop unmountOnEmpty', function () {

    let rendered;
    const { Component, setState } = withExposedSetState(({ setSetState }) => {
      const [showOneChild, setShowOne] = useState(false);
      setSetState(setShowOne);

      return (
        <GatewayProvider>
          <div>
            <GatewayDest name="dest" unmountOnEmpty />
            {showOneChild && <Gateway into="dest">Hello world</Gateway>}
          </div>
        </GatewayProvider>
      );
    });

    beforeAll(function () {
      act(() => {
        rendered = create(
          <Component />
        );
      });
    });

    it('should not render when no Gateways are registered and "unmountOnEmpty" is set ', function () {
      expect(rendered).toMatchSnapshot();
    });

    it('GatewayDest should render child Gateways on update', function () {
      act(() => {
        setState(true);
      });
      expect(rendered).toMatchSnapshot();
    });

    it('should render when there are Gateways registered and "unmountOnEmpty" is set ', function () {
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
      let rendered;
      act(() => {
        rendered = create(
          <Application />
        );
      });
      expect(rendered).toMatchSnapshot();
    });
  });
});

describe.skip('GatewayRegistry', function () {
  let gatewayRegistry;
  beforeEach(() => {
    gatewayRegistry = new GatewayRegistry();
  });
  describe('registerGateway', function () {
    it('should not allow \'into\' to have ##', function () {
      const shouldThrow = () => {
        gatewayRegistry.registerGateway('test##', <span />);
      };
      expect(shouldThrow).toThrow();
    });
    it('should return a gateway id', function () {
      expect(gatewayRegistry.registerGateway('test', <span />)).toEqual('test##0');
    });

    it('should increment intrernal ids', function () {
      gatewayRegistry.registerGateway('test', <span />);
      gatewayRegistry.registerGateway('test', <span />);
      expect(gatewayRegistry._currentId).toEqual(2);
    });
  });
  describe('unregisterGateway', function () {
    it('should remove registered child', function () {
      const gatewayId = gatewayRegistry.registerGateway('test', <span />);
      expect(gatewayRegistry.childCount('test')).toBe(1);
      gatewayRegistry.unregisterGateway(gatewayId);
      expect(gatewayRegistry.childCount('test')).toBe(0);
    });
  });
});
