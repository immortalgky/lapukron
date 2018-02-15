import React, { Component } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
`
const Text = styled.p`
  outline: none;
  &:empty::before {
    color: #777;
    content: attr(data-placeholder);
  }
`
const Button = styled.div`
  align-items: center;
  background-color: white;
  border: 1px solid #777;
  border-radius: 50%;
  justify-content: center;
  height: 35px;
  left: -50px;
  position: absolute;
  top: -5px;
  width: 35px;
  ${props => {
    if (props.show) {
      return `display: flex;`
    } else {
      return `display: none;`
    }
  }}
 
  &::before {
    content: '+';
    font-size: 1.8rem;
    font-weight: 200;
    transition: 0.5s;
  }

  &.expanded::before {
    transform: rotate(45deg);
  }
`
const Menu = styled.div`
  background-color: white;
  display: flex;
  height: 35px;
  position: absolute;
  left: 35px;
  opacity: 0;
  width: 0;
  
  ${Button}.expanded & {
    opacity: 1;
    padding: 0 1rem;
    width: 80vw;
  }
`
const MenuItem = styled.div`
  align-items: center;
  background-color: white;
  border: 1px solid #777;
  border-radius: 50%;
  display: flex;
  font-family: 'Font Awesome 5 Pro';
  font-weight: 300;
  justify-content: center;
  height: 35px;
  margin: 0 2px;
  transition: 0.3s ease-in;
  transform: scale(0);
  width: 35px;
 
  &::before {
    ${props => {
      if (props.image) return `content: '\f03e';`
      if (props.unsplash) return `font-weight: 900; content: '\f030';`
      if (props.video) return `content: '\f03d';`
      if (props.hr) return `content: '\f141';`
      if (props.quote) return `content: '\f10d';`
    }}
  }

  ${Button}.expanded & {
    transform: scale(1);
  }
`
const ImageLoader = styled.div`
  background-color: tomato;
  height: 5px;
  margin: 23px 0;
  transition: width 0.3s;
  width: ${props => props.process}%;
  ${props => props.expanded && `
    background-color: white;
    height: auto;
  `}
`
const Image = styled.img`
  margin-top: 1rem;
  width: 100%;
`
const Part = styled.div`
  caret-color: transparent;
  color: tomato;
  cursor: default;
  font-family: 'Font Awesome 5 Pro';
  font-size: 5rem;
  font-weight: 100;
  height: 100px;
  text-align: center;
  &::before {
    content: '\f141';
  }
`

class UIText extends Component {
  state = {
    role: 'text',
    text: {
      showButton: true
    },
    loader: {
      process: 0
    },
    image: {
      src: ''
    }
  }
  stopOnBlurEvent = false

  componentDidMount () {
    // Focus at story
    this.uitext.focus()
    // Event listener on dummy file upload
    this.refs.dummy.addEventListener('change', (e) => {
      // Transform to ImageLoader
      this.setState({...this.state, role: 'loader', text: {showButton: false}})
      
      let interval = setInterval(() => {
        if (this.state.loader.process === 100) {
          clearInterval(interval)
          this.setState({...this.state, role: 'image', image: {src: 'https://source.unsplash.com/ubQDHALqKiM'}})
        } else {
          this.setState(prevState => ({...this.state, loader: {process: prevState.loader.process + 5}}))
        }
      }, 100)

      this.props.onPressEnter('after', this)
    })
  }
  handleOnKeyDown = (e) => {
    // If user press enter add new UIText
    if (e.which === 13 && !e.shiftKey) {
      if (document.getSelection().anchorOffset == 0 || this.state.role === 'image') {
        this.props.onPressEnter('before', this)
      } else {
        this.props.onPressEnter('after', this)
      }
      e.preventDefault()
    } else if (e.which === 8 && e.target.innerHTML.length === 0) {
      this.props.onPressDelete(this)
      e.preventDefault()
    } else if (this.state.role === 'part') {
      e.preventDefault()
    }
  }
  handleOnKeyUp = (e) => {
    if (e.target.innerHTML.length > 0) {
      this.setState({...this.state, text: {showButton: false}})
    } else {
      this.setState({...this.state, text: {showButton: true}})
    }
  }
  handleOnFocus = (e) => {
    if (e.target.innerHTML.length === 0) {
      this.setState({...this.state, text: {showButton: true}})
    }
  }
  handleOnBlur = (e) => {
    if (!this.stopOnBlurEvent) {
      this.setState({...this.state, text: {showButton: false}})
    }
  }
  handleButtonOnClick = (e) => {
    this.stopOnBlurEvent = true
    if (e.target.classList.value.indexOf('expanded') === -1) {
      e.target.classList.add('expanded')
    } else {
      e.target.classList.remove('expanded')
      setTimeout(() => { this.uitext.focus() }, 1)
      this.stopOnBlurEvent = false
    }
  }
  handleImageUpload = (e) => {
    e.stopPropagation()
    const event = new MouseEvent('click')
    this.refs.dummy.dispatchEvent(event)
  }
  handleUnsplashImage = (e) => {
    e.stopPropagation()
    console.log('unsplash')
  }
  handleNewPart = (e) => {
    this.setState({...this.state, role: 'part'})
    this.props.onPressEnter('after', this)
    e.stopPropagation()
  }
  preventOnMouseDown = (e) => {
    // Cancal an event to trigger to parent
    e.stopPropagation()
  }
  renderAdder = () => {
    switch (this.state.role) {
      case 'text':
        return (
          <Wrapper>
            <Text 
              id='text'
              contentEditable='true'
              innerRef={comp => this.uitext = comp} 
              data-placeholder={this.props.placeholder} 
              onKeyDown={this.handleOnKeyDown} 
              onKeyUp={this.handleOnKeyUp} 
              onFocus={this.handleOnFocus} 
              onBlur={this.handleOnBlur}
            />
            <Button show={this.state.text.showButton} onMouseDown={this.handleButtonOnClick}>
              <Menu>
                <MenuItem image name='image' title='Picture' onClick={this.handleImageUpload} onMouseDown={this.preventOnMouseDown}/>
                <MenuItem unsplash name='unsplash' title='Picture from Unsplash' onClick={this.handleUnsplashImage} onMouseDown={this.preventOnMouseDown}/>
                <MenuItem video name='video' title='Video' onClick={this.handleNewPart} onMouseDown={this.preventOnMouseDown}/>
                <MenuItem hr name='hr' title='New Part' onClick={this.handleNewPart} onMouseDown={this.preventOnMouseDown}/>
                <MenuItem quote name='quote' title='Quote' onClick={this.handleNewPart} onMouseDown={this.preventOnMouseDown}/>
              </Menu>
            </Button>
            <input ref='dummy' type='file' style={{display: 'none'}}/>
          </Wrapper>
        )

      case 'loader':
        if (this.state.loader.process === 100) {
          return <ImageLoader process='100' expanded='true'/>
        } else {
          return <ImageLoader process={this.state.loader.process}/>
        }

      case 'image':
        return <Image contentEditable src={this.state.image.src} onKeyDown={this.handleOnKeyDown}/>

      case 'part':
        return <Part contentEditable onKeyDown={this.handleOnKeyDown}/>

      default:
        return null
    }
  }
  render () {
    return this.renderAdder()
  }
}

export default UIText