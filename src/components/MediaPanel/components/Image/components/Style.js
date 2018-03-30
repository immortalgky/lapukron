import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 100%;
  padding: 1rem;
  position: relative;
  width: 100%;
`
export const ImageContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  // height: 85%;
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`
export const Image = styled.div`
  background-color: lightgrey;
  flex: 0 1 19%;
  margin: 0.5%;
  padding-top: 14.25%;

  :hover {
    box-shadow: 0 0 0 3px tomato;
  }
`
export const UploadImage = styled.div`
  background-color: white;
  border: 2px dashed darkgrey;
  border-radius: 5px;
  cursor: pointer;
  flex: 0 1 19%;
  margin: 0.5%;
  padding-top: 14.25%;
  position: relative;

  :before {
    content: '+';
    color: lightgrey;
    font-size: 5rem;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`
export const UploadButton = styled.div`
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
export const File = styled.input.attrs({
  type: 'file'
})
`
  display: none;
`
export const ProgressBar = styled.div`
  align-items: center;
  background-color: rgba(245, 245, 245, 0.8);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 50;
`
export const SVG = styled.svg`
  display: block;
  height: 170px;
  transform: rotate(90deg);
  width: 170px;
`
export const PathGrey = styled.path`
  stroke-linecap: round;
  stroke-width: 4;
  stroke: lightgrey;
`
export const Path = styled.path`
  stroke-linecap: butt;
  stroke-width: 8;
  stroke: tomato;
  stroke-dasharray: calc(${props => props.progress/100} * 2 * 80 * 3.142) calc(2 * 80 * 3.142);
`
export const Progress = styled.div`
  color: tomato;
  font-size: 2rem;
  font-weight: bold;
  position: absolute;
`