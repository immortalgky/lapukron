export const setLogin = ({uid, email, displayName, photoURL}) => ({
  type: 'SET_LOGIN',
  uid,
  email,
  displayName,
  photoURL
})

export const setLogout = () => ({
  type: 'SET_LOGOUT'
})

export const setDone = () => ({
  type: 'SET_DONE'
})

export const setWait = () => ({
  type: 'SET_WAIT'
})
