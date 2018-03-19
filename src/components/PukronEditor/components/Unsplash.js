import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Unsplash, { toJson } from 'unsplash-js'
import styled from 'styled-components'

const Card = styled.div`
  background-color: white;
  border-radius: 1rem;

  left: 50%;
  margin: auto auto;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  z-index: 1000;
`
const Header = styled.div`
  align-items: center;
  border-radius: 1rem 1rem 0 0;
  display: flex;
  font-size: 1.3rem;
  height: 70px;
  justify-content: center;

  svg {
    margin-right: 5px;
  }
`
const SearchBar = styled.div`
  align-items: center;
  background-color: whitesmoke;
  border-radius: 2rem;
  color: grey;
  display: flex;
  height: 50px;
  margin: 0.3rem 1rem;
  padding: 0 1rem;
  transition: 0.5s;

  :hover {
    box-shadow: 0 0 0 1px lightgrey;
  }

  :focus-within {
    background-color: white;
    box-shadow: 0 0 0 1px lightgrey;
  }
`
const Search = styled.input.attrs({
  placeholder: 'Search free high-resolution photos'
})
`
  background-color: transparent;
  border: none;
  font-size: 1rem;
  height: 100%;
  outline: none;
  padding: 0 1rem;
  width: 100%;
  
  &:focus::placeholder {
    color: lightgrey;
  }
`
const Body = styled.div`
  align-items: center;
  color: lightgrey;
  display: flex;
  flex-wrap: wrap;
  height: 400px;
  justify-content: center;
  overflow: scroll;
  padding: 0 2px;
`
const Image = styled.img`
  cursor: pointer;
  flex: 1 1 30%;
  height: 33.33%;
  width: 33.33%;
`
const Footer = styled.div`
  align-items: center;
  display: flex;
  height: 50px;
  justify-content: space-around;
`
const Prev = styled.div`
  align-items: center;
  background-color: lightgrey;
  border-radius: 1.5rem;
  color: white;
  cursor: pointer;
  display: flex;
  font-size: 1.5rem;
  font-weight: 900;
  height: 30px;
  justify-content: center;
  transition: 0.5s;
  width: 50px;

  ::before {
    content: '<';
  }
  &:hover {
    box-shadow: 0 0 0 2px grey;
  }
`
const Result = styled.div`
  font-size: 0.8rem;
`
const Next = styled(Prev)`
  background-color: #10c595;
  
  ::before {
    content: '>';
  }
  &:hover {
    box-shadow: 0 0 0 2px #077b5d;
  }
`

const unsplash = new Unsplash({
  applicationId: 'bef253870efc9d9d8fc2379c179a9a26c7c22d76bba5a9fe88be879c58dab9bd',
  secret: '4055d99e95985c57ee5c31344fac2ae44f8d6ad49329db3d457fd31b0f188aef',
  callbackUrl: 'urn:ietf:wg:oauth:2.0:oob'
})

class UnsplashPicker extends Component {
  state = {
    photos: []
  }

  componentWillMount = () => {
    // unsplash.search.photos('nature', 1, 30)
    // .then(toJson)
    // .then(json => {
    //   this.setState({ photos: this.state.photos.concat(json.results) })
    // })
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.search.focus()
    })
  }
 
  render () {
    console.log(this.state.photos)
    return (
      <Card>
        <Header>
          <i className="fas fa-camera"/> Unsplash
        </Header>
        <SearchBar>
          <i className="far fa-search fa-lg"/>
          <Search innerRef={c => this.search = c}/>
        </SearchBar>
        <Body>
          { 
            this.state.photos.length > 0
              ?  this.state.photos.map(photo => <Image onClick={this.props.getImage(photo)} src={photo.urls.thumb} draggable={false}/>) 
              :  <div><i className='fas fa-camera fa-10x'/></div>
          }
        </Body>
        <Footer>
          <Prev/>
          <Result>1125 Results</Result>
          <Next/>
        </Footer>
      </Card>
    )
  }
}

export default UnsplashPicker