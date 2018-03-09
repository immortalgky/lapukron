import React, { Component } from 'react'
import styled from 'styled-components'
import Tools from './Tools'
import {Editor, EditorState, RichUtils, CompositeDecorator, AtomicBlockUtils } from 'draft-js'
import '../Draft.css'

const Title = styled.input.attrs({
  type: 'text',
  placeholder: 'Title...',
  spellCheck: false
})
`
  border: none;
  font: inherit;
  outline: none;

  ::placeholder {
    color: #9197a3; 
  }
  &:focus::placeholder {
    color: #bdc1c9;
  }
`
class PukronEditor extends Component {

  componentWillMount = () => {
    const { editorState, onChange } = this.props
    const linkDecorator = new CompositeDecorator([{
      strategy: linkStrategy,
      component: LinkSpan
    }])

    onChange(EditorState.set(editorState, {decorator: linkDecorator}))
  }

  focus = () => {
    setTimeout(() => {
      this.refs.editor.focus()
    }, 0)
  }

  inlineStyleOnClick = (style) => {    
    return (e) => {
      const { editorState, onChange } = this.props
    
      this.focus()
      onChange(RichUtils.toggleInlineStyle(editorState, style.toUpperCase()))
    }
  }

  blockStyleOnClick = (style) => {
    return (e) => {
      const { editorState, onChange } = this.props

      this.focus()
      onChange(RichUtils.toggleBlockType(editorState, style.toLowerCase()))
    }
  }

  toggleLink = () => {
    return (e) => {
      const { editorState, onChange } = this.props
      const contentState = editorState.getCurrentContent()
      const contentStateWithEntity = contentState.createEntity(
        'LINK',
        'MUTABLE',
        {url: 'https://www.google.com'}
      )
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
      const newEditorState = EditorState.set(editorState, {currentContent: contentStateWithEntity})
      onChange(RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      ))
    }
  }

  addMedia = () => {
    const { editorState, onChange } = this.props
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      'IMAGE',
      'IMMUTABLE',
      {src: 'test'}
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity })

    onChange(AtomicBlockUtils.insertAtomicBlock(
      newEditorState,
      entityKey,
      ' '    
    ))
  }

  render () {
    const { editorState, onChange } = this.props

    return (
      <div>
        <Title/>

        <Editor
          blockRendererFn={MediaBlockRender}
          editorState={editorState}
          onChange={onChange}
          placeholder='Tell your story...'
          ref='editor'
        />

        <Tools 
          editorState={editorState}
          toggleInlineStyle={this.inlineStyleOnClick}
          toggleBlockType={this.blockStyleOnClick}
          toggleLink={this.toggleLink}
        />
      </div>
    )
  }
}

const linkStrategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity()

    return (
      entityKey && contentState.getEntity(entityKey).getType() === 'LINK'
    )
  }, callback)
}

const LinkSpan = (props) => {
  const {url} = props.contentState.getEntity(props.entityKey).getData()
  return (
    <a href={url} target='_blank'>
      {props.children}
    </a>
  )
}

const MediaBlockRender = (block) => {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false
    }
  }
  return null
}

const Media = (props) => {
  return <img src='wefwfwf'/>
}

export default PukronEditor