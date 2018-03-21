import React from 'react'
import styled from 'styled-components'
import { EditorState, SelectionState, EditorBlock } from 'draft-js'

const Img = styled.img`
  width: 100%;
`
const Caption = styled.div`
  display: flex;
  font-size: 0.9rem;
  font-weight: lighter;
  justify-content: center;
`

const Image = (props) => {
  const onMouseDown = (e) => {
    const editorState = props.blockProps.getEditorState()
    const blockKey = e.target.parentNode.dataset.offsetKey.split('-')[0]
    const contentBlock = editorState.getCurrentContent().getBlockForKey(blockKey)
    const selectionState = SelectionState.createEmpty(blockKey)
    const updatedSelection = selectionState.merge({
      anchorOffset: contentBlock.getText().length,
      focusOffset: contentBlock.getText().length
    })
    props.blockProps.setEditorState(EditorState.forceSelection(editorState, updatedSelection))
  }

  return ( 
    <div data-offset-key={props.offsetKey}>
      <Img
        src={props.src}
        onMouseDown={onMouseDown}
      />
      <Caption>
        <EditorBlock {...props}/>
      </Caption>
    </div>
  )
}

export default Image