const createPluginStore = () => {
  const pluginFn = {}
  let store = {}

  const register = (key, callback) => {
    pluginFn[key] = pluginFn[key] || []
    pluginFn[key].push(callback)
  }

  const unregister = (key, callback) => {
    pluginFn[key] = pluginFn[key].filter(fn => fn !== callback)
  }

  const save = (key, item) => {
    store = {
      ...store,
      [key]: item
    }

    if (pluginFn[key]) {
      pluginFn[key].forEach(fn => {
        fn()
      })
    }    
  }

  const get = (key) => store[key]

  return {
    register,
    unregister,
    save,
    get
  }
}

export default createPluginStore