# react-dimensions

React [higher-order component](https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775) to get the dimensions of a wrapper element and pass them as properties to the child element.

v^1.0.0 is for React v0.14 and above. Use ^0.1.0 for React v0.13

## Why? How?

Some React components require a width to be set in pixels, and cannot be set to `100%`. This is a challenge for responsive design. This component measures the size of the parent node, and then passes these dimensions to your component.

## Installation

Requires [nodejs](http://nodejs.org/).

```sh
$ npm install react-dimensions
```

## API

### Dimensions([options])(MyComponent)

Wraps a react component and adds properties `containerHeight` and
`containerWidth`. Useful for responsive design. Properties update on
window resize. **Note** that the parent element must have either a
height or a width, or nothing will be rendered

Can be used as a
[higher-order component](http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#property-initializers)
or as an [ES7 class decorator](https://github.com/wycats/javascript-decorators)
(see examples)

**Parameters**

-   `options` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)=**
    -   `options.getHeight` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)=** A function that is passed an element and returns element
        height, where element is the wrapper div. Defaults to `(element) => element.clientHeight`
    -   `options.getWidth` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)=** A function that is passed an element and returns element
        width, where element is the wrapper div. Defaults to `(element) => element.clientWidth`
    -   `options.containerStyle` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)=** A style object for the `<div>` that will wrap your component.
        If you are using a flexbox layout you will need to style this `div` rather than your wrapped component (because flexbox only works with direct children). The default style is
        `{ margin: 0, padding: 0, border: 0 }`.
    -   `options.elementResize` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)=** Set true to watch the wrapper `div` for changes in
        size which are not a result of window resizing - e.g. changes to the flexbox and other layout. (optional, default `false`)

**Examples**

```javascript
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

```javascript
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

Returns **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** A higher-order component that can be
used to enhance a react component `Dimensions()(MyComponent)`

### getWrappedInstance()

Returns the underlying wrapped component instance.
Useful if you need to access a method or property of the component
passed to react-dimensions.

Returns **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** The wrapped React component instance

## Live Example

Will open a browser window for localhost:9966

`npm i && npm i react react-dom && npm start`

## Tests

```sh
$ npm test
```
