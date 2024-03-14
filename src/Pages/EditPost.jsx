import React from 'react'
import { useState,useEffect } from 'react'
import { useParams,useNavigate} from 'react-router-dom'
import PostService from '../Post/conf'
import { Container,PostForm } from '../components'

function EditPost() {
    const [Post, setPost] = useState(null);
    const navigate = useNavigate();
    const {slug}=useParams();
    useEffect(() => {
        if(slug)
        {
            PostService.GetPost(slug).then((post)=>{
                setPost(post);
            })
        }
        else{
            navigate('/')
        }
    }, [slug, navigate])
    
  return post ? (
    <div className='py-8'>
        <Container>
        <PostForm post={Post}/>
        </Container>
    </div>
  ) : null
}

export default EditPost