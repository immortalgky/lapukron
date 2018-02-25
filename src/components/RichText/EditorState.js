class EditorState {

  static createInitialState() {
    return [this.createTitle(), this.createImage()]
  }

  static createTitle(html = '') {
    return {type: 'title', html: html}
  }

  static createImage(html = '') {
    return {type: 'image', html: html}
  }

  static createText(html = '') {
    return {type: 'text', html: html}
  }

  static createPart(html = '') {
    return {type: 'part', html: html}
  }

  static changeEditorState(state, newState, event, idx) {
    let editorState = state.slice()

    // Check index
    if (idx > editorState.length) {
        // If more than length, add to last
        editorState.push(newState)
    } else {
      // Check event type
      switch (event) {
        case 'CHANGE':
          editorState[idx] = newState
          break
        case 'REMOVE':
          editorState.splice(idx, 1)
          break
        case 'ADD':
          editorState.splice(idx, 0, newState)
          break
      }
    }
    return editorState
  }

  static convertToJSON(editorState) {
    return JSON.stringify(editorState)
  }

  static convertFromJSON(text) {
    return JSON.parse(text)
  }

  static showTextTooltip(editorState, idx, x, y) {
    editorState[idx] = {...editorState[idx], tooltip:{show: true, type: 'text', x: x, y: y}}
    return editorState
  }

  static hideTooltip(editorState, idx) {
    editorState[idx] = {...editorState[idx], tooltip:{show: false}}
    return editorState
  }
}

module.exports = EditorState