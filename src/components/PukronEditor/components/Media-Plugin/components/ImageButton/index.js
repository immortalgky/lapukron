import React, { Component } from 'react'
import { addContentBlock, moveSelection } from '../../utils'

export default class extends Component {
  
  componentDidMount = () => {
    this.refs.file.addEventListener('change', this.fileOnChange)
  }

  fileOnChange = () => {
    const editorStateWithNewContent =  addContentBlock(
      this.props.store.get('getEditorState')(),
      'IMAGE',
      {url: 'https://source.unsplash.com/1600x900/?nature'}
    )
    const editorStateWithReselection = moveSelection(editorStateWithNewContent)
    this.props.store.get('setEditorState')(editorStateWithReselection)

    this.refs.file.value = ''
  }

  render () {
    return (
      <div
        onClick={() => this.refs.file.click()}
      >
        <i className='fas fa-image' style={{color: 'rgb(70, 180, 252)'}}/>
        <input ref='file' type='file' style={{display: 'none'}}/>
      </div>
    )
  }
}