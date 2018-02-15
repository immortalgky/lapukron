import React, { Component } from 'react'
import styled from 'styled-components'
import AddButton from './AddButton'
import Text from './Text'

const Container = styled.div`
  height: 300px;
  width: 100vw;
`

class Editor extends Component {
  state = {
    content: [
      <Text data-placeholder='Title'/>,
      <Text data-placeholder='Tell your story...'/>
    ],
    editorState: 2
  }
  text = <Text/>
  
  handleSetFocus = (index) => {
    this.setState({editorState: index})
  }

  handleAddNewBlock = (type) => {
    let elementToBeAdded

    switch (type) {
      case 'text':
        elementToBeAdded = this.text
        break
      default:
        break
    }
    const content = this.state.content.slice()
    content.splice(this.state.editorState - 1, 0, elementToBeAdded)
    this.setState({...this.state, content})
    
  }

  render () {
    const { content, editorState } = this.state
    return (
      <div>
        <AddButton addNewBlock={this.handleAddNewBlock}/>
        <Container>
          {content.map((component, idx) => React.cloneElement(component, {key: idx + 1, id: idx + 1, focus: idx + 1 === editorState, setFocus: this.handleSetFocus}))}
        </Container>
      </div>
    )
  }
}

export default Editor