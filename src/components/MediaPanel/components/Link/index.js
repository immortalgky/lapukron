import React from 'react'
import Link from './components/Link'

export default () => {

  const store = {}
  const config = {
    state: 'LINK',
    button: <i class="far fa-link" style={{color: '#21ccb5'}}/>,
    label: 'Link'
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
    Body: () => <Link store={store}/>
  }
}