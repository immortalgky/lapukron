import React, { Component } from 'react'
import { Button } from '../Button'
import { Text, TextWithUnderline, TextWithLink } from '../Text'
import { TextInputWithAddon } from '../TextInput/'
import Wrapper from './Wrapper'
import { socialLogin } from '../../firebase/auth'  

class Login extends Component {
  state = {
    signin: true
  }
  swapMode = (mode) => {
    return () => {
      this.setState({signin: mode})
    }
  }
  handleSocialLogin = (provider) => {
    return () => {
      socialLogin(provider)
    }
  }
  /*render () {
    const { signin } = this.state
    return (
      signin
      ? <Wrapper>
          <div className='group'>
            <Text size='20px'>Sign in</Text>
          </div>
          <div className='group'>
            <TextWithUnderline size='0.8rem'>Sign in with your social account</TextWithUnderline>
            <Button facebook to='' onClick={this.handleSocialLogin('facebook')}>Sign in with Facebook</Button>
            <Button google to='' onClick={this.handleSocialLogin('google')}>Sign in with Google</Button>
          </div>
          <div className='group'>
            <TextWithUnderline size='0.8rem'>Sign in with your regular account</TextWithUnderline>
            <TextInputWithAddon type='email' placeholder='Email'><i className="fas fa-envelope"></i></TextInputWithAddon>
            <TextInputWithAddon type='password' placeholder='Password'><i className="fas fa-unlock-alt"></i></TextInputWithAddon>
            <TextWithLink size='0.7rem' to='/'>Forgot your Password?</TextWithLink>
          </div>
          <Button green to='/'>Login</Button>
          <TextWithLink to='/' size='10px' onClick={this.swapMode(false)}>Don't have an account? Register</TextWithLink>
        </Wrapper>
      : <Wrapper>
          <div className='group'>
            <Text size='20px'>Sign up</Text>
          </div>
          <div className='group'>
            <TextWithUnderline size='0.8rem'>Sign up with your email</TextWithUnderline>
            <TextInputWithAddon type='email' placeholder='Email'><i className="fas fa-envelope"></i></TextInputWithAddon>
            <TextInputWithAddon type='password' placeholder='Password'><i className="fas fa-unlock-alt"></i></TextInputWithAddon>
          </div>
          <Button blue to='/'>Sign up</Button>
          <TextWithLink to='/' size='10px' onClick={this.swapMode(true)}>Already have an account? Sign in</TextWithLink>
        </Wrapper>
    )
  }*/
}

export default Login