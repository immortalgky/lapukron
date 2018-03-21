import React from 'react'
import Image from './Image'
import createPluginStore from './plugin'

export default (config = {}) => {
  const pluginStore = createPluginStore()
  
  const renderComponent = (props) => {
    return (
      <Image 
        store={pluginStore}
        {...props}
      />
    )
  }

  return {
    initial: (getEditorState, setEditorState, getEditorRef) => {
      //pluginStore.save('getEditorState', getEditorState)
      //pluginStore.save('setEditorState', setEditorState)
      //pluginStore.save('getEditorRef', getEditorRef)
    },
    pluginFn: pluginStore,
    Image: renderComponent,
  }
}

