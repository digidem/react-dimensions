import React from 'react'

const style = {
  width: '100%',
  height: '100%',
  padding: 0,
  border: 0
}

function defaultGetWidth (element) {
  return element.clientWidth
}

function defaultGetHeight (element) {
  return element.clientHeight
}

/**
 * Wraps a react component and adds properties `containerHeight` and
 * `containerWidth`. Useful for responsive design. Properties update on
 * window resize. **Note** that the parent element must have either a
 * height or a width, or nothing will be rendered
 *
 * Can be used as a
 * [higher-order component](http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#property-initializers)
 * or as an [ES7 class decorator](https://github.com/wycats/javascript-decorators)
 * (see examples)
 *
 * v1.0.0 is for React v0.14 only. Use ^0.1.0 for React v0.13
 *
 * @param {object} [options] Options
 * @param {function} [options.getHeight] `getHeight(element)` should return element
 * height, where element is the wrapper div. Defaults to `element.clientHeight`
 * @param {function} [options.getWidth]  `getWidth(element)` should return element
 * width, where element is the wrapper div. Defaults to `element.clientWidth`
 * @return {function}                   Returns a higher-order component that can be
 * used to enhance a react component `Dimensions()(MyComponent)`
 *
 * ### Live Example
 *
 * Will open a browser window for localhost:9966
 *
 * `npm i && npm i react react-dom && npm start`
 *
 * @example
 * // ES2015
 * import React from 'react'
 * import Dimensions from 'react-dimensions'
 *
 * class MyComponent extends React.Component {
 *   render() (
 *     <div
 *       containerWidth={this.props.containerWidth}
 *       containerHeight={this.props.containerHeight}
 *     >
 *     </div>
 *   )
 * }
 *
 * export default Dimensions()(MyComponent) // Enhanced component
 *
 * @example
 * // ES5
 * var React = require('react')
 * var Dimensions = require('react-dimensions')
 *
 * var MyComponent = React.createClass({
 *   render: function() {(
 *     <div
 *       containerWidth={this.props.containerWidth}
 *       containerHeight={this.props.containerHeight}
 *     >
 *     </div>
 *   )}
 * }
 *
 * module.exports = Dimensions()(MyComponent) // Enhanced component
 *
 */
export default function Dimensions (
  {
    getHeight = defaultGetHeight,
    getWidth = defaultGetWidth,
    refreshInterval = 1000  // TODO: Default to 0?
  } = {}) {
  return (ComposedComponent) => {
    return class DimensionsHOC extends React.Component {
      // ES7 Class properties
      // http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#property-initializers
      lastWidth = 0
      lastHeight = 0

      // Using arrow functions and ES7 Class properties to autobind
      // http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#arrow-functions
      getDimensions = () => {
        const container = this.refs.container
        if (!container) {
          // TODO: Is there any problem with initial width/height being set to 0,0?
          return {
            containerWidth: 0,
            containerHeight: 0
          }
        }
        return {
          containerWidth: getWidth(container),
          containerHeight: getHeight(container)
        }
      }

      onResize = () => {
        if (this.rqf) return
        this.rqf = window.requestAnimationFrame(() => {
          this.rqf = null
          this.checkForResize()
        })
      }

      // Check to see if the dimensions have changed, and force an update if necessary.
      checkForResize = () => {
        console.log('checkForResize')
        const dimensions = this.getDimensions()
        if ((this.lastWidth !== dimensions.containerWidth) ||
            (this.lastHeight !== dimensions.containerHeight)) {
          this.lastWidth = dimensions.containerWidth
          this.lastHeight = dimensions.containerHeight
          this.forceUpdate()
        }
      }

      componentDidMount () {
        window.addEventListener('resize', this.onResize, false)
        if ((typeof refreshInterval === 'number') && (refreshInterval > 0)) {
          // TODO: This is probably better done with a single global interval and a list of
          //       components to callback to, but it's fine for now.
          this.interval = window.setInterval(this.checkForResize, 1000)
        }
        this.onResize()
      }

      componentWillUnmount () {
        if (this.interval) {
          window.clearInterval(this.interval)
        }
        window.removeEventListener('resize', this.onResize)
      }

      render () {
        return (
          <div style={style} ref='container'>
            <ComposedComponent {...this.getDimensions()} {...this.props}/>
          </div>
        )
      }
    }
  }
}
