import React, { Component } from 'react'
import styled from 'styled-components'
import { SidePanel, SideButton } from './SideButton'
import createImagePlugin from './Image'
import createUnsplashPlugin from './Unsplash'
import createCloudPlugin from './Cloud'
import createYoutubePlugin from './Youtube'

const Panel = styled.div`
  background-color: white;
  border: 1px solid #444;
  border-radius: 1rem;
  height: 500px;
  position: relative;
  width: 400px;
`
const Header = styled.div`
  align-items: center;
  color: #444;
  display: flex;
  font-size: 1.2rem;
  height: 10%;
  justify-content: center;

  svg {
    margin: 0 5px;
  }
`
const Body = styled.div`
  height: 80%;
  padding: 1rem 0;
`
const Footer = styled.div`
  height: 10%
`

const ImagePlugin = createImagePlugin()
const UnsplashPlugin = createUnsplashPlugin()
const CloudPlugin = createCloudPlugin()
const YoutubePlugin = createYoutubePlugin()

const structure = [
  ImagePlugin,
  UnsplashPlugin,
  CloudPlugin,
  YoutubePlugin
]

export default class extends Component {
  state = {
    type: 'IMAGE'
  }

  render () {
    const idx = structure.findIndex(c => c.state === this.state.type)

    return (
      <Panel>
        <Header>
          { this.state.type ? structure[idx].header : null}
        </Header>
        <Body>
          { this.state.type ? structure[idx].body(this.props, this.state, this.setState) : null}
        </Body>
        <Footer>
        </Footer>
        <SidePanel>
          { 
            structure.map(c => 
              <SideButton
                title={c.label}
                onClick={() => {
                  // TODO : Change later...
                  // Clear DOM
                  this.setState({ type: null }) 
                  setTimeout(() => {
                    this.setState({ type: c.state })
                  })
                }}
              >
                {c.button}
              </SideButton>
            ) 
          }
        </SidePanel>
      </Panel>
    )
  }
}