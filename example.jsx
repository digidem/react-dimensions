import React, { PropTypes } from 'react'
import ReactDom from 'react-dom'
import Dimensions from './index.jsx'

class MyComponent extends React.Component {
  static propTypes = {
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired
  }

  render () {
    return (
      <div style={{
        backgroundColor: 'LightGreen',
        width: this.props.containerWidth,
        height: this.props.containerHeight
      }}>
      {`${this.props.containerWidth}px x ${this.props.containerHeight}px`}
      </div>
		)
  }
}

const EnhancedComponent = Dimensions()(MyComponent)

const div = document.createElement('div')
document.body.appendChild(div)

ReactDom.render((
  <div style={{
    position: 'absolute',
    top: 20,
    right: 50,
    bottom: 20,
    left: 50
  }}>
    <EnhancedComponent />
  </div>
), div)
