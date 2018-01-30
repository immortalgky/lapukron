import React, { Component } from 'react'
import Wrapper from './Wrapper'
import SideNav from './SideNav'
import Main from './Main'
import Post from '../Post'
import Counter from '../CategoryCounter/'
import { getAllContents } from '../../api/APIClient'

class Blog extends Component {
  state = {
    contents: []
  }
  componentDidMount () {
    getAllContents()
    .then(response => { this.setState(prevState => ({contents: prevState.contents.concat(response.data)})) })
    .catch(err => { throw err })
  }
  render () {
    const { contents } = this.state
    return (
      <Wrapper>
        <SideNav>
          <Counter/>
        </SideNav>
        <Main>
          {contents.map((content, idx) => <Post key={idx+1} size='lg' content={content} underline={true}/>)}
        </Main>
        <SideNav>
        </SideNav>
      </Wrapper>
    )
  }
}

export default Blog