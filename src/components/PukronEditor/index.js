const Editor = require('./components/PukronEditor')
const EditorState = require('draft-js').EditorState
const convertFromRaw = require('draft-js').convertFromRaw

const EditorPublic = {
  Editor: Editor.default,
  EditorState: EditorState,
  convertFromRaw: convertFromRaw
}

module.exports = EditorPublic