import styled from 'styled-components'

const Gradient = styled.div`
  background-image: linear-gradient(-136deg, rgba(32, 34, 37, 0) 0, rgba(24, 26, 28, .13) 13%, #101113 100%);
  height: 100%;
  opacity: 0.7;
  z-index: 2;
  &:hover {
    opacity: 0.4;
  }
`

export default Gradient