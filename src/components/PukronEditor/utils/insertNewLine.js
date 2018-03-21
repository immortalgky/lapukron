import { EditorState, ContentBlock, genKey, BlockMapBuilder } from 'draft-js'

export const insertNewLine = (editorState) => {
  const contentState = editorState.getCurrentContent()
  const selectionState = editorState.getSelection()
  const newLineBlock = new ContentBlock({
    key: genKey(),
  })
  
  // Build an array of blockMap
  const newblockMap = []
  const targetKey = selectionState.getAnchorKey()
  contentState.getBlockMap().forEach(block => {
    newblockMap.push(block)
    if (block.key === targetKey) {
      newblockMap.push(newLineBlock)
    }
  })

  // Create new ContentState
  const contentStateWithNewLine = contentState.merge({
    blockMap: BlockMapBuilder.createFromArray(newblockMap),
    selectionBefore: selectionState,
    selectionAfter: selectionState.merge({
      anchorKey: newLineBlock.getKey(),
      anchorOffset: newLineBlock.getLength(),
      focusKey: newLineBlock.getKey(),
      focusOffset: newLineBlock.getLength(),
      hasFocus: true
    })
  })

  return EditorState.push(editorState, contentStateWithNewLine, 'insert-fragment')
}