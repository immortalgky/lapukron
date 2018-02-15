import styled from 'styled-components'

const Menu = styled.div`
  align-items: center;
  background-color: white;
  box-shadow: 0 0 10px 0 lightgrey;
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  position: fixed;
  width: 100%;
  ${props => props.bottom && `
    bottom: 0;
  `}
  ${props => props.top && `
    top: 0;
  `}

  li {
    align-items: center;
    color: #A1A0A0;
    display: flex;
    flex: 1 1 70px;
    flex-flow: column wrap;
    font-size: 1rem;
    padding: 0.5rem 1rem;

    span {
      font-size: .8rem;
    }
  }
`

export default Menu