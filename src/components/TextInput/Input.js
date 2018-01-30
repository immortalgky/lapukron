import styled from 'styled-components'

const Input = styled.input`
  border: none;
  font-size: 0.8rem;
  padding: 0.5rem;
  outline: none;
  width: 100%;
  ${props => props.standard && `
    border-bottom: 1px solid red;
  `}
  ${props => props.size && `
    font-size: ${props.size};
  `}
  ${props => props.center && `
    text-align: center;
  `}
`

export default Input