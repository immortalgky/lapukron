import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: 2rem;

  @media only screen and (min-width: 320px) and (max-width: 480px) {
    padding: 1rem 0;
  } 
`

export default Wrapper