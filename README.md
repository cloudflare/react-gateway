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
      <ReactGateway to={document.body}>
        <h1>Hello World</h1>
      </ReactGateway>
    );
  }
}
```

## Props

| Name | Type | Description | Required
| --- | --- | --- | --- | --- |
| `to` | `HTMLElement` | Specify where in the DOM to go to. (Default: `document.body`) | yes |
| `className` | `String` | Add a className to the generated DOM node. | no |

`to` prop is required to keep `react-gateway` renderable on server. You can wrap ReactGateway by your own component 
and supply `document.body` there.
