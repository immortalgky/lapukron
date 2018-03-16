import React, { Component } from 'react'
import styled from 'styled-components'
import Tools from './Tools'
import Cover from './Cover'
import Image from './Image'
import Part from './Part'
import {Editor, EditorState, RichUtils, CompositeDecorator, AtomicBlockUtils, convertToRaw } from 'draft-js'
import createMediaPlugin from './Media-Plugin'
import '../Draft.css'

const MediaPlugin = createMediaPlugin()
const { Media } = MediaPlugin
const plugins = [MediaPlugin]

const EditorWrapper = styled.div`
  position: relative;
`

const Title = styled.input.attrs({
  type: 'text',
  placeholder: 'Title',
  spellCheck: false,
  maxLength: 100
})
`
  background-color: transparent;
  border: none;
  color: whitesmoke;
  font: inherit;
  font-size: 2.5rem;
  font-weight: bold;
  left: 0;
  margin-left: auto;
  margin-right: auto;
  outline: none;
  position: absolute;
  right: 0;
  text-align: center;
  top: 100px;
  width: 70%;
  word-break: break-word;
  word-wrap: break-word;

  ::placeholder {
    color: white; 
  }
  &:focus::placeholder {
    color: whitesmoke;
  }
`
class PukronEditor extends Component {

  componentWillMount = () => {
    const { editorState } = this.props

    // Initial plugin
    plugins.forEach(plugin => {
      plugin.initial(this.getEditorState, this.setEditorState, this.getEditorRef)
    })

    const linkDecorator = new CompositeDecorator([{
      strategy: linkStrategy,
      component: LinkSpan
    }])

    this.onChange(EditorState.set(editorState, {decorator: linkDecorator}))
  }

  componentDidMount = () => {
    this.focus()
  }

  getEditorState = () => this.props.editorState
  setEditorState = (newEditorState) => this.onChange(newEditorState)
  getEditorRef = () => this

  onChange = (newEditorState) => {
    const { onChange } = this.props

    // Change for plugin
    plugins.forEach(plugin => {
      plugin.pluginFn.save('editorState', newEditorState)
    })

    onChange(newEditorState)
  }

  focus = () => {
    setTimeout(() => {
      this.refs.editor.focus()
    }, 0)
  }

  inlineStyleOnClick = (style) => {    
    return (e) => {
      const { editorState } = this.props
    
      this.focus()
      this.onChange(RichUtils.toggleInlineStyle(editorState, style.toUpperCase()))
      e.preventDefault()
    }
  }

  blockStyleOnClick = (style) => {
    return (e) => {
      const { editorState } = this.props

      this.focus()
      this.onChange(RichUtils.toggleBlockType(editorState, style.toLowerCase()))
      e.preventDefault()
    }
  }

  toggleLink = () => {
    return (e) => {
      const { editorState } = this.props
      const contentState = editorState.getCurrentContent()
      const contentStateWithEntity = contentState.createEntity(
        'LINK',
        'MUTABLE',
        {url: 'https://www.google.com'}
      )
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
      const newEditorState = EditorState.set(editorState, {currentContent: contentStateWithEntity})

      this.onChange(RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      ))
      e.preventDefault()
    }
  }

  handleKeyCommand = (command) => {
    const { editorState } = this.props
    const newState = RichUtils.handleKeyCommand(editorState, command)
    
    if (newState) {
      this.onChange(newState)
      return 'handled'
    }

    return 'not-handled'
  }

  render () {
    const { editorState, onChange } = this.props
    console.log(editorState.getSelection())
    return (
      <div>
        <Cover/>
        <Title/>
        <EditorWrapper>
          <Editor
            blockRendererFn={MediaBlockRender}
            editorState={editorState}
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}
            placeholder='Tell your story...'
            ref='editor'
          />
          <Media/>
          <Tools 
            editorState={editorState}
            toggleInlineStyle={this.inlineStyleOnClick}
            toggleBlockType={this.blockStyleOnClick}
            toggleLink={this.toggleLink}
          />
        </EditorWrapper>
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
      component: MediaComponent,
      editable: false
    }
  }
  return null
}

const MediaComponent = (props) => {
  const { block, contentState } = props
  const entityKey = block.getEntityAt(0)
  const entity = contentState.getEntity(entityKey)
  const type = entity.getType()
  const data = entity.getData()

  switch (type) {
    case 'IMAGE':
      return <Image src={data.url}/>
    case 'PART':
      return <Part/>
  }
}

export default PukronEditor