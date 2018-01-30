import firebase from './firebase'

export const storageRef = firebase.storage().ref()

export const storageDelete = (fullPath) => {
  storageRef.child(fullPath).delete()
    .then()
    .catch()
}
