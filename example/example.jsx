import React, { PropTypes } from 'react'
import ReactDom from 'react-dom'
import Dimensions from '../index.jsx'

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

const EnhancedComponent = Dimensions({elementResize: true})(MyComponent)

const div = document.createElement('div')
document.body.appendChild(div)

class Example extends React.Component {
  state = {
    right: 50
  }

  handleButtonClick = () => {
    this.setState({
      right: this.state.right === 50 ? 200 : 50
    })
  }

  render () {
    return (
      <div>
        <button onClick={this.handleButtonClick}>Resize container</button>
        <div style={{
          position: 'absolute',
          top: 50,
          right: this.state.right,
          bottom: 50,
          left: 50
        }}>
          <EnhancedComponent />
        </div>
      </div>
    )
  }
}

ReactDom.render((
  <Example />
), div)
