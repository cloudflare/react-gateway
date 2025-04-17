import React, { useContext, useState } from 'react';
import { create, act } from 'react-test-renderer';

import {
  Gateway,
  GatewayDest,
  GatewayProvider,
} from '../src/index.js';

import { withExposedSetState } from './utils.js';

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

    it('should not render (or render) when no (or some) Gateways are registered and "unmountOnEmpty" is set ', function () {
      expect(rendered).toMatchSnapshot();

      act(() => {
        setState(true);
      });
      expect(rendered).toMatchSnapshot();

      act(() => {
        setState(false);
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

  it('should not render on null Gateway', function () {

    let rendered;
    const { Component, setState } = withExposedSetState(({ setSetState }) => {
      return (
        <GatewayProvider>
          <div>
            <GatewayDest name="dest" unmountOnEmpty />
            <Gateway into="dest">{null}</Gateway>
          </div>
        </GatewayProvider>
      );
    });

    act(() => {
      rendered = create(
        <Component />
      );
    });
    expect(rendered).toMatchSnapshot();
  });


});
