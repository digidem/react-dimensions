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
 * window resize. **Note** that the parent element must have a height, or else
 * nothing will be rendered.
 *
 * Can be used as an [ES7 class decorator](https://github.com/wycats/javascript-decorators) or a
 * [higher-order component](http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#property-initializers)
 * (see examples)
 *
 * @param  {function} [options.getHeight] `getHeight(element)` should return element
 * height, where element is the wrapper div. Defaults to `element.clientHeight`
 * @param  {function} [options.getWidth]  `getWidth(element)` should return element
 * width, where element is the wrapper div. Defaults to `element.clientWidth`
 * @return {function}                   Returns a decorator that can be used to
 * enhance a react component `Enhance(MyComponent)`
 * @example
 * import Dimensions from 'react-dimensions'
 *
 * class MyComponent {
 *   render() (
 *     <div>
 *       {`containerWidth=${this.props.containerWidth},`}
 *       {`containerHeight=${$this.props.containerHeight}`}
 *     </div>
 *   )
 * }
 *
 * export default Dimensions()(MyComponent) // Enhanced component
 */
export default function Dimensions ({ getHeight = defaultGetHeight, getWidth = defaultGetWidth } = {}) {
  return (ComposedComponent) => {
    return class extends React.Component {
      // ES7 Class properties
      // http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#property-initializers
      state = {}

      // Using arrow functions and ES7 Class properties to autobind
      // http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#arrow-functions
      updateDimensions = () => {
        const container = React.findDOMNode(this.refs.container)
        if (!container) {
          throw new Error('Cannot find container div')
        }
        this.setState({
          containerWidth: getWidth(container),
          containerHeight: getHeight(container)
        })
      }

      onResize = () => {
        if (this.rqf) return
        this.rqf = window.requestAnimationFrame(() => {
          this.rqf = null
          this.updateDimensions()
        })
      }

      componentDidMount () {
        this.updateDimensions()
        window.addEventListener('resize', this.onResize, false)
      }

      componentWillUnmount () {
        window.removeEventListener('resize', this.onResize)
      }

      render () {
        return (
          <div style={style} ref='container'>
            {this.state.containerHeight && <ComposedComponent {...this.state} {...this.props}/>}
          </div>
        )
      }
    }
  }
}
