import styled from 'styled-components'

const Category = styled.div`
  color: lightgrey;
  display: flex;
  flex-flow: column wrap;
  flex: 1 1 300px;
  padding: 0 0.5rem;
  margin-bottom: 1rem;

  @media only screen and (min-width: 768px) and (max-width: 1300px) {
    flex: 1 1 50%;
  }
`

export default Category