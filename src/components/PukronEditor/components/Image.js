import React from 'react'
import styled from 'styled-components'

const ImageWrapper = styled.img`
  width: 100%
`
const Credit = styled.div`
  font-size: 0.8rem;
  font-style: italic;
  text-align: center;

  a {
    text-decoration: underline;
  }
`

const Image = (props) => {
  return (
    <div>
      <ImageWrapper
        draggable={false}
        {...props}
      />
      <Credit>
        Photo by <a href='https://unsplash.com/@anniespratt?utm_source=Lapukron&utm_medium=referral'>Annie Spratt</a> on <a href="https://unsplash.com/?utm_source=Lapukron&utm_medium=referral">Unsplash</a>
      </Credit>
    </div>
  )
}

export default Image