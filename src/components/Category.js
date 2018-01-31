import styled from 'styled-components'

export const Category = styled.div`
  background-color: white;
  border-radius: 2px;
  color: white;
  display: inline-block;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  ${props => props.travel && `
    background-color: rgb(122,184,0);
  `}
  ${props => props.hotel && `
    background-color: orange;
  `}
  ${props => props.food && `
    background-color: tomato;
  `}
  ${props => props.photo && `
    background-color: rgb(29,161,243);
  `}
`

export const CategoryText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: ${props => props.size||'2rem'};
  font-weight: bold;
  margin-top: 0;
  ${props => props.travel && `
    color: rgb(122,184,0);
  `}
  ${props => props.hotel && `
    color: orange;
  `}
  ${props => props.food && `
    color: tomato;
  `}
  ${props => props.photo && `
    color: rgb(29,161,243);
  `}
  &:before {
    content: '•';
    margin-right: 1rem;
  }
`