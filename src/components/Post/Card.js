import styled from 'styled-components'

const Card = styled.div`
  color: grey;
  padding: 5% 0;
  ${props => props.underline === true && `
    border-bottom: 1px solid lightgrey;
  `}
`

export default Card