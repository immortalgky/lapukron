import React, { Component } from 'react'
import styled from 'styled-components'
import Tools from './Tools'
import UnsplashImage from './UnsplashImage'
import Video from './Video'
import Part from './Part'
import { Category } from '../../Category'
import { Editor, EditorState, RichUtils, CompositeDecorator, AtomicBlockUtils, convertToRaw, EditorBlock, Modifier, SelectionState, getDefaultKeyBinding } from 'draft-js'
import createMediaPlugin from './Media-Plugin'
import createImagePlugin from './Image'
import '../Draft.css'
import '../LapukronDraft.css'
import { insertNewLine } from '../utils/insertNewLine'
import { setSelectedBlock } from '../utils/setSelectedBlock'
import { removeBlock } from '../utils/removeBlock'


const MediaPlugin = createMediaPlugin()
const { Media } = MediaPlugin

const ImagePlugin = createImagePlugin()
const { Image } = ImagePlugin

const plugins = [MediaPlugin, ImagePlugin]

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
    //this.focus()
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
    
    

    onChange(newEditorState)
    
    // Change for plugin
    plugins.forEach(plugin => {
      plugin.pluginFn.save('editorState', newEditorState)
    })

    // Keep first record on the top of screen
    relocateScreenPosition(newEditorState)
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
    
    if (command === 'delete-atomic-block') {
      this.onChange(removeBlock(editorState))
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
          onRemove: () => null,
        }
      }
    }
   
    return null
  }

  handleReturn = (e, editorState) => {
    const blockKey = editorState.getSelection().getAnchorKey()
    const contentBlock = editorState.getCurrentContent().getBlockForKey(blockKey)
    
    if (contentBlock.getType() === 'atomic') {
      this.onChange(insertNewLine(editorState))
      return 'handled'
    }
    // Not atomic block
    // insert soft new line if press with shift key
    else {
      if (e.shiftKey) {
        this.onChange(RichUtils.insertSoftNewline(editorState))
        return 'handled'
      }
    }
    
    return 'not-handled'
  }

  handleBeforeInput = (char, editorState) => {
    return 'not-handled'
  }

  onDownArrow = (e) => {
    const { editorState } = this.props
    const targetKey = editorState.getSelection().getAnchorKey()
    const afterKey = editorState.getCurrentContent().getKeyAfter(targetKey)

    if (e.shiftKey) return

    this.onChange(setSelectedBlock(editorState, afterKey, 'first'))
    e.preventDefault()
  }

  onUpArrow = (e) => {
    const { editorState } = this.props
    const targetKey = editorState.getSelection().getAnchorKey()
    const beforeKey = editorState.getCurrentContent().getKeyBefore(targetKey)

    if (e.shiftKey) return

    this.onChange(setSelectedBlock(editorState, beforeKey))
    e.preventDefault()
  }

  render () {
    const { editorState, onChange } = this.props
    const { readOnly } = this.state
    //console.log(editorState.getSelection().getAnchorKey())
    return (
      <div>
        <EditorWrapper>
          <Editor
            blockRendererFn={this.MediaBlockRender}
            editorState={editorState}
            onChange={this.onChange}
            keyBindingFn={myKeyBindingFn(editorState)}
            handleKeyCommand={this.handleKeyCommand}
            handleReturn={this.handleReturn}
            //handleBeforeInput={this.handleBeforeInput}
            onDownArrow={this.onDownArrow}
            onUpArrow={this.onUpArrow}
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

const myKeyBindingFn = (editorState, e) => {
  return (e) => {
    const selectionState = editorState.getSelection()
    const contentState = editorState.getCurrentContent()
    const contentBlock = contentState.getBlockForKey(selectionState.getAnchorKey())

    if (e.which === 8 || e.which === 32) {
      if (contentBlock.getType() === 'atomic') {
        return 'delete-atomic-block'
      }
    }
    
    return getDefaultKeyBinding(e)
  }
}

const MediaComponent = (props) => {
  const { block, contentState, blockProps } = props
  const entityKey = block.getEntityAt(0)
  if (!entityKey) {
   

    return null
  }
  const entity = contentState.getEntity(entityKey)
  const type = entity.getType()
  const data = entity.getData()

  switch (type) {
    case 'IMAGE':
      return <Image src={data.url} {...props}/>
    case 'VIDEO':
      return <Video {...blockProps}/>
    case 'PART':
      return <Part/>
    case 'UNSPLASH':
      return <UnsplashImage src={data.url} data={data.imageData}/>
  }
}

const relocateScreenPosition = (editorState) => {
  const selectionState = editorState.getSelection()
  const focusedKey = selectionState.getAnchorKey()
  const elem = document.querySelector(`[data-offset-key='${focusedKey}-0-0']`)
  if (!elem || !selectionState.getHasFocus()) return
  const rect = elem.getBoundingClientRect()
  if (rect.top < 70) {
    window.scrollTo(0, window.scrollY + rect.top - 60 - 8)
  }
  else if (rect.bottom > window.innerHeight) {
    window.scrollTo(0, rect.bottom + (window.scrollY - window.innerHeight) + 10)
  }
}

export default PukronEditor