import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Unsplash, { toJson } from 'unsplash-js'
import styled from 'styled-components'
import { TextInputWithAddon } from '../../TextInput/'

const Card = styled.div`
  background-color: white;
  border-radius: 1rem;

  left: 50%;
  margin: auto auto;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  z-index: 1000;
`
const Header = styled.div`
  align-items: center;
  border-radius: 1rem 1rem 0 0;
  box-shadow: 0 1px 1px 1px lightgrey;
  display: flex;
  font-size: 1.3rem;
  height: 70px;
  justify-content: center;
`
const SearchBar = styled.div`
  height: 50px;
`
const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const Image = styled.img`
  flex: 1 1 30%;
  margin: 1px;
  width: 30%;

  :hover {
    box-shadow: 0 0 0 3px tomato;
  }
`
const Footer = styled.div`
  display: flex;
  height: 50px;
`
const FooterItem = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1 30%;
  font-size: 0.8rem;
  justify-content: center;
`
const unsplash = new Unsplash({
  applicationId: 'bef253870efc9d9d8fc2379c179a9a26c7c22d76bba5a9fe88be879c58dab9bd',
  secret: '4055d99e95985c57ee5c31344fac2ae44f8d6ad49329db3d457fd31b0f188aef',
  callbackUrl: 'urn:ietf:wg:oauth:2.0:oob'
})

class UnsplashPicker extends Component {
  state = {
    photos: [
      'https://images.unsplash.com/photo-1414277578841-112f6e9398ec?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjIyODEzfQ&s=974232121de2e47e00d535d1b28d0203',
      'https://images.unsplash.com/photo-1426287658398-5a912ce1ed0a?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjIyODEzfQ&s=07bb00a6f12891d64b3c7caf03c2f31c',
      'https://images.unsplash.com/photo-1421098518790-5a14be02b243?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjIyODEzfQ&s=2bec49831d5b29520df1fd9666993781',
      'https://images.unsplash.com/photo-1446231855385-1d4b0f025248?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjIyODEzfQ&s=8e47212d8fe798f60402b7b37f13e52d',
      'https://images.unsplash.com/photo-1443750200537-00fd518bdc82?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjIyODEzfQ&s=3a3fb9e451b7e4fb2a13deb24bbc2bec',
      'https://images.unsplash.com/photo-1436658040953-a21ef6596481?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjIyODEzfQ&s=ff9b9e7997d7eb6c24f9791b2808b0d2',
      'https://images.unsplash.com/photo-1430063992682-8a301f946642?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjIyODEzfQ&s=7486302c4eec9b21bb3e7ad66dd2606d',
      'https://images.unsplash.com/photo-1422565096762-bdb997a56a84?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjIyODEzfQ&s=3cac7a47480e4f28455dad9899f13ed4',
      'https://images.unsplash.com/photo-1449938555582-e05593b5af93?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjIyODEzfQ&s=a50dac66b2ceace1b823ef351aebc312'
    ]
  }

  componentWillMount = () => {
    // unsplash.search.photos('dog', 1, 9)
    // .then(toJson)
    // .then(json => {
    //   this.setState({ photos: this.state.photos.concat(json.results) })
    // })
  }

  render () {
    if (this.state.photos.length === 0) return <div>Loading</div>
    console.log(this.state.photos)
    return (
      <Card>
        <Header>
          <i class="fas fa-camera"/> Unsplash
        </Header>
        <SearchBar>
          <TextInputWithAddon/>
        </SearchBar>
        <Body>
          { /*this.state.photos.map(photo => <Image onClick={this.props.getImage(photo.urls.full)} src={photo.urls.thumb} draggable={false}/>)*/ }
          { this.state.photos.map(photo => <Image onClick={this.props.getImage(photo)} src={photo} draggable={false}/>) }
        </Body>
        <Footer>
          <FooterItem>Prev</FooterItem>
          <FooterItem>1125 results</FooterItem>
          <FooterItem>Next</FooterItem>
        </Footer>
      </Card>
    )
  }
}

export default UnsplashPicker