import React, { Component } from 'react'
import ReactDom from 'react-dom'
import Wrapper from './Wrapper'
import Add from './Add'
import Menu from './Menu'
import Container from './Container'
import UIText from './UIText'
import { TextInputCenter } from '../TextInput/'
import ClickToClose from '../../HOC/ClickToCloseMenu'

class AddPage extends Component {
  state = {
    menu: {
      AddContent: false
    }
  }
  target = null

  showAddContentMenu = (e) => {
    this.target = e.target
    const menu = {...this.state.menu, AddContent: true}
    this.setState({menu})
  }
  closeMenu = () => {
    const menu = {...this.state.menu, AddContent: false}
    this.setState({menu})
  }
  handleAddContent = (action) => {
    return () => {
      let elem
      switch (action) {
        case 'text':
          elem = <UIText contentEditable='true'/>
          break;
        default:
          break;
      }
      const div = document.createElement('div')
      if (this.target.dataset.mode) {
        this.refs.content.appendChild(div)
      } else {
        this.refs.content.insertBefore(div, this.target.parentNode.parentNode)
      }
      ReactDom.render(
        <Container>
          <Add/>  
          {elem}
        </Container>
      , div)
      this.closeMenu()
    }
  }
  render () {
    const { menu } = this.state
    const ClickToCloseMenu = ClickToClose(Menu)
    return (
      <Wrapper>
        <input ref='dummy' className='dummy' type='file'/>
        <TextInputCenter type='text' size='3rem' placeholder='Add Title'/>
        <div className='cover' title='Cover'/>
        <div ref='content' className='content'>
          {/* content will goes here*/}
        </div>
        <Add data-mode='append' onClick={this.showAddContentMenu}/>
        {menu.AddContent &&
          <ClickToCloseMenu bottom closeMenu={this.closeMenu}>
            <li><i className="far fa-images fa-fw" aria-hidden="true"></i><span>Image</span></li>
            <li onClick={this.handleAddContent('text')}><i className="far fa-font fa-fw" aria-hidden="true"></i><span>Text</span></li>
            <li><i className="far fa-th-large fa-fw" aria-hidden="true"></i><span>Grid</span></li>
          </ClickToCloseMenu>
        }
      </Wrapper>
    )
  }
}

export default AddPage