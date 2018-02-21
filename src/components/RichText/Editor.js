import React, { Component } from 'react'
import Text from './Text'

class Editor extends Component {

  isText = () => <Text {...this.props} getKey={this.getKey}/>
  
  getKey = () => {
    const key = this.props.id.replace('item-', '')
    return parseInt(key)
  } 

  render () {
    return (
      <div>
        {this.isText()}
      </div>
    )
  }
}

export default Editor