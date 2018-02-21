export const createEditorState = ({type = 'text', html = ''}) => {
  return {
    type: type,
    html: html
  }
}