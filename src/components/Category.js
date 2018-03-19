import React, { Component } from 'react'
import styled from 'styled-components'

export const Category = styled.div`
  background-color: white;
  border-radius: 2px;
  color: white;
  display: inline-block;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
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
const Wrapper = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 0.5rem;

  ${Category} {
    margin: 0 5px;
  }
`
const InputWrapper = styled.div`
  position: relative;
`
const Input = styled.input.attrs({
  maxLength: 6,
  placeholder: 'Tags',
  spellCheck: false
})`
  background-color: transparent;
  border: none;
  color: darkgrey;
  font-size: 2rem;
  outline: none;
  text-transform: uppercase;
  width: 300px;

  ::placeholder {
    content: '';
    opacity: ${props => {
      if (props.hidePlaceholder) return 0
      return 1
    }};
    text-transform: capitalize;
  }
  &:focus::placeholder {
    color: darkgrey;
    text-transform: capitalize;
  }
`
const UnorderedList = styled.ul`
  background-color: white;
  border: 1px solid lightgrey;
  font-size: 0.8rem;
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  width: 300px;
`
const List = styled.li`
  padding: 5px;

  :hover {
    background-color: lightgrey;
  }
` 
export class CategoryInput extends Component {
  state = {
    category: '',
    categories: [],
    categoryList: ['TRAVEL','HOTEL','FOOD','PHOTO'],
    expand: false,
  }

  componentDidUpdate = () => {
    if (this.state.categoryList.indexOf(this.state.category.toUpperCase()) !== -1) {
      this.setState(prevState => {
        if (this.state.categories.indexOf(this.state.category.toUpperCase()) === -1) {
          return { category: '', categories: prevState.categories.concat(this.state.category.toUpperCase()) }
        } else {
          return { category: '' }
        }
      })
    }
  }

  handleOnChange = (e) => {
    this.setState({ category: e.target.value })
  }

  handleOnKeyDown = (e) => {
    if (e.which === 8 && e.target.value.length === 0) {
      const lastIndex = this.state.categories.length - 1

      this.setState(prevState => ({ categories: prevState.categories.filter((c, idx) => idx !== lastIndex) }))
    } 
  }

  render () {
    return (
      <Wrapper>
        { 
          this.state.categories.sort().map(c => {
            const category = { [c.toLowerCase()]: true }
            return <Category {...category}>{c}</Category>
          }) 
        }
        <InputWrapper>
          <Input
            value={this.state.category}
            hidePlaceholder={this.state.categories.length !== 0}
            onChange={this.handleOnChange}
            onFocus={() => this.setState({ expand: true })}
            onBlur={() => this.setState({ expand: false })}
            onKeyDown={this.handleOnKeyDown}
          />
          { 
            this.state.expand &&
              <UnorderedList>
                { this.state.categoryList
                  .sort()
                  .filter(c => c.includes(this.state.category.toUpperCase()))
                  .map(c => <List onMouseDown={(e) => this.setState({ category: e.target.textContent })}>{c}</List>) 
                }
              </UnorderedList>
          }
        </InputWrapper>
      </Wrapper>
    )
  }
}