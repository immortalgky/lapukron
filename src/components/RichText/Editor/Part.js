import React from 'react'
import styled from 'styled-components'

const Rectangle = styled.div`
  color: #AAA;
  font-size: 2rem;
  padding: 3rem 0;
  text-align: center;

  svg {
    margin: 0 0.7rem;
  }
`

const Part = (props) => {
  return (
    <Rectangle>
      <i className="fas fa-plane"/>
      <i className="fas fa-bed"/>
      <i class="fas fa-car"/>
      <i className="fas fa-suitcase"/>
      <i className="fas fa-bicycle"/>
      <i className="fas fa-map-signs"/>
      <i class="fas fa-utensils-alt"/>
      <i class="fas fa-ship"/>
      <i class="fas fa-camera-retro"/>
    </Rectangle>
  )
}

export default Part