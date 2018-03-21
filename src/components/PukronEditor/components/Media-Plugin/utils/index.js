import { EditorState, SelectionState, AtomicBlockUtils, convertToRaw } from 'draft-js'

export const addContentBlock = (editorState, type, data) => {
  const contentState = editorState.getCurrentContent()
  const contentStateWithEntity = contentState.createEntity(
    type,
    'IMMUTABLE',
    data
  )
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
  const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity })

  return AtomicBlockUtils.insertAtomicBlock(
    newEditorState,
    entityKey,
    ' '
  )
}

export const moveSelection = (editorState) => {
  const nextBlockKey = editorState.getSelection().getAnchorKey()
  const blockKey = editorState.getCurrentContent().getKeyBefore(nextBlockKey)
  const contentBlock = editorState.getCurrentContent().getBlockForKey(blockKey)
  const selectionState = SelectionState.createEmpty(blockKey)
  const updatedSelection = selectionState.merge({
    anchorOffset: contentBlock.getText().length,
    focusOffset: contentBlock.getText().length
  })

  return EditorState.forceSelection(editorState, updatedSelection)
}