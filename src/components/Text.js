import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

/*------------------------------------------
  <Text[WithLink] color='red' 
                  size='1rem',lg,md,sm 
                  weight='400',bold,lighter
  />
--------------------------------------------*/

const TextStyle = css`
  color: ${props => props.color||'inherit'};
  font-size: ${props => {
      if (props.lg) return '1rem;'
      if (props.md) return '0.8rem;'
      if (props.sm) return '0.6rem;'
      if (props.xs) return '0.5rem;'
      return `${props.size}`
    }
  };
  font-weight: ${props => {
      if (props.bold) return 'bold;'
      if (props.lighter) return 'lighter;'
      return `${props.weight||300}`;
    }
  };
  line-height: 1.7;
  margin-top: 0;
`

export const Text = styled.p`
  ${TextStyle}
`

export const TextWithLink = styled(Link)`
  ${TextStyle}
`
