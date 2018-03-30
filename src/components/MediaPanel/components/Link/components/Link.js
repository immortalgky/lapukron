import React from 'react'
import {
  Container,
  InputBar,
  Input,
  TextButton
} from './Style'

export default (props) => {
  const { store } = props
  
  return (
    <Container>
      <InputBar>
        <i className='fas fa-link'/>
        <Input
          value={store.getState('link')}
          onChange={e => store.setState({ link: e.target.value })}
        />
        { store.getState('link').length > 0 &&
          <TextButton>Add</TextButton>
        }
      </InputBar>
    </Container>
  )
}