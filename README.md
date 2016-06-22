# React Gateway

> Render React DOM into a new context (aka "Portal")

This can be used to implement various UI components such as modals.
See [`react-modal2`](https://github.com/cloudflare/react-modal2).

It also works in universal (isomorphic) React applications without any
additional setup.

## Installation

```sh
$ npm install --save react-gateway
```

## Example

```js
import React from 'react';
import {
  Gateway,
  GatewayDest,
  GatewayProvider
} from 'react-gateway';

export default class Application extends React.Component {
  render() {
    return (
      <GatewayProvider>
        <div>
          <h1>React Gateway Universal Example</h1>
          <div className="container">
            <Gateway into="one">
              <div className="item">Item 1</div>
            </Gateway>
            <Gateway into="two">
              <div className="item">Item 2</div>
            </Gateway>
            <div className="item">Item 3</div>
          </div>
          <GatewayDest name="one" tagName="section" className="hello"/>
          <GatewayDest name="two"/>
        </div>
      </GatewayProvider>
    );
  }
}
```

Will render as:

```js
<div>
  <h1>React Gateway Universal Example</h1>
  <div className="container">
    <noscript></noscript>
    <noscript></noscript>
    <div className="item">Item 3</div>
  </div>
  <section className="hello">
    <div className="item">Item 1</div>
  </section>
  <div>
    <div className="item">Item 2</div>
  </div>
</div>
```

## Usage

To get started with React Gateway, first wrap your application in the
`<GatewayProvider>`.

```diff
  import React from 'react';
+ import {
+   GatewayProvider
+ } from 'react-gateway';

  export default class Application extends React.Component {
    render() {
      return (
+       <GatewayProvider>
          <div>
            {this.props.children}
          </div>
+       </GatewayProvider>
      );
    }
  }
```

Then insert a `<GatewayDest>` whereever you want it to render and give it a
name.

```diff
  import React from 'react';
  import {
    GatewayProvider,
+   GatewayDest
  } from 'react-gateway';

  export default class Application extends React.Component {
    render() {
      return (
        <GatewayProvider>
          <div>
            {this.props.children}
+           <GatewayDest name="global"/>
          </div>
        </GatewayProvider>
      );
    }
  }
```

Then in any of your components (that get rendered inside of the
`<GatewayProvider>`) add a `<Gateway>`.

```diff
  import React from 'react';
+ import {Gateway} from 'react-gateway';

  export default class MyComponent extends React.Component {
    render() {
      return (
        <div>
+         <Gateway into="global">
+           Will render into the "global" gateway.
+         </Gateway>
        </div>
      );
    }
  }
```

If you want to customize the `<GatewayDest>` element, you can pass any props,
including `component` (which will allows you to specify a `tagName` or custom
component), and they will be passed to the created element.

```diff
  export default class Application extends React.Component {
    render() {
      return (
        <GatewayProvider>
          <div>
            {this.props.children}
-           <GatewayDest name="global"/>
+           <GatewayDest name="global" component="section" className="global-gateway"/>
          </div>
        </GatewayProvider>
      );
    }
  }
```

## How it works

React Gateway works very differently than most React "portals" in order to work
in server-side rendered React applications.

It maintains an internal registry of "containers" and "children" which manages
where things should be rendered.

This registry is created by `<GatewayProvider>` and passed to `<Gateway>` and
`<GatewayDest>` invisibly via React's `contextTypes`.

Whenever a child or container is added or removed, React Gateway will
update its internal registry and ensure things are properly rendered.
