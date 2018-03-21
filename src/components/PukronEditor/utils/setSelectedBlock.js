import { EditorState, SelectionState } from 'draft-js'

export const setSelectedBlock = (editorState, targetKey, offset) => {
  const targetBlock = editorState.getCurrentContent().getBlockForKey(targetKey)
  let anchorOffset, focusOffset

  if (!targetBlock) return editorState

  if (!offset || offset === 'last') {
    anchorOffset = focusOffset = targetBlock.getLength()
  } else if (offset === 'first') {
    anchorOffset = focusOffset = 0
  } 

  const targetRange = new SelectionState({
    anchorKey: targetKey,
    anchorOffset: anchorOffset,
    focusKey: targetKey,
    focusOffset: focusOffset,
    isBackward: false
  })

  // Also move the caret to new focus element
  const elem = document.querySelector(`[data-offset-key='${targetKey}-0-0']`)
  const selection = window.getSelection()
  const range = document.createRange()
  range.setStart(elem, 0)
  range.setEnd(elem, 0)
  selection.removeAllRanges()
  selection.addRange(range)

  return EditorState.forceSelection(editorState, targetRange)
}