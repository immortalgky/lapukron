import React from 'react'
import ProgressBar from './components/ProgressBar'
import UploadButton from './components/UploadButton'

const state = 'IMAGE'
const button = <i class="far fa-image" style={{color: '#21ccb5'}}/>
const label = 'Image'

const header = (
  <div>
    <i class="far fa-image" style={{color: '#21ccb5'}}/>
    Image
  </div>
)

const body = (props, state) => {
  return (
    <div>    
      <div style={{margin: '2rem 0'}}>
        <ProgressBar/>
      </div>
      <div style={{margin: '2rem 0'}}>
        <UploadButton>Upload</UploadButton>
      </div>
    </div>
  )
}

export default () => {
  return {
    state,
    button,
    label,
    header,
    body
  }
}