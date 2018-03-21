import { EditorState, SelectionState, Modifier } from 'draft-js'

export const removeBlock = (editorState) => {
  const selectionState = editorState.getSelection()
  const contentState = editorState.getCurrentContent()
  const tarketKey = selectionState.getAnchorKey()
  const beforeKey = contentState.getKeyBefore(tarketKey)
  const beforeBlock = contentState.getBlockBefore(tarketKey)

  const targetRange = new SelectionState({
    anchorKey: beforeKey,
    anchorOffset: beforeBlock.getLength(),
    focusKey: tarketKey,
    focusOffset: 1
  })

  const contentStateWithRemove = Modifier.removeRange(contentState, targetRange, 'backward')
  const editorStateWithRemove = EditorState.push(editorState, contentStateWithRemove, 'remove-range')

  const newRange = new SelectionState({
    anchorKey: beforeKey,
    anchorOffset: beforeBlock.getLength(),
    focusKey: beforeKey,
    focusOffset: beforeBlock.getLength()
  })

  return EditorState.forceSelection(editorStateWithRemove, newRange)
}