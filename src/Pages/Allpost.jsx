import React from 'react'
import PostService from '../Post/conf'
import { useState, useEffect } from 'react'
import { PostCard, Container } from '../components'

function Allpost() {
  const [Posts, setPosts] = useState([])
  useEffect(() => {
    PostService.GetPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    })
  }, [])

  return (

    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {Posts.map((post) => (
            <div className='p-2 w-1/4' key={post.$id}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>

  )
}

export default Allpost