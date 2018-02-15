import React from 'react'
import PostLG from './PostLG'
import PostMD from './PostMD'
import PostXS from './PostXS'

const Post = ({size, content, underline}) => {
  const props = {content, underline}
  if (size === 'lg') {
    return <PostLG {...props} />
  } else if (size === 'md') {
    return <PostMD {...props} />
  } else if (size === 'xs') {
    return <PostXS {...props} />
  } else {
    return null
  }
}

export default Post