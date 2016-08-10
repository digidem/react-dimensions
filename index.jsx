const _debounce = require('lodash.debounce')
const React = require('react')
const onElementResize = require('element-resize-event')

const defaultContainerStyle = {
  padding: 0,
  border: 0,
  margin: 0
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
 * @param {object} [options]
 * @param {function} [options.getHeight] A function that is passed an element and returns element
 * height, where element is the wrapper div. Defaults to `(element) => element.clientHeight`
 * @param {function} [options.getWidth]  A function that is passed an element and returns element
 * width, where element is the wrapper div. Defaults to `(element) => element.clientWidth`
 * @param {number} [options.debounce] Optionally debounce the `onResize` callback function by
 * supplying the delay time in milliseconds. This will prevent excessive dimension
 * updates. See
 * https://lodash.com/docs#debounce for more information. Defaults to `0`, which disables debouncing.
 * @param {object} [options.debounceOpts] Options to pass to the debounce function. See
 * https://lodash.com/docs#debounce for all available options. Defaults to `{}`.
 * @param {object} [options.containerStyle] A style object for the `<div>` that will wrap your component.
 * The dimensions of this `div` are what are passed as props to your component. The default style is
 * `{ width: '100%', height: '100%', padding: 0, border: 0 }` which will cause the `div` to fill its
 * parent in most cases. If you are using a flexbox layout you will want to change this default style.
 * @param {string} [options.className] Control the class name set on the wrapper `<div>`
 * @param {boolean} [options.elementResize=false] Set true to watch the wrapper `div` for changes in
 * size which are not a result of window resizing - e.g. changes to the flexbox and other layout.
 * @return {function}                   A higher-order component that can be
 * used to enhance a react component `Dimensions()(MyComponent)`
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
module.exports = function Dimensions ({
    getHeight = defaultGetHeight,
    getWidth = defaultGetWidth,
    debounce = 0,
    debounceOpts = {},
    containerStyle = defaultContainerStyle,
    className = null,
    elementResize = false
  } = {}) {
  return (ComposedComponent) => {
    return class DimensionsHOC extends React.Component {
      // ES7 Class properties
      // http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#property-initializers
      state = {}

      // Using arrow functions and ES7 Class properties to autobind
      // http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#arrow-functions

      // Immediate updateDimensions callback with no debounce
      updateDimensionsImmediate = () => {
        const container = this._parent
        const containerWidth = getWidth(container)
        const containerHeight = getHeight(container)

        if (containerWidth !== this.state.containerWidth ||
            containerHeight !== this.state.containerHeight) {
          this.setState({containerWidth, containerHeight})
        }
      }

      // Optionally-debounced updateDimensions callback
      updateDimensions = debounce === 0 ? this.updateDimensionsImmediate
        : _debounce(this.updateDimensionsImmediate, debounce, debounceOpts)

      onResize = () => {
        if (this.rqf) return
        this.rqf = this.getWindow().requestAnimationFrame(() => {
          this.rqf = null
          this.updateDimensions()
        })
      }

      // If the component is mounted in a different window to the javascript
      // context, as with https://github.com/JakeGinnivan/react-popout
      // then the `window` global will be different from the `window` that
      // contains the component.
      // Depends on `defaultView` which is not supported <IE9
      getWindow () {
        return this.refs.container ? (this.refs.container.ownerDocument.defaultView || window) : window
      }

      componentDidMount () {
        if (!this.refs.container) {
          throw new Error('Cannot find container div')
        }
        this._parent = this.refs.container.parentNode
        this.updateDimensions()
        if (elementResize) {
          // Experimental: `element-resize-event` fires when an element resizes.
          // It attaches its own window resize listener and also uses
          // requestAnimationFrame, so we can just call `this.updateDimensions`.
          onElementResize(this._parent, this.updateDimensions)
        } else {
          this.getWindow().addEventListener('resize', this.onResize, false)
        }
      }

      componentWillUnmount () {
        this.getWindow().removeEventListener('resize', this.onResize)
      }

      /**
       * Returns the underlying wrapped component instance.
       * Useful if you need to access a method or property of the component
       * passed to react-dimensions.
       *
       * @return {object} The rendered React component
       **/
      getWrappedInstance () {
        return this.refs.wrappedInstance
      }

      render () {
        const {containerWidth, containerHeight} = this.state
        if (this._parent && !containerWidth && !containerHeight) {
          // only trigger a warning about the wrapper div if we already have a reference to it
          console.warn('Wrapper div has no height or width, try overriding style with `containerStyle` option')
        }
        return (
          <div className={className} style={containerStyle} ref='container'>
            {(containerWidth || containerHeight) &&
              <ComposedComponent
                {...this.state}
                {...this.props}
                updateDimensions={this.updateDimensions}
                ref='wrappedInstance'
              />
            }
          </div>
        )
      }
    }
  }
}
