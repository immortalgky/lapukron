import React, { Component } from 'react'
import styled from 'styled-components'
import Wrapper from './Wrapper'
import Cover from './components/Cover'
import Header from './Header'
import Title from './components/Title'
import { CategoryInput } from '../../components/Category'
import { Editor, EditorState, convertFromRaw } from '../../components/PukronEditor/'
import categories from 'unsplash-js/lib/methods/categories';

const Author = styled.div`
  color: lightgrey;
  font-size: 0.8rem;
  margin-top: 2rem;
`
const EditorWrapper = styled.div`
  margin-top: 3rem;
  min-height: 400px;
`

class AddPage extends Component {
  state = {
    editorState: EditorState.createEmpty()
  }

  onChange = (editorState) => {
    this.setState({editorState})
  }

  render () {
    const { editorState } = this.state

    return (
      <Wrapper>
        <Cover/>
        <Header>
          <CategoryInput/>
          <Title/>
          <Author>
            Gky 18th Mar'18
          </Author>
        </Header>
        <EditorWrapper>
          <Editor
            editorState={editorState}
            onChange={this.onChange}
          />
        </EditorWrapper>
      </Wrapper>
    )
  }
}

export default AddPage