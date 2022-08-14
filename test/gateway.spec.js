import React, { useContext, useState } from 'react';
import { create, act } from 'react-test-renderer';
import {render, within, fireEvent, waitFor, screen} from '@testing-library/react';


import {
  Gateway,
  GatewayDest,
  GatewayProvider,
} from '../src/index.js';


import { withExposedSetState } from './utils.js';

describe('Gateway', function () {
  describe('verification', () => {
    beforeEach(() => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
    });
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
  });

  describe('sorting', () => {
    beforeEach(() => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    it('should render in natural order', () => {
      render(
          <GatewayProvider>
            <div>
              <section>
                <Gateway into="foo"> First </Gateway>
                <Gateway into="foo"> Second </Gateway>
              </section>
              <GatewayDest name="foo" data-testid="mydiv"/>
            </div>
          </GatewayProvider>
        );
      const textContent = screen.getByTestId('mydiv').textContent;
      expect(textContent).toContain('First  Second');
    });
    it('should render by sort prop', () => {
      let rendered = render(
          <GatewayProvider>
            <div>
              <section>
                <Gateway into="foo" sort={2}> Second </Gateway>
                <Gateway into="foo" sort={1}> First </Gateway>
              </section>
              <GatewayDest name="foo" data-testid="mydiv"/>
            </div>
          </GatewayProvider>
        );
      const textContent = screen.getByTestId('mydiv').textContent;
      expect(textContent).toContain('First  Second');
    });
    it('should render undefined sort prop last', () => {
      render(
          <GatewayProvider>
            <div>
              <section>
                <Gateway into="foo"> Third </Gateway>
                <Gateway into="foo" sort={2}> Second </Gateway>
                <Gateway into="foo" sort={1}> First </Gateway>
              </section>
              <GatewayDest name="foo" data-testid="mydiv"/>
            </div>
          </GatewayProvider>
        );
      const textContent = screen.getByTestId('mydiv').textContent;
      expect(textContent).toContain('First  Second  Third');
    });
    it('should render undefined sort prop in natural order', () => {
      render(
          <GatewayProvider>
            <div>
              <section>
                <Gateway into="foo"> Second </Gateway>
                <Gateway into="foo"> Third </Gateway>
                <Gateway into="foo" sort={3}> First </Gateway>
              </section>
              <GatewayDest name="foo" data-testid="mydiv"/>
            </div>
          </GatewayProvider>
        );
      const textContent = screen.getByTestId('mydiv').textContent;
      expect(textContent).toContain('First  Second  Third');
    });
    it('should validate sort to be a number only', () => {
      const throwingRender = () => {
        act(() => {
          create(
            <GatewayProvider>
              <Gateway into="invalid" sort={() => {}} />
            </GatewayProvider>
          );
        });
      };
      expect(throwingRender).toThrow('sort should be a number');
    });
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
