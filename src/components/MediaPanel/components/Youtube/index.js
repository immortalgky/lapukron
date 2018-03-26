import React from 'react'
import Wrapper from './components/Wrapper'
import Container from './components/Container'
import Input from './components/Input'
import Card from './components/Card'
import Footer from './components/Footer'
import Button from './components/Button'
import axios from 'axios'

const state = 'YOUTUBE'
const label = 'YouTube'
const button = <i className='fab fa-youtube' style={{color: 'red'}}/>

const header = (
  <div>
    <i className='fab fa-youtube' style={{color: 'red'}}/>
    YouTube
  </div>
)

const body = (props, { youtubeLink, lists }, returnState) => {

  const handleOnKeyDown = (e) => {
    if (e.which === 13) {
      search(youtubeLink)
      .then(handleSearchResult)
      .catch(err => console.log(err))
    }
  }

  const search = (keyword) => {
    const APIKey = process.env.REACT_APP_YOUTUBE_API
    const URI = `https://www.googleapis.com/youtube/v3/search?q=${keyword}&key=${APIKey}&type=video&maxResults=50&part=snippet`
  
    return axios.get(URI)
  }
  
  const handleSearchResult = (result) => {
    console.log(result.data.items)
    returnState({ lists: result.data.items })
  }

  return (
    <Wrapper>
      <Input
        value={youtubeLink}
        onChange={(e) => returnState({ youtubeLink: e.target.value })}
        onKeyDown={handleOnKeyDown}
      />
      <Container>
        { 
          lists.map(v => 
            <Card
              thumbnail={v.snippet.thumbnails.medium.url}
              title={v.snippet.title}
              //description={v.snippet.description}
            />
          ) 
        }
      </Container>
    </Wrapper>
  )
}

const footer = (props, state) => {
  const page_number = 1
  return (
    <Footer>
      <Button>{`<`}</Button> 
      {page_number}
      <Button>{`>`}</Button> 
    </Footer>
  )
}

export default () => {
  return {
    state,
    label,
    button,
    header,
    body,
    footer
  }
}

