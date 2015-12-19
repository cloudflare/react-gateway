# React Gateway

> Render React DOM into a new context

This can be used to implement various UI components such as modals.
See [`react-modal2`](https://github.com/cloudflare/react-modal2).

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
      </GatewayProvider>
    );
  }
}
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
including `tagName`, and they will be passed to the created element.

```diff
  import React from 'react';
  import {
    GatewayProvider,
    GatewayDest
  } from 'react-gateway';

  export default class Application extends React.Component {
    render() {
      return (
        <GatewayProvider>
          <div>
            {this.props.children}
-           <GatewayDest name="global"/>
+           <GatewayDest name="global" tagName="section" className="global-gateway"/>
          </div>
        </GatewayProvider>
      );
    }
  }
```
