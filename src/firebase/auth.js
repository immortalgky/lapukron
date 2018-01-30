import firebase from './firebase'

export const socialLogin = (social) => {
  const provider = social.toLowerCase() === 'facebook' ? new firebase.auth.FacebookAuthProvider() : new firebase.auth.GoogleAuthProvider()

  provider.setCustomParameters({
    'prompt': 'select_account'
  })

  return firebase.auth().signInWithPopup(provider)
    .then(user => {
      return user
    })
    .catch(err => {
      throw err
    })
}

export const logOut = () => {
  firebase.auth().signOut()
}

export const authMonitor = (fn) => {
  firebase.auth().onAuthStateChanged(fn)
}

export const emailAndPasswordLogin = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password).catch(err => { throw err })
}

export const createUserWithEmailAndPassword = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password).catch(err => { throw err })
}

export const getCurrentUser = () => {
  return firebase.auth().currentUser
}
