import React from 'react'
import { addContentBlock } from '../../utils'

export default (props) => {
  
  const handleOnClick = () => {
    props.store.get('setEditorState')(addContentBlock(
      props.store.get('getEditorState')(),
      'PART',
      {}
    ))
  }

  return (
    <div
      onClick={handleOnClick}
    >
      <i className='fal fa-ellipsis-h'/>
    </div>
  )
}

