import React from 'react'
import PostLG from './PostLG'
import PostMD from './PostMD'
import PostXS from './PostXS'

const Post = ({size, underline}) => {
  if (size === 'lg') {
    return <PostLG underline={underline}/>
  } else if (size === 'md') {
    return <PostMD underline={underline}/>
  } else if (size === 'xs') {
    return <PostXS underline={underline}/>
  } else {
    return null
  }
}

export default Post