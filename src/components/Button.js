import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Button = styled(Link)`
  border-color: black;
  border-style: solid;
  border-width: 1px 1px 3px 1px;
  border-radius: 5px;
  color: white;
  margin: 5px 0;
  padding: 0.5rem 1rem;
  text-align: center;
  ${props => props.primary && `
    background-color: white;
    border-color: lightgrey;
    color: #495057;
  `}
  ${props => props.secondary && `
    background-color: #919496;
    border-color: #707376;
    color: #919496;
  `}
  ${props => props.red && `
    background-color: #E83F6F;
    border-color: #C7365F;
  `}
  ${props => props.green && `
    background-color: #32936F;
    border-color: #28795B;
  `}
  ${props => props.yellow && `
    background-color: #FFBF00;
    border-color: #B49740;
  `}
  ${props => props.blue && `
    background-color: #2274A5;
    border-color: #1C5F87;
  `}
  ${props => props.text && `
    border: none;
    padding: 0;
  `}
  ${props => props.hover && `
    &:hover {
      color: ${props.hover};
    }
  `}
`

export const SocialButton = styled(Link)`
  @font-face {
    font-family: 'Brands';
    src: url('/fonts/fa-brands-400.ttf') format('truetype');
  }
  align-items: center;
  background-color: #222;
  border-radius: 50%;
  color: white;
  display: flex;
  font-family: 'Brands';
  font-size: 0.5rem;
  height: 24px;
  justify-content: center;
  width: 24px;
  ${props => props.facebook && `
    &:before {
      content: '\f39e';
    }
    &:hover {
      background-color: rgb(53,84,145);
    }
  `}
  ${props => props.facebook && props.bg && `background-color: rgb(53,84,145);`}
  ${props => props.google && `
    &:before {
      content: '\f1a0';
    }
    &:hover {
      background-color: rgb(205,51,51);
    }
  `}
  ${props => props.google && props.bg && `background-color: rgb(205,51,51);`}
  ${props => props.twitter && `
    &:before {
      content: '\f099';
    }
    &:hover {
      background-color: rgb(29,161,243);
    }
  `}
  ${props => props.twitter && props.bg && `background-color: rgb(29,161,243);`}
`

export const CircleButton = styled(Link)`
  background-color: whitesmoke;
  border-radius: 19px;
  color: darkgrey;
  display: inline-block;
  padding: 0.5rem 1rem;
`