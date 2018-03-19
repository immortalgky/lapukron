import React from 'react'
import Bar from './Bar'
import Brand from './Brand'
import NavLeft from './NavLeft'
import NavRight from './NavRight'
import { Button, SocialButton } from '../Button'
import { socialLogin, logOut } from '../../firebase/auth'

const Navbar = (props) => {
    const { openModal, user } = props
    return (
      <Bar>
        <Brand>
          <Button text to='/'>
            <img src='/images/icon.png' alt='logo' height='32' width='32'/>
          </Button>
        </Brand>
        <NavLeft>
          <Button text hover='rgb(122,184,0)' to=''>
            TRAVEL
          </Button>
          <Button text hover='orange' to=''>
            HOTEL
          </Button>
          <Button text hover='tomato' to=''>
            FOOD
          </Button>
          <Button text hover='rgb(29,161,243)' to=''>
            PHOTO
          </Button>
        </NavLeft>
        {!user.email
          // Enter as guest
          ? (
              <NavRight>
                <SocialButton facebook to='' onClick={() => {socialLogin('facebook')}} />
                <SocialButton google to='' onClick={() => {socialLogin('google')}}/>
                <SocialButton twitter to='' onClick={() => {socialLogin('twitter')}}/>
              </NavRight>
            )
          : (
          // Enter as member
              <NavRight>
                <Button text to=''>
                  <i className='fas fa-search fa-sm'/>
                </Button>
                <Button text to=''>
                  <i className='fas fa-bell fa-sm'/>
                </Button>
                <Button text to='/add'>
                  <i className='fas fa-pencil-alt fa-sm'/>
                </Button>
                <img src={user.photoURL} alt="Profile" height="24" width="24" onClick={logOut}/>
              </NavRight>
            )
        }
      </Bar>
    )
}

export default Navbar