import {expect} from 'chai';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {
  Gateway,
  GatewayDest,
  GatewayProvider
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
        <section>
          <noscript/>
        </section>
        <div>Hello World</div>
      </div>
    );
  });

  it('should be able to customize the GatewayDest element', function() {
    assertEqual(
      <GatewayProvider>
        <GatewayDest tagName="section" className="elf" id="striped" name="foo"/>
      </GatewayProvider>,
      // should equal
      <section className="elf" id="striped"/>
    );
  });

  it('should be able to render multiple elements into GatewayDest', function() {
    assertEqual(
      <GatewayProvider>
        <div>
          <Gateway into="foo">One</Gateway>
          <Gateway into="foo">Two</Gateway>
          <GatewayDest name="foo"/>
        </div>
      </GatewayProvider>,
      // should equal
      <div>
        <noscript/>
        <noscript/>
        <div>OneTwo</div>
      </div>
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
        <noscript/>
        <noscript/>
        <div>Two</div>
        <div>One</div>
      </div>
    );
  });
});
