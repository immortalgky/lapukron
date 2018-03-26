import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 100%;
  padding: 1rem;
  position: relative;
  width: 100%;
`
const ImageContainer = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row wrap;
  height: 85%;
  overflow: auto;
`
const Image = styled.div`
  background-color: lightgrey;
  flex: 0 1 19%;
  margin: 0.5%;
  padding-top: 14.25%;

  :hover {
    box-shadow: 0 0 0 3px tomato;
  }
`
const ProgessBarContainer = styled.div`
  align-items: flex-end;
  display: flex;
  height: 15%;
`
const ProgressBar = styled.div`
  background-color: white;
  border: 1px solid darkgrey;
  border-radius: 0.5rem;
  bottom: 0;
  height: 40%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  width: 100%;
`
const Progress = styled.div`
  background-color: #22b988;
  bottom: 0;
  left: 0;
  position: absolute;
  top: 0;
  width: ${props => props.progress}%;
`
const UploadButton = styled.div`
  align-items: center;
  background-color: ${
    props => {
      if (props.disabled) return '#d8d8d8'
      return 'tomato'
    }
  };
  border-radius: 3px;
  bottom: 1rem;
  color: white;
  cursor: ${
    props => {
      if (props.disabled) return 'not-allowed'
      return 'pointer'
    }
  };
  display: flex;
  font-size: 1.5rem;
  font-weight: bold;
  height: 45px;
  justify-content: center;
  left: calc(1rem + 0.5%);
  position: absolute;
  width: 45px;
`
const File = styled.input.attrs({
  type: 'file'
})
`
  display: none;
`

const SVG = styled.svg`
  height: 90vh;
  margin: auto;
  displayL block;
`
const PathGrey = styled.path`
  stroke-linecap: round;
  stroke-width: 2;
  stroke: lightgrey;
`
const PathPurple = styled.path`
  stroke-linecap: round;
  stroke-width: 4;
  stroke: purple;
  stroke-dasharray: calc(40 * 3.142 * 1.85);
  stroke-dashoffset: calc(233 - (50 * 2.33));
`
// <SVG xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'>
//         <PathGrey 
//           d='M40,90 A40,40 0 1,1 60,90'
//           style={{fill: 'none'}}  
//         />
//         <PathPurple 
//           d='M40,90 A40,40 0 1,1 60,90'
//           style={{fill: 'none'}}  
//         />
//       </SVG>

export default (props) => {
  const { store } = props

  return (
    <Wrapper>
      <ImageContainer>
        { store.getState('local').lists.map(img => 
            <Image/>
          ) 
        }
      </ImageContainer>
      <UploadButton
        onClick={() => this.file.click()}
      >
        <i className='fas fa-cloud-upload'/>
      </UploadButton>
      <File
        innerRef={r => this.file = r}
        onChange={(e) => console.log('changed')}
      />
    </Wrapper>
  )
}
