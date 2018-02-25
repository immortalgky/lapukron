const Editor = require('./Editor/')
const EditorState = require('./EditorState')

const EditorPublic = {
  Editor: Editor.default,
  EditorState: EditorState
}

module.exports = EditorPublic