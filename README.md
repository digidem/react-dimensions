# react-dimensions

React [higher-order component](https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775) to get dimensions of container


### `Dimensions([options], [options.getHeight], [options.getWidth])`

Wraps a react component and adds properties `containerHeight` and
`containerWidth`. Useful for responsive design. Properties update on
window resize. **Note** that the parent element must have either a
height or a width, or nothing will be rendered

Can be used as a
[higher-order component](http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#property-initializers)
or as an [ES7 class decorator](https://github.com/wycats/javascript-decorators)
(see examples)

v1.0.0 is for React v0.14 only. Use ^0.1.0 for React v0.13

### Parameters

| parameter             | type     | description                                                                                                                         |
| --------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `[options]`           | object   | _optional:_ Options                                                                                                                 |
| `[options.getHeight]` | function | _optional:_ `getHeight(element)` should return element height, where element is the wrapper div. Defaults to `element.clientHeight` |
| `[options.getWidth]`  | function | _optional:_ `getWidth(element)` should return element width, where element is the wrapper div. Defaults to `element.clientWidth`    |


### Example

```js
// ES2015
import React from 'react'
import Dimensions from 'react-dimensions'

class MyComponent extends React.Component {
  render() (
    <div
      containerWidth={this.props.containerWidth}
      containerHeight={this.props.containerHeight}
    >
    </div>
  )
}

export default Dimensions()(MyComponent) // Enhanced component
```


```js
// ES5
var React = require('react')
var Dimensions = require('react-dimensions')

var MyComponent = React.createClass({
  render: function() {(
    <div
      containerWidth={this.props.containerWidth}
      containerHeight={this.props.containerHeight}
    >
    </div>
  )}
}

module.exports = Dimensions()(MyComponent) // Enhanced component
```


**Returns** `function`, Returns a higher-order component that can be used to enhance a react component `Dimensions()(MyComponent)`

### Live Example

Will open a browser window for localhost:9966

`npm i && npm i react react-dom && npm start`

## Installation

Requires [nodejs](http://nodejs.org/).

```sh
$ npm install react-dimensions
```

## Tests

```sh
$ npm test
```


