import styled from 'styled-components'

export const SidePanel = styled.div`
  position: absolute;
  right: -3rem;
  top: 1.5rem;
`
export const SideButton = styled.div`
  align-items: center;
  background-color: white;
  border: 1px solid grey;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  font-size: 1.2rem;
  height: 40px;
  justify-content: center;
  margin: 10px 0;
  transition: 0.5s;
  width: 40px;

  :hover {
    box-shadow: 0 0 5px 1px darkgrey;
  }
`