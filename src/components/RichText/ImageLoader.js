import React, { Component } from 'react'
import styled from 'styled-components'
import * as Helper from './Helper'
import { storageRef } from '../../firebase/storage'
import firebase from '../../firebase/firebase'

const Image = styled.img`
  background-color: whitesmoke;
  min-height: 400px;
  min-width: 100%;
  width: 100%;

  &:empty::before {
    align-items: center;
    color: grey;
    display: flex;
    font-family: 'Font Awesome 5 Pro';
    font-size: 150px;
    font-weight: 900;
    justify-content: center;
    min-height: 400px;
    z-index: -1;

    ${props => !props.src && `
      content: '\f083';
    `}
  }
`

const Loader = styled.div`
  background-color: tomato;
  box-shadow: 0 1px 5px 1px lightgrey;
  height: 20px;
  margin: 200px 0;
  transition: width 0.5s, background-color 1s;
  width: ${props => props.progress}%;

  &::before {
    color: white;
    content: '${props => Math.round(props.progress)}%';
    font-size: 0.7rem;
  }
`

class ImageLoader extends Component {
  state = {
    uploading: false,
    progress: 0
  }
  componentDidMount = () => {
    this.refs.file.addEventListener('change', (e) => {
      let file = e.target.files[0]
      const metadata = {
        contentType: file.type
      }
      const uploadTask = storageRef.child('images/' + file.name).put(file, metadata)

      this.setState({uploading: true})
      
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
        (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        this.setState({progress: progress})
        },
        (err) => {

        },
        () => {
          const {ref, downloadURL} = uploadTask.snapshot

          // Waint for transition to completed in 0.5s
          setTimeout(() => {
            this.setState({uploading: false, progress: 0})
            this.props.setEditorState(this.props.getKey(), Helper.createEditorState({type: 'image', html: downloadURL}), 'change')
          }, 500)

          e.target.value = ''
        }  
      )
    })
  }

  onClick = () => {
    this.refs.file.click()
  }

  renderImageLoader = () => {
    const { uploading, progress, downloadURL } = this.state
    if (!uploading) {
      return <Image
               src={this.props.editorState.html}
               onClick={this.onClick}
              />
    } else {
      return <Loader progress={progress}/>
    }
  }

  render () {
    return (
      <div>
        {this.renderImageLoader()}
        <input ref='file' type='file' style={{display: 'none'}}/>
      </div>
    )
  }
}

export default ImageLoader