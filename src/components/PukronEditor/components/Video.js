import React, { Component } from 'react'
import styled from 'styled-components'

const Input = styled.input.attrs({
  placeholder: 'Paste a Youtube or other video link, then press Enter'
})
`
  border: none;
  font-size: 1.5rem;
  outline: none;
  width: 100%
`
const Iframe = styled.iframe.attrs({
  frameBorder: 0,
  allowFullScreen: true
})
`
  height: 500px;
  width: 100%;
`
class Video extends Component {
  state = {
    url: '',
    validUrl: false
  }
  
  componentDidMount = () => {
    setTimeout(() => {
      if (this.input) {
        this.input.focus()
      }
    })
  }

  render () {    
    return (
      this.state.url === ''
        ?  <Input
            innerRef={c => this.input = c}
            value={this.state.url}
            onChange={(e) => this.setState({ url: e.target.value })}
           />
        :  <Iframe src='https://www.youtube.com/embed/4fq_solaYQw'/>
    )
  }
}

export default Video