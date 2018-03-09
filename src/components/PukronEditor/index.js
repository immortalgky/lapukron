const Editor = require('./components/PukronEditor')
const EditorState = require('draft-js').EditorState

const EditorPublic = {
  Editor: Editor.default,
  EditorState: EditorState
}

module.exports = EditorPublic