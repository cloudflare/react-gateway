# React Gateway

> Render React DOM into a new context on document.body

## Installation

```sh
$ npm install --save react-gateway
```

## Usage

```js
import React from 'react';
import ReactGateway from 'react-gateway';

export default class MyComponent extends React.Component {
  render() {
    return (
      <ReactGateway>
        <h1>Hello World</h1>
      </ReactGateway>
    );
  }
}
```
