import React from 'react'
import styled from 'styled-components'

const Image = styled.img`
  width: 100%;
`
const Description = styled.div`
  font-size: 0.8rem;
  font-style: italic;
  text-align: center;

  a {
    text-decoration: underline;
  }
`
const UnsplashImage = (props) => {
  const { data } = props
  console.log(data)
  return (
    <div>
      <Image
        src={props.src}
      />
      <Description>
        Photo by <a href={`${data.user.links.html}?utm_source=Lapukron&utm_medium=referral`}>{data.user.name}</a> on <a href="https://unsplash.com/?utm_source=Lapukron&utm_medium=referral">Unsplash</a>
      </Description>
    </div>
  )
}

export default UnsplashImage