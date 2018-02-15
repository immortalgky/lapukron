import styled from 'styled-components'

const Title = styled.div`
  border-bottom: 3px solid ${props => props.color||'#444'};
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: bold;
  padding: 1rem 0;
`

export default Title