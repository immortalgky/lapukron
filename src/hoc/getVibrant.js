import React, { Component } from 'react'
import * as Vibrant from 'node-vibrant'

const getVibrantToHover = (WrapComponent, image) => {
  return class extends Component {
    state = {
      r: '',
      g: '',
      b: ''
    }
    componentDidMount () {
      Vibrant.from(image).getPalette().then((palette) => {
        this.setState({r: palette.Vibrant.r, g: palette.Vibrant.g, b: palette.Vibrant.b})
      })
    }
    render () {
      console.log(this.state)
      return (
        <WrapComponent hover='red' to=''/>
      )
    }
  }
}

export default getVibrantToHover