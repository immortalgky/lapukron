import styled from 'styled-components'

const Wrapper = styled.div`
  background-image: url(${props => props.background});
  background-position: center;
  background-size: cover;
  height: 100%;
  position: relative;
  z-index: 1;
`

export default Wrapper