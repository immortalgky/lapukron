import styled from 'styled-components'

const Add = styled.div`
  align-items: center;
  background-color: darkgrey;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  height: 20px;
  justify-content: center;
  margin: 1rem;
  width: 20px;

  &:after {
    content: '+';
  }
`

export default Add