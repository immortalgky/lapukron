import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

const HeaderStyled = css`
  color: ${props => props.color||'inherit'};
  font-size: ${props => {
      if (props.h2) return '1.5rem;'
      if (props.h3) return '1.2rem;'
      if (props.h4) return '1rem;'
      if (props.h5) return '0.8rem;'
      return '2rem;'
    }
  }
  font-weight: bold;
  line-height: 1.7;
  margin-top: 0;
`
export const Header = styled.h1`
  ${HeaderStyled};
`
export const HeaderWithLink = styled(Link)`
  display: block;
  margin-bottom: 1rem;
  ${HeaderStyled};
  
`