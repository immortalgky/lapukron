import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import Modal from './components/Modal/'
import Login from './components/Login'
import Navbar from './components/Navbar/'
import Main from './pages/Main/';
import AddPage from './pages/AddPage/'
import history from './config/history'
import storeConfigure from './stores/store'
import { authMonitor } from './firebase/auth'

const store = storeConfigure

class App extends Component {
  state = {
    showModal: false,
    user: {
      email: '',
      displayName: '',
      photoURL: ''
    }
  }
  openModal = () => {
    this.setState({showModal: true})
  }
  closeModal = () => {
    this.setState({showModal: false})
  }
  handleAuthOnChange = (user) => {
    if (user) {
      const loggedUser = {email: user.email, displayName: user.displayName, photoURL: user.photoURL}
      this.setState({showModal: false, user: loggedUser})
    } else {
      this.setState({user: {}})
    }
  }
  componentWillMount () {
    authMonitor(this.handleAuthOnChange)
  }
  render () {
    const { showModal, user } = this.state
    return (
      <Provider store={store}>
        <Router history={history}>
          <div>
            {showModal &&
              <Modal closeModal={this.closeModal}><Login/></Modal>
            }
            <Navbar user={user} openModal={this.openModal}/>
            <Switch>
              <Route exact path='/' component={Main}/>
              <Route path='/add' component={AddPage}/>
              {/*<Route exact path='/login' component={LoginPage}/>
              <Route exact path='/pukron/:id' component={ShowPage}/>
              <Route component={NotFound}/>*/}
            </Switch>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App