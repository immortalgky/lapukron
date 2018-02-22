import React, { Component } from 'react'
import styled from 'styled-components'
import * as Helper from './Helper'
import { storageRef } from '../../firebase/storage'
import firebase from '../../firebase/firebase'

const CoverImage = styled.div`
  background: url(${props => props.src});
  background-color: lightgrey;
  background-size: cover;
  height: 400px;

  &:empty::before {
    align-items: center;
    color: grey;
    display: flex;
    font-family: 'Font Awesome 5 Pro';
    font-size: 150px;
    font-weight: 900;
    height: 100%;
    justify-content: center;
    z-index: -1;

    ${props => !props.src && `
      content: '\f083';
    `}
  }
`

class Cover extends Component {
 
  componentDidMount = () => {
    this.refs.file.addEventListener('change', (e) => {
      const file = e.target.files[0]
      const metadata = {
        contentType: file.type
      }
      const uploadTask = storageRef.child('images/' + file.name).put(file, metadata)
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
        (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log(progress)
        },
        (err) => {

        },
        () => {
          const {ref, downloadURL} = uploadTask.snapshot
          this.props.setEditorState(this.props.getKey(), Helper.createEditorState({type: 'cover', html: downloadURL}), 'change')
        }  
      )
    })
  }

  onClick = () => {
    this.refs.file.click()
  }

  render () {
    const { editorState } = this.props
    return (
      <div>
        <CoverImage
          src={editorState.html}
          onClick={this.onClick}
        />
        <input ref='file' type='file' style={{display: 'none'}}/>
      </div>
    )
  }
}

export default Cover