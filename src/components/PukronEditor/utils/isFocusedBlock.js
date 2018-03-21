export const isFocusedBlock = (editorState, compareKey) => {
  const focusedKey = editorState.getSelection().getAnchorKey()

  return focusedKey === compareKey
}