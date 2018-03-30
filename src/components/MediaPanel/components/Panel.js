import React, { Component } from 'react'
import styled from 'styled-components'
import createImagePlugin from './Image'
import createUnsplashPlugin from './Unsplash'
import createLinkPlugin from './Link'
import createYoutubePlugin from './Youtube'

const Panel = styled.div`
  background-color: #eee;
  border-radius: 5px;
  box-shadow: 0 0 16px 0 rgba(), 0 5px 16px 0 rgba();
  height: 500px;
  margin: 0 auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  width: 80%;
`
const Header = styled.div`
  align-items: center;
  border-bottom: 1px solid #444;
  color: #444;
  display: flex;
  font-size: 1.2rem;
  font-weight: lighter;
  height: 10%;
  padding: 0 1rem;
`
const Container = styled.div`
  display: flex;
  height: 90%;
`
const Body = styled.div`
  flex: 10 1 auto;
`
const SidePanel = styled.div`
  border-right: 1px solid #444;
  flex: 1 10 auto;
`
const SideButton = styled.div`
  align-items: center;
  background-color: white;
  cursor: pointer;
  display: flex;
  font-size: 1rem;
  height: 40px;
  margin: 1rem 0;
  padding-left: 1rem;
  transition: 0.5s;

  :hover {
    box-shadow: 0 0 5px 1px darkgrey;
  }

  svg {
    margin-right: 5%;
  }
`

const ImagePlugin = createImagePlugin()
const UnsplashPlugin = createUnsplashPlugin()
const LinkPlugin = createLinkPlugin()
const YoutubePlugin = createYoutubePlugin()

const structure = [
  ImagePlugin,
  LinkPlugin,
]

export default class extends Component {
  state = {
    type: 'LOCAL',

    // Image
    lists: ['1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1'],
    progress: 0,
    uploading: false,
    
    // Unsplash
    photos: ['1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1'],

    // Cloud
    link: '',

    // YouTube
    youtube: '',
  }

  componentWillMount = () => {
    structure.map(plugin => {
      if (plugin.initialize) {
        plugin.initialize((key) => this.state[key], this.returnState)
      }
    })
  }

  returnState = (state) => {
    this.setState(state)
  }
  
  render () {
    const idx = structure.findIndex(c => c.config.state === this.state.type)

    return (
      <Panel>
        <Header>
          { this.state.type ? structure[idx].config.label : null }
        </Header>
        <Container>
          <SidePanel>
            { 
              structure.map(c => 
                <SideButton
                  title={c.config.label}
                  onClick={() => {
                    // TODO : Change later...
                    // Clear DOM
                    //this.setState({ type: null }) 
                    setTimeout(() => {
                      this.setState({ type: c.config.state })
                    })
                  }}
                >
                  {c.config.button} {c.config.label} 
                </SideButton>
              ) 
            }
          </SidePanel>
          <Body>
            { this.state.type ? structure[idx].Body() : null }
          </Body>
        </Container>
      </Panel>
    )
  }
}