# React Gateway

> Render React DOM into a new context on document.body

This can be used to implement various UI components such as modals.
See [`react-modal2`](https://github.com/cloudflare/react-modal2).

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
      <ReactGateway to={document.body}>
        <h1>Hello World</h1>
      </ReactGateway>
    );
  }
}
```

## Props

| Name | Type | Description |
| --- | --- | --- | --- |
| `to` | `HTMLElement` | Specify where in the DOM to go to. (Default: `document.body`) |
| `className` | `String` | Add a className to the generated DOM node. |
