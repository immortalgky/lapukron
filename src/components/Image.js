import styled from 'styled-components'

const Image = styled.div`
  background-color: whitesmoke;
  background-position: center;
  background-size: cover;
  margin: 1rem 0;
  padding-top: 55%;
  position: relative;
  width: 100%;
  ${props => props.width && `
    height: ${props.width};
    padding: 0;
    max-width: ${props.width};
  `}
`

export default Image