import styled from 'styled-components'

export const Container = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`
export const InputBar = styled.div`
  align-items: center;
  background-color: whitesmoke;
  border-radius: 1rem;
  color: grey;
  display: flex;
  height: 50px;
  padding: 0 1rem;
  position: relative;
  transition: 0.5s ease-out;
  width: 90%;

  :hover {
    box-shadow: 0 0 0 1px lightgrey;
  }
  :focus-within {
    background-color: white;
    box-shadow: 0 0 0 1px lightgrey;
  }
`
export const Input = styled.input.attrs({
  placeholder: 'Link'
})
`
  background-color: transparent;
  border: none;
  font-size: 1.2rem;
  height: 100%;
  outline: none;
  padding: 0 1rem;
  width: 100%;
`
export const TextButton = styled.div`
  color: tomato;
  cursor: pointer;
  font-weight: bold;
  position: absolute;
  right: 1rem;
`