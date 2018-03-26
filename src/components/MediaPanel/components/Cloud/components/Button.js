import styled from 'styled-components'

const Button = styled.div`
  background-color: ${props => {
    if (props.disabled) return '#d8d8d8'
    return 'tomato'
  }};
  border-radius: 2rem;
  color: white;
  cursor: ${props => {
    if (props.disabled) return 'not-allowed'
    return 'pointer'
  }};
  font-weight: bold;
  padding: 1rem 0;
  text-align: center;
  margin: 0 auto;
  width: 40%;
`

export default Button
