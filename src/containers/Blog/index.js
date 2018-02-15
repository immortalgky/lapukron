import React, { Component } from 'react'
import styled from 'styled-components'
import Wrapper from './Wrapper'
import { LeftNav, RightNav } from './SideNav'
import Main from './Main'
import Post from '../../components/Post/'
import Counter from '../../components/Counter/'
import Title from '../../components/Title'
import { CircleButton } from '../../components/Button'
import { getAllContents } from '../../api/APIClient'

const MoreArticle = styled.div`
  font-size: 0.8rem;
  text-align: center;
`

const Group = styled.div`
  margin-bottom: 1.5rem;
`

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
        <LeftNav>
        </LeftNav>
        <Main>
          {contents.map((content, idx) => {
                const underline = (idx+1 !== contents.length)
                console.log(underline)
                return <Post key={idx+1} size='lg' content={content} underline={underline}/>
              }
            )
          }
          <MoreArticle>
            <CircleButton to='' style={{textAlign: 'center'}}>MORE ARTICLE...</CircleButton>
          </MoreArticle>
        </Main>
        <RightNav>
          <Group>
            <Title color='lightgreen'>CATEGORIES</Title>
            <Counter/>
          </Group>
          <Group>
            <Title color='tomato'>TRENDING POST</Title>
            {contents.map((content, idx) => <Post key={idx+1} size='xs' content={content} underline={true}/>)}
          </Group>
          <Group>
            <Title color='#FBBBB9'>RECENT POST</Title>
            {contents.map((content, idx) => <Post key={idx+1} size='xs' content={content} underline={true}/>)}
          </Group>
        </RightNav>
      </Wrapper>
    )
  }
}

export default Blog