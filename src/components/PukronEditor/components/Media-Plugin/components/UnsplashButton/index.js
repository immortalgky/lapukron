import React, { Component } from 'react'
import Portal from './Portal'
import Unsplash from './Unsplash'
import { addContentBlock } from '../../utils'

export default class extends Component {
  state = {
    showPicker: false
  }
  getImageData = (imageData) => {
    return () => {
      this.props.store.get('setEditorState')(addContentBlock(
        this.props.store.get('getEditorState')(),
        'UNSPLASH',
        {url: imageData.urls.regular, imageData: imageData}
      ))

      this.setState({ showPicker: false })
    }
  }
  render () {
    return (
      <div>
        <div
          onClick={() => this.setState({ showPicker: true })}
        >
          <i className='fas fa-camera' style={{color: 'black'}}/>
        </div>
        <Portal
          subscribe={this.state.showPicker}
          unsubscribe={() => this.setState({ showPicker: false })}
        >
          <Unsplash
            getImageData={this.getImageData}
          />
        </Portal>
      </div>
    )
  }
}