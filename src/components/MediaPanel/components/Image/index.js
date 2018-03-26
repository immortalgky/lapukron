import React from 'react'
import Image from './components/Image'

export default () => {

  const store = {}
  const config = {
    state: 'LOCAL',
    button: <i class="far fa-desktop" style={{color: '#21ccb5'}}/>,
    label: 'Local'
  }

  const initialize = (getState, setState) => {
    save('getState', getState)
    save('setState', setState)
  }

  const save = (key, value) => {
    store[key] = value
  }

  return {
    initialize,
    config,
    Body: <Image store={store}/>
  }
}