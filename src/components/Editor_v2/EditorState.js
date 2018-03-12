const shortid = require('shortid')

class EditorState {
  static createEditorState() {
    return {
      id: shortid.generate(),
      type: 'P',
      text: '',
      inlineStyle: [
        {
        style: 'BOLD',
        start: 1,
        end: 2
        }
      ],
      isSelected: true
    }
  }
}

module.exports = EditorState