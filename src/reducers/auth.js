const authStateDefault = {
  isLogin: false,
  firstChecking: true,
  user: {
    uid: '',
    email: '',
    displayName: '',
    photoURL: ''
  }
}
export default (state = authStateDefault, action) => {
  switch (action.type) {
    case 'SET_LOGIN':
      return {...state,
        isLogin: true,
        user: {
          uid: action.uid,
          email: action.email,
          displayName: action.displayName,
          photoURL: action.photoURL
        }}
    case 'SET_LOGOUT':
      return {...state, ...authStateDefault, firstChecking: state.firstChecking}
    case 'SET_WAIT':
      return {...state, firstChecking: true}
    case 'SET_DONE':
      return {...state, firstChecking: false}
    default:
      return state
  }
}
