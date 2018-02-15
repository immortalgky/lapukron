import React, { Component } from 'react'
import Wrapper from './Wrapper'
import Background from './Background'
import Header from './Header'
import Trending from './Trending'
import TrendLeft from './TrendLeft'
import TrendRight from './TrendRight'
import Panel from '../../components/Panel/'
import { getAllContents} from '../../api/APIClient'

class Hero extends Component {
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
    const { mode } = this.props

    if (contents.length === 0) {
      return <div>Loading...</div>
    }
    return (
      <Wrapper>
        <Background style={{backgroundImage: `url(${contents[0].photoURL})`}}/>
        <Header>
          {mode ? <Panel content={contents[0]}/> : <Panel content={contents[0]}/>}
        </Header>
        <Trending>
          <TrendLeft>
            <Panel content={contents[1]}/>
          </TrendLeft>
          <TrendRight>
            <Panel content={contents[2]}/>   
          </TrendRight> 
        </Trending>
      </Wrapper>
    )
  }
}

export default Hero