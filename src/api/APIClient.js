import axios from 'axios'

const APIURI = `http://${window.location.hostname}:3001`

export const getAllContents = () => {
    return axios.get(`${APIURI}/pukron?set=1`)
}