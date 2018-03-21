import styled from 'styled-components'

const NavLeft = styled.div`
  color: white;
  display: flex;
  flex: 10;
  font-size: 0.7rem;
  font-weight: bold;
  padding-left: 2rem;
  a {
    margin-right: 2rem;
  }
  @media only screen and (max-width: 600px) {
    display: none;
  }
`

export default NavLeft