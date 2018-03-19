import React, { Component } from 'react'
import styled from 'styled-components'
import Tools from './Tools'
import Image from './Image'
import UnsplashImage from './UnsplashImage'
import Video from './Video'
import Part from './Part'
import { Category } from '../../Category'
import {Editor, EditorState, RichUtils, CompositeDecorator, AtomicBlockUtils, convertToRaw } from 'draft-js'
import createMediaPlugin from './Media-Plugin'
import '../Draft.css'
import '../LapukronDraft.css'

const MediaPlugin = createMediaPlugin()
const { Media } = MediaPlugin
const plugins = [MediaPlugin]

const EditorWrapper = styled.div`
  position: relative;
`
class PukronEditor extends Component {
  state = {
    readOnly: false
  }

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

  componentDidUpdate = () => {
    const { editorState } = this.props
    const blockKey = editorState.getSelection().getAnchorKey()
    const contentBlock = editorState.getCurrentContent().getBlockForKey(blockKey)
    const entityKey = contentBlock.getEntityAt(0)
    
    if (entityKey) {
      const entity = editorState.getCurrentContent().getEntity(entityKey)

      if (entity.getType() === 'VIDEO' && !this.state.readOnly) {
        this.setState({ readOnly: true })
      }
    }
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

  MediaBlockRender = (block) => {
    if (block.getType() === 'atomic') {
      return {
        component: MediaComponent,
        editable: false,
        props: {
          getEditorState: this.getEditorState,
          setEditorState: this.setEditorState,
          onEdit: () => this.setState({ readOnly: true }),
          onFinish: () => this.setState({ readOnly: false }),
          onRemove: () => null
        }
      }
    }
    return null
  }

  render () {
    const { editorState, onChange } = this.props
    const { readOnly } = this.state
  
    return (
      <div>
        <EditorWrapper>
          <Editor
            blockRendererFn={this.MediaBlockRender}
            editorState={editorState}
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}
            placeholder='Tell your story...'
            readOnly={readOnly}
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

const MediaComponent = (props) => {
  const { block, contentState, blockProps } = props
  const entityKey = block.getEntityAt(0)
  const entity = contentState.getEntity(entityKey)
  const type = entity.getType()
  const data = entity.getData()

  switch (type) {
    case 'IMAGE':
      return <Image src={data.url}/>
    case 'VIDEO':
      return <Video {...blockProps}/>
    case 'PART':
      return <Part/>
    case 'UNSPLASH':
      return <UnsplashImage src={data.url} data={data.photoData}/>
  }
}

export default PukronEditor