import React from 'react'
import Media from './Media'
import createPluginStore from './plugin'

export default (config = {}) => {
  const pluginStore = createPluginStore()
  
  const renderComponent = () => {
    return (
      <Media 
        store={pluginStore}
        structure={config.structure}
      />
    )
  }

  return {
    initial: (getEditorState, setEditorState, getEditorRef) => {
      pluginStore.save('getEditorState', getEditorState)
      pluginStore.save('setEditorState', setEditorState)
      pluginStore.save('getEditorRef', getEditorRef)
    },
    pluginFn: pluginStore,
    Media: renderComponent
  }
}

